import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-purple/20 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto border border-neon-purple/30 hover:shadow-[0_0_60px_hsl(var(--neon-purple)/0.3)] transition-shadow duration-500">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-8 animate-bounce-subtle">
            <Rocket className="w-10 h-10 text-white" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to
            <span className="neon-text"> Level Up</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of Gen-Z developers building the future. 
            Start your journey today — it's completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="xl" className="group">
              Create Your Profile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="neon-outline" size="xl">
              Explore Projects
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            ✨ No credit card required • 🎯 100% Free tier • 🚀 Ship in minutes
          </p>
        </div>
      </div>
    </section>
  );
}
