import { Card, CardContent } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const Comparison = () => {
  const comparisons = [
    {
      feature: "Content Creation Time",
      without: "8-10 hours per week",
      with: "30 minutes per week",
    },
    {
      feature: "Platform Management",
      without: "Manual posting on each platform",
      with: "One-click multi-platform publishing",
    },
    {
      feature: "Content Quality",
      without: "Inconsistent and rushed",
      with: "Professional & SEO-optimized",
    },
    {
      feature: "Team Collaboration",
      without: "Email chains and confusion",
      with: "Real-time collaboration tools",
    },
    {
      feature: "Monthly Cost",
      without: "$2,000+ for freelancers",
      with: "Starting at $29/month",
    },
    {
      feature: "Brand Consistency",
      without: "Varies across content",
      with: "Automated brand kit enforcement",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Before vs. <span className="gradient-text neon-text">After Inqreate</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            See the dramatic difference automation makes in your workflow
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Headers */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div></div>
            <Card className="glass-card border-2 border-red-500/50 animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-3">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-500">Without Inqreate</h3>
              </CardContent>
            </Card>
            <Card className="glass-card border-2 border-green-500/50 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-500">With Inqreate</h3>
              </CardContent>
            </Card>
          </div>

          {/* Comparison rows */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-8 items-center animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-lg font-semibold">{item.feature}</div>
                
                <Card className="glass-card hover-lift border-2 border-red-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span>{item.without}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card hover-lift border-2 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 font-medium">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="gradient-text">{item.with}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
