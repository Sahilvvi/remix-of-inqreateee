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
  Sparkles,
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "User Dashboard",
      description: "Recent content, scheduled posts, credits & analytics in one view.",
      tag: "Core",
      gradient: "from-[#3B82F6] to-[#06B6D4]",
      glow: "#3B82F6",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your ideas — AI converts voice to polished content instantly.",
      tag: "New",
      gradient: "from-[#EC4899] to-[#F97316]",
      glow: "#EC4899",
    },
    {
      icon: Globe,
      title: "Multi-Language AI",
      description: "English, Hindi, Marathi, Gujarati, Tamil & 10+ more languages.",
      tag: "10+ Langs",
      gradient: "from-[#9333EA] to-[#EC4899]",
      glow: "#9333EA",
    },
    {
      icon: Calendar,
      title: "Posting & Scheduling",
      description: "1-click publish to LinkedIn, Instagram, YouTube, Facebook, X.",
      tag: "Auto",
      gradient: "from-[#10B981] to-[#06B6D4]",
      glow: "#10B981",
    },
    {
      icon: ImageIcon,
      title: "AI Image Generator",
      description: "Realistic, cartoon, product & social visuals with full library.",
      tag: "Styles",
      gradient: "from-[#F97316] to-[#EAB308]",
      glow: "#F97316",
    },
    {
      icon: FileSearch,
      title: "SEO Blog Optimizer",
      description: "Meta titles, keyword density & internal linking suggestions.",
      tag: "Rank",
      gradient: "from-[#6366F1] to-[#9333EA]",
      glow: "#6366F1",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Tools",
      description: "Bulk listings for Amazon, Flipkart, Meesho & Shopify.",
      tag: "Bulk",
      gradient: "from-[#EC4899] to-[#9333EA]",
      glow: "#EC4899",
    },
    {
      icon: Palette,
      title: "Brand Kit",
      description: "Logo, colors, fonts & hashtags — AI keeps brand consistent.",
      tag: "Unique",
      gradient: "from-[#06B6D4] to-[#3B82F6]",
      glow: "#06B6D4",
    },
    {
      icon: FileText,
      title: "Templates Library",
      description: "Festival, sales & campaign templates — 1000+ ready to use.",
      tag: "1000+",
      gradient: "from-[#EAB308] to-[#F97316]",
      glow: "#EAB308",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Admin, Editor & Viewer roles. Manage drafts and brands.",
      tag: "Teams",
      gradient: "from-[#14B8A6] to-[#10B981]",
      glow: "#14B8A6",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track views, clicks, likes & engagement via platform APIs.",
      tag: "Live",
      gradient: "from-[#8B5CF6] to-[#6366F1]",
      glow: "#8B5CF6",
    },
    {
      icon: DollarSign,
      title: "Flexible Monetization",
      description: "Freemium, credit-based & subscription plans for creators.",
      tag: "Plans",
      gradient: "from-[#F43F5E] to-[#EC4899]",
      glow: "#F43F5E",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="features">
      {/* Background — softer than before */}
      <div className="absolute inset-0 bg-[#0A0A0F]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B82F6] rounded-full blur-[140px] opacity-[0.12]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9333EA] rounded-full blur-[140px] opacity-[0.12]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-xs font-medium tracking-wide text-white/80">
              All-in-One Platform
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-white">Everything you need.</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
              In one platform.
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            12 powerful features competitors only offer separately — blog, post, schedule, analyze.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.14] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]"
              >
                {/* Gradient glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at 50% 0%, ${feature.glow}1A, transparent 60%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                />

                <CardContent className="p-5 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon tile — refined */}
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                      />
                      <div
                        className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg ring-1 ring-white/10`}
                      >
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                      </div>
                    </div>

                    {/* Subtle text tag instead of pill */}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 group-hover:text-white/60 transition-colors">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-semibold text-white mb-1.5 tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-[#9CA3AF] leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
