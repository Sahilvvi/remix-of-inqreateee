import { useState, useEffect } from "react";
import { TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import usersNetwork from "@/assets/users-network-3d.png";
import contentFlow from "@/assets/content-flow-3d.png";
import globalReach from "@/assets/global-reach-3d.png";
import uptimeBolt from "@/assets/uptime-bolt-3d.png";
import floatGraphic1 from "@/assets/float-graphic-1.png";
import floatGraphic2 from "@/assets/float-graphic-2.png";

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
      gradient: "from-[#3B82F6] to-[#06B6D4]",
      image: usersNetwork,
      badge: "🚀 Trending",
    },
    {
      value: formatNumber(platformStats.content),
      label: "Content Generated",
      description: "AI-powered posts",
      gradient: "from-[#9333EA] to-[#EC4899]",
      image: contentFlow,
      badge: "✨ Popular",
    },
    {
      value: `${platformStats.countries}+`,
      label: "Countries",
      description: "Worldwide reach",
      gradient: "from-[#10B981] to-[#059669]",
      image: globalReach,
      badge: "🌍 Global",
    },
    {
      value: `${platformStats.uptime}%`,
      label: "Uptime",
      description: "Always reliable",
      gradient: "from-[#F59E0B] to-[#EF4444]",
      image: uptimeBolt,
      badge: "⚡ Fast",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-[#0D0D0D]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-[#9333EA]/5 to-[#0D0D0D]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        </div>
      </div>

      {/* Floating graphics */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20 animate-float hidden lg:block">
        <img src={floatGraphic1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-20 right-10 w-40 h-40 opacity-20 animate-float-delay hidden lg:block">
        <img src={floatGraphic2} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-scale-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#3B82F6]/30 mb-6">
            <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#EC4899] bg-clip-text text-transparent">
              Platform Statistics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Join the fastest growing AI content platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card with glass effect */}
              <div className="relative glass-card border border-white/10 rounded-3xl p-8 hover-lift overflow-hidden transition-all duration-500 group-hover:border-white/20">
                {/* Background gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-card text-xs font-semibold text-white border border-white/20">
                  {stat.badge}
                </div>

                {/* Icon/Image */}
                <div className="relative mb-6 h-24 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse-slow`}></div>
                  <img 
                    src={stat.image} 
                    alt="" 
                    className="relative w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Stats */}
                <div className="space-y-3 relative">
                  <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}>
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {stat.label}
                  </div>
                  <div className="text-sm text-[#9CA3AF]">
                    {stat.description}
                  </div>

                  {/* Action button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full glass-card border border-white/10 text-white hover:border-white/30 group/btn transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      Learn More
                      <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                    </span>
                  </Button>
                </div>

                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up">
          <p className="text-[#9CA3AF] mb-4">Ready to join them?</p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] hover:shadow-neon transition-all duration-300 hover:scale-105 rounded-xl h-12 px-8"
          >
            Start Creating Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
