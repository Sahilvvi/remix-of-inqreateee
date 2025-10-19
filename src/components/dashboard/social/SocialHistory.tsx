import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SocialPost {
  id: string;
  platform: string;
  topic: string;
  post_content: string;
  image_url: string | null;
  created_at: string;
}

export const SocialHistory = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
    
    const channel = supabase
      .channel('social-posts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'social_media_posts'
      }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('social_media_posts')
      .delete()
      .eq('id', id);

    if (!error) {
      toast({ title: "Deleted", description: "Post removed from history." });
    }
  };

  const handleView = (post: SocialPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Post History</CardTitle>
          <CardDescription>Your generated social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No posts yet</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-primary capitalize">{post.platform}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{post.post_content}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="capitalize">{selectedPost?.platform} Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPost?.image_url && (
              <img 
                src={selectedPost.image_url} 
                alt="Post" 
                className="w-full rounded-lg border"
              />
            )}
            <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">
              {selectedPost?.post_content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
