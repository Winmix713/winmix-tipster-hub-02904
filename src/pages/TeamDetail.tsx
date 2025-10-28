import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { ArrowLeft, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamStats: Record<string, any> = {
  // Angol csapatok
  "Aston Oroszlán": {
    league: "angol",
    form: "WWDWL",
    stats: {
      attack: { value: 85, color: "primary" },
      defense: { value: 78, color: "primary" },
      midfield: { value: 82, color: "primary" },
      overall: { value: 82, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 88 },
        { name: "Gólképesség", value: 84 },
        { name: "Gyorsaság", value: 86 },
        { name: "Passz pontosság", value: 81 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 79 },
        { name: "Labdaszerzések", value: 76 },
        { name: "Kapus", value: 82 },
        { name: "Állóképesség", value: 75 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 83 },
        { name: "Átadások", value: 85 },
        { name: "Kreativitás", value: 80 },
        { name: "Ütemváltás", value: 82 }
      ]
    }
  },
  "Brentford": {
    league: "angol",
    form: "LWDWW",
    stats: {
      attack: { value: 76, color: "primary" },
      defense: { value: 74, color: "primary" },
      midfield: { value: 75, color: "primary" },
      overall: { value: 75, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 78 },
        { name: "Gólképesség", value: 75 },
        { name: "Gyorsaság", value: 77 },
        { name: "Passz pontosság", value: 74 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 76 },
        { name: "Labdaszerzések", value: 72 },
        { name: "Kapus", value: 75 },
        { name: "Állóképesség", value: 73 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 74 },
        { name: "Átadások", value: 76 },
        { name: "Kreativitás", value: 73 },
        { name: "Ütemváltás", value: 77 }
      ]
    }
  },
  "Brighton": {
    league: "angol",
    form: "WDWLW",
    stats: {
      attack: { value: 79, color: "primary" },
      defense: { value: 76, color: "primary" },
      midfield: { value: 80, color: "primary" },
      overall: { value: 78, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 81 },
        { name: "Gólképesség", value: 78 },
        { name: "Gyorsaság", value: 80 },
        { name: "Passz pontosság", value: 77 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 77 },
        { name: "Labdaszerzések", value: 75 },
        { name: "Kapus", value: 78 },
        { name: "Állóképesség", value: 76 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 82 },
        { name: "Átadások", value: 81 },
        { name: "Kreativitás", value: 78 },
        { name: "Ütemváltás", value: 79 }
      ]
    }
  },
  "Chelsea": {
    league: "angol",
    form: "WWWDL",
    stats: {
      attack: { value: 87, color: "primary" },
      defense: { value: 82, color: "primary" },
      midfield: { value: 85, color: "primary" },
      overall: { value: 85, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 89 },
        { name: "Gólképesség", value: 86 },
        { name: "Gyorsaság", value: 88 },
        { name: "Passz pontosság", value: 85 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 83 },
        { name: "Labdaszerzések", value: 81 },
        { name: "Kapus", value: 84 },
        { name: "Állóképesség", value: 82 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 86 },
        { name: "Átadások", value: 87 },
        { name: "Kreativitás", value: 84 },
        { name: "Ütemváltás", value: 85 }
      ]
    }
  },
  "Liverpool": {
    league: "angol",
    form: "WWWWW",
    stats: {
      attack: { value: 92, color: "primary" },
      defense: { value: 88, color: "primary" },
      midfield: { value: 90, color: "primary" },
      overall: { value: 90, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 94 },
        { name: "Gólképesség", value: 91 },
        { name: "Gyorsaság", value: 93 },
        { name: "Passz pontosság", value: 90 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 89 },
        { name: "Labdaszerzések", value: 87 },
        { name: "Kapus", value: 90 },
        { name: "Állóképesség", value: 88 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 91 },
        { name: "Átadások", value: 92 },
        { name: "Kreativitás", value: 89 },
        { name: "Ütemváltás", value: 90 }
      ]
    }
  },
  "Manchester Kék": {
    league: "angol",
    form: "WWDWW",
    stats: {
      attack: { value: 91, color: "primary" },
      defense: { value: 86, color: "primary" },
      midfield: { value: 89, color: "primary" },
      overall: { value: 89, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 93 },
        { name: "Gólképesség", value: 90 },
        { name: "Gyorsaság", value: 92 },
        { name: "Passz pontosság", value: 89 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 87 },
        { name: "Labdaszerzések", value: 85 },
        { name: "Kapus", value: 88 },
        { name: "Állóképesség", value: 86 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 90 },
        { name: "Átadások", value: 91 },
        { name: "Kreativitás", value: 88 },
        { name: "Ütemváltás", value: 89 }
      ]
    }
  },
  // Spanyol csapatok
  "Barcelona": {
    league: "spanyol",
    form: "WWWDW",
    stats: {
      attack: { value: 93, color: "primary" },
      defense: { value: 85, color: "primary" },
      midfield: { value: 92, color: "primary" },
      overall: { value: 90, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 95 },
        { name: "Gólképesség", value: 92 },
        { name: "Gyorsaság", value: 94 },
        { name: "Passz pontosság", value: 91 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 86 },
        { name: "Labdaszerzések", value: 84 },
        { name: "Kapus", value: 87 },
        { name: "Állóképesség", value: 85 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 94 },
        { name: "Átadások", value: 93 },
        { name: "Kreativitás", value: 91 },
        { name: "Ütemváltás", value: 92 }
      ]
    }
  },
  "Madrid Fehér": {
    league: "spanyol",
    form: "WWWWW",
    stats: {
      attack: { value: 94, color: "primary" },
      defense: { value: 87, color: "primary" },
      midfield: { value: 91, color: "primary" },
      overall: { value: 91, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 96 },
        { name: "Gólképesség", value: 93 },
        { name: "Gyorsaság", value: 95 },
        { name: "Passz pontosság", value: 92 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 88 },
        { name: "Labdaszerzések", value: 86 },
        { name: "Kapus", value: 89 },
        { name: "Állóképesség", value: 87 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 92 },
        { name: "Átadások", value: 93 },
        { name: "Kreativitás", value: 90 },
        { name: "Ütemváltás", value: 91 }
      ]
    }
  }
};

// Add default stats for teams not explicitly defined
const getTeamStats = (teamName: string) => {
  if (teamStats[teamName]) return teamStats[teamName];
  
  return {
    league: "angol",
    form: "WWDLD",
    stats: {
      attack: { value: 75, color: "primary" },
      defense: { value: 72, color: "primary" },
      midfield: { value: 74, color: "primary" },
      overall: { value: 74, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 76 },
        { name: "Gólképesség", value: 74 },
        { name: "Gyorsaság", value: 75 },
        { name: "Passz pontosság", value: 73 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 73 },
        { name: "Labdaszerzések", value: 71 },
        { name: "Kapus", value: 74 },
        { name: "Állóképesség", value: 72 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 75 },
        { name: "Átadások", value: 76 },
        { name: "Kreativitás", value: 72 },
        { name: "Ütemváltás", value: 74 }
      ]
    }
  };
};

const getStatColor = (value: number) => {
  if (value >= 85) return "text-primary";
  if (value >= 70) return "text-secondary";
  return "text-destructive";
};

const TeamDetail = () => {
  const { teamName } = useParams<{ teamName: string }>();
  const navigate = useNavigate();
  const team = getTeamStats(teamName || "");

  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => navigate("/teams")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza a csapatokhoz
          </Button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full ring-1 ring-primary/20 bg-primary/10 px-2.5 py-1 mb-2">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] text-primary font-semibold">Csapat Statisztikák</span>
            </div>
            <h1 className="text-3xl sm:text-4xl tracking-tight text-foreground font-semibold">{teamName}</h1>
            <p className="text-muted-foreground mt-1">
              {team.league === "angol" ? "Angol Bajnokság" : "Spanyol Bajnokság"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Info Card */}
            <div className="rounded-2xl bg-card ring-1 ring-border p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 ring-2 ring-primary/30 grid place-items-center">
                  <span className="text-5xl font-bold text-primary">{teamName?.charAt(0)}</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-muted ring-1 ring-border mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Összesített: {team.stats.overall.value}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  {team.form.split("").map((result: string, i: number) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-md grid place-items-center text-xs font-bold ${
                        result === "W"
                          ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                          : result === "D"
                          ? "bg-secondary/20 text-secondary ring-1 ring-secondary/30"
                          : "bg-destructive/20 text-destructive ring-1 ring-destructive/30"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(team.stats).slice(0, 3).map(([key, stat]: [string, any]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground capitalize">{key}</span>
                      <span className={`text-sm font-bold ${getStatColor(stat.value)}`}>{stat.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden ring-1 ring-border">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(team.detailedStats).map(([category, stats]: [string, any]) => (
                <div key={category} className="rounded-2xl bg-card ring-1 ring-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stats.map((stat: any) => (
                      <div key={stat.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{stat.name}</span>
                          <span className={`text-sm font-bold ${getStatColor(stat.value)}`}>
                            {stat.value}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden ring-1 ring-border">
                          <div
                            className={`h-full transition-all ${
                              stat.value >= 85
                                ? "bg-gradient-to-r from-primary to-primary/80"
                                : stat.value >= 70
                                ? "bg-gradient-to-r from-secondary to-secondary/80"
                                : "bg-gradient-to-r from-destructive to-destructive/80"
                            }`}
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamDetail;
