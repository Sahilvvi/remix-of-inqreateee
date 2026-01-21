import { useState, useEffect } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import usersNetwork from "@/assets/users-network-3d.png";
import contentFlow from "@/assets/content-flow-3d.png";
import globalReach from "@/assets/global-reach-3d.png";
import uptimeBolt from "@/assets/uptime-bolt-3d.png";

const Stats = () => {
  const [platformStats, setPlatformStats] = useState({
    users: 0,
    content: 0,
    countries: 1,
    uptime: 99.9,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-platform-stats');
        if (data && !error) {
          setPlatformStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return num > 0 ? `${num}+` : "0";
  };

  const stats = [
    {
      value: formatNumber(platformStats.users),
      label: "Active Users",
      description: "Growing community",
      backTitle: "Our Community",
      backDescription: "Join thousands of creators, marketers, and businesses who trust our platform daily.",
      color: "#3B82F6",
      image: usersNetwork,
      badge: "🚀 Trending",
    },
    {
      value: formatNumber(platformStats.content),
      label: "Content Generated",
      description: "AI-powered posts",
      backTitle: "Content Creation",
      backDescription: "From blog posts to social media content, we help you create engaging content at scale.",
      color: "#9333EA",
      image: contentFlow,
      badge: "✨ Popular",
    },
    {
      value: `${platformStats.countries}+`,
      label: "Countries",
      description: "Worldwide reach",
      backTitle: "Global Presence",
      backDescription: "Our platform supports multiple languages and serves users across the globe.",
      color: "#10B981",
      image: globalReach,
      badge: "🌍 Global",
    },
    {
      value: `${platformStats.uptime}%`,
      label: "Uptime",
      description: "Always reliable",
      backTitle: "Reliability First",
      backDescription: "Enterprise-grade infrastructure ensuring your content is always accessible.",
      color: "#F59E0B",
      image: uptimeBolt,
      badge: "⚡ Fast",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#0D0D0D]">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#0D0D0D]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-medium text-white/80">
              Platform Statistics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Join the fastest growing AI content platform
          </p>
        </div>

        {/* Stats Grid with Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group perspective-1000"
              style={{ perspective: "1000px" }}
            >
              <div 
                className="relative w-full h-[320px] transition-transform duration-700 ease-out"
                style={{ 
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 flex flex-col backface-hidden group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/5 text-xs font-medium text-white/70 border border-white/10">
                    {stat.badge}
                  </div>

                  {/* Icon/Image */}
                  <div className="flex items-center justify-center h-20 mb-4">
                    <img 
                      src={stat.image} 
                      alt="" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  
                  {/* Stats */}
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <div 
                      className="text-4xl font-bold mb-2"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-white mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-[#9CA3AF]">
                      {stat.description}
                    </div>
                  </div>

                  {/* Hover hint */}
                  <div className="text-center text-xs text-white/40 mt-4">
                    Hover to learn more
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 flex flex-col [transform:rotateY(180deg)] backface-hidden group-hover:[transform:rotateY(0deg)] transition-transform duration-700"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {/* Accent line */}
                  <div 
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ backgroundColor: stat.color }}
                  ></div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {stat.backTitle}
                  </h3>
                  
                  <p className="text-[#9CA3AF] text-sm leading-relaxed flex-1">
                    {stat.backDescription}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[#9CA3AF] mb-4">Ready to join them?</p>
          <Button 
            size="lg"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors duration-300 rounded-xl h-12 px-8"
          >
            Start Creating Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
