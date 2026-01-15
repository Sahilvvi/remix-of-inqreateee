import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, Download, Sparkles, Image, Wand2, Copy, 
  RefreshCw, Palette, Camera, Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const imageStyles = [
  { id: "realistic", name: "Realistic Photo" },
  { id: "illustration", name: "Digital Illustration" },
  { id: "3d", name: "3D Render" },
  { id: "watercolor", name: "Watercolor Art" },
  { id: "minimalist", name: "Minimalist" },
  { id: "vintage", name: "Vintage/Retro" },
  { id: "anime", name: "Anime Style" },
  { id: "sketch", name: "Pencil Sketch" },
];

const useCases = [
  { id: "blog", name: "Blog Header", icon: Image },
  { id: "social", name: "Social Media Post", icon: Camera },
  { id: "product", name: "Product Image", icon: Package },
  { id: "custom", name: "Custom", icon: Palette },
];

const aspectRatios = [
  { id: "1:1", name: "Square (1:1)", description: "Instagram, Profile pics" },
  { id: "16:9", name: "Landscape (16:9)", description: "Blog headers, YouTube" },
  { id: "9:16", name: "Portrait (9:16)", description: "Stories, Reels" },
  { id: "4:3", name: "Standard (4:3)", description: "Presentations" },
];

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [useCase, setUseCase] = useState("blog");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const buildEnhancedPrompt = () => {
    const styleDescriptions: Record<string, string> = {
      realistic: "photorealistic, high detail, professional photography",
      illustration: "digital illustration, vibrant colors, clean lines",
      "3d": "3D rendered, volumetric lighting, modern design",
      watercolor: "watercolor painting style, soft colors, artistic",
      minimalist: "minimalist design, clean, simple, modern",
      vintage: "vintage style, retro aesthetic, warm tones",
      anime: "anime art style, Japanese animation aesthetic",
      sketch: "pencil sketch, hand-drawn, artistic lines",
    };

    const useCaseDescriptions: Record<string, string> = {
      blog: "suitable for a blog header, professional",
      social: "eye-catching for social media, engaging",
      product: "product photography, clean background, commercial",
      custom: "",
    };

    return `${prompt}. Style: ${styleDescriptions[style]}. ${useCaseDescriptions[useCase]}. High quality, ${aspectRatio} aspect ratio.`;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt describing the image you want.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-image', {
        body: { 
          prompt: buildEnhancedPrompt(),
          aspectRatio,
        }
      });

      if (error) throw error;

      if (data.imageUrl) {
        setGeneratedImages([data.imageUrl]);
        setSelectedImage(data.imageUrl);
        toast({
          title: "Image Generated!",
          description: "Your AI image has been created successfully.",
        });
      } else {
        throw new Error("No image returned from API");
      }
    } catch (error: any) {
      console.error('Error generating image:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-image-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({ title: "Downloaded!", description: "Image saved to your device." });
    } catch (error) {
      // For base64 images
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `ai-image-${Date.now()}.png`;
      a.click();
      toast({ title: "Downloaded!", description: "Image saved to your device." });
    }
  };

  const copyImageUrl = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">AI Image Generator</h1>
        <p className="text-muted-foreground text-sm">
          Create stunning images for your content using AI. Perfect for blogs, social media, and product images.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input Controls */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Describe Your Image</h2>
            <Textarea
              placeholder="Describe the image you want to generate... (e.g., 'A serene mountain landscape at sunset with a lake reflection')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground mb-4"
            />
            
            {/* Quick Prompts */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Quick Prompts:</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Professional business meeting",
                  "Abstract technology background",
                  "Nature landscape",
                  "Modern office workspace",
                  "Food photography",
                ].map((quickPrompt) => (
                  <Badge
                    key={quickPrompt}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted transition-colors text-xs"
                    onClick={() => setPrompt(quickPrompt)}
                  >
                    {quickPrompt}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Use Case Selection */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Use Case</h2>
            <div className="grid grid-cols-2 gap-3">
              {useCases.map((uc) => {
                const Icon = uc.icon;
                return (
                  <button
                    key={uc.id}
                    onClick={() => setUseCase(uc.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      useCase === uc.id
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{uc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style & Aspect Ratio */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Style & Format</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Image Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {imageStyles.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ar) => (
                      <SelectItem key={ar.id} value={ar.id}>
                        <div className="flex flex-col">
                          <span>{ar.name}</span>
                          <span className="text-xs text-muted-foreground">{ar.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full h-12 bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium text-base"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </div>

        {/* Right Column - Preview */}
        <div className="bg-card rounded-lg border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Generated Image</h2>
            {selectedImage && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyImageUrl(selectedImage)}
                  className="border-border"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadImage(selectedImage)}
                  className="border-border"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            )}
          </div>

          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center min-h-[300px]">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-sm">Creating your image...</p>
              </div>
            ) : selectedImage ? (
              <img
                src={selectedImage}
                alt="Generated AI Image"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Image className="w-16 h-16 opacity-40" />
                <p className="text-sm">Your generated image will appear here</p>
                <p className="text-xs opacity-60">Enter a prompt and click Generate</p>
              </div>
            )}
          </div>

          {/* Image History */}
          {generatedImages.length > 1 && (
            <div className="mt-4">
              <Label className="text-sm text-muted-foreground mb-2 block">Recent Generations</Label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {generatedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img ? "border-primary" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img src={img} alt={`Generated ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-2">💡 Tips for Better Results</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be specific about colors, lighting, and mood</li>
              <li>• Mention the subject and background separately</li>
              <li>• Add style keywords like "cinematic" or "vibrant"</li>
              <li>• Specify perspective (close-up, wide shot, etc.)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
