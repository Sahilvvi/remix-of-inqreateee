import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Sparkles, Zap, Globe, Calendar, Mic, Image as ImageIcon } from "lucide-react";

const Comparison = () => {
  const comparisons = [
    {
      feature: "All-in-One Solution",
      icon: Sparkles,
      without: "Blog OR Post OR Scheduling (separate tools)",
      with: "Blog + Post + Schedule + Images + SEO - Everything in one platform",
    },
    {
      feature: "Indian Languages",
      icon: Globe,
      without: "Only English or 2-3 languages",
      with: "English + Hindi, Marathi, Gujarati, Telugu, Tamil & 10+ more",
    },
    {
      feature: "Voice Input",
      icon: Mic,
      without: "Not available - type everything manually",
      with: "Speak your ideas - AI converts voice to polished content",
    },
    {
      feature: "Direct Posting & Scheduling",
      icon: Calendar,
      without: "Copy-paste to each platform manually",
      with: "1-click posting to LinkedIn, YouTube, Instagram, Facebook, Twitter/X",
    },
    {
      feature: "Brand Kit & Templates",
      icon: Zap,
      without: "Inconsistent branding across content",
      with: "Logo, colors, fonts, hashtags saved - AI maintains consistency",
    },
    {
      feature: "AI Image Generator",
      icon: ImageIcon,
      without: "Pay extra for image tools separately",
      with: "Built-in AI images with styles: realistic, cartoon, product photos",
    },
  ];

  const competitors = ["Jasper", "Copy.ai", "Writesonic", "Others"];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating graphics */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl rotate-12 animate-float opacity-60"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full animate-float-delay opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Why We're Better
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            How <span className="gradient-text neon-text">Inqreate</span> Compares
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            See why 10,000+ creators choose Inqreate over competitors like Jasper, Copy.ai & others
          </p>
        </div>

        {/* Competitor logos */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {competitors.map((competitor, index) => (
            <div 
              key={index}
              className="px-4 py-2 glass-card rounded-full text-sm text-muted-foreground"
            >
              vs {competitor}
            </div>
          ))}
        </div>

        {/* Comparison header */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <X className="w-6 h-6 text-red-500" />
              <span className="font-bold text-lg text-red-400">Without Inqreate</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
              <Check className="w-6 h-6 text-green-500" />
              <span className="font-bold text-lg text-green-400">With Inqreate</span>
            </div>
          </div>
        </div>

        {/* Comparison cards */}
        <div className="max-w-5xl mx-auto space-y-4">
          {comparisons.map((comparison, index) => {
            const Icon = comparison.icon;
            return (
              <Card 
                key={index} 
                className="glass-card overflow-hidden animate-scale-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Feature header */}
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">{comparison.feature}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Without */}
                    <div className="p-6 bg-red-500/5 border-r border-border/50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                        <p className="text-muted-foreground">{comparison.without}</p>
                      </div>
                    </div>
                    
                    {/* With */}
                    <div className="p-6 bg-green-500/5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-foreground font-medium">{comparison.with}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 glass-card rounded-2xl border-2 border-green-500/20 animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2">
              <span className="text-4xl">🏆</span>
              <span className="font-bold text-2xl gradient-text">The Clear Winner</span>
            </div>
            <p className="text-muted-foreground max-w-lg">
              Why pay for 5 different tools when Inqreate gives you everything? Blog creation, social posting, scheduling, images, SEO, analytics - all in one platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
