import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ClipboardCheck,
  Search,
  BarChart3,
  Shield,
  Smartphone,
  Accessibility,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const WebsiteAuditorFeature = () => {
  const auditCategories = [
    {
      icon: Zap,
      name: "Performance",
      description: "Load time, asset optimization, caching strategies",
      color: "from-[#22C55E] to-[#16A34A]",
    },
    {
      icon: Search,
      name: "SEO",
      description: "Meta tags, headings, keywords, crawlability",
      color: "from-[#3B82F6] to-[#2563EB]",
    },
    {
      icon: Accessibility,
      name: "Accessibility",
      description: "ARIA labels, contrast, screen reader support",
      color: "from-[#9333EA] to-[#7C3AED]",
    },
    {
      icon: Shield,
      name: "Security",
      description: "HTTPS, headers, vulnerability checks",
      color: "from-[#EF4444] to-[#DC2626]",
    },
    {
      icon: Smartphone,
      name: "Mobile",
      description: "Responsive design, touch targets, viewport",
      color: "from-[#F59E0B] to-[#D97706]",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Improve Rankings",
      description: "Fix SEO issues and climb search engine results",
    },
    {
      icon: Zap,
      title: "Boost Speed",
      description: "Identify performance bottlenecks and optimize loading times",
    },
    {
      icon: Shield,
      title: "Enhance Security",
      description: "Detect vulnerabilities before they become problems",
    },
    {
      icon: Accessibility,
      title: "Increase Accessibility",
      description: "Make your site usable for everyone",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Ensure perfect experience on all devices",
    },
    {
      icon: CheckCircle2,
      title: "Actionable Insights",
      description: "Get specific recommendations you can implement immediately",
    },
  ];

  const sampleIssues = [
    { type: "critical", message: "Missing meta description on 3 pages" },
    { type: "warning", message: "Images without alt attributes found" },
    { type: "info", message: "Consider adding structured data markup" },
    { type: "success", message: "HTTPS enabled and configured correctly" },
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#9333EA]/10 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#9333EA] rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#EC4899] rounded-full blur-3xl opacity-15"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9333EA]/10 border border-[#9333EA]/30 mb-6">
              <ClipboardCheck className="w-5 h-5 text-[#9333EA]" />
              <span className="text-[#9333EA] font-medium">Website Auditor</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Analyze & Optimize Your{" "}
              <span className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">
                Website
              </span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Get comprehensive insights into your website's performance, SEO, accessibility, and
              security with AI-powered analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-[#9333EA] to-[#EC4899] hover:opacity-90"
                >
                  Start Free Audit
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
                    inqreate.com/dashboard/website-auditor
                  </div>
                </div>
              </div>
              {/* Screenshot Mockup */}
              <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-8">
                <div className="grid md:grid-cols-3 gap-6 h-full">
                  {/* Left - Input */}
                  <div className="space-y-4">
                    <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-[#9CA3AF] mb-2">Website URL</p>
                      <div className="bg-[#1A1A1A] rounded-lg px-3 py-2 text-white text-sm">
                        https://example.com
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] rounded-xl p-3 text-center text-white font-medium flex items-center justify-center gap-2">
                      <Search className="w-4 h-4" />
                      Run Audit
                    </div>
                    {/* Sample Issues */}
                    <div className="space-y-2">
                      {sampleIssues.map((issue, i) => (
                        <div
                          key={i}
                          className={`rounded-lg p-2 text-xs flex items-start gap-2 ${
                            issue.type === "critical"
                              ? "bg-[#EF4444]/20 text-[#EF4444]"
                              : issue.type === "warning"
                              ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                              : issue.type === "success"
                              ? "bg-[#22C55E]/20 text-[#22C55E]"
                              : "bg-[#3B82F6]/20 text-[#3B82F6]"
                          }`}
                        >
                          {issue.type === "critical" ? (
                            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          ) : issue.type === "success" ? (
                            <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          )}
                          {issue.message}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right - Scores */}
                  <div className="md:col-span-2 bg-[#0D0D0D]/50 rounded-xl border border-white/10 p-4">
                    <p className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#9333EA]" />
                      Audit Results
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                      {auditCategories.map((cat, i) => {
                        const Icon = cat.icon;
                        const score = [85, 72, 90, 95, 88][i];
                        return (
                          <div key={i} className="text-center">
                            <div
                              className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center mb-2`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-2xl font-bold text-white">{score}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{cat.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    {/* Overall Score */}
                    <div className="mt-6 text-center">
                      <div className="inline-flex items-center gap-4 bg-[#1A1A1A] rounded-2xl px-8 py-4">
                        <div>
                          <p className="text-xs text-[#9CA3AF]">Overall Score</p>
                          <p className="text-4xl font-bold bg-gradient-to-r from-[#22C55E] to-[#16A34A] bg-clip-text text-transparent">
                            86
                          </p>
                        </div>
                        <div className="w-px h-12 bg-white/10"></div>
                        <div className="text-left">
                          <p className="text-sm text-white font-medium">Good</p>
                          <p className="text-xs text-[#9CA3AF]">3 issues to fix</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Audit Categories */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive Analysis
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              Get detailed insights across 5 critical categories for your website
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {auditCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="bg-[#1A1A1A] border-white/10 hover:border-white/20 transition-all group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-[#9CA3AF] text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Audit Your Website?
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              Discover issues holding back your website and get actionable fixes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#EC4899] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-[#9CA3AF] text-sm">{benefit.description}</p>
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
            <p className="text-[#9CA3AF] text-lg">Three simple steps to optimize your website</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: "Enter Your URL",
                description: "Simply paste any website URL you want to analyze",
              },
              {
                number: "02",
                title: "AI Analyzes",
                description: "Our AI scans your site across 5 critical categories",
              },
              {
                number: "03",
                title: "Get Insights",
                description: "Receive detailed scores and actionable recommendations",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#9333EA] to-[#EC4899] bg-clip-text text-transparent mb-4">
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
              Ready to Optimize Your Website?
            </h2>
            <p className="text-[#9CA3AF] mb-8">
              Get your free website audit now and discover opportunities for improvement.
            </p>
            <Link to="/auth">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-gradient-to-r from-[#9333EA] to-[#EC4899] hover:opacity-90"
              >
                Start Free Audit
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

export default WebsiteAuditorFeature;
