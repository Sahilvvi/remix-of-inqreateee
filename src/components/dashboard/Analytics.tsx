import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText, MessageSquare, Eye } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  // Sample data for charts
  const contentPerformanceData = [
    { name: 'Jan', blogs: 45, social: 120, products: 30 },
    { name: 'Feb', blogs: 52, social: 145, products: 38 },
    { name: 'Mar', blogs: 61, social: 168, products: 45 },
    { name: 'Apr', blogs: 58, social: 182, products: 52 },
    { name: 'May', blogs: 70, social: 210, products: 60 },
    { name: 'Jun', blogs: 78, social: 245, products: 68 },
  ];

  const engagementData = [
    { name: 'Blog', value: 400 },
    { name: 'Social Media', value: 800 },
    { name: 'E-Commerce', value: 300 },
    { name: 'SEO', value: 200 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  const stats = [
    {
      title: "Total Content Generated",
      value: "1,248",
      change: "+12.5%",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Social Media Posts",
      value: "856",
      change: "+18.2%",
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      title: "Total Engagement",
      value: "24.5K",
      change: "+24.1%",
      icon: Eye,
      color: "text-green-500",
    },
    {
      title: "Active Users",
      value: "342",
      change: "+8.3%",
      icon: Users,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your content performance and engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-effect hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Monthly content generation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={contentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="blogs" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="social" stroke="hsl(var(--secondary))" strokeWidth={2} />
                <Line type="monotone" dataKey="products" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Breakdown by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Generation Overview</CardTitle>
            <CardDescription>Compare all content types side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="blogs" fill="hsl(var(--primary))" />
                <Bar dataKey="social" fill="hsl(var(--secondary))" />
                <Bar dataKey="products" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest content generation activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "Blog", title: "AI Automation Guide", time: "2 hours ago", status: "success" },
              { type: "Social Post", title: "Product Launch Announcement", time: "4 hours ago", status: "success" },
              { type: "SEO Analysis", title: "Homepage Optimization", time: "6 hours ago", status: "success" },
              { type: "Product", title: "Wireless Headphones Listing", time: "8 hours ago", status: "success" },
              { type: "Blog", title: "Marketing Strategies 2025", time: "1 day ago", status: "success" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                    {activity.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
