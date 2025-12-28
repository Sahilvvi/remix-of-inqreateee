import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface PostPreviewProps {
  platform: string;
  content: string;
  imageUrl?: string;
}

interface SavedPost {
  id: string;
  platform: string;
  topic: string;
  post_content: string;
  image_url: string | null;
  created_at: string;
}

export const PostPreview = ({ platform, content, imageUrl }: PostPreviewProps) => {
  const [latestPost, setLatestPost] = useState<SavedPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPost();
    
    const channel = supabase
      .channel('social-posts-preview')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'social_media_posts'
      }, () => {
        fetchLatestPost();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLatestPost = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('social_media_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setLatestPost(data);
      }
    } catch (error) {
      console.error('Error fetching latest post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use current content or fallback to latest saved
  const displayContent = content || latestPost?.post_content || "";
  const displayImage = imageUrl || latestPost?.image_url || "";
  const displayPlatform = platform || latestPost?.platform || "instagram";
  const isShowingSaved = !content && latestPost;

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Preview</CardTitle>
            <CardDescription className="capitalize">
              How your {displayPlatform} post will look
            </CardDescription>
          </div>
          {isShowingSaved && (
            <Badge variant="secondary" className="text-xs">
              Last saved post
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading && !content ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="mt-2 text-sm text-muted-foreground">Loading preview...</p>
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-background/50">
            {displayImage && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={displayImage} 
                  alt="Post preview" 
                  className="w-full object-cover max-h-[400px]"
                />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20" />
                <div>
                  <p className="font-semibold text-sm">Your Profile</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap">
                {displayContent || "Your generated content will appear here..."}
              </p>
              {displayContent && (
                <div className="flex gap-4 pt-3 text-muted-foreground border-t mt-4">
                  <button className="flex items-center gap-1 text-xs hover:text-foreground">
                    ❤️ Like
                  </button>
                  <button className="flex items-center gap-1 text-xs hover:text-foreground">
                    💬 Comment
                  </button>
                  <button className="flex items-center gap-1 text-xs hover:text-foreground">
                    🔄 Share
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
