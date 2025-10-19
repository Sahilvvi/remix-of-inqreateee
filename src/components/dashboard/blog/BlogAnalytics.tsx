import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Eye, Clock, Target } from "lucide-react";

export const BlogAnalytics = () => {
  const performanceData = [
    { month: "Jan", blogs: 12, words: 9600 },
    { month: "Feb", blogs: 15, words: 12000 },
    { month: "Mar", blogs: 18, words: 14400 },
    { month: "Apr", blogs: 14, words: 11200 },
    { month: "May", blogs: 20, words: 16000 },
    { month: "Jun", blogs: 23, words: 18400 },
  ];

  const toneDistribution = [
    { name: "Professional", value: 45 },
    { name: "Casual", value: 25 },
    { name: "Friendly", value: 20 },
    { name: "Formal", value: 10 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  const stats = [
    { label: "Avg. Read Time", value: "8 min", icon: Clock, color: "text-blue-500" },
    { label: "Total Views", value: "24.5K", icon: Eye, color: "text-green-500" },
    { label: "Engagement Rate", value: "68%", icon: Target, color: "text-purple-500" },
    { label: "Growth", value: "+24%", icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Blog Performance Analytics</CardTitle>
          <CardDescription>Insights into your blog content generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="p-4 rounded-lg bg-card/50 border">
                  <Icon className={`h-5 w-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Monthly Blog Production</CardTitle>
            <CardDescription>Blogs and word count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="blogs" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Tone Distribution</CardTitle>
            <CardDescription>Breakdown of content tone usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={toneDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {toneDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
