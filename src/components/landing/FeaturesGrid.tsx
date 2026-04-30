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
  Sparkles
} from "lucide-react";

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
    <section className="relative py-20 md:py-24 overflow-hidden" id="features">
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
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#9333EA]/20 border border-[#3B82F6]/30 backdrop-blur-sm mb-5">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-xs font-medium bg-gradient-to-r from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent">
              All-in-One Platform
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Everything You Need. </span>
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
              In One Platform.
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            12 powerful features that competitors only offer separately. Blog, Post, Schedule, Analyze — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-[#111111]/80 backdrop-blur-sm border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
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
              <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Badge */}
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className={`px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide bg-gradient-to-r ${feature.gradient} text-white rounded-full shadow`}>
                  {feature.badge}
                </span>
              </div>

              <CardContent className="p-4 relative z-10">
                {/* Icon with gradient background */}
                <div className="relative mb-3">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  ></div>
                  <div className={`relative w-9 h-9 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300`}>
                    <feature.icon className="w-4.5 h-4.5 text-white" strokeWidth={2.25} style={{ width: '18px', height: '18px' }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-3">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;
