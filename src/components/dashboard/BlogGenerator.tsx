import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, FileText, Image as ImageIcon, Eye, History, BarChart3 } from "lucide-react";
import { BlogContentForm } from "./blog/BlogContentForm";
import { BlogImageGenerator } from "./blog/BlogImageGenerator";
import { BlogPreview } from "./blog/BlogPreview";
import { BlogHistory } from "./blog/BlogHistory";
import { BlogAnalytics } from "./blog/BlogAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("english");
  const [wordCount, setWordCount] = useState("800");
  const [contentStructure, setContentStructure] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic for your blog post.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog", {
        body: { topic, keywords, tone, wordCount: parseInt(wordCount), language },
      });

      if (error) throw error;

      if (data?.blog) {
        setGeneratedBlog(data.blog);
        toast({
          title: "Success!",
          description: "Your blog post has been generated.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate blog",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageGenerated = (url: string, prompt: string) => {
    setImageUrl(url);
    setImagePrompt(prompt);
  };

  const handleSaved = () => {
    setHistoryRefresh((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-3 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          AI-Powered Content Studio
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Premium Blog Generator
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Create professional, SEO-optimized blog posts with stunning visuals
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="generate" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Eye className="w-3 h-3 sm:w-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6 mt-6">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Content Generation
                </CardTitle>
                <CardDescription>Configure your blog post parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <BlogContentForm
                  topic={topic}
                  setTopic={setTopic}
                  keywords={keywords}
                  setKeywords={setKeywords}
                  tone={tone}
                  setTone={setTone}
                  language={language}
                  setLanguage={setLanguage}
                  wordCount={wordCount}
                  setWordCount={setWordCount}
                  contentStructure={contentStructure}
                  setContentStructure={setContentStructure}
                  targetAudience={targetAudience}
                  setTargetAudience={setTargetAudience}
                />

                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Generating Your Blog Post...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 w-6 h-6" />
                      Generate Blog Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="space-y-6 mt-6">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  Visual Content Generation
                </CardTitle>
                <CardDescription>Create stunning custom images</CardDescription>
              </CardHeader>
              <CardContent>
                <BlogImageGenerator
                  onImageGenerated={handleImageGenerated}
                  currentImageUrl={imageUrl}
                  currentPrompt={imagePrompt}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <BlogPreview
              topic={topic}
              content={generatedBlog}
              imageUrl={imageUrl}
              keywords={keywords}
              tone={tone}
              language={language}
              wordCount={wordCount}
              imagePrompt={imagePrompt}
              onSaved={handleSaved}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <BlogAnalytics />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <BlogHistory refreshTrigger={historyRefresh} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogGenerator;
