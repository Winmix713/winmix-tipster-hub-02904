import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { validateRequest, FeedbackInputSchema, corsHeaders } from "../_shared/validation.ts";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create authenticated Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has required role (analyst or admin)
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'analyst'].includes(profile.role)) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions. Admin or Analyst role required.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate input
    const body = await req.json()
    const validation = validateRequest(FeedbackInputSchema, body)
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error, details: validation.details }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { matchId, homeScore, awayScore, halfTimeHomeScore, halfTimeAwayScore } = validation.data

    // Validate halftime scores if provided
    if (halfTimeHomeScore !== undefined && halfTimeHomeScore > homeScore) {
      return new Response(
        JSON.stringify({ error: 'Halftime home score cannot be greater than final home score' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (halfTimeAwayScore !== undefined && halfTimeAwayScore > awayScore) {
      return new Response(
        JSON.stringify({ error: 'Halftime away score cannot be greater than final away score' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Update match with final score and halftime scores
    const { error: matchUpdateError } = await supabase
      .from('matches')
      .update({ 
        home_score: homeScore, 
        away_score: awayScore,
        halftime_home_score: halfTimeHomeScore,
        halftime_away_score: halfTimeAwayScore,
        status: 'finished' 
      })
      .eq('id', matchId);

    if (matchUpdateError) {
      console.error('Error updating match:', matchUpdateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update match', details: matchUpdateError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Determine actual outcome
    const actualOutcome = homeScore > awayScore 
      ? 'home_win' 
      : homeScore < awayScore 
        ? 'away_win' 
        : 'draw';

    // 3. Fetch prediction for this match
    const { data: prediction, error: predError } = await supabase
      .from('predictions')
      .select('*')
      .eq('match_id', matchId)
      .single();

    if (predError || !prediction) {
      console.error('No prediction found for this match:', predError);
      return new Response(
        JSON.stringify({ error: 'No prediction found for this match' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const wasCorrect = prediction.predicted_outcome === actualOutcome;

    // 4. Update prediction with feedback
    const pScore = (prediction.css_score ?? prediction.confidence_score) / 100;
    const calibrationError = Math.abs(pScore - (wasCorrect ? 1 : 0));

    const { error: predUpdateError } = await supabase
      .from('predictions')
      .update({
        actual_outcome: actualOutcome,
        was_correct: wasCorrect,
        calibration_error: Math.round(calibrationError * 10000) / 10000,
        evaluated_at: new Date().toISOString()
      })
      .eq('id', prediction.id);

    if (predUpdateError) {
      console.error('Error updating prediction:', predUpdateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update prediction', details: predUpdateError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Update pattern accuracy for all detected patterns
    const { data: patterns, error: patternsError } = await supabase
      .from('detected_patterns')
      .select('template_id')
      .eq('match_id', matchId);

    if (patternsError) {
      console.error('Error fetching patterns:', patternsError);
    }

    if (patterns && patterns.length > 0) {
      for (const pattern of patterns) {
        // Fetch current accuracy
        const { data: accuracy, error: accError } = await supabase
          .from('pattern_accuracy')
          .select('*')
          .eq('template_id', pattern.template_id)
          .single();

        if (accError || !accuracy) {
          console.error('Pattern accuracy not found:', accError);
          continue;
        }

        // Calculate new accuracy
        const newTotal = accuracy.total_predictions + 1;
        const newCorrect = accuracy.correct_predictions + (wasCorrect ? 1 : 0);
        const newRate = (newCorrect / newTotal) * 100;

        // Update pattern accuracy
        await supabase
          .from('pattern_accuracy')
          .update({
            total_predictions: newTotal,
            correct_predictions: newCorrect,
            accuracy_rate: newRate,
            last_updated: new Date().toISOString()
          })
          .eq('id', accuracy.id);

        // Adjust template confidence boost if enough data (10+ predictions)
        if (newTotal >= 10) {
          let adjustment = 0;
          if (newRate > 60) adjustment = 0.5;
          if (newRate < 45) adjustment = -0.5;

          if (adjustment !== 0) {
            await supabase.rpc('adjust_template_confidence', {
              p_template_id: pattern.template_id,
              p_adjustment: adjustment
            });

            console.log(`📊 Adjusted confidence for template ${pattern.template_id}: ${adjustment > 0 ? '+' : ''}${adjustment}`);
          }
        }
      }
    }

    // Log the action for audit
    await supabaseClient
      .from('admin_audit_log')
      .insert({
        action: 'submit_feedback',
        resource_type: 'match',
        resource_id: matchId,
        details: {
          actual_outcome: actualOutcome,
          was_correct: wasCorrect,
          submitted_by: user.email
        },
        created_by: user.id
      });

    console.log(`✅ Feedback submitted for match ${matchId}: ${actualOutcome} (was correct: ${wasCorrect}) by ${user.email}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        wasCorrect,
        actualOutcome,
        predictedOutcome: prediction.predicted_outcome
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in submit-feedback:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
