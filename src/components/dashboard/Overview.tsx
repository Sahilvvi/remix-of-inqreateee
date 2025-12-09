import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, TrendingUp, Users, ArrowUpRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { UsageOverview } from "./overview/UsageOverview";
import { QuickPreviews } from "./overview/QuickPreviews";

interface Stats {
  totalBlogs: number;
  blogsThisWeek: number;
  totalWords: number;
  recentBlogs: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  socialPosts: number;
  seoAnalyses: number;
  productListings: number;
}

const Overview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    blogsThisWeek: 0,
    totalWords: 0,
    recentBlogs: [],
    socialPosts: 0,
    seoAnalyses: 0,
    productListings: 0,
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

      // Fetch blog stats
      const { data: blogs, error } = await supabase
        .from('generated_blogs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalBlogs = blogs?.length || 0;
      const totalWords = blogs?.reduce((sum, blog) => sum + (blog.word_count || 0), 0) || 0;
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const blogsThisWeek = blogs?.filter(blog => 
        new Date(blog.created_at) > oneWeekAgo
      ).length || 0;

      const recentBlogs = blogs?.slice(0, 5) || [];

      // Fetch social media posts count
      const { count: socialCount } = await supabase
        .from('social_media_posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch SEO analyses count
      const { count: seoCount } = await supabase
        .from('seo_analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const newStats: Stats = {
        totalBlogs,
        blogsThisWeek,
        totalWords,
        recentBlogs,
        socialPosts: socialCount || 0,
        seoAnalyses: seoCount || 0,
        productListings: 0, // This would come from e-commerce data when available
      };

      setStats(newStats);
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
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Background glow effects */}
      <div className="absolute -top-20 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl opacity-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-secondary rounded-full blur-3xl opacity-10 animate-pulse-slow pointer-events-none"></div>

      <div className="animate-slide-up">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 gradient-text neon-text">Welcome Back!</h1>
        <p className="text-sm sm:text-lg text-muted-foreground">
          Here's an overview of your AI automation platform
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="p-3 sm:p-6 glass-card hover-lift cursor-pointer animate-scale-in border-2 border-transparent hover-glow relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 font-medium line-clamp-1">{stat.title}</p>
                <p className="text-xl sm:text-4xl font-bold mb-1 sm:mb-2 gradient-text">{stat.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-green-600 bg-green-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block line-clamp-1">{stat.change}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Usage Overview and Quick Previews */}
      <div className="grid lg:grid-cols-2 gap-6">
        <UsageOverview
          blogsGenerated={stats.totalBlogs}
          socialPosts={stats.socialPosts}
          seoAnalyses={stats.seoAnalyses}
          productListings={stats.productListings}
        />
        <QuickPreviews
          onNavigate={(route) => {
            window.dispatchEvent(new CustomEvent('dashboard-navigate', { detail: route }));
          }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text flex items-center gap-2">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            Recent Activity
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {loading ? (
              <div className="text-center py-6 sm:py-8 text-muted-foreground text-sm">Loading...</div>
            ) : stats.recentBlogs.length > 0 ? (
              stats.recentBlogs.slice(0, 3).map((blog, index) => (
                <div 
                  key={blog.id} 
                  className="flex justify-between items-center p-3 sm:p-4 rounded-xl glass-effect hover:bg-accent/50 transition-all duration-300 hover-lift cursor-pointer group"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="font-semibold group-hover:gradient-text transition-all truncate text-sm sm:text-base">
                      {blog.title || "Untitled Blog"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">Blog post generated</p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-muted-foreground text-sm">
                No activity yet. Start by generating your first blog!
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
                  setTimeout(() => {
                    const event = new CustomEvent('dashboard-navigate', { detail: action.action });
                    window.dispatchEvent(event);
                  }, 100);
                }}
                className="p-3 sm:p-6 glass-card hover-glow rounded-xl transition-all duration-300 hover-lift text-left group border-2 border-transparent relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="font-semibold relative z-10 gradient-text text-sm sm:text-lg">{action.label}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
