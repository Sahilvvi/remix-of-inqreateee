import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, Zap } from "lucide-react";
import aiPowerImage from "@/assets/ai-power-3d.png";

const AIShowcase = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "Powered by the latest GPT and Gemini models for superior content quality",
    },
    {
      icon: Sparkles,
      title: "Context-Aware Generation",
      description: "AI that understands your brand voice and adapts to your style",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate months of content in minutes, not days",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Image */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-30 animate-pulse-slow"></div>
            <div className="relative glass-card p-8 rounded-3xl">
              <img 
                src={aiPowerImage} 
                alt="AI Technology"
                className="w-full h-auto animate-float rounded-2xl"
              />
              
              {/* Floating stats */}
              <div className="absolute top-8 -right-4 glass-card px-6 py-3 rounded-2xl animate-bounce-subtle">
                <div className="text-2xl font-bold gradient-text">10x</div>
                <div className="text-sm text-muted-foreground">Faster</div>
              </div>
              
              <div className="absolute bottom-8 -left-4 glass-card px-6 py-3 rounded-2xl animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                <div className="text-2xl font-bold gradient-text">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Next-Gen <span className="gradient-text neon-text">AI Technology</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience the power of cutting-edge artificial intelligence that understands context, 
                maintains your brand voice, and creates content that truly resonates with your audience.
              </p>
            </div>

            <div className="space-y-6">
              {capabilities.map((capability, index) => (
                <Card
                  key={index}
                  className="glass-card hover-lift p-6 animate-scale-in border-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex-shrink-0">
                      <capability.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 gradient-text">{capability.title}</h3>
                      <p className="text-muted-foreground">{capability.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button size="lg" className="group text-lg px-8 py-6 hover-glow">
              Explore AI Features
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;
