import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Eye, Heart, MessageCircle, Share2 } from "lucide-react";

interface Performance {
  id: string;
  platform: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  posted_at: string;
}

export const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Performance[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    avgEngagement: 0
  });

  useEffect(() => {
    fetchMetrics();
    
    const channel = supabase
      .channel('performance-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'post_performance'
      }, () => {
        fetchMetrics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMetrics = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('post_performance')
      .select('*')
      .eq('user_id', user.id)
      .order('posted_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setMetrics(data);
      
      const totals = data.reduce((acc, curr) => ({
        totalViews: acc.totalViews + curr.views,
        totalLikes: acc.totalLikes + curr.likes,
        totalComments: acc.totalComments + curr.comments,
        totalShares: acc.totalShares + curr.shares,
        avgEngagement: acc.avgEngagement + parseFloat(curr.engagement_rate.toString())
      }), { totalViews: 0, totalLikes: 0, totalComments: 0, totalShares: 0, avgEngagement: 0 });
      
      setTotalStats({
        ...totals,
        avgEngagement: data.length > 0 ? totals.avgEngagement / data.length : 0
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{totalStats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold">{totalStats.totalLikes.toLocaleString()}</p>
              </div>
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">{totalStats.totalComments.toLocaleString()}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
                <p className="text-2xl font-bold">{totalStats.avgEngagement.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Performance</CardTitle>
          <CardDescription>Performance metrics for your latest posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No performance data yet</p>
            ) : (
              metrics.map((metric) => (
                <div key={metric.id} className="p-4 rounded-lg border bg-card/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold capitalize">{metric.platform}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(metric.posted_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{metric.views}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span>{metric.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{metric.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                      <span>{metric.shares}</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t">
                    <span className="text-sm font-medium">
                      Engagement Rate: <span className="text-primary">{metric.engagement_rate}%</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
