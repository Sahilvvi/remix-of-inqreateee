import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, TrendingUp, Users, ArrowUpRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Stats {
  totalBlogs: number;
  blogsThisWeek: number;
  totalWords: number;
  recentBlogs: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
}

const Overview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    blogsThisWeek: 0,
    totalWords: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'generated_blogs'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all blogs for the user
      const { data: allBlogs, error: blogsError } = await supabase
        .from('generated_blogs')
        .select('id, title, created_at, word_count')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (blogsError) throw blogsError;

      // Calculate stats
      const totalBlogs = allBlogs?.length || 0;
      const totalWords = allBlogs?.reduce((sum, blog) => sum + (blog.word_count || 0), 0) || 0;
      
      // Get blogs from this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const blogsThisWeek = allBlogs?.filter(blog => 
        new Date(blog.created_at) > oneWeekAgo
      ).length || 0;

      // Get recent blogs for activity
      const recentBlogs = allBlogs?.slice(0, 4) || [];

      setStats({
        totalBlogs,
        blogsThisWeek,
        totalWords,
        recentBlogs,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Blogs Generated",
      value: loading ? "..." : stats.totalBlogs.toString(),
      change: `+${stats.blogsThisWeek} this week`,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Words Written",
      value: loading ? "..." : stats.totalWords.toLocaleString(),
      change: `${Math.round(stats.totalWords / (stats.totalBlogs || 1))} avg/blog`,
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "This Week's Activity",
      value: loading ? "..." : `${stats.blogsThisWeek}`,
      change: `${stats.totalBlogs > 0 ? Math.round((stats.blogsThisWeek / stats.totalBlogs) * 100) : 0}% of total`,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Recent Activity",
      value: loading ? "..." : stats.recentBlogs.length > 0 ? "Active" : "Start Now",
      change: stats.recentBlogs.length > 0 ? "Last 7 days" : "Generate your first blog",
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
        {statCards.map((stat, index) => {
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
          <h3 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : stats.recentBlogs.length > 0 ? (
              stats.recentBlogs.map((blog, index) => (
                <div 
                  key={blog.id} 
                  className="flex justify-between items-center p-4 rounded-xl glass-effect hover:bg-accent/50 transition-all duration-300 hover-lift cursor-pointer group"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="flex-1">
                    <p className="font-semibold group-hover:gradient-text transition-all truncate">
                      {blog.title || "Untitled Blog"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Blog post generated</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No activity yet. Start by generating your first blog!
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-2xl font-bold mb-6 gradient-text">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Generate Blog", route: "/dashboard", action: "blog" },
              { label: "Create Post", route: "/dashboard", action: "social" },
              { label: "SEO Check", route: "/dashboard", action: "seo" },
              { label: "View Analytics", route: "/dashboard", action: "analytics" },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(action.route);
                  // Simulate clicking the appropriate tab
                  setTimeout(() => {
                    const event = new CustomEvent('dashboard-navigate', { detail: action.action });
                    window.dispatchEvent(event);
                  }, 100);
                }}
                className="p-6 glass-card hover-glow rounded-xl transition-all duration-300 hover-lift text-left group border-2 border-transparent relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="font-semibold relative z-10 gradient-text text-lg">{action.label}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
