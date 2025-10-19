import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image, Loader2, Sparkles } from "lucide-react";

interface BlogImageGeneratorProps {
  onImageGenerated: (imageUrl: string, prompt: string) => void;
  currentImageUrl?: string;
  currentPrompt?: string;
}

export const BlogImageGenerator = ({
  onImageGenerated,
  currentImageUrl,
  currentPrompt,
}: BlogImageGeneratorProps) => {
  const [imagePrompt, setImagePrompt] = useState(currentPrompt || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image description.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: imagePrompt },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        onImageGenerated(data.imageUrl, imagePrompt);
        toast({
          title: "Success!",
          description: "Blog image generated successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="imagePrompt" className="text-base font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Image Description
        </Label>
        <Input
          id="imagePrompt"
          placeholder="Describe the perfect visual for your blog post..."
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          className="h-12 text-base border-2 focus:border-primary transition-colors"
        />
        <p className="text-sm text-muted-foreground">
          Be specific about style, mood, colors, and key elements you want in the image
        </p>
      </div>

      <Button 
        onClick={handleGenerateImage} 
        disabled={loading} 
        className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" 
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-3 w-6 h-6 animate-spin" />
            Creating Your Image...
          </>
        ) : (
          <>
            <Image className="mr-3 w-6 h-6" />
            Generate Blog Image
          </>
        )}
      </Button>

      {currentImageUrl && (
        <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-0">
            <div className="relative group">
              <img
                src={currentImageUrl}
                alt="Generated blog image"
                className="w-full rounded-lg transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
