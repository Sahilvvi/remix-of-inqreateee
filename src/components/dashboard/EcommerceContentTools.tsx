import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, Download, Package, Sparkles, Upload, Eye, EyeOff,
  FileSpreadsheet, CheckSquare, Square, Table, X, Copy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductListing {
  id: string;
  product_name: string;
  platform: string;
  title: string;
  description: string;
  bullet_points?: string[];
  keywords?: string[];
  created_at: string;
}

interface GeneratedProduct {
  productName: string;
  platform: string;
  title: string;
  description: string;
  bulletPoints: string[];
  keywords: string[];
}

const platforms = [
  { id: "amazon", name: "Amazon", checked: false },
  { id: "meesho", name: "Meesho", checked: false },
  { id: "flipkart", name: "Flipkart", checked: false },
  { id: "shopify", name: "Shopify", checked: false },
];

const contentTypes = [
  { id: "titles", name: "Titles", checked: true },
  { id: "descriptions", name: "Descriptions", checked: true },
  { id: "bullet_points", name: "Bullet Points", checked: false },
];

const suggestedKeywords = [
  "e-commerce content generation",
  "product description AI",
  "Amazon listing optimization",
  "Shopify SEO tools",
  "Flipkart content",
  "Meesho product listings",
  "bulk content automation",
  "SEO keywords for products",
  "e-commerce copywriting",
  "AI content for sales",
];

const EcommerceContentTools = () => {
  const [productInput, setProductInput] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(["titles", "descriptions"]);
  const [generatedProducts, setGeneratedProducts] = useState<GeneratedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    productName: true,
    platform: true,
    title: true,
    description: true,
    bulletPoints: true,
    keywords: true,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    
    const channel = supabase
      .channel('ecommerce-products-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ecommerce_products'
      }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    setIsLoadingHistory(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('ecommerce_products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const formattedProducts: ProductListing[] = (data || []).map(p => ({
        id: p.id,
        product_name: p.product_name,
        platform: p.category,
        title: p.title,
        description: p.description,
        bullet_points: Array.isArray(p.selling_points) ? p.selling_points as string[] : [],
        keywords: Array.isArray(p.tags) ? p.tags as string[] : [],
        created_at: p.created_at,
      }));
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const toggleContentType = (typeId: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setProductInput(text);
      toast({
        title: "File uploaded",
        description: "Product list has been imported. Review and generate content.",
      });
    };
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    if (!productInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter product details.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one platform.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedProducts([]);

    try {
      const results: GeneratedProduct[] = [];
      
      // Generate content for each platform
      for (const platform of selectedPlatforms) {
        const { data, error } = await supabase.functions.invoke('generate-product', {
          body: { 
            productName: productInput.split('\n')[0] || productInput,
            category: platform,
            features: productInput,
            targetAudience: `${platform} shoppers`,
            contentTypes: selectedContentTypes,
          }
        });

        if (error) throw error;

        results.push({
          productName: productInput.split('\n')[0] || productInput,
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          title: data.productData?.title || '',
          description: data.productData?.description || '',
          bulletPoints: data.productData?.sellingPoints || [],
          keywords: data.productData?.tags || [],
        });
      }

      setGeneratedProducts(results);
      toast({
        title: "Content generated!",
        description: `Generated listings for ${results.length} platform(s).`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveAllListings = async () => {
    if (generatedProducts.length === 0) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      for (const product of generatedProducts) {
        await supabase.from('ecommerce_products').insert({
          user_id: user.id,
          product_name: product.productName,
          category: product.platform.toLowerCase(),
          title: product.title,
          description: product.description,
          selling_points: product.bulletPoints,
          tags: product.keywords,
          status: 'draft',
        });
      }

      toast({
        title: "Saved!",
        description: `${generatedProducts.length} listings saved successfully.`,
      });
      
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const downloadAllListings = () => {
    if (generatedProducts.length === 0) return;

    const csvContent = [
      ["Product Name", "Platform", "Title", "Description", "Bullet Points", "Keywords"].join(","),
      ...generatedProducts.map(p => [
        `"${p.productName}"`,
        `"${p.platform}"`,
        `"${p.title}"`,
        `"${p.description.replace(/"/g, '""')}"`,
        `"${p.bulletPoints.join('; ')}"`,
        `"${p.keywords.join(', ')}"`,
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-listings.csv';
    a.click();

    toast({
      title: "Downloaded!",
      description: "Product listings exported as CSV.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">E-commerce Content Tools</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Streamline the creation of product listings for online marketplaces with AI-powered titles, descriptions, and SEO keywords.
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Details Input */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-lg">Product Details Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='Enter product details (e.g., "Luxury Leather Handbag, black, durable, spacious, for women")...'
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Product List (CSV/Excel)
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Max 50 products per batch.</p>
          </CardContent>
        </Card>

        {/* Platforms & Content Types */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-lg">Target Platforms & Content Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platforms */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Select Platforms:</Label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <label
                      htmlFor={platform.id}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Select Content Types:</Label>
              <div className="grid grid-cols-2 gap-3">
                {contentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedContentTypes.includes(type.id)}
                      onCheckedChange={() => toggleContentType(type.id)}
                    />
                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generated Product Listings */}
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Table className="w-5 h-5" />
              Generated Product Listings
            </CardTitle>
            {generatedProducts.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={saveAllListings}>
                  <Package className="w-4 h-4 mr-2" />
                  Save All
                </Button>
                <Button variant="outline" size="sm" onClick={downloadAllListings}>
                  <Download className="w-4 h-4 mr-2" />
                  Download All Listings
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {generatedProducts.length === 0 && products.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No product listings yet. Enter product details and generate content.</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Product Name</TableHead>
                    <TableHead className="w-[100px]">Platform</TableHead>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead className="min-w-[250px]">Description</TableHead>
                    <TableHead className="min-w-[200px]">Bullet Points</TableHead>
                    <TableHead className="min-w-[150px]">Keywords</TableHead>
                    <TableHead className="w-[80px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Generated products */}
                  {generatedProducts.map((product, index) => (
                    <TableRow key={`generated-${index}`} className="bg-primary/5">
                      <TableCell className="font-medium">{product.productName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.platform}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{product.title}</TableCell>
                      <TableCell>
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {product.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <ul className="text-xs space-y-1">
                          {product.bulletPoints.slice(0, 3).map((point, i) => (
                            <li key={i} className="truncate">• {point}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.keywords.slice(0, 3).map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(JSON.stringify(product, null, 2))}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {/* Saved products */}
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.product_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{product.platform}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{product.title}</TableCell>
                      <TableCell>
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {product.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <ul className="text-xs space-y-1">
                          {(product.bullet_points || []).slice(0, 3).map((point, i) => (
                            <li key={i} className="truncate">• {point}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(product.keywords || []).slice(0, 3).map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(JSON.stringify(product, null, 2))}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Suggested SEO Keywords */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg">Suggested SEO Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedKeywords.map((keyword, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                onClick={() => copyToClipboard(keyword)}
              >
                {keyword}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Keywords automatically generated based on product details and platform best practices.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceContentTools;
