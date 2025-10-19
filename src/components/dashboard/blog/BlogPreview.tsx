import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Save, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
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

  const handleCopy = () => {
    const fullContent = `${imageUrl ? `![${topic}](${imageUrl})\n\n` : ''}${content}`;
    navigator.clipboard.writeText(fullContent);
    toast({
      title: "Copied!",
      description: "Blog content copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const fullContent = `# ${topic}\n\n${imageUrl ? `![${topic}](${imageUrl})\n\n` : ''}${content}`;
    const element = document.createElement("a");
    const file = new Blob([fullContent], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Downloaded!",
      description: "Blog post downloaded as Markdown.",
    });
  };

  const handleSave = async () => {
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

  if (!content) {
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

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Button variant="outline" size="lg" onClick={handleCopy} className="gap-2">
          <Copy className="w-4 h-4" />
          Copy
        </Button>
        <Button variant="outline" size="lg" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button size="lg" onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save to History"}
        </Button>
      </div>

      {/* Preview Card */}
      <Card className="border-2 shadow-lg overflow-hidden">
        <CardHeader className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">{tone}</Badge>
            <Badge variant="secondary" className="text-sm">{language}</Badge>
            <Badge variant="secondary" className="text-sm">{wordCount} words</Badge>
          </div>
          <CardTitle className="text-3xl">{topic}</CardTitle>
          {keywords && (
            <CardDescription className="text-base">
              Keywords: {keywords}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src={imageUrl} alt={topic} className="w-full" />
            </div>
          )}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
