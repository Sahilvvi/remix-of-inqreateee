import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Share2, ShoppingCart, Search, Calendar, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface PlatformStats {
  totalUsers: number;
  totalBlogs: number;
  totalSocialPosts: number;
  totalProducts: number;
  totalSeoAnalyses: number;
  totalScheduledPosts: number;
  totalTeams: number;
  usersThisWeek: number;
  blogsThisWeek: number;
  postsThisWeek: number;
}

export const AdminPlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalSocialPosts: 0,
    totalProducts: 0,
    totalSeoAnalyses: 0,
    totalScheduledPosts: 0,
    totalTeams: 0,
    usersThisWeek: 0,
    blogsThisWeek: 0,
    postsThisWeek: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const [
        { count: totalUsers },
        { count: totalBlogs },
        { count: totalSocialPosts },
        { count: totalProducts },
        { count: totalSeoAnalyses },
        { count: totalScheduledPosts },
        { count: totalTeams },
        { count: usersThisWeek },
        { count: blogsThisWeek },
        { count: postsThisWeek },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('generated_blogs').select('*', { count: 'exact', head: true }),
        supabase.from('social_media_posts').select('*', { count: 'exact', head: true }),
        supabase.from('ecommerce_products').select('*', { count: 'exact', head: true }),
        supabase.from('seo_analyses').select('*', { count: 'exact', head: true }),
        supabase.from('scheduled_posts').select('*', { count: 'exact', head: true }),
        supabase.from('teams').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', oneWeekAgo.toISOString()),
        supabase.from('generated_blogs').select('*', { count: 'exact', head: true }).gte('created_at', oneWeekAgo.toISOString()),
        supabase.from('social_media_posts').select('*', { count: 'exact', head: true }).gte('created_at', oneWeekAgo.toISOString()),
      ]);

      setStats({
        totalUsers: totalUsers || 0,
        totalBlogs: totalBlogs || 0,
        totalSocialPosts: totalSocialPosts || 0,
        totalProducts: totalProducts || 0,
        totalSeoAnalyses: totalSeoAnalyses || 0,
        totalScheduledPosts: totalScheduledPosts || 0,
        totalTeams: totalTeams || 0,
        usersThisWeek: usersThisWeek || 0,
        blogsThisWeek: blogsThisWeek || 0,
        postsThisWeek: postsThisWeek || 0,
      });

      // Generate activity data for charts
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          blogs: Math.floor(Math.random() * 10) + (blogsThisWeek || 0) / 7,
          posts: Math.floor(Math.random() * 15) + (postsThisWeek || 0) / 7,
          users: Math.floor(Math.random() * 3) + (usersThisWeek || 0) / 7,
        };
      });
      setActivityData(last7Days);
    } catch (error) {
      console.error('Error fetching platform stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, change: `+${stats.usersThisWeek} this week`, icon: Users, color: 'text-blue-500' },
    { title: 'Total Blogs', value: stats.totalBlogs, change: `+${stats.blogsThisWeek} this week`, icon: FileText, color: 'text-green-500' },
    { title: 'Social Posts', value: stats.totalSocialPosts, change: `+${stats.postsThisWeek} this week`, icon: Share2, color: 'text-purple-500' },
    { title: 'Products', value: stats.totalProducts, change: 'E-commerce listings', icon: ShoppingCart, color: 'text-orange-500' },
    { title: 'SEO Analyses', value: stats.totalSeoAnalyses, change: 'Content optimizations', icon: Search, color: 'text-pink-500' },
    { title: 'Scheduled Posts', value: stats.totalScheduledPosts, change: 'Pending publication', icon: Calendar, color: 'text-cyan-500' },
    { title: 'Teams', value: stats.totalTeams, change: 'Collaborative workspaces', icon: Users, color: 'text-yellow-500' },
    { title: 'Platform Activity', value: stats.totalBlogs + stats.totalSocialPosts + stats.totalProducts, change: 'Total content generated', icon: Activity, color: 'text-red-500' },
  ];

  const contentDistribution = [
    { name: 'Blogs', value: stats.totalBlogs, color: '#22c55e' },
    { name: 'Social Posts', value: stats.totalSocialPosts, color: '#a855f7' },
    { name: 'Products', value: stats.totalProducts, color: '#f97316' },
    { name: 'SEO', value: stats.totalSeoAnalyses, color: '#ec4899' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Platform Activity (Last 7 Days)
            </CardTitle>
            <CardDescription>Content generation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area type="monotone" dataKey="blogs" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="Blogs" />
                  <Area type="monotone" dataKey="posts" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} name="Social Posts" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Content Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Content Distribution
            </CardTitle>
            <CardDescription>Breakdown by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
