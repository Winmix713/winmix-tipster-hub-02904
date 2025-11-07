import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TeamStatistics } from "@/lib/teamStatistics"

interface TeamStatisticsTableProps {
  statistics: TeamStatistics
}

export default function TeamStatisticsTable({ statistics }: TeamStatisticsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Matches Played</TableCell>
          <TableCell>{statistics.matchesPlayed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Wins</TableCell>
          <TableCell>{statistics.wins}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Draws</TableCell>
          <TableCell>{statistics.draws}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Losses</TableCell>
          <TableCell>{statistics.losses}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Goals For</TableCell>
          <TableCell>{statistics.goalsFor}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Goals Against</TableCell>
          <TableCell>{statistics.goalsAgainst}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Average Goals Scored</TableCell>
          <TableCell>{statistics.averageGoalsScored.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
