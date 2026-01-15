import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Users, Zap, Heart, Globe, Award } from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const About = () => {
  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge AI solutions that transform content creation.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We build for creators, marketers, and businesses who want to scale their content without sacrificing quality.",
    },
    {
      icon: Heart,
      title: "Simplicity",
      description: "Complex technology, simple experience. We believe powerful tools should be accessible to everyone.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Supporting 10+ languages including all major Indian languages, we help creators reach audiences worldwide.",
    },
  ];

  const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", initials: "RS" },
    { name: "Priya Patel", role: "CTO", initials: "PP" },
    { name: "Arjun Mehta", role: "Head of AI", initials: "AM" },
    { name: "Sneha Gupta", role: "Head of Product", initials: "SG" },
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
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#3B82F6]/30 mb-6">
              <Target className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm font-medium text-[#3B82F6]">Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Empowering Creators with <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">AI Innovation</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] leading-relaxed">
              At Inqreate, we're building the future of content creation. Our AI-powered platform helps creators, marketers, and businesses produce high-quality content at scale, saving time while maximizing impact.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-[#9CA3AF] text-lg leading-relaxed">
              <p>
                Inqreate was born from a simple observation: content creators spend more time on repetitive tasks than on actual creativity. Our founders, a team of AI researchers and marketing professionals, set out to change this.
              </p>
              <p>
                Launched in 2024, we've rapidly grown to serve thousands of creators across 120+ countries. Our platform combines the latest advances in AI with deep understanding of content marketing, SEO, and social media dynamics.
              </p>
              <p>
                Today, Inqreate powers millions of pieces of content monthly, helping businesses from solo entrepreneurs to enterprise teams scale their content operations without scaling their headcount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#3B82F6]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#9333EA] flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-[#9CA3AF]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#EC4899] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-[#9CA3AF]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Content?</h2>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] hover:shadow-neon">
              Get Started Free
            </Button>
          </Link>
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

export default About;
