import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogContentForm } from "./blog/BlogContentForm";
import { BlogImageGenerator } from "./blog/BlogImageGenerator";
import { BlogPreview } from "./blog/BlogPreview";
import { BlogHistory } from "./blog/BlogHistory";
import { supabase } from "@/integrations/supabase/client";

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
        body: {
          topic,
          keywords,
          tone,
          wordCount: parseInt(wordCount),
          language,
        },
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Premium Blog Generator</h1>
        <p className="text-muted-foreground">
          Create professional, SEO-optimized blog posts with AI in multiple languages
        </p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="image">Generate Image</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card className="p-6 glass-effect">
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
              className="w-full mt-6"
              size="lg"
            >
              {loading ? (
                <>Generating Blog Post...</>
              ) : (
                <>
                  <Sparkles className="mr-2 w-5 h-5" />
                  Generate Blog Post
                </>
              )}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="image" className="space-y-6">
          <Card className="p-6 glass-effect">
            <h3 className="text-xl font-semibold mb-4">Generate Blog Image</h3>
            <p className="text-muted-foreground mb-6">
              Create a stunning visual to accompany your blog post
            </p>
            <BlogImageGenerator
              onImageGenerated={handleImageGenerated}
              currentImageUrl={imageUrl}
              currentPrompt={imagePrompt}
            />
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
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

        <TabsContent value="history" className="space-y-6">
          <BlogHistory refreshTrigger={historyRefresh} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogGenerator;
