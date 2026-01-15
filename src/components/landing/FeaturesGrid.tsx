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
  BarChart3,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesGrid = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "User Dashboard",
      description: "Recent content, scheduled posts, credit balance & analytics all in one place",
      badge: "Core",
      gradient: "from-[#3B82F6] to-[#06B6D4]",
      glowColor: "#3B82F6",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your ideas - AI converts voice to polished content instantly",
      badge: "New",
      gradient: "from-[#EC4899] to-[#F97316]",
      glowColor: "#EC4899",
    },
    {
      icon: Globe,
      title: "Multi-Language AI",
      description: "English + Hindi, Marathi, Gujarati, Telugu, Tamil & 10+ more languages",
      badge: "10+ Languages",
      gradient: "from-[#9333EA] to-[#EC4899]",
      glowColor: "#9333EA",
    },
    {
      icon: Calendar,
      title: "Direct Posting & Scheduling",
      description: "1-click posting to LinkedIn, YouTube, Instagram, Facebook, Twitter/X",
      badge: "Auto-Publish",
      gradient: "from-[#10B981] to-[#06B6D4]",
      glowColor: "#10B981",
    },
    {
      icon: ImageIcon,
      title: "AI Image Generator + Library",
      description: "Realistic, cartoon, product photos & social templates with image library",
      badge: "Styles",
      gradient: "from-[#F97316] to-[#EAB308]",
      glowColor: "#F97316",
    },
    {
      icon: FileSearch,
      title: "SEO Blog Optimizer",
      description: "Meta titles, descriptions, keyword density & internal linking suggestions",
      badge: "Rank Higher",
      gradient: "from-[#6366F1] to-[#9333EA]",
      glowColor: "#6366F1",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Content Tools",
      description: "Bulk generator for Amazon, Flipkart, Meesho, Shopify with SEO keywords",
      badge: "Bulk",
      gradient: "from-[#EC4899] to-[#9333EA]",
      glowColor: "#EC4899",
    },
    {
      icon: Palette,
      title: "Brand Kit",
      description: "Upload logo, colors, fonts, hashtags - AI maintains brand consistency",
      badge: "Unique",
      gradient: "from-[#06B6D4] to-[#3B82F6]",
      glowColor: "#06B6D4",
    },
    {
      icon: FileText,
      title: "Content Templates Library",
      description: "Festival templates (Diwali, Holi, Eid), sales campaigns & 1000+ templates",
      badge: "1000+",
      gradient: "from-[#EAB308] to-[#F97316]",
      glowColor: "#EAB308",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Admin, Editor, Viewer roles. Share drafts & manage multiple brands",
      badge: "Agencies",
      gradient: "from-[#14B8A6] to-[#10B981]",
      glowColor: "#14B8A6",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track views, clicks, likes, shares & engagement via platform APIs",
      badge: "Real-time",
      gradient: "from-[#8B5CF6] to-[#6366F1]",
      glowColor: "#8B5CF6",
    },
    {
      icon: DollarSign,
      title: "Flexible Monetization",
      description: "Freemium, credit-based & subscription plans for every creator",
      badge: "Plans",
      gradient: "from-[#F43F5E] to-[#EC4899]",
      glowColor: "#F43F5E",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="features">
      {/* Dynamic gradient background matching Hero */}
      <div className="absolute inset-0 bg-[#0D0D0D]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#9333EA] rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EC4899] rounded-full blur-[150px] opacity-30"></div>
        </div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-3 h-3 bg-[#3B82F6] rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-[15%] w-2 h-2 bg-[#EC4899] rounded-full animate-float-delay opacity-50"></div>
      <div className="absolute bottom-32 left-[20%] w-4 h-4 bg-[#9333EA] rounded-full animate-float opacity-40"></div>
      <div className="absolute bottom-20 right-[25%] w-2 h-2 bg-[#06B6D4] rounded-full animate-float-delay opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#9333EA]/20 border border-[#3B82F6]/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent">
              All-in-One Platform
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Everything You Need. </span>
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
              In One Platform.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            12 powerful features that competitors only offer separately. Blog, Post, Schedule, Analyze — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-[#111111]/80 backdrop-blur-sm border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer"
              style={{ 
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.glowColor}15, transparent 40%)`
                }}
              ></div>

              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${feature.gradient} text-white rounded-full shadow-lg`}>
                  {feature.badge}
                </span>
              </div>

              <CardContent className="p-6 relative z-10">
                {/* Icon with gradient background */}
                <div className="relative mb-5">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                  ></div>
                  <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div className="flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    Learn more
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#9333EA] flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white">Why We're Better</p>
                <p className="text-sm text-[#9CA3AF] max-w-md">
                  Competitors like Jasper & Copy.ai don't offer direct posting, scheduling, or voice input. We do.
                </p>
              </div>
            </div>
            <Link to="/auth">
              <Button 
                size="lg"
                className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 hover:scale-105 rounded-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
