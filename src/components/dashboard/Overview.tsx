import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, TrendingUp, Users } from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Total Posts Generated",
      value: "1,234",
      change: "+12.5%",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Social Media Posts",
      value: "856",
      change: "+8.2%",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "SEO Score",
      value: "94/100",
      change: "+5 points",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Engagement Rate",
      value: "8.9%",
      change: "+2.1%",
      icon: Users,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Background glow effects */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-10 animate-pulse-slow pointer-events-none"></div>

      <div className="animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text neon-text">Welcome Back!</h1>
        <p className="text-lg text-muted-foreground">
          Here's an overview of your AI automation platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="p-6 glass-card hover-lift cursor-pointer animate-scale-in border-2 border-transparent hover-glow relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">{stat.title}</p>
                <p className="text-4xl font-bold mb-2 gradient-text">{stat.value}</p>
                <p className="text-sm font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full inline-block">{stat.change}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-bold mb-6 gradient-text">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "Blog post generated", time: "2 hours ago" },
              { action: "Social media post scheduled", time: "5 hours ago" },
              { action: "SEO analysis completed", time: "1 day ago" },
              { action: "Template created", time: "2 days ago" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 rounded-xl glass-effect hover:bg-accent/50 transition-all duration-300 hover-lift cursor-pointer group"
              >
                <p className="font-semibold group-hover:gradient-text transition-all">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-2xl font-bold mb-6 gradient-text">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Generate Blog",
              "Create Post",
              "SEO Check",
              "New Template",
            ].map((action, index) => (
              <button
                key={index}
                className="p-6 glass-card hover-glow rounded-xl transition-all duration-300 hover-lift text-left group border-2 border-transparent relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="font-semibold relative z-10 gradient-text text-lg">{action}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
