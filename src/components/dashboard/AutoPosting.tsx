import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, Instagram, Facebook, Twitter, Linkedin, Youtube, Calendar, BarChart3, LinkIcon, Eye } from "lucide-react";

interface PostingStats {
  thisMonth: number;
  posted: number;
  pending: number;
}

const AutoPosting = () => {
  const [platform, setPlatform] = useState("instagram");
  const [content, setContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [postingStats, setPostingStats] = useState<PostingStats>({ thisMonth: 0, posted: 0, pending: 0 });
  const { toast } = useToast();

  useEffect(() => {
    fetchScheduledPosts();
    fetchConnectedAccounts();
    fetchPostingStats();
  }, []);

  const fetchConnectedAccounts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      setConnectedAccounts(data || []);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
    }
  };

  const fetchPostingStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get start of current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('status, created_at')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString());

      if (error) throw error;

      const posts = data || [];
      const thisMonth = posts.length;
      const posted = posts.filter(p => p.status === 'posted').length;
      const pending = posts.filter(p => p.status === 'pending').length;

      setPostingStats({ thisMonth, posted, pending });
    } catch (error) {
      console.error('Error fetching posting stats:', error);
    }
  };

  const fetchScheduledPosts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_time', { ascending: true });

    if (!error && data) setScheduledPosts(data);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSchedule = async () => {
    if (!content.trim() || !scheduledTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from('scheduled_posts').insert({
        user_id: user.id,
        platform,
        content,
        scheduled_time: scheduledTime,
        status: 'pending',
        image_url: imagePreview || null,
      });

      if (error) throw error;

      setContent("");
      setScheduledTime("");
      setImageFile(null);
      setImagePreview("");
      fetchScheduledPosts();

      toast({
        title: "Success!",
        description: "Post scheduled successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const platformIcons: Record<string, any> = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  const PlatformIcon = platformIcons[platform] || Instagram;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-3 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Auto Posting Scheduler
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground">
          Schedule and manage posts across all your social media platforms
        </p>
      </div>

      <Tabs defaultValue="schedule" className="max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 text-xs sm:text-sm">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="connect">Connect</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Schedule New Post
                </CardTitle>
                <CardDescription>Create and schedule your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(platformIcons).map((key) => {
                        const Icon = platformIcons[key];
                        return (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="capitalize">{key}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Post Content</Label>
                  <Textarea
                    placeholder="What do you want to share?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Schedule Time</Label>
                  <Input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Attach Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <Button
                  onClick={handleSchedule}
                  disabled={isLoading}
                  className="w-full h-12"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Post Preview
                </CardTitle>
                <CardDescription>See how your post will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-2 bg-card/50">
                    <div className="flex items-center gap-3 mb-3">
                      <PlatformIcon className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold">Your Brand</p>
                        <p className="text-xs text-muted-foreground capitalize">{platform}</p>
                      </div>
                    </div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full rounded-lg mb-3"
                      />
                    )}
                    <p className="text-sm whitespace-pre-wrap">
                      {content || "Your post content will appear here..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Manage your upcoming posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledPosts.map((post) => {
                  const Icon = platformIcons[post.platform];
                  return (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          <Icon className="w-5 h-5 text-primary mt-1" />
                          <div className="flex-1">
                            <p className="font-medium line-clamp-2">{post.content}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(post.scheduled_time).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={post.status === 'posted' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {scheduledPosts.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">
                    No scheduled posts yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connect" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-primary" />
                Connect Social Media Accounts
              </CardTitle>
              <CardDescription>Link your social media accounts for auto-posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.keys(platformIcons).map((key) => {
                const Icon = platformIcons[key];
                const isConnected = connectedAccounts.find(acc => acc.platform === key);
                return (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${isConnected ? 'bg-green-500/10' : 'bg-primary/10'} rounded-full flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{key}</p>
                        <p className="text-sm text-muted-foreground">
                          {isConnected ? `Connected as ${isConnected.account_name || 'User'}` : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {isConnected ? (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={async () => {
                          try {
                            const { error } = await supabase
                              .from('social_accounts')
                              .delete()
                              .eq('id', isConnected.id);
                            
                            if (error) throw error;
                            toast({ title: "Account disconnected successfully" });
                            fetchConnectedAccounts();
                          } catch (error) {
                            toast({ 
                              title: "Error disconnecting account",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={isConnecting}
                        onClick={() => {
                          toast({
                            title: "OAuth Setup Required",
                            description: `To connect ${key}, you need to provide API credentials. See instructions below.`
                          });
                        }}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Credentials Required</CardTitle>
              <CardDescription>To enable real-time posting, you'll need API credentials from each platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Twitter/X:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>TWITTER_CONSUMER_KEY (API Key)</li>
                  <li>TWITTER_CONSUMER_SECRET (API Secret)</li>
                  <li>TWITTER_ACCESS_TOKEN</li>
                  <li>TWITTER_ACCESS_TOKEN_SECRET</li>
                  <li>Get them at: developer.twitter.com</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Facebook/Instagram:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>FACEBOOK_APP_ID</li>
                  <li>FACEBOOK_APP_SECRET</li>
                  <li>FACEBOOK_ACCESS_TOKEN</li>
                  <li>Get them at: developers.facebook.com</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">LinkedIn:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>LINKEDIN_CLIENT_ID</li>
                  <li>LINKEDIN_CLIENT_SECRET</li>
                  <li>LINKEDIN_ACCESS_TOKEN</li>
                  <li>Get them at: developer.linkedin.com</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Posting Analytics
              </CardTitle>
              <CardDescription>Track performance of your scheduled posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-2xl font-bold text-blue-500">{postingStats.thisMonth}</p>
                  <p className="text-sm text-muted-foreground">Posts This Month</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-2xl font-bold text-green-500">{postingStats.posted}</p>
                  <p className="text-sm text-muted-foreground">Successfully Posted</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="text-2xl font-bold text-orange-500">{postingStats.pending}</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View all scheduled posts in calendar format</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Calendar view coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutoPosting;
