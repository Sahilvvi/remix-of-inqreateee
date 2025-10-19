import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, Download } from "lucide-react";

const EcommerceGenerator = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!productName.trim() || !category.trim()) {
      toast({
        title: "Error",
        description: "Please fill in at least product name and category.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-product', {
        body: { productName, category, features, targetAudience }
      });

      if (error) throw error;

      setProductData(data.productData);
      toast({
        title: "Success",
        description: "Product content generated!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate product content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: 'json' | 'csv') => {
    if (!productData) return;

    let content = '';
    let filename = '';

    if (format === 'json') {
      content = JSON.stringify(productData, null, 2);
      filename = `${productName.replace(/\s+/g, '-')}.json`;
    } else {
      // CSV format
      content = `Title,Description,Tags,Meta Description\n"${productData.title || ''}","${productData.description || ''}","${(productData.tags || []).join(', ')}","${productData.metaDescription || ''}"`;
      filename = `${productName.replace(/\s+/g, '-')}.csv`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    toast({
      title: "Exported!",
      description: `Product data exported as ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">E-Commerce Product Generator</h1>
        <p className="text-muted-foreground">Generate optimized product listings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Enter your product information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                placeholder="e.g., Wireless Bluetooth Headphones"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Electronics, Fashion, Home & Garden"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features</Label>
              <Textarea
                id="features"
                placeholder="List key features, specifications, or benefits..."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., Young professionals, Fitness enthusiasts"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Product Content"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>AI-optimized product listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!productData ? (
              <div className="text-center py-12 text-muted-foreground">
                Generate content to see results
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Product Title</Label>
                    <p className="mt-1 p-3 rounded-lg bg-muted/50">{productData.title}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Description</Label>
                    <p className="mt-1 p-3 rounded-lg bg-muted/50 text-sm max-h-[200px] overflow-y-auto">
                      {productData.description}
                    </p>
                  </div>

                  {productData.sellingPoints && productData.sellingPoints.length > 0 && (
                    <div>
                      <Label className="text-sm font-semibold">Key Selling Points</Label>
                      <ul className="mt-1 space-y-1">
                        {productData.sellingPoints.map((point: string, index: number) => (
                          <li key={index} className="text-sm p-2 rounded bg-muted/30 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {productData.tags && productData.tags.length > 0 && (
                    <div>
                      <Label className="text-sm font-semibold">Tags</Label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {productData.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {productData.metaDescription && (
                    <div>
                      <Label className="text-sm font-semibold">Meta Description</Label>
                      <p className="mt-1 p-3 rounded-lg bg-muted/50 text-sm">
                        {productData.metaDescription}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport('json')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export JSON
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport('csv')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcommerceGenerator;
