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
  DollarSign,
  Mic,
  BarChart3
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "User Dashboard",
      description: "Recent content, scheduled posts, credit balance & analytics all in one place",
      color: "from-blue-500 to-cyan-500",
      image: "📊",
      badge: "Core",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your ideas - AI converts voice to polished content instantly",
      color: "from-rose-500 to-orange-500",
      image: "🎤",
      badge: "New",
    },
    {
      icon: Globe,
      title: "Multi-Language AI",
      description: "English + Hindi, Marathi, Gujarati, Telugu, Tamil & 10+ more languages",
      color: "from-purple-500 to-pink-500",
      image: "🌍",
      badge: "10+ Languages",
    },
    {
      icon: Calendar,
      title: "Direct Posting & Scheduling",
      description: "1-click posting to LinkedIn, YouTube, Instagram, Facebook, Twitter/X",
      color: "from-green-500 to-emerald-500",
      image: "📅",
      badge: "Auto-Publish",
    },
    {
      icon: ImageIcon,
      title: "AI Image Generator + Library",
      description: "Realistic, cartoon, product photos & social templates with image library",
      color: "from-orange-500 to-red-500",
      image: "🎨",
      badge: "Styles",
    },
    {
      icon: FileSearch,
      title: "SEO Blog Optimizer",
      description: "Meta titles, descriptions, keyword density & internal linking suggestions",
      color: "from-indigo-500 to-purple-500",
      image: "🔍",
      badge: "Rank Higher",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Content Tools",
      description: "Bulk generator for Amazon, Flipkart, Meesho, Shopify with SEO keywords",
      color: "from-pink-500 to-rose-500",
      image: "🛍️",
      badge: "Bulk",
    },
    {
      icon: Palette,
      title: "Brand Kit",
      description: "Upload logo, colors, fonts, hashtags - AI maintains brand consistency",
      color: "from-cyan-500 to-blue-500",
      image: "🎯",
      badge: "Unique",
    },
    {
      icon: FileText,
      title: "Content Templates Library",
      description: "Festival templates (Diwali, Holi, Eid), sales campaigns & 1000+ templates",
      color: "from-yellow-500 to-orange-500",
      image: "📝",
      badge: "1000+",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Admin, Editor, Viewer roles. Share drafts & manage multiple brands",
      color: "from-teal-500 to-green-500",
      image: "👥",
      badge: "Agencies",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track views, clicks, likes, shares & engagement via platform APIs",
      color: "from-violet-500 to-purple-500",
      image: "📈",
      badge: "Real-time",
    },
    {
      icon: DollarSign,
      title: "Flexible Monetization",
      description: "Freemium, credit-based & subscription plans for every creator",
      color: "from-red-500 to-pink-500",
      image: "💰",
      badge: "Plans",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="features">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-primary/5"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Floating graphic elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl animate-float opacity-60"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full animate-float-delay opacity-60"></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg rotate-45 animate-bounce-subtle opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            All-in-One Platform
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need. <span className="gradient-text neon-text">In One Platform.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            12 powerful features that competitors only offer separately. Blog, Post, Schedule, Analyze - all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card hover-lift cursor-pointer animate-scale-in group border-2 border-transparent hover-glow relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Badge */}
              <div className="absolute top-3 right-3 z-20">
                <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-primary/80 to-secondary/80 text-white rounded-full">
                  {feature.badge}
                </span>
              </div>

              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Floating emoji decoration */}
              <div className="absolute -top-3 -right-3 text-4xl opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-300">
                {feature.image}
              </div>
              
              <CardContent className="p-6 text-center relative z-10">
                <div className="relative mb-4">
                  {/* Glow effect behind icon */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 gradient-text group-hover:scale-105 transition-transform duration-300">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Competitors comparison note */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass-card border-2 border-primary/20">
            <span className="text-4xl">🏆</span>
            <div className="text-left">
              <p className="font-bold text-lg">Why We're Better</p>
              <p className="text-muted-foreground text-sm">Competitors like Jasper & Copy.ai don't offer direct posting, scheduling, or voice input. We do.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;