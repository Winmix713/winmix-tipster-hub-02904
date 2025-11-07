"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { LEAGUE_TEAM_OPTIONS } from "@/data/teamOptions"

export default function MatchSelection() {
  const [league, setLeague] = useState("")
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <Label>League</Label>
        <Select value={league} onValueChange={setLeague}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select league" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(LEAGUE_TEAM_OPTIONS).map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {league && (
        <>
          <div>
            <Label>Home Team</Label>
            <Select value={homeTeam} onValueChange={setHomeTeam}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select home team" />
              </SelectTrigger>
              <SelectContent>
                {LEAGUE_TEAM_OPTIONS[league]?.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Away Team</Label>
            <Select value={awayTeam} onValueChange={setAwayTeam}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select away team" />
              </SelectTrigger>
              <SelectContent>
                {LEAGUE_TEAM_OPTIONS[league]?.map((team) => (
                  <SelectItem key={team} value={team} disabled={team === homeTeam}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  )
}
