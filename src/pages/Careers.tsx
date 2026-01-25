import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, MapPin, Clock, Heart, Zap, Users, Coffee, ArrowRight } from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const Careers = () => {
  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance and wellness programs" },
    { icon: Zap, title: "Learning Budget", description: "Annual allowance for courses, books, and conferences" },
    { icon: Users, title: "Remote-First", description: "Work from anywhere with flexible hours" },
    { icon: Coffee, title: "Team Events", description: "Regular virtual and in-person team gatherings" },
  ];

  const openings = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote (India)",
      type: "Full-time",
    },
    {
      title: "AI/ML Engineer",
      department: "AI Team",
      location: "Remote (India)",
      type: "Full-time",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote (Global)",
      type: "Full-time",
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote (India)",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (India)",
      type: "Full-time",
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#9333EA]/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#9333EA]/30 mb-6">
              <Briefcase className="w-4 h-4 text-[#9333EA]" />
              <span className="text-sm font-medium text-[#9333EA]">Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build the Future of <span className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] bg-clip-text text-transparent">AI Content</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] leading-relaxed">
              Join a team of passionate innovators working on cutting-edge AI technology. We're looking for talented individuals who want to make an impact.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#EC4899] flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-[#9CA3AF] text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Open Positions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job, index) => (
              <Card key={index} className="glass-card border-white/10 hover:border-[#9333EA]/30 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#9333EA] transition-colors">{job.title}</h3>
                      <p className="text-[#9CA3AF]">{job.department}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-[#9CA3AF]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Link to="/contact">
                      <Button variant="outline" className="group-hover:bg-[#9333EA] group-hover:text-white group-hover:border-[#9333EA] transition-all">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* No Match CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Don't See a Perfect Match?</h2>
          <p className="text-[#9CA3AF] mb-6 max-w-xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Link to="/contact">
            <Button variant="outline" className="hover:bg-[#9333EA] hover:text-white hover:border-[#9333EA]">
              Send Open Application
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

export default Careers;
