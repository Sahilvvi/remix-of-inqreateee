import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Globe, 
  Calendar, 
  Image as ImageIcon, 
  FileSearch, 
  ShoppingBag,
  Palette,
  FileText,
  Users,
  DollarSign
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "User Dashboard",
      description: "Centralized control center for all your content needs",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Multi-language AI Content",
      description: "Generate content in 50+ languages instantly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      title: "Direct Posting & Scheduling",
      description: "Auto-publish to all platforms at optimal times",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: ImageIcon,
      title: "AI Image Generator + Library",
      description: "Create and store unlimited AI-generated visuals",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FileSearch,
      title: "SEO Blog Optimizer",
      description: "Rank higher with AI-powered SEO analysis",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Content Tools",
      description: "Product descriptions that convert visitors to buyers",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Palette,
      title: "Brand Kit",
      description: "Maintain consistent branding across all content",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: FileText,
      title: "Content Templates Library",
      description: "1000+ proven templates for every platform",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: DollarSign,
      title: "Monetization Features",
      description: "Turn your content into revenue streams",
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-primary/5"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need. <span className="gradient-text neon-text">In One Platform.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features to automate and scale your content creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card hover-lift cursor-pointer animate-scale-in group border-2 border-transparent hover-glow relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <CardContent className="p-6 text-center relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 gradient-text">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
