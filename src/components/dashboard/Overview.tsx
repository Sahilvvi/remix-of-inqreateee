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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your AI automation platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 glass-effect hover:shadow-xl transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 glass-effect">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "Blog post generated", time: "2 hours ago" },
              { action: "Social media post scheduled", time: "5 hours ago" },
              { action: "SEO analysis completed", time: "1 day ago" },
              { action: "Template created", time: "2 days ago" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 glass-effect">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Generate Blog",
              "Create Post",
              "SEO Check",
              "New Template",
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
              >
                <p className="font-medium">{action}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
