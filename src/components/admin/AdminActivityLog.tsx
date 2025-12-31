import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, FileText, Share2, ShoppingCart, Search, Users, Calendar, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'blog' | 'social' | 'product' | 'seo' | 'user' | 'schedule';
  title: string;
  description: string;
  user_email?: string;
  created_at: string;
}

export const AdminActivityLog = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();

    // Set up real-time subscriptions for all content types
    const blogsChannel = supabase
      .channel('admin-blogs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'generated_blogs' }, fetchActivities)
      .subscribe();

    const postsChannel = supabase
      .channel('admin-posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'social_media_posts' }, fetchActivities)
      .subscribe();

    const productsChannel = supabase
      .channel('admin-products')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ecommerce_products' }, fetchActivities)
      .subscribe();

    return () => {
      supabase.removeChannel(blogsChannel);
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(productsChannel);
    };
  }, []);

  const fetchActivities = async () => {
    try {
      // Fetch profiles for user mapping
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      const profileMap = new Map(profiles?.map(p => [p.id, p.email || p.full_name || 'Unknown']) || []);

      // Fetch recent activities from all tables
      const [blogsRes, postsRes, productsRes, seoRes, scheduledRes] = await Promise.all([
        supabase.from('generated_blogs').select('id, title, user_id, created_at').order('created_at', { ascending: false }).limit(20),
        supabase.from('social_media_posts').select('id, topic, platform, user_id, created_at').order('created_at', { ascending: false }).limit(20),
        supabase.from('ecommerce_products').select('id, product_name, user_id, created_at').order('created_at', { ascending: false }).limit(20),
        supabase.from('seo_analyses').select('id, target_keywords, user_id, created_at').order('created_at', { ascending: false }).limit(20),
        supabase.from('scheduled_posts').select('id, platform, user_id, created_at').order('created_at', { ascending: false }).limit(20),
      ]);

      // Transform into activity items
      const allActivities: ActivityItem[] = [];

      blogsRes.data?.forEach(blog => {
        allActivities.push({
          id: `blog-${blog.id}`,
          type: 'blog',
          title: 'New Blog Created',
          description: blog.title,
          user_email: profileMap.get(blog.user_id),
          created_at: blog.created_at,
        });
      });

      postsRes.data?.forEach(post => {
        allActivities.push({
          id: `post-${post.id}`,
          type: 'social',
          title: `${post.platform} Post Created`,
          description: post.topic,
          user_email: profileMap.get(post.user_id),
          created_at: post.created_at,
        });
      });

      productsRes.data?.forEach(product => {
        allActivities.push({
          id: `product-${product.id}`,
          type: 'product',
          title: 'Product Listing Created',
          description: product.product_name,
          user_email: profileMap.get(product.user_id),
          created_at: product.created_at,
        });
      });

      seoRes.data?.forEach(seo => {
        allActivities.push({
          id: `seo-${seo.id}`,
          type: 'seo',
          title: 'SEO Analysis Completed',
          description: seo.target_keywords || 'Content analysis',
          user_email: profileMap.get(seo.user_id),
          created_at: seo.created_at,
        });
      });

      scheduledRes.data?.forEach(scheduled => {
        allActivities.push({
          id: `schedule-${scheduled.id}`,
          type: 'schedule',
          title: 'Post Scheduled',
          description: `${scheduled.platform} post scheduled`,
          user_email: profileMap.get(scheduled.user_id),
          created_at: scheduled.created_at,
        });
      });

      // Sort by date and take latest 50
      allActivities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setActivities(allActivities.slice(0, 50));
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'social':
        return <Share2 className="h-4 w-4 text-purple-500" />;
      case 'product':
        return <ShoppingCart className="h-4 w-4 text-orange-500" />;
      case 'seo':
        return <Search className="h-4 w-4 text-pink-500" />;
      case 'user':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'schedule':
        return <Calendar className="h-4 w-4 text-cyan-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityBadge = (type: string) => {
    const colors: Record<string, string> = {
      blog: 'bg-green-500/20 text-green-500 border-green-500/30',
      social: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      product: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      seo: 'bg-pink-500/20 text-pink-500 border-pink-500/30',
      user: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      schedule: 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30',
    };
    return colors[type] || 'bg-muted text-muted-foreground';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Platform Activity Log
            </CardTitle>
            <CardDescription>Real-time activity across the platform</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{activity.title}</span>
                    <Badge className={getActivityBadge(activity.type)}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{activity.user_email}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
