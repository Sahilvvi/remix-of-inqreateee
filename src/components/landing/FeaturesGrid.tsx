import { useState } from "react";
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
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "User Dashboard",
    description: "Recent content, scheduled posts, credits and analytics — all unified in a single command center built for speed.",
    tag: "Core",
    gradient: "from-[#3B82F6] to-[#06B6D4]",
    glow: "#3B82F6",
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your ideas. AI transforms voice into polished, brand-aligned content in seconds across any language.",
    tag: "New",
    gradient: "from-[#EC4899] to-[#F97316]",
    glow: "#EC4899",
  },
  {
    icon: Globe,
    title: "Multi-Language AI",
    description: "Native fluency in English, Hindi, Marathi, Gujarati, Telugu, Tamil and 10+ more languages with regional tone.",
    tag: "10+ Languages",
    gradient: "from-[#9333EA] to-[#EC4899]",
    glow: "#9333EA",
  },
  {
    icon: Calendar,
    title: "Posting & Scheduling",
    description: "One-click publishing to LinkedIn, Instagram, YouTube, Facebook and X — schedule weeks of content in minutes.",
    tag: "Auto-Publish",
    gradient: "from-[#10B981] to-[#06B6D4]",
    glow: "#10B981",
  },
  {
    icon: ImageIcon,
    title: "AI Image Generator",
    description: "Generate realistic, cartoon, product and social-ready visuals with a built-in royalty-free image library.",
    tag: "Styles",
    gradient: "from-[#F97316] to-[#EAB308]",
    glow: "#F97316",
  },
  {
    icon: FileSearch,
    title: "SEO Blog Optimizer",
    description: "Meta titles, descriptions, keyword density and internal-linking suggestions tuned to rank on day one.",
    tag: "Rank Higher",
    gradient: "from-[#6366F1] to-[#9333EA]",
    glow: "#6366F1",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Tools",
    description: "Bulk product listings for Amazon, Flipkart, Meesho and Shopify — keyword-rich titles and descriptions.",
    tag: "Bulk",
    gradient: "from-[#EC4899] to-[#9333EA]",
    glow: "#EC4899",
  },
  {
    icon: Palette,
    title: "Brand Kit",
    description: "Upload logos, colors, fonts and hashtags. AI maintains consistent brand identity across every output.",
    tag: "Unique",
    gradient: "from-[#06B6D4] to-[#3B82F6]",
    glow: "#06B6D4",
  },
  {
    icon: FileText,
    title: "Templates Library",
    description: "1000+ ready templates — Diwali, Holi, Eid, sales campaigns and evergreen formats for every use case.",
    tag: "1000+",
    gradient: "from-[#EAB308] to-[#F97316]",
    glow: "#EAB308",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Admin, Editor and Viewer roles. Share drafts, manage approvals and run multiple brands from one workspace.",
    tag: "Agencies",
    gradient: "from-[#14B8A6] to-[#10B981]",
    glow: "#14B8A6",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track views, clicks, likes, shares and engagement in real-time — pulled directly from platform APIs.",
    tag: "Real-time",
    gradient: "from-[#8B5CF6] to-[#6366F1]",
    glow: "#8B5CF6",
  },
  {
    icon: DollarSign,
    title: "Flexible Monetization",
    description: "Freemium, credit-based and subscription plans — pricing built for solo creators and growing agencies alike.",
    tag: "Plans",
    gradient: "from-[#F43F5E] to-[#EC4899]",
    glow: "#F43F5E",
  },
];

const FeaturesGrid = () => {
  const [active, setActive] = useState(0);
  const current = features[active];
  const Icon = current.icon;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.15] transition-colors duration-700"
          style={{ background: current.glow }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#9333EA] rounded-full blur-[140px] opacity-[0.10]" />
      </div>

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
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-xs font-medium tracking-wide text-white/80">
              All-in-One Platform
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-white">Everything you need.</span>{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
              In one platform.
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            12 powerful tools competitors only offer separately. Click any to explore.
          </p>
        </div>

        {/* Showcase layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* Left: feature list */}
          <div className="space-y-1 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {features.map((f, i) => {
              const FIcon = f.icon;
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full group flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-300 border ${
                    isActive
                      ? "bg-white/[0.06] border-white/[0.14]"
                      : "bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/[0.08]"
                  }`}
                >
                  <div
                    className={`relative w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${f.gradient} shadow-lg ring-1 ring-white/15`
                        : "bg-white/[0.04] ring-1 ring-white/[0.06] group-hover:bg-white/[0.06]"
                    }`}
                  >
                    <FIcon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                      }`}
                      strokeWidth={2.25}
                    />
                  </div>
                  <span
                    className={`text-[13.5px] font-medium tracking-tight transition-colors flex-1 ${
                      isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                    }`}
                  >
                    {f.title}
                  </span>
                  {isActive && (
                    <div
                      className={`w-1 h-6 rounded-full bg-gradient-to-b ${f.gradient}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: featured panel */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden min-h-[420px] lg:min-h-[520px]">
            {/* Glow */}
            <div
              key={active}
              className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 animate-fade-in"
              style={{ background: current.glow }}
            />
            {/* Top gradient bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${current.gradient} opacity-70`}
            />

            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
              {/* Tag */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {current.tag}
                </span>
                <span className="text-[11px] font-mono text-white/30">
                  {String(active + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </span>
              </div>

              {/* Icon */}
              <div key={`icon-${active}`} className="relative mb-6 animate-scale-in">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${current.gradient} rounded-2xl blur-2xl opacity-40`}
                />
                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center shadow-xl ring-1 ring-white/15`}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={2.25} />
                </div>
              </div>

              {/* Title + description */}
              <div key={`text-${active}`} className="animate-fade-in">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                  {current.title}
                </h3>
                <p className="text-base text-[#9CA3AF] leading-relaxed max-w-lg">
                  {current.description}
                </p>
              </div>

              {/* Footer link */}
              <div className="mt-auto pt-8">
                <button
                  className={`group inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent hover:gap-3 transition-all`}
                >
                  Explore feature
                  <ArrowUpRight
                    className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
                    strokeWidth={2.25}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
