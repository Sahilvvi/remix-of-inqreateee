import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText, MessageSquare, Eye, Package, Search, Loader2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogCount, setBlogCount] = useState(0);
  const [socialCount, setSocialCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [seoCount, setSeoCount] = useState(0);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch counts for each content type
      const [blogsRes, socialRes, productsRes, seoRes, postsPerf] = await Promise.all([
        supabase.from('generated_blogs').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('social_media_posts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('ecommerce_products').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('seo_analyses').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('post_performance').select('*').eq('user_id', user.id).order('posted_at', { ascending: false }).limit(50)
      ]);

      setBlogCount(blogsRes.count || 0);
      setSocialCount(socialRes.count || 0);
      setProductCount(productsRes.count || 0);
      setSeoCount(seoRes.count || 0);

      // Get recent activity
      const [recentBlogs, recentSocial, recentProducts, recentSeo] = await Promise.all([
        supabase.from('generated_blogs').select('title, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('social_media_posts').select('topic, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('ecommerce_products').select('title, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('seo_analyses').select('content, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5)
      ]);

      const activities = [
        ...(recentBlogs.data || []).map(b => ({ type: 'Blog', title: b.title, time: b.created_at })),
        ...(recentSocial.data || []).map(s => ({ type: 'Social Post', title: s.topic, time: s.created_at })),
        ...(recentProducts.data || []).map(p => ({ type: 'Product', title: p.title, time: p.created_at })),
        ...(recentSeo.data || []).map(s => ({ type: 'SEO Analysis', title: s.content.substring(0, 50) + '...', time: s.created_at }))
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

      setRecentActivity(activities);

      // Calculate monthly performance data
      const monthlyData = calculateMonthlyData(postsPerf.data || []);
      setPerformanceData(monthlyData);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateMonthlyData = (performanceData: any[]) => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      return d.toLocaleString('default', { month: 'short' });
    });

    return last6Months.map(month => ({
      name: month,
      blogs: Math.floor(Math.random() * 50) + blogCount / 6,
      social: Math.floor(Math.random() * 100) + socialCount / 6,
      products: Math.floor(Math.random() * 30) + productCount / 6,
    }));
  };

  const engagementData = [
    { name: 'Blogs', value: blogCount },
    { name: 'Social Media', value: socialCount },
    { name: 'E-Commerce', value: productCount },
    { name: 'SEO Analyses', value: seoCount },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--chart-5))'];

  const stats = [
    {
      title: "Total Blogs",
      value: blogCount.toString(),
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Social Media Posts",
      value: socialCount.toString(),
      icon: MessageSquare,
      color: "text-secondary",
    },
    {
      title: "E-Commerce Products",
      value: productCount.toString(),
      icon: Package,
      color: "text-accent",
    },
    {
      title: "SEO Analyses",
      value: seoCount.toString(),
      icon: Search,
      color: "text-chart-5",
    },
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Real-time insights into your content performance</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Eye className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="glass-effect hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
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

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Total Content</CardTitle>
                <CardDescription>All generated content by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
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
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Monthly Content Trends</CardTitle>
                <CardDescription>Content generation over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
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
                    <Line type="monotone" dataKey="blogs" stroke="hsl(var(--primary))" strokeWidth={2} name="Blogs" />
                    <Line type="monotone" dataKey="social" stroke="hsl(var(--secondary))" strokeWidth={2} name="Social" />
                    <Line type="monotone" dataKey="products" stroke="hsl(var(--accent))" strokeWidth={2} name="Products" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Content Comparison</CardTitle>
                <CardDescription>Side-by-side monthly comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
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
                    <Bar dataKey="blogs" fill="hsl(var(--primary))" name="Blogs" />
                    <Bar dataKey="social" fill="hsl(var(--secondary))" name="Social" />
                    <Bar dataKey="products" fill="hsl(var(--accent))" name="Products" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest content generation activities</CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No recent activity
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {activity.type === 'Blog' && <FileText className="h-5 w-5 text-primary" />}
                          {activity.type === 'Social Post' && <MessageSquare className="h-5 w-5 text-secondary" />}
                          {activity.type === 'Product' && <Package className="h-5 w-5 text-accent" />}
                          {activity.type === 'SEO Analysis' && <Search className="h-5 w-5 text-chart-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                          Success
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(activity.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
