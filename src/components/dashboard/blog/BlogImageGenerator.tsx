import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image, Loader2 } from "lucide-react";

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
      <div>
        <Label htmlFor="imagePrompt">Image Description</Label>
        <Input
          id="imagePrompt"
          placeholder="Describe the image you want for your blog post..."
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          className="mt-2"
        />
      </div>

      <Button onClick={handleGenerateImage} disabled={loading} className="w-full" size="lg">
        {loading ? (
          <>
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Generating Image...
          </>
        ) : (
          <>
            <Image className="mr-2 w-5 h-5" />
            Generate Blog Image
          </>
        )}
      </Button>

      {currentImageUrl && (
        <Card className="p-4">
          <img
            src={currentImageUrl}
            alt="Generated blog image"
            className="w-full rounded-lg"
          />
        </Card>
      )}
    </div>
  );
};
