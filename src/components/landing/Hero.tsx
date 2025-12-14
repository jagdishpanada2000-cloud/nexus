import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Users, Code2, Trophy } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-slide-up">
          <Badge variant="neon" className="mb-6 px-4 py-1.5">
            <Zap className="w-3 h-3 mr-1" />
            Now in Beta — Join 10,000+ developers
          </Badge>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Where Gen-Z
          <br />
          <span className="neon-text">Devs Build</span>
          <br />
          Together
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          The ultimate platform combining projects, teams, learning & networking.
          <br className="hidden md:block" />
          Level up your skills. Ship faster. Get hired.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button variant="neon" size="xl" className="group">
            Start Building Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="neon-outline" size="xl">
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: Users, value: "50K+", label: "Active Developers" },
            { icon: Code2, value: "12K+", label: "Projects Shipped" },
            { icon: Trophy, value: "500+", label: "Hackathons" },
            { icon: Zap, value: "2M+", label: "XP Earned" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover-glow">
              <stat.icon className="w-8 h-8 text-neon-purple mx-auto mb-2" />
              <div className="text-3xl font-bold font-display neon-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
