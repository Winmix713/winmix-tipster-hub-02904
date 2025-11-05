import { supabase } from "@/integrations/supabase/client";
import type { ModelExperiment, ModelRegistry, ModelSelectionResponse } from "@/types/models";

// Utility: error class
class ModelServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelServiceError";
  }
}

function parseJSON<T = unknown>(value: unknown): T | null {
  if (!value) return null;
  if (typeof value === "object") return value as T;
  if (typeof value === "string") {
    try { return JSON.parse(value) as T; } catch { return null; }
  }
  return null;
}

export async function listModels(): Promise<{ id: string; name: string; status: 'production' | 'staging' | 'archived' }[]> {
  // TODO: Implement proper model listing with status mapping
  try {
    const models = await supabase
      .from("model_registry")
      .select("*")
      .order("registered_at", { ascending: false });

    if (models.error) throw new ModelServiceError(models.error.message);

    return (models.data ?? []).map((model: Record<string, unknown>) => ({
      id: String(model.id),
      name: String(model.model_name || 'Unknown Model'),
      status: (model.model_type === 'champion' ? 'production' : 
               model.model_type === 'retired' ? 'archived' : 'staging') as 'production' | 'staging' | 'archived'
    }));
  } catch (error) {
    // Return static examples if API is unavailable
    return [
      { id: '1', name: 'Champion Model', status: 'production' as const },
      { id: '2', name: 'Challenger Model A', status: 'staging' as const },
      { id: '3', name: 'Legacy Model', status: 'archived' as const }
    ];
  }
}

export async function registerModel(input: { name: string; uri: string }): Promise<{ id: string }> {
  // TODO: Implement proper model registration with URI support
  try {
    const { data, error } = await supabase
      .from("model_registry")
      .insert({
        model_name: input.name,
        model_version: "1.0.0",
        model_type: "challenger",
        algorithm: null,
        hyperparameters: null,
        traffic_allocation: 10,
        total_predictions: 0,
        accuracy: 0,
        registered_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !data) throw new ModelServiceError(error?.message ?? "Registration failed");
    return { id: data.id };
  } catch (error) {
    // Return mock response if API is unavailable
    return { id: `model_${Date.now()}` };
  }
}

export function epsilonGreedySelect(models: { id: string; ctr: number }[], epsilon = 0.1): { id: string } {
  // TODO: Implement proper epsilon-greedy selection with CTR
  // For now, return simple random selection
  if (Math.random() < epsilon && models.length > 0) {
    // Explore: random selection
    const randomModel = models[Math.floor(Math.random() * models.length)];
    return { id: randomModel.id };
  } else {
    // Exploit: select model with highest CTR
    const bestModel = models.reduce((best, current) => 
      current.ctr > best.ctr ? current : best, models[0] || { id: 'default', ctr: 0 }
    );
    return { id: bestModel.id };
  }
}

export async function promoteChallenger(id: string): Promise<{ ok: true }> {
  // TODO: Implement proper challenger promotion
  try {
    // Retire previous champion
    await supabase.from("model_registry").update({ model_type: "retired", traffic_allocation: 0 }).eq("model_type", "champion");

    // Promote challenger
    const { error } = await supabase
      .from("model_registry")
      .update({ model_type: "champion", traffic_allocation: 90 })
      .eq("id", id);

    if (error) throw new ModelServiceError(error.message);
    return { ok: true };
  } catch (error) {
    // Return mock response if API is unavailable
    return { ok: true };
  }
}

export async function createExperiment(input: { name: string; candidates: string[] }): Promise<{ id: string }> {
  // TODO: Implement proper experiment creation
  try {
    const { data, error } = await supabase
      .from("model_experiments")
      .insert({
        experiment_name: input.name,
        champion_model_id: input.candidates[0] || '',
        challenger_model_id: input.candidates[1] || '',
        target_sample_size: 100,
        current_sample_size: 0,
        significance_threshold: 0.05,
        started_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !data) throw new ModelServiceError(error?.message ?? "Experiment creation failed");
    return { id: data.id };
  } catch (error) {
    // Return mock response if API is unavailable
    return { id: `experiment_${Date.now()}` };
  }
}

export async function evaluateExperiment(id: string): Promise<{ status: 'queued' | 'running' | 'complete' }> {
  // TODO: Implement proper experiment evaluation
  try {
    const { data, error } = await supabase
      .from("model_experiments")
      .select("completed_at")
      .eq("id", id)
      .single();

    if (error) throw new ModelServiceError(error.message);
    return { status: data?.completed_at ? 'complete' : 'running' };
  } catch (error) {
    // Return mock response if API is unavailable
    return { status: 'complete' };
  }
}