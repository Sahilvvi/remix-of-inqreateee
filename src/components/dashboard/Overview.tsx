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

      // Fetch e-commerce products count
      const { count: productCount } = await supabase
        .from('ecommerce_products')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const newStats: Stats = {
        totalBlogs,
        blogsThisWeek,
        totalWords,
        recentBlogs,
        socialPosts: socialCount || 0,
        seoAnalyses: seoCount || 0,
        productListings: productCount || 0,
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
      value: loading ? "—" : stats.totalBlogs.toString(),
      change: `+${stats.blogsThisWeek} this week`,
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Total Words Written",
      value: loading ? "—" : stats.totalWords.toLocaleString(),
      change: `${Math.round(stats.totalWords / (stats.totalBlogs || 1))} avg/blog`,
      icon: MessageSquare,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "This Week's Activity",
      value: loading ? "—" : `${stats.blogsThisWeek}`,
      change: `${stats.totalBlogs > 0 ? Math.round((stats.blogsThisWeek / stats.totalBlogs) * 100) : 0}% of total`,
      icon: TrendingUp,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Recent Activity",
      value: loading ? "—" : stats.recentBlogs.length > 0 ? "Active" : "Start Now",
      change: stats.recentBlogs.length > 0 ? "Last 7 days" : "Generate your first blog",
      icon: Users,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="animate-slide-up">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-1">Welcome Back</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Here's an overview of your content platform
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="p-4 sm:p-5 bg-card border-border hover:border-primary/20 transition-colors cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.iconBg} mb-3`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-xl sm:text-2xl font-semibold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-emerald-400">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      {/* Usage Overview and Quick Previews */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
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

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 sm:p-5 bg-card border-border animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-base sm:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-6 text-muted-foreground text-sm">Loading...</div>
            ) : stats.recentBlogs.length > 0 ? (
              stats.recentBlogs.slice(0, 3).map((blog) => (
                <div 
                  key={blog.id} 
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="font-medium text-foreground truncate text-sm">
                      {blog.title || "Untitled Blog"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Blog post generated</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No activity yet. Start by generating your first blog!
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 sm:p-5 bg-card border-border animate-scale-in" style={{ animationDelay: '0.25s' }}>
          <h3 className="text-base sm:text-lg font-medium text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
                className="p-3 sm:p-4 bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/20 rounded-lg transition-all text-left"
              >
                <p className="font-medium text-foreground text-sm">{action.label}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
