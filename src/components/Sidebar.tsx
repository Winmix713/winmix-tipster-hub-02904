import { Home, Calendar, Brain, Trophy, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed z-40 top-0 left-0 h-screen w-[84px] flex-col justify-between py-6 border-r border-border bg-background/50 backdrop-blur">
        <div className="flex flex-col items-center gap-4">
          <a href="#hero" className="group">
            <div className="h-9 w-9 rounded-xl bg-card ring-1 ring-border grid place-items-center text-primary text-[10px] font-semibold tracking-tight hover:ring-primary/30 transition-all">
              WT
            </div>
          </a>
          <div className="mt-4 flex flex-col items-center gap-3">
            <a href="#hero" className="h-11 w-11 grid place-items-center rounded-xl bg-card ring-1 ring-border hover:bg-muted hover:ring-primary/30 transition-all">
              <Home className="w-5 h-5 text-muted-foreground" />
            </a>
            <a href="#match-selection" className="h-11 w-11 grid place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30 hover:ring-primary/40 transition-all">
              <Calendar className="w-5 h-5 text-primary" />
            </a>
            <a href="#call-to-action" className="h-11 w-11 grid place-items-center rounded-xl bg-card ring-1 ring-border hover:bg-muted hover:ring-primary/30 transition-all">
              <Brain className="w-5 h-5 text-muted-foreground" />
            </a>
            <a href="#leaderboard" className="h-11 w-11 grid place-items-center rounded-xl bg-card ring-1 ring-border hover:bg-muted hover:ring-primary/30 transition-all">
              <Trophy className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </div>
        <div className="px-4">
          <button className="w-12 h-12 rounded-xl bg-card ring-1 ring-border hover:bg-muted hover:ring-primary/30 grid place-items-center transition-all">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
