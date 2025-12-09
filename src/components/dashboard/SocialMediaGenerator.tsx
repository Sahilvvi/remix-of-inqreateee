import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Instagram, Facebook, Twitter, Linkedin, TrendingUp, Eye, History, BarChart3, Image as ImageIcon, FileText } from "lucide-react";
import { PostPreview } from "./social/PostPreview";
import { SocialHistory } from "./social/SocialHistory";
import { PerformanceMetrics } from "./social/PerformanceMetrics";

const SocialMediaGenerator = () => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("engaging");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [targetAudience, setTargetAudience] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic for your social media post.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-social", {
        body: {
          topic,
          platform,
          tone,
          includeHashtags,
        },
      });

      if (error) throw error;

      if (data?.post) {
        setGeneratedPost(data.post);
        
        // Save to database
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error: saveError } = await supabase.from('social_media_posts').insert({
            user_id: user.id,
            topic,
            platform,
            post_content: data.post,
            tone,
            include_hashtags: includeHashtags,
            image_url: generatedImage || null,
            image_prompt: imagePrompt || null,
          });

          if (saveError) console.error('Error saving post:', saveError);
          else setHistoryRefresh(prev => prev + 1);
        }

        toast({
          title: "Success!",
          description: "Your social media post has been generated.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image description.",
        variant: "destructive",
      });
      return;
    }

    setImageLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: imagePrompt },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Success!",
          description: "Image generated successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setImageLoading(false);
    }
  };

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-3 sm:p-6 space-y-6 sm:space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          AI-Powered Social Media Studio
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Social Media Generator
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Create engaging posts optimized for every major social platform with AI
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="generate" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Generate</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Content Generation Card */}
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Content Configuration
                  </CardTitle>
                  <CardDescription>Set up your social media post parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="What's your post about?"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(platformIcons).map(([key, Icon]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span className="capitalize">{key}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="engaging">Engaging</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
                    <Input
                      id="targetAudience"
                      placeholder="e.g., Small business owners"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="callToAction">Call to Action (Optional)</Label>
                    <Input
                      id="callToAction"
                      placeholder="e.g., Visit our website"
                      value={callToAction}
                      onChange={(e) => setCallToAction(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="space-y-0.5">
                      <Label>Include Hashtags</Label>
                      <p className="text-sm text-muted-foreground">Add relevant hashtags</p>
                    </div>
                    <Switch checked={includeHashtags} onCheckedChange={setIncludeHashtags} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="space-y-0.5">
                      <Label>Include Emojis</Label>
                      <p className="text-sm text-muted-foreground">Make your post more engaging</p>
                    </div>
                    <Switch checked={includeEmoji} onCheckedChange={setIncludeEmoji} />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-3 w-6 h-6 animate-spin" />
                        Generating Post...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3 w-6 h-6" />
                        Generate Post
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Image Generation Card */}
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-primary" />
                    Image Generation
                  </CardTitle>
                  <CardDescription>Create stunning visuals for your post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="imagePrompt">Image Description</Label>
                    <Textarea
                      id="imagePrompt"
                      placeholder="Describe the image you want to generate..."
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button
                    onClick={handleGenerateImage}
                    disabled={imageLoading}
                    className="w-full h-14 text-lg font-semibold"
                    variant="outline"
                  >
                    {imageLoading ? (
                      <>
                        <Loader2 className="mr-3 w-6 h-6 animate-spin" />
                        Generating Image...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-3 w-6 h-6" />
                        Generate Image
                      </>
                    )}
                  </Button>

                  {generatedImage && (
                    <div className="rounded-lg border-2 overflow-hidden">
                      <img
                        src={generatedImage}
                        alt="Generated"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <PostPreview
              content={generatedPost}
              platform={platform}
              imageUrl={generatedImage}
            />
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <SocialHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialMediaGenerator;