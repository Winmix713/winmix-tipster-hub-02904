interface PredictionDisplayProps {
  prediction: {
    homeTeam: string
    awayTeam: string
    homeWinProbability: number
    drawProbability: number
    awayWinProbability: number
    confidence: number
  }
}

export default function PredictionDisplay({ prediction }: PredictionDisplayProps) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">
        {prediction.homeTeam} vs {prediction.awayTeam}
      </h3>
      <div className="grid gap-4">
        <div>
          <span className="text-sm text-muted-foreground">Home Win: </span>
          <span className="font-semibold">{prediction.homeWinProbability.toFixed(1)}%</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Draw: </span>
          <span className="font-semibold">{prediction.drawProbability.toFixed(1)}%</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Away Win: </span>
          <span className="font-semibold">{prediction.awayWinProbability.toFixed(1)}%</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Confidence: </span>
          <span className="font-semibold">{prediction.confidence.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}
