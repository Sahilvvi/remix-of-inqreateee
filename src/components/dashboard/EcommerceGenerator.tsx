import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, Download, Package, Image as ImageIcon, DollarSign, BarChart3, History, Eye, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const EcommerceGenerator = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [inventory, setInventory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    
    const channel = supabase
      .channel('ecommerce-products-changes')
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
      if (!user) {
        setIsLoadingHistory(false);
        return;
      }

      const { data, error } = await supabase
        .from('ecommerce_products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

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

  const handleSave = async () => {
    if (!productData) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from('ecommerce_products').insert({
        user_id: user.id,
        product_name: productName,
        category,
        features,
        target_audience: targetAudience,
        title: productData.title,
        description: productData.description,
        selling_points: productData.sellingPoints,
        tags: productData.tags,
        meta_description: productData.metaDescription,
        price: price ? parseFloat(price) : null,
        sku,
        inventory_count: inventory ? parseInt(inventory) : 0,
        image_url: imageUrl,
        status
      });

      if (error) throw error;

      toast({
        title: "Saved!",
        description: "Product listing saved successfully.",
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ecommerce_products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Product deleted successfully.",
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">E-Commerce Product Generator</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Generate optimized product listings with AI</p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs sm:text-sm">
          <TabsTrigger value="generate">
            <Package className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Generate</span>
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Enter your product information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
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
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                        <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                        <SelectItem value="Beauty & Health">Beauty & Health</SelectItem>
                        <SelectItem value="Toys & Games">Toys & Games</SelectItem>
                        <SelectItem value="Books & Media">Books & Media</SelectItem>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      placeholder="e.g., WBH-2024-BLK"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory Count</Label>
                    <Input
                      id="inventory"
                      type="number"
                      placeholder="0"
                      value={inventory}
                      onChange={(e) => setInventory(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      placeholder="https://example.com/product.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
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
                    onClick={handleSave}
                    className="flex-1"
                    disabled={!productData}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Save Product
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport('json')}
                    disabled={!productData}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export JSON
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport('csv')}
                    disabled={!productData}
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
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          {!productData && products.length === 0 ? (
            <Card className="glass-effect">
              <CardContent className="py-12 text-center text-muted-foreground">
                Generate product content to see preview
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Preview</CardTitle>
                    <CardDescription>How your product will appear</CardDescription>
                  </div>
                  {!productData && products.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      Showing last saved product
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {(() => {
                  const displayProduct = productData || (products.length > 0 ? {
                    title: products[0].title,
                    description: products[0].description,
                    sellingPoints: products[0].selling_points,
                    metaDescription: products[0].meta_description,
                  } : null);
                  const displayImage = imageUrl || products[0]?.image_url;
                  const displayPrice = price || products[0]?.price;
                  const displaySku = sku || products[0]?.sku;
                  const displayInventory = inventory || products[0]?.inventory_count;

                  if (!displayProduct) return null;

                  return (
                    <>
                      {displayImage && (
                        <div className="w-full h-64 rounded-lg overflow-hidden bg-muted/30">
                          <img 
                            src={displayImage} 
                            alt={displayProduct.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{displayProduct.title}</h2>
                        {displayPrice && (
                          <p className="text-3xl font-bold text-primary mb-4">${displayPrice}</p>
                        )}
                        <p className="text-muted-foreground mb-4">{displayProduct.description}</p>
                        
                        {displayProduct.sellingPoints && displayProduct.sellingPoints.length > 0 && (
                          <div className="mb-4">
                            <h3 className="font-semibold mb-2">Key Features:</h3>
                            <ul className="space-y-2">
                              {displayProduct.sellingPoints.map((point: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">✓</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {displaySku && (
                          <p className="text-sm text-muted-foreground">SKU: {displaySku}</p>
                        )}
                        
                        {displayInventory && (
                          <p className="text-sm text-muted-foreground">
                            Stock: {displayInventory} units available
                          </p>
                        )}
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Product History</CardTitle>
              <CardDescription>All your generated products</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No products generated yet
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{product.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              product.status === 'active' ? 'bg-green-500/10 text-green-500' :
                              product.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-gray-500/10 text-gray-500'
                            }`}>
                              {product.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {product.category}
                          </p>
                          {product.price && (
                            <p className="text-lg font-bold text-primary">${product.price}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Created: {new Date(product.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <Package className="h-8 w-8 text-primary" />
                  <span className="text-sm text-green-500">+12%</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{products.length}</h3>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <span className="text-sm text-green-500">+8%</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">
                  {products.filter(p => p.status === 'active').length}
                </h3>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <ImageIcon className="h-8 w-8 text-blue-500" />
                  <span className="text-sm text-green-500">+15%</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">
                  {products.filter(p => p.image_url).length}
                </h3>
                <p className="text-sm text-muted-foreground">With Images</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EcommerceGenerator;
