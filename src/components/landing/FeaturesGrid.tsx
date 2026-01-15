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
  ArrowRight
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "User Dashboard",
      description: "Recent content, scheduled posts, credit balance & analytics all in one place",
      badge: "Core",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your ideas - AI converts voice to polished content instantly",
      badge: "New",
    },
    {
      icon: Globe,
      title: "Multi-Language AI",
      description: "English + Hindi, Marathi, Gujarati, Telugu, Tamil & 10+ more languages",
      badge: "10+ Languages",
    },
    {
      icon: Calendar,
      title: "Direct Posting & Scheduling",
      description: "1-click posting to LinkedIn, YouTube, Instagram, Facebook, Twitter/X",
      badge: "Auto-Publish",
    },
    {
      icon: ImageIcon,
      title: "AI Image Generator + Library",
      description: "Realistic, cartoon, product photos & social templates with image library",
      badge: "Styles",
    },
    {
      icon: FileSearch,
      title: "SEO Blog Optimizer",
      description: "Meta titles, descriptions, keyword density & internal linking suggestions",
      badge: "Rank Higher",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Content Tools",
      description: "Bulk generator for Amazon, Flipkart, Meesho, Shopify with SEO keywords",
      badge: "Bulk",
    },
    {
      icon: Palette,
      title: "Brand Kit",
      description: "Upload logo, colors, fonts, hashtags - AI maintains brand consistency",
      badge: "Unique",
    },
    {
      icon: FileText,
      title: "Content Templates Library",
      description: "Festival templates (Diwali, Holi, Eid), sales campaigns & 1000+ templates",
      badge: "1000+",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Admin, Editor, Viewer roles. Share drafts & manage multiple brands",
      badge: "Agencies",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track views, clicks, likes, shares & engagement via platform APIs",
      badge: "Real-time",
    },
    {
      icon: DollarSign,
      title: "Flexible Monetization",
      description: "Freemium, credit-based & subscription plans for every creator",
      badge: "Plans",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30" id="features">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            All-in-One Platform
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Everything You Need.{" "}
            <span className="text-primary">In One Platform.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            12 powerful features that competitors only offer separately. Blog, Post, Schedule, Analyze — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-card border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Badge */}
                <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide bg-primary/10 text-primary rounded-full">
                  {feature.badge}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover arrow indicator */}
                <div className="mt-4 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-border/60">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Why We're Better</p>
              <p className="text-sm text-muted-foreground">
                Competitors like Jasper & Copy.ai don't offer direct posting, scheduling, or voice input. We do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
