import { Trophy, Twitter, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="ml-0 md:ml-[84px] border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-card ring-1 ring-border grid place-items-center text-primary text-[10px] font-semibold tracking-tight">WT</div>
              <span className="text-sm text-muted-foreground font-semibold">WINMIX TIPSTER</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Modern tipprendszer, valós idejű elemzéssel és közösségi ranglistával.</p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, index) => (
                <a key={index} href={social.href} className="h-9 w-9 grid place-items-center rounded-md bg-card ring-1 ring-border hover:bg-muted hover:ring-primary/30 transition">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm text-foreground tracking-tight font-semibold">Gyors linkek</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {["Kezdőlap", "Közelgő mérkőzések", "Ranglista", "Élő mérkőzések"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm text-foreground tracking-tight font-semibold">Források</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {["Támogatás", "GYIK", "Játékszabályok", "Kapcsolat"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-sm text-foreground tracking-tight font-semibold">Feliratkozás</h4>
            <p className="text-sm text-muted-foreground mt-3">Értesülj a legújabb tippekről és versenyekről.</p>
            <div className="mt-3 flex items-center gap-2">
              <Input 
                type="email" 
                placeholder="Email címed" 
                className="flex-1 h-10 rounded-md bg-card ring-1 ring-border px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-primary/30" 
              />
              <Button className="h-10 px-3 rounded-md bg-primary text-primary-foreground ring-1 ring-primary hover:ring-primary/80 hover:bg-primary/90 text-sm font-semibold">
                Küldés
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">© 2025 WINMIX TIPSTER. Minden jog fenntartva.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Felhasználási feltételek</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Adatvédelem</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
