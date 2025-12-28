import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Save, CheckCircle2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface BlogPreviewProps {
  topic: string;
  content: string;
  imageUrl?: string;
  keywords: string;
  tone: string;
  language: string;
  wordCount: string;
  imagePrompt?: string;
  onSaved?: () => void;
}

interface SavedBlog {
  id: string;
  title: string;
  content: string;
  topic: string;
  keywords: string | null;
  tone: string;
  language: string;
  word_count: number;
  image_url: string | null;
  created_at: string;
}

export const BlogPreview = ({
  topic,
  content,
  imageUrl,
  keywords,
  tone,
  language,
  wordCount,
  imagePrompt,
  onSaved,
}: BlogPreviewProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [latestSaved, setLatestSaved] = useState<SavedBlog | null>(null);
  const [loadingSaved, setLoadingSaved] = useState(true);

  useEffect(() => {
    fetchLatestSaved();
  }, []);

  const fetchLatestSaved = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("generated_blogs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setLatestSaved(data);
      }
    } catch (error) {
      console.error("Error fetching latest blog:", error);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleCopy = () => {
    const displayContent = content || latestSaved?.content || "";
    const displayImage = imageUrl || latestSaved?.image_url || "";
    const displayTopic = topic || latestSaved?.topic || "";
    const fullContent = `${displayImage ? `![${displayTopic}](${displayImage})\n\n` : ''}${displayContent}`;
    navigator.clipboard.writeText(fullContent);
    toast({
      title: "Copied!",
      description: "Blog content copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const displayContent = content || latestSaved?.content || "";
    const displayTopic = topic || latestSaved?.topic || "";
    const displayImage = imageUrl || latestSaved?.image_url || "";
    const fullContent = `# ${displayTopic}\n\n${displayImage ? `![${displayTopic}](${displayImage})\n\n` : ''}${displayContent}`;
    const element = document.createElement("a");
    const file = new Blob([fullContent], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${displayTopic.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Downloaded!",
      description: "Blog post downloaded as Markdown.",
    });
  };

  const handleSave = async () => {
    if (!content) {
      toast({
        title: "Nothing to save",
        description: "Generate content first before saving.",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("generated_blogs").insert({
        user_id: user.id,
        title: topic,
        content,
        topic,
        keywords,
        tone,
        language,
        word_count: parseInt(wordCount),
        image_url: imageUrl,
        image_prompt: imagePrompt,
      });

      if (error) throw error;

      toast({
        title: "Saved!",
        description: "Blog post saved to your history.",
      });
      onSaved?.();
      fetchLatestSaved();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Use current content or fallback to latest saved
  const displayContent = content || latestSaved?.content || "";
  const displayTopic = topic || latestSaved?.topic || "";
  const displayImage = imageUrl || latestSaved?.image_url || "";
  const displayTone = tone || latestSaved?.tone || "";
  const displayLanguage = language || latestSaved?.language || "";
  const displayWordCount = content ? wordCount : (latestSaved?.word_count?.toString() || "");
  const displayKeywords = keywords || latestSaved?.keywords || "";
  const isShowingSaved = !content && latestSaved;

  if (!displayContent && !loadingSaved) {
    return (
      <Card className="p-16 text-center border-2 border-dashed">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No Content Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Generate your blog content to see a beautiful preview here
          </p>
        </div>
      </Card>
    );
  }

  if (loadingSaved && !content) {
    return (
      <Card className="p-16 text-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading preview...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        {isShowingSaved && (
          <Badge variant="outline" className="text-sm">
            Showing last saved post
          </Badge>
        )}
        <div className="flex flex-wrap gap-3 ml-auto">
          <Button variant="outline" size="lg" onClick={handleCopy} className="gap-2">
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          <Button variant="outline" size="lg" onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          {content && (
            <Button size="lg" onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save to History"}
            </Button>
          )}
        </div>
      </div>

      {/* Preview Card */}
      <Card className="border-2 shadow-lg overflow-hidden">
        <CardHeader className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">{displayTone}</Badge>
            <Badge variant="secondary" className="text-sm">{displayLanguage}</Badge>
            <Badge variant="secondary" className="text-sm">{displayWordCount} words</Badge>
          </div>
          <CardTitle className="text-3xl">{displayTopic}</CardTitle>
          {displayKeywords && (
            <CardDescription className="text-base">
              Keywords: {displayKeywords}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {displayImage && (
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src={displayImage} alt={displayTopic} className="w-full" />
            </div>
          )}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap leading-relaxed">{displayContent}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
