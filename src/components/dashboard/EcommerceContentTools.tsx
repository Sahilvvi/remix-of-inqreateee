import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, Download, Package, Sparkles, Upload, Eye, Copy
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
  { id: "amazon", name: "Amazon" },
  { id: "meesho", name: "Meesho" },
  { id: "flipkart", name: "Flipkart" },
  { id: "shopify", name: "Shopify" },
];

const contentTypes = [
  { id: "titles", name: "Titles" },
  { id: "descriptions", name: "Descriptions" },
  { id: "bullet_points", name: "Bullet Points" },
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
    const allProducts = [...generatedProducts.map(p => ({
      product_name: p.productName,
      platform: p.platform,
      title: p.title,
      description: p.description,
      bullet_points: p.bulletPoints,
      keywords: p.keywords,
    })), ...products];

    if (allProducts.length === 0) return;

    const csvContent = [
      ["Product Name", "Platform", "Title", "Description", "Bullet Points", "Keywords"].join(","),
      ...allProducts.map(p => [
        `"${p.product_name}"`,
        `"${p.platform}"`,
        `"${p.title}"`,
        `"${p.description?.replace(/"/g, '""') || ''}"`,
        `"${(p.bullet_points || []).join('; ')}"`,
        `"${(p.keywords || []).join(', ')}"`,
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

  const allProducts = [
    ...generatedProducts.map((p, idx) => ({ ...p, id: `gen-${idx}`, isGenerated: true })),
    ...products.map(p => ({ 
      ...p, 
      productName: p.product_name,
      bulletPoints: p.bullet_points || [],
      keywords: p.keywords || [],
      isGenerated: false 
    }))
  ];

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">E-commerce Content Tools</h1>
        <p className="text-muted-foreground text-sm">
          Streamline the creation of product listings for online marketplaces with AI-powered titles, descriptions, and SEO keywords.
        </p>
      </div>

      {/* Input Section - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Details Input */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Product Details Input</h2>
          <Textarea
            placeholder='Enter product details (e.g., "Luxury Leather Handbag, black, durable, spacious, for women")...'
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
            className="min-h-[100px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground mb-4"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button 
            variant="outline" 
            className="w-full border-border text-foreground hover:bg-muted"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Product List (CSV/Excel)
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Max 50 products per batch.</p>
        </div>

        {/* Target Platforms & Content Types */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Target Platforms & Content Types</h2>
          
          {/* Platforms */}
          <div className="mb-5">
            <p className="text-sm font-medium text-foreground mb-3">Select Platforms:</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => togglePlatform(platform.id)}
                    className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={platform.id}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {platform.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div className="mb-5">
            <p className="text-sm font-medium text-foreground mb-3">Select Content Types:</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {contentTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedContentTypes.includes(type.id)}
                    onCheckedChange={() => toggleContentType(type.id)}
                    className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={type.id}
                    className="text-sm text-foreground cursor-pointer"
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
            className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium"
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
        </div>
      </div>

      {/* Generated Product Listings */}
      <div className="bg-card rounded-lg border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Generated Product Listings</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadAllListings}
            className="border-border text-foreground hover:bg-muted"
            disabled={allProducts.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Download All Listings
          </Button>
        </div>
        
        <div className="p-0">
          {allProducts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p>No product listings yet. Enter product details and generate content.</p>
            </div>
          ) : (
            <ScrollArea className="h-[350px]">
              <UITable>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide w-[120px]">Product Name</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide w-[90px]">Platform</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide w-[180px]">Title</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide min-w-[200px]">Description</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide min-w-[180px]">Bullet Points</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide min-w-[140px]">Keywords</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-xs uppercase tracking-wide w-[70px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts.map((product, index) => (
                    <TableRow 
                      key={product.id || index} 
                      className={`border-border ${product.isGenerated ? 'bg-primary/5' : ''}`}
                    >
                      <TableCell className="font-medium text-foreground text-sm py-4">
                        {product.productName}
                      </TableCell>
                      <TableCell className="text-foreground text-sm py-4">
                        {product.platform}
                      </TableCell>
                      <TableCell className="text-foreground text-sm py-4">
                        <span className="line-clamp-2">{product.title}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                          {product.description}
                        </p>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                          {(product.bulletPoints || []).slice(0, 3).map((point, i) => (
                            <span key={i} className="block truncate">• {point}</span>
                          ))}
                        </p>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {(product.keywords || []).slice(0, 4).map((keyword, i) => (
                            <span key={i} className="text-xs text-muted-foreground">
                              {keyword}{i < Math.min((product.keywords || []).length, 4) - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
        </div>
      </div>

      {/* Suggested SEO Keywords */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Suggested SEO Keywords</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedKeywords.map((keyword, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-muted transition-colors px-3 py-1.5 text-sm font-normal border-border text-foreground bg-background"
              onClick={() => copyToClipboard(keyword)}
            >
              {keyword}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Keywords automatically generated based on product details and platform best practices.
        </p>
      </div>
    </div>
  );
};

export default EcommerceContentTools;
