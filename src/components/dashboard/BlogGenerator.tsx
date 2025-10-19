import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Sparkles } from "lucide-react";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState("800");
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [loading, setLoading] = useState(false);
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
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            topic,
            keywords,
            tone,
            wordCount: parseInt(wordCount),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate blog");
      }

      const data = await response.json();
      setGeneratedBlog(data.blog);

      toast({
        title: "Success!",
        description: "Your blog post has been generated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBlog);
    toast({
      title: "Copied!",
      description: "Blog post copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedBlog], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `blog-${topic.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Downloaded!",
      description: "Blog post has been downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Blog Generator</h1>
        <p className="text-muted-foreground">
          Create engaging, SEO-optimized blog posts with AI
        </p>
      </div>

      <Card className="p-6 glass-effect">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="Enter your blog topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                placeholder="AI, automation, technology"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="wordCount">Target Word Count</Label>
              <Select value={wordCount} onValueChange={setWordCount}>
                <SelectTrigger id="wordCount">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 words</SelectItem>
                  <SelectItem value="800">800 words</SelectItem>
                  <SelectItem value="1000">1000 words</SelectItem>
                  <SelectItem value="1500">1500 words</SelectItem>
                  <SelectItem value="2000">2000 words</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-6"
          size="lg"
        >
          {loading ? (
            <>Generating...</>
          ) : (
            <>
              <Sparkles className="mr-2 w-5 h-5" />
              Generate Blog Post
            </>
          )}
        </Button>
      </Card>

      {generatedBlog && (
        <Card className="p-6 glass-effect">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Generated Blog Post</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={generatedBlog}
            onChange={(e) => setGeneratedBlog(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
        </Card>
      )}
    </div>
  );
};

export default BlogGenerator;
