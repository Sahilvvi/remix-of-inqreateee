import { Users, FileText, Globe, Zap } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      value: "2M+",
      label: "Content Generated",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      value: "120+",
      label: "Countries",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      value: "99.9%",
      label: "Uptime",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 particle-bg opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative inline-block mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse-slow`}></div>
                <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold gradient-text neon-text animate-glow">
                  {stat.value}
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
