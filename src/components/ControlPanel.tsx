import { Sofa, Camera, SunMedium, Wand2, Shield } from "lucide-react";
import { useState } from "react";

const ControlPanel = () => {
  const [oddsMonitor, setOddsMonitor] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [edgeGuard, setEdgeGuard] = useState(false);

  return (
    <aside className="lg:col-span-1">
      <div className="rounded-3xl bg-card ring-1 ring-border p-5 sticky top-20">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/20 ring-1 ring-primary/30 grid place-items-center">
              <Sofa className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-foreground tracking-tight font-semibold">Vezérlőközpont</div>
              <div className="text-xs text-muted-foreground">Élő rendszerek</div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">41 m</span>
        </div>

        {/* Live preview card */}
        <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border bg-card">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1600&auto=format&fit=crop" 
              className="h-40 w-full object-cover" 
              alt="live room" 
            />
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-destructive/80 text-destructive-foreground text-[11px] px-2 py-0.5 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-background"></span> Live
            </span>
          </div>
          <div className="p-4 space-y-3">
            {/* Toggle row template */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground font-semibold">Odds figyelő</div>
                  <div className="text-[11px] text-muted-foreground">Szinkronban • 82%</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={oddsMonitor}
                  onChange={(e) => setOddsMonitor(e.target.checked)}
                />
                <span className="w-10 h-6 bg-muted ring-1 ring-border rounded-full peer-checked:bg-primary/70 transition"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full peer-checked:translate-x-4 transition"></span>
              </label>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <SunMedium className="w-4 h-4 text-secondary" />
                <div>
                  <div className="text-sm text-foreground font-semibold">Értesítések</div>
                  <div className="text-[11px] text-muted-foreground">Gól, piros lap, szorzó</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span className="w-10 h-6 bg-muted ring-1 ring-border rounded-full peer-checked:bg-primary/70 transition"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full peer-checked:translate-x-4 transition"></span>
              </label>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm text-foreground font-semibold">Value Finder</div>
                  <div className="text-[11px] text-muted-foreground">Kihasználható edge</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-28 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground font-semibold">Edge Guard</div>
                  <div className="text-[11px] text-muted-foreground">Kockázat mérséklés</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={edgeGuard}
                  onChange={(e) => setEdgeGuard(e.target.checked)}
                />
                <span className="w-10 h-6 bg-muted ring-1 ring-border rounded-full peer-checked:bg-primary/70 transition"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full peer-checked:translate-x-4 transition"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a href="#match-selection" className="h-11 rounded-xl bg-gradient-to-r from-primary to-primary text-primary-foreground ring-1 ring-primary hover:ring-primary/80 grid place-items-center text-sm font-semibold">
            Új szelvény
          </a>
          <a href="#call-to-action" className="h-11 rounded-xl bg-card ring-1 ring-border hover:bg-muted grid place-items-center text-sm">
            Elemzés
          </a>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;
