import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";

interface PredictionResultsProps {
  predictions: any[];
}

const PredictionResults = ({ predictions }: PredictionResultsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Set<number>>(new Set());

  const handleFeedbackSubmit = (index: number) => {
    setFeedbackSubmitted(prev => new Set([...prev, index]));
    setExpandedIndex(null);
  };

  return (
    <div className="glass-card rounded-3xl p-6 animate-fade-in mt-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Predikciós Eredmények
      </h3>
      
      <div className="grid gap-4">
        {predictions.map((pred, index) => {
          const { match, prediction, patterns = [], formScores } = pred;
          const outcome = prediction?.predicted_outcome || "home";
          const confidence = prediction?.confidence_score || 50;
          
          // Calculate outcome probabilities based on confidence and patterns
          const homeProb = outcome === "home_win" ? Math.round(confidence) : Math.round((100 - confidence) / 2);
          const awayProb = outcome === "away_win" ? Math.round(confidence) : Math.round((100 - confidence) / 2);
          const drawProb = 100 - homeProb - awayProb;
          
          return (
            <div key={index} className="glass-card-hover rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 text-center">
                  <p className="font-bold text-white">{match.home}</p>
                  {formScores && (
                    <p className="text-xs text-gray-400 mt-1">Forma: {formScores.home}%</p>
                  )}
                </div>
                <div className="px-4">
                  <span className="text-gray-400">vs</span>
                </div>
                <div className="flex-1 text-center">
                  <p className="font-bold text-white">{match.away}</p>
                  {formScores && (
                    <p className="text-xs text-gray-400 mt-1">Forma: {formScores.away}%</p>
                  )}
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Biztos predikció</span>
                  <span>{Math.round(confidence)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className={`text-center p-3 rounded-xl ${outcome === 'home_win' ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-white/5'}`}>
                  <TrendingUp className={`w-5 h-5 mx-auto mb-1 ${outcome === 'home_win' ? 'text-blue-400' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-400">Hazai</p>
                  <p className="font-bold text-white">{homeProb}%</p>
                </div>

                <div className={`text-center p-3 rounded-xl ${outcome === 'draw' ? 'bg-gray-500/20 border border-gray-400/30' : 'bg-white/5'}`}>
                  <Minus className={`w-5 h-5 mx-auto mb-1 ${outcome === 'draw' ? 'text-gray-300' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-400">Döntetlen</p>
                  <p className="font-bold text-white">{drawProb}%</p>
                </div>

                <div className={`text-center p-3 rounded-xl ${outcome === 'away_win' ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-white/5'}`}>
                  <TrendingDown className={`w-5 h-5 mx-auto mb-1 ${outcome === 'away_win' ? 'text-blue-400' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-400">Vendég</p>
                  <p className="font-bold text-white">{awayProb}%</p>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-white/10 mb-3">
                <p className="text-sm text-gray-400 mb-1">Ajánlott tipp</p>
                <p className="font-bold text-blue-400">
                  {outcome === 'home_win' ? `${match.home} győzelem` : 
                   outcome === 'away_win' ? `${match.away} győzelem` : 
                   'Döntetlen'}
                </p>
              </div>

              {/* Detected Patterns */}
              {patterns.length > 0 && (
                <div className="pt-3 border-t border-white/10 mb-3">
                  <p className="text-xs text-gray-400 mb-2">Észlelt minták:</p>
                  <div className="flex flex-wrap gap-2">
                    {patterns.map((pattern: any, i: number) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs text-blue-300"
                      >
                        {pattern.name} (+{pattern.confidence_boost}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Form Toggle */}
              {!feedbackSubmitted.has(index) && (
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-gray-300"
                >
                  {expandedIndex === index ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Feedback form bezárása
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Eredmény megadása
                    </>
                  )}
                </button>
              )}

              {feedbackSubmitted.has(index) && (
                <div className="text-center py-2 text-sm text-green-400">
                  ✓ Feedback elküldve
                </div>
              )}

              {expandedIndex === index && !feedbackSubmitted.has(index) && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <FeedbackForm 
                    matchId={pred.matchId} 
                    onSubmitted={() => handleFeedbackSubmit(index)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PredictionResults;
