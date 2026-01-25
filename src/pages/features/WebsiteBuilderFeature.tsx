import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Globe,
  Sparkles,
  Palette,
  Code,
  Download,
  Layers,
  Zap,
  Check,
  ArrowRight,
  Layout,
  Smartphone,
  Monitor,
} from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const WebsiteBuilderFeature = () => {
  const templates = [
    { name: "Portfolio", icon: "🎨", description: "Showcase your work beautifully" },
    { name: "Business", icon: "💼", description: "Professional corporate presence" },
    { name: "E-commerce", icon: "🛒", description: "Sell products online" },
    { name: "Blog", icon: "📝", description: "Share your stories" },
    { name: "Landing Page", icon: "🚀", description: "Convert visitors to customers" },
    { name: "SaaS", icon: "⚡", description: "Modern software marketing" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Describe your vision in natural language and watch AI create your website instantly.",
    },
    {
      icon: Palette,
      title: "Professional Templates",
      description: "Start with stunning pre-built templates designed by professionals.",
    },
    {
      icon: Code,
      title: "Clean Code Export",
      description: "Export production-ready HTML and CSS code that you can host anywhere.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Every generated website looks perfect on desktop, tablet, and mobile.",
    },
    {
      icon: Layers,
      title: "Customization Options",
      description: "Specify colors, fonts, sections, and more to match your brand.",
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "Download your complete website files with one click.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose a Template",
      description: "Select from 6+ professional templates designed for different use cases.",
    },
    {
      number: "02",
      title: "Describe Your Vision",
      description: "Tell the AI what you want - colors, content, sections, and style preferences.",
    },
    {
      number: "03",
      title: "AI Generates Your Site",
      description: "Watch as AI creates a complete, responsive website in seconds.",
    },
    {
      number: "04",
      title: "Preview & Export",
      description: "Review your website, make adjustments, and download the code.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={inqreateLogo} alt="Inqreate" className="h-10 w-auto" />
            </Link>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/10 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#06B6D4] rounded-full blur-3xl opacity-15"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 mb-6">
              <Globe className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-[#3B82F6] font-medium">AI Website Builder</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Build Stunning Websites with{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Transform your ideas into beautiful, responsive websites in minutes. No coding required.
              Just describe what you want and let AI do the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-[#1A1A1A] border-2 border-white/10 rounded-3xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-6 py-4 bg-[#111111] border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#0D0D0D] rounded-lg px-4 py-2 text-sm text-[#9CA3AF] text-center">
                    inqreate.com/dashboard/website-builder
                  </div>
                </div>
              </div>
              {/* Screenshot Mockup */}
              <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-8 flex items-center justify-center">
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                  {/* Left - Input */}
                  <div className="space-y-4">
                    <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-[#9CA3AF] mb-2">Template</p>
                      <div className="grid grid-cols-3 gap-2">
                        {["Portfolio", "Business", "SaaS"].map((t) => (
                          <div
                            key={t}
                            className="bg-[#3B82F6]/20 text-[#3B82F6] text-xs px-2 py-1 rounded text-center"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-[#9CA3AF] mb-2">Your Prompt</p>
                      <p className="text-white text-sm">
                        "Create a modern tech startup landing page with dark theme..."
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-xl p-3 text-center text-white font-medium flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate Website
                    </div>
                  </div>
                  {/* Right - Preview */}
                  <div className="bg-[#0D0D0D]/50 rounded-xl border border-white/10 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Monitor className="w-4 h-4 text-[#3B82F6]" />
                      <span className="text-xs text-[#9CA3AF]">Live Preview</span>
                    </div>
                    <div className="bg-[#1A1A1A] rounded-lg h-40 flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="w-8 h-8 text-[#3B82F6] mx-auto mb-2" />
                        <p className="text-xs text-[#9CA3AF]">Your website appears here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Templates
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              Choose from 6 stunning templates designed for different industries and use cases
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {templates.map((template, index) => (
              <Card
                key={index}
                className="bg-[#1A1A1A] border-white/10 hover:border-[#3B82F6]/50 transition-all group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              Everything you need to create professional websites without writing code
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-[#9CA3AF] text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-[#9CA3AF] text-lg">Four simple steps to your perfect website</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[#9CA3AF] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center glass-card p-12 rounded-3xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Website?
            </h2>
            <p className="text-[#9CA3AF] mb-8">
              Join thousands of users creating stunning websites with AI. Start free today.
            </p>
            <Link to="/auth">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-[#9CA3AF]">
          <p>© 2025 Inqreate. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteBuilderFeature;
