import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Save } from 'lucide-react';

interface FeedbackFormProps {
  matchId: string;
  onSubmitted: () => void;
}

export default function FeedbackForm({ matchId, onSubmitted }: FeedbackFormProps) {
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.functions.invoke('submit-feedback', {
        body: { matchId, homeScore, awayScore }
      });

      if (error) throw error;

      setSubmitted(true);
      onSubmitted();
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err instanceof Error ? err.message : 'Hiba az eredmény mentése során');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Alert className="mt-6">
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          Eredmény sikeresen rögzítve! A pattern accuracy frissült.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="w-5 h-5" />
          Mérkőzés eredmény rögzítése
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="homeScore">Hazai gólok</Label>
              <Input
                id="homeScore"
                type="number"
                min="0"
                value={homeScore}
                onChange={(e) => setHomeScore(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="awayScore">Vendég gólok</Label>
              <Input
                id="awayScore"
                type="number"
                min="0"
                value={awayScore}
                onChange={(e) => setAwayScore(Number(e.target.value))}
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {submitting ? 'Mentés...' : 'Eredmény mentése'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
