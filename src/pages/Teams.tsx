import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TeamStatisticsTable from "@/components/TeamStatisticsTable";
import { Users } from "lucide-react";

// Mock statistics data - később Supabase-ből jön
const generateTeamStats = (teamNames: string[]) => {
  return teamNames.map(name => {
    const played = Math.floor(Math.random() * 10) + 20;
    const won = Math.floor(Math.random() * played * 0.5);
    const lost = Math.floor(Math.random() * (played - won) * 0.6);
    const drawn = played - won - lost;
    const goalsFor = Math.floor(Math.random() * 40) + 20;
    const goalsAgainst = Math.floor(Math.random() * 40) + 15;
    const points = won * 3 + drawn;
    
    // Generate recent form
    const formResults = ['W', 'D', 'L'];
    const form = Array.from({ length: 8 }, () => 
      formResults[Math.floor(Math.random() * formResults.length)]
    );
    
    // Calculate form score based on last 5 matches
    const recentForm = form.slice(-5);
    const formScore = Math.round(
      (recentForm.filter(r => r === 'W').length * 100 + 
       recentForm.filter(r => r === 'D').length * 50) / 5
    );

    return {
      name,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points,
      form,
      formScore
    };
  });
};

const leagueTeams = {
  angol: [
    "Aston Oroszlán", "Brentford", "Brighton", "Chelsea", "Crystal Palace",
    "Everton", "Fulham", "Liverpool", "London Ágyúk", "Manchester Kék",
    "Newcastle", "Nottingham", "Tottenham", "Vörös Ördögök", "West Ham", "Wolverhampton"
  ],
  spanyol: [
    "Alaves", "Barcelona", "Bilbao", "Getafe", "Girona", "Las Palmas",
    "Madrid Fehér", "Madrid Piros", "Mallorca", "Osasuna", "San Sebastian",
    "Sevilla Piros", "Sevilla Zöld", "Valencia", "Vigo", "Villarreal"
  ]
};

const Teams = () => {
  const [league, setLeague] = useState<"angol" | "spanyol">("angol");
  const teamStats = generateTeamStats(leagueTeams[league]);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full ring-1 ring-primary/20 bg-primary/10 px-2.5 py-1 mb-2">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] text-primary font-semibold">Csapatok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl tracking-tight text-foreground font-semibold">Csapatok listája</h1>
            <p className="text-muted-foreground mt-1">Válassz bajnokságot és böngéssz a csapatok között.</p>
            
            {/* League Selector */}
            <div className="mt-4 inline-flex items-center rounded-lg bg-muted p-1 ring-1 ring-border">
              <button
                onClick={() => setLeague("angol")}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                  league === "angol"
                    ? "bg-card text-foreground ring-1 ring-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Angol Bajnokság
              </button>
              <button
                onClick={() => setLeague("spanyol")}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                  league === "spanyol"
                    ? "bg-card text-foreground ring-1 ring-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Spanyol Bajnokság
              </button>
            </div>
          </div>

          <TeamStatisticsTable 
            teams={teamStats}
            leagueName={league === "angol" ? "Angol Bajnokság" : "Spanyol Bajnokság"}
          />
        </div>
      </main>
    </div>
  );
};

export default Teams;
