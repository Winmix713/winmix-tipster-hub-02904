"use client"

export default function CorrelationHeatmap() {
  const leagues = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"]

  // Mock correlation data (-1 to 1)
  const correlationData = [
    [1.0, 0.72, 0.68, 0.65, 0.58],
    [0.72, 1.0, 0.75, 0.7, 0.62],
    [0.68, 0.75, 1.0, 0.73, 0.67],
    [0.65, 0.7, 0.73, 1.0, 0.71],
    [0.58, 0.62, 0.67, 0.71, 1.0],
  ]

  const getColor = (value: number) => {
    if (value >= 0.9) return "bg-green-600"
    if (value >= 0.75) return "bg-green-500"
    if (value >= 0.6) return "bg-yellow-500"
    if (value >= 0.4) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex">
            <div className="w-32" />
            {leagues.map((league, idx) => (
              <div key={idx} className="flex-1 min-w-[100px] text-center text-xs font-medium p-2">
                {league.split(" ")[0]}
              </div>
            ))}
          </div>
          {leagues.map((league, rowIdx) => (
            <div key={rowIdx} className="flex items-center">
              <div className="w-32 text-xs font-medium pr-2 text-right">{league.split(" ")[0]}</div>
              {correlationData[rowIdx].map((value, colIdx) => (
                <div key={colIdx} className="flex-1 min-w-[100px] p-2">
                  <div
                    className={`h-12 rounded flex items-center justify-center text-white text-sm font-semibold ${getColor(value)}`}
                  >
                    {value.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs">
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          Weak
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500" />
          Moderate
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          Strong
        </span>
      </div>
    </div>
  )
}
