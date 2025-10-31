import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface Match {
  id: string;
  match_date: string;
  status: string;
  home_team: { name: string };
  away_team: { name: string };
  league: { name: string };
  home_score?: number;
  away_score?: number;
}

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    setLoading(true);
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        home_team:teams!home_team_id(name),
        away_team:teams!away_team_id(name),
        league:leagues(name)
      `)
      .order('match_date', { ascending: true })
      .limit(20);

    if (error) {
      console.error('Error fetching matches:', error);
    } else {
      setMatches(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">WinMix Pattern Recognition</h1>
        <p className="text-muted-foreground">
          Pattern detection + AI prediction prototípus
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Betöltés...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={match.status === 'scheduled' ? 'default' : 'secondary'}>
                    {match.status === 'scheduled' ? 'Jövőbeli' : 'Befejezett'}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(match.match_date), 'MMM dd')}
                  </span>
                </div>
                <CardTitle className="text-lg">{match.league.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{match.home_team.name}</p>
                    </div>
                    {match.status === 'finished' && (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{match.home_score}</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-2xl font-bold">{match.away_score}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      VS
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{match.away_team.name}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/match/${match.id}`)}
                    className="w-full mt-4"
                    variant={match.status === 'scheduled' ? 'default' : 'outline'}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {match.status === 'scheduled' ? 'Elemzés indítása' : 'Eredmény megtekintése'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {matches.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nincsenek mérkőzések az adatbázisban.</p>
        </div>
      )}
    </div>
  );
}
