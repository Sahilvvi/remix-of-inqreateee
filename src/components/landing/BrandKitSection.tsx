import { Card, CardContent } from "@/components/ui/card";
import { Palette, Image as ImageIcon, Type, Hash, Sparkles, CheckCircle } from "lucide-react";

const BrandKitSection = () => {
  const brandKitFeatures = [
    {
      icon: ImageIcon,
      title: "Logo Upload",
      description: "Upload your brand logo for consistent placement",
    },
    {
      icon: Palette,
      title: "Brand Colors",
      description: "Define your color palette for all content",
    },
    {
      icon: Type,
      title: "Custom Fonts",
      description: "Use your brand typography everywhere",
    },
    {
      icon: Hash,
      title: "Hashtag Library",
      description: "Save your branded hashtags for quick access",
    },
  ];

  const festivalTemplates = [
    { name: "Diwali", emoji: "🪔" },
    { name: "Holi", emoji: "🎨" },
    { name: "Eid", emoji: "🌙" },
    { name: "Christmas", emoji: "🎄" },
    { name: "New Year", emoji: "🎉" },
    { name: "Navratri", emoji: "💃" },
    { name: "Independence Day", emoji: "🇮🇳" },
    { name: "Republic Day", emoji: "🏛️" },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-15 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* Floating graphics */}
      <div className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl rotate-12 animate-float opacity-60"></div>
      <div className="absolute bottom-32 left-20 w-14 h-14 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-float-delay opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Palette className="w-4 h-4" />
            Unique Feature
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Brand Kit & <span className="gradient-text neon-text">Templates</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Maintain consistent branding across all content. AI uses your brand kit automatically.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Brand Kit Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Brand Kit Features
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {brandKitFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className="glass-card hover-lift cursor-pointer animate-scale-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-3 mt-8">
              <h4 className="font-semibold text-lg">Why Agencies Love This:</h4>
              {[
                "Manage multiple brands effortlessly",
                "Save hours on formatting",
                "Zero inconsistency errors",
                "One-click brand switch",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Festival Templates */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Festival Templates Library
            </h3>
            <Card className="glass-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  Pre-made templates for all major festivals and occasions. Just select, customize, and post!
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {festivalTemplates.map((festival, index) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl glass-effect hover:bg-primary/10 cursor-pointer transition-all hover-lift group"
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform">{festival.emoji}</span>
                      <span className="text-xs font-medium text-center">{festival.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-center">
                    <span className="font-bold text-primary">+1000 more templates</span> for sales campaigns, product launches, announcements & more
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Custom Templates */}
            <Card className="glass-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Custom Templates
                </h4>
                <p className="text-muted-foreground text-sm">
                  Create and save your own templates for recurring content types. Perfect for weekly series, monthly reports, and recurring campaigns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandKitSection;