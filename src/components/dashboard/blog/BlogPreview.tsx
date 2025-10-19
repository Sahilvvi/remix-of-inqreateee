import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Generate content to see preview</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button size="sm" onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save to History"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img src={imageUrl} alt={topic} className="w-full" />
            </div>
          )}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap">{content}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
