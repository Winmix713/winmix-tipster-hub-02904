-- Phase 4: Add css_score, prediction_factors, and calibration_error to predictions table
-- This migration fixes the missing columns that cause errors in analyze-match function

-- Add new columns to predictions table
ALTER TABLE public.predictions 
  ADD COLUMN IF NOT EXISTS css_score NUMERIC,
  ADD COLUMN IF NOT EXISTS prediction_factors JSONB,
  ADD COLUMN IF NOT EXISTS calibration_error NUMERIC;

-- Backfill css_score from confidence_score for existing rows
UPDATE public.predictions
SET css_score = confidence_score
WHERE css_score IS NULL AND confidence_score IS NOT NULL;

-- Add metadata to track backfilled records
UPDATE public.predictions
SET prediction_factors = jsonb_set(
  COALESCE(prediction_factors, '{}'::jsonb),
  '{backfilled_css_score}',
  'true'::jsonb
)
WHERE css_score IS NOT NULL AND prediction_factors IS NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_predictions_css_score ON public.predictions(css_score);
CREATE INDEX IF NOT EXISTS idx_predictions_calibration_error ON public.predictions(calibration_error);
CREATE INDEX IF NOT EXISTS idx_predictions_factors ON public.predictions USING GIN(prediction_factors);

-- Add comments for documentation
COMMENT ON COLUMN public.predictions.css_score IS 'Continuous Scaled Score (CSS) - enhanced confidence metric ranging 0-100';
COMMENT ON COLUMN public.predictions.prediction_factors IS 'Detailed JSON structure containing pattern contributions, team stats, and metadata';
COMMENT ON COLUMN public.predictions.calibration_error IS 'Calibration error (predicted_probability - actual_outcome) for model evaluation';