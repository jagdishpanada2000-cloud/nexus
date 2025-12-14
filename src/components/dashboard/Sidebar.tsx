import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Layers, 
  Users2, 
  BookOpen, 
  Trophy, 
  User, 
  Search,
  Sparkles,
  Settings,
  Zap,
  Flame,
  LogOut
} from "lucide-react";

const mainNav = [
  { icon: Home, label: "Home Feed", href: "/dashboard", badge: null },
  { icon: Layers, label: "Projects", href: "/dashboard/projects", badge: "12" },
  { icon: Users2, label: "Teams", href: "/dashboard/teams", badge: "3" },
  { icon: BookOpen, label: "Learn", href: "/dashboard/learn", badge: "New" },
  { icon: Trophy, label: "Challenges", href: "/dashboard/challenges", badge: "2" },
  { icon: Sparkles, label: "Match", href: "/dashboard/match", badge: null },
  { icon: Search, label: "Explore", href: "/dashboard/explore", badge: null },
];

const bottomNav = [
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const { signOut } = useAuth();
  
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass-strong border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold">DevSpace</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="level">Lvl 12</Badge>
            <span className="text-sm text-muted-foreground">2,450 XP</span>
          </div>
          <div className="flex items-center gap-1 text-orange-500">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-bold">7</span>
          </div>
        </div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: '65%' }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">550 XP to Level 13</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {mainNav.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/dashboard"}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                activeClassName="bg-secondary text-foreground border border-neon-purple/30 shadow-[0_0_15px_hsl(var(--neon-purple)/0.2)]"
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant={item.badge === "New" ? "cyan" : "secondary"} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border space-y-2">
        <ul className="space-y-1">
          {bottomNav.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                activeClassName="bg-secondary text-foreground"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
