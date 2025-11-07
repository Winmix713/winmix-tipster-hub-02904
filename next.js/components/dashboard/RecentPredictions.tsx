import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration
const recentPredictions = [
  {
    id: 1,
    match: "Arsenal vs Liverpool",
    prediction: "Arsenal Win",
    confidence: 78,
    result: "Won",
    date: "2024-01-15",
  },
  { id: 2, match: "Man City vs Chelsea", prediction: "Draw", confidence: 65, result: "Won", date: "2024-01-14" },
  {
    id: 3,
    match: "Tottenham vs Newcastle",
    prediction: "Over 2.5",
    confidence: 72,
    result: "Lost",
    date: "2024-01-13",
  },
  {
    id: 4,
    match: "Brighton vs Aston Villa",
    prediction: "BTTS Yes",
    confidence: 68,
    result: "Won",
    date: "2024-01-12",
  },
  {
    id: 5,
    match: "West Ham vs Everton",
    prediction: "West Ham Win",
    confidence: 81,
    result: "Won",
    date: "2024-01-11",
  },
]

export default function RecentPredictions() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Match</TableHead>
            <TableHead>Prediction</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPredictions.map((pred) => (
            <TableRow key={pred.id}>
              <TableCell className="font-medium">{pred.match}</TableCell>
              <TableCell>{pred.prediction}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${pred.confidence}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{pred.confidence}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={pred.result === "Won" ? "default" : "destructive"}>{pred.result}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{pred.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
