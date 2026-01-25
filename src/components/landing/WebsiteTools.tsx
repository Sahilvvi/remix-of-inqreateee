import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ClipboardCheck, Sparkles, BarChart3, Shield, Zap, Palette, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WebsiteTools = () => {
  const tools = [
    {
      icon: Globe,
      title: "AI Website Builder",
      description: "Create stunning, professional websites in minutes with AI-powered design and content generation.",
      gradient: "from-[#3B82F6] to-[#06B6D4]",
      features: [
        { icon: Palette, text: "6+ Professional Templates" },
        { icon: Sparkles, text: "AI-Generated Content" },
        { icon: Zap, text: "Export HTML/CSS" },
      ],
      cta: "Build Your Website",
    },
    {
      icon: ClipboardCheck,
      title: "Website Auditor",
      description: "Analyze any website for performance, SEO, accessibility, and security with detailed recommendations.",
      gradient: "from-[#9333EA] to-[#EC4899]",
      features: [
        { icon: BarChart3, text: "Performance Analysis" },
        { icon: Search, text: "SEO & Accessibility" },
        { icon: Shield, text: "Security Checks" },
      ],
      cta: "Audit Your Website",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111111] to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#9333EA] rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            New Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">Website Tools</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Build beautiful websites and analyze their performance with our AI-powered tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card
                key={index}
                className="group relative bg-[#1A1A1A] border-2 border-white/10 hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
                  <p className="text-[#9CA3AF] mb-6 leading-relaxed">{tool.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {tool.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.gradient} bg-opacity-20 flex items-center justify-center`}>
                            <FeatureIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[#E5E5E5] text-sm font-medium">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <Link to="/auth">
                    <Button className={`w-full h-12 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white font-semibold rounded-xl group/btn transition-all duration-300`}>
                      {tool.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-3xl md:text-4xl font-bold text-white">6+</p>
            <p className="text-[#9CA3AF] text-sm">Website Templates</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-3xl md:text-4xl font-bold text-white">5</p>
            <p className="text-[#9CA3AF] text-sm">Audit Categories</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
            <p className="text-[#9CA3AF] text-sm">AI-Powered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteTools;
