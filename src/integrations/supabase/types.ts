export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      detected_patterns: {
        Row: {
          confidence_contribution: number
          detected_at: string | null
          id: string
          match_id: string | null
          pattern_data: Json | null
          template_id: string | null
        }
        Insert: {
          confidence_contribution: number
          detected_at?: string | null
          id?: string
          match_id?: string | null
          pattern_data?: Json | null
          template_id?: string | null
        }
        Update: {
          confidence_contribution?: number
          detected_at?: string | null
          id?: string
          match_id?: string | null
          pattern_data?: Json | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detected_patterns_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detected_patterns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "pattern_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          avg_goals_per_match: number | null
          btts_percentage: number | null
          country: string
          created_at: string | null
          home_win_percentage: number | null
          id: string
          name: string
          season: string
        }
        Insert: {
          avg_goals_per_match?: number | null
          btts_percentage?: number | null
          country: string
          created_at?: string | null
          home_win_percentage?: number | null
          id?: string
          name: string
          season: string
        }
        Update: {
          avg_goals_per_match?: number | null
          btts_percentage?: number | null
          country?: string
          created_at?: string | null
          home_win_percentage?: number | null
          id?: string
          name?: string
          season?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          created_at: string | null
          halftime_away_score: number | null
          halftime_home_score: number | null
          home_score: number | null
          home_team_id: string | null
          id: string
          league_id: string | null
          match_date: string
          status: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: string | null
          created_at?: string | null
          halftime_away_score?: number | null
          halftime_home_score?: number | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          league_id?: string | null
          match_date: string
          status?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string | null
          created_at?: string | null
          halftime_away_score?: number | null
          halftime_home_score?: number | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          league_id?: string | null
          match_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      pattern_accuracy: {
        Row: {
          accuracy_rate: number | null
          correct_predictions: number | null
          id: string
          last_updated: string | null
          template_id: string | null
          total_predictions: number | null
        }
        Insert: {
          accuracy_rate?: number | null
          correct_predictions?: number | null
          id?: string
          last_updated?: string | null
          template_id?: string | null
          total_predictions?: number | null
        }
        Update: {
          accuracy_rate?: number | null
          correct_predictions?: number | null
          id?: string
          last_updated?: string | null
          template_id?: string | null
          total_predictions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pattern_accuracy_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: true
            referencedRelation: "pattern_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      pattern_templates: {
        Row: {
          base_confidence_boost: number | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          base_confidence_boost?: number | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          base_confidence_boost?: number | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      predictions: {
        Row: {
          actual_outcome: string | null
          btts_prediction: boolean | null
          confidence_score: number
          created_at: string | null
          evaluated_at: string | null
          id: string
          match_id: string | null
          over_under_prediction: string | null
          predicted_away_score: number | null
          predicted_home_score: number | null
          predicted_outcome: string
          was_correct: boolean | null
        }
        Insert: {
          actual_outcome?: string | null
          btts_prediction?: boolean | null
          confidence_score: number
          created_at?: string | null
          evaluated_at?: string | null
          id?: string
          match_id?: string | null
          over_under_prediction?: string | null
          predicted_away_score?: number | null
          predicted_home_score?: number | null
          predicted_outcome: string
          was_correct?: boolean | null
        }
        Update: {
          actual_outcome?: string | null
          btts_prediction?: boolean | null
          confidence_score?: number
          created_at?: string | null
          evaluated_at?: string | null
          id?: string
          match_id?: string | null
          over_under_prediction?: string | null
          predicted_away_score?: number | null
          predicted_home_score?: number | null
          predicted_outcome?: string
          was_correct?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "predictions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: true
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          league_id: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          league_id?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          league_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      pattern_definitions: {
        Row: {
          id: string
          pattern_name: string
          detection_function: string
          min_sample_size: number
          min_confidence_threshold: number
          priority: number
          is_active: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          pattern_name: string
          detection_function: string
          min_sample_size?: number
          min_confidence_threshold?: number
          priority?: number
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          pattern_name?: string
          detection_function?: string
          min_sample_size?: number
          min_confidence_threshold?: number
          priority?: number
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_patterns: {
        Row: {
          id: string
          team_id: string
          pattern_type: string
          pattern_name: string
          confidence: number
          strength: number
          valid_from: string
          valid_until: string | null
          prediction_impact: number
          historical_accuracy: number
          pattern_metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          team_id: string
          pattern_type: string
          pattern_name: string
          confidence?: number
          strength?: number
          valid_from?: string
          valid_until?: string | null
          prediction_impact?: number
          historical_accuracy?: number
          pattern_metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          pattern_type?: string
          pattern_name?: string
          confidence?: number
          strength?: number
          valid_from?: string
          valid_until?: string | null
          prediction_impact?: number
          historical_accuracy?: number
          pattern_metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_patterns_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      adjust_template_confidence: {
        Args: { p_adjustment: number; p_template_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
