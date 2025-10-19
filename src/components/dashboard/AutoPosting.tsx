import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Trash2 } from "lucide-react";

const AutoPosting = () => {
  const [platform, setPlatform] = useState("instagram");
  const [content, setContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, platform: "Instagram", content: "Check out our new product line!", time: "2025-01-20 10:00 AM" },
    { id: 2, platform: "LinkedIn", content: "Exciting company update...", time: "2025-01-21 2:00 PM" },
  ]);
  const { toast } = useToast();

  const handleSchedule = async () => {
    if (!content.trim() || !scheduledTime) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('schedule-post', {
        body: { platform, content, scheduledTime, action: 'schedule' }
      });

      if (error) throw error;

      const newPost = {
        id: Date.now(),
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        content,
        time: new Date(scheduledTime).toLocaleString()
      };

      setScheduledPosts([...scheduledPosts, newPost]);
      setContent("");
      setScheduledTime("");

      toast({
        title: "Success",
        description: "Post scheduled successfully!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await supabase.functions.invoke('schedule-post', {
        body: { action: 'delete', postId: id }
      });

      setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
      toast({
        title: "Deleted",
        description: "Scheduled post removed.",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Auto Posting</h1>
        <p className="text-muted-foreground">Schedule your posts across platforms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Schedule New Post</CardTitle>
            <CardDescription>Set up automatic posting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="post-platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-content">Post Content</Label>
              <Textarea
                id="post-content"
                placeholder="Enter your post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-time">Schedule Time</Label>
              <Input
                id="schedule-time"
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <Button onClick={handleSchedule} className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Scheduled Posts</CardTitle>
            <CardDescription>Manage your upcoming posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-primary">{post.platform}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <p className="text-sm line-clamp-2">{post.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoPosting;
