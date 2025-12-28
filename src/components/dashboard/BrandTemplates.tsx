import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, FileText, MessageSquare, ShoppingCart, Sparkles, Save, History, Palette, Trash2, Loader2 } from "lucide-react";

const defaultTemplates = [
  {
    id: "default-1",
    name: "Professional Blog Post",
    category: "Blog",
    icon: FileText,
    template: "## [Your Title Here]\n\n### Introduction\n[Engaging opening paragraph]\n\n### Main Points\n- Point 1\n- Point 2\n- Point 3\n\n### Conclusion\n[Compelling conclusion with CTA]",
  },
  {
    id: "default-2",
    name: "Instagram Caption",
    category: "Social",
    icon: MessageSquare,
    template: "✨ [Attention-grabbing hook]\n\n[Value-packed content]\n\n💡 [Call to action]\n\n#hashtag1 #hashtag2 #hashtag3",
  },
  {
    id: "default-3",
    name: "Product Description",
    category: "E-commerce",
    icon: ShoppingCart,
    template: "🌟 [Product Name]\n\n✅ Key Features:\n• Feature 1\n• Feature 2\n• Feature 3\n\n💎 Benefits:\n[Explain value proposition]\n\n🛒 [CTA: Shop Now]",
  },
  {
    id: "default-4",
    name: "LinkedIn Post",
    category: "Social",
    icon: Sparkles,
    template: "[Professional hook question]\n\nHere are 3 insights:\n\n1️⃣ [First insight]\n2️⃣ [Second insight]\n3️⃣ [Third insight]\n\nWhat's your experience? Share in comments 👇",
  },
  {
    id: "default-5",
    name: "SEO Article Template",
    category: "Blog",
    icon: FileText,
    template: "# [SEO-Optimized Title with Keyword]\n\n## Table of Contents\n1. [Section 1]\n2. [Section 2]\n3. [Section 3]\n\n## Introduction\n[Hook with target keyword]\n\n## [H2: Main Section]\n### [H3: Subsection]\n[Content with keywords naturally integrated]\n\n## Conclusion\n[Summary with keyword and CTA]",
  },
  {
    id: "default-6",
    name: "Email Campaign",
    category: "Marketing",
    icon: MessageSquare,
    template: "Subject: [Compelling subject line]\n\nHi [Name],\n\n[Personalized opening]\n\n[Value proposition]\n\n[Social proof or benefits]\n\n[Clear CTA button]\n\nBest regards,\n[Your Name]",
  },
  {
    id: "default-7",
    name: "Twitter Thread Starter",
    category: "Social",
    icon: MessageSquare,
    template: "🧵 Thread: [Hook Topic]\n\n1/ [Opening statement that grabs attention]\n\n[Continue with 280-character insights]",
  },
  {
    id: "default-8",
    name: "Product Launch Announcement",
    category: "Marketing",
    icon: Sparkles,
    template: "🚀 BIG NEWS!\n\nWe're thrilled to announce [Product Name]!\n\n✨ What makes it special:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\n🎉 [Limited time offer/Launch details]\n\n👉 [CTA]",
  },
  {
    id: "default-9",
    name: "Case Study Template",
    category: "Blog",
    icon: FileText,
    template: "# Case Study: [Client/Project Name]\n\n## Challenge\n[Problem description]\n\n## Solution\n[How you solved it]\n\n## Results\n- [Metric 1]\n- [Metric 2]\n- [Metric 3]\n\n## Conclusion\n[Key takeaways]",
  },
  {
    id: "default-10",
    name: "Facebook Ad Copy",
    category: "Marketing",
    icon: MessageSquare,
    template: "[Attention-grabbing headline]\n\n[Problem statement]\n\n[Solution/Benefit]\n\n[Social proof]\n\n[CTA with urgency]",
  },
];

interface SavedTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  created_at: string;
}

const BrandTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customName, setCustomName] = useState("");
  const [customTemplate, setCustomTemplate] = useState("");
  const [customCategory, setCustomCategory] = useState("Custom");
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedTemplates();

    // Set up realtime subscription
    const channel = supabase
      .channel('brand-templates-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'brand_templates'
        },
        () => {
          fetchSavedTemplates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSavedTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('brand_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load saved templates.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["All", "Blog", "Social", "E-commerce", "Marketing", "Custom"];

  const allTemplates = [
    ...defaultTemplates.map(t => ({ ...t, isDefault: true })),
    ...savedTemplates.map(t => ({ ...t, icon: Palette, isDefault: false }))
  ];
  
  const filteredTemplates = selectedCategory === "All"
    ? allTemplates
    : allTemplates.filter(t => t.category === selectedCategory);

  const handleCopyTemplate = (template: string, name: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Template Copied!",
      description: `${name} copied to clipboard.`,
    });
  };

  const handleUseTemplate = (template: string, category: string) => {
    localStorage.setItem('selectedTemplate', template);
    localStorage.setItem('templateCategory', category);
    
    toast({
      title: "Template Selected!",
      description: `Navigate to ${category} Generator to use this template.`,
    });
  };

  const handleSaveCustomTemplate = async () => {
    if (!customName.trim() || !customTemplate.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both name and template content.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to save templates.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('brand_templates')
        .insert({
          user_id: user.id,
          name: customName.trim(),
          category: customCategory.trim() || 'Custom',
          template: customTemplate.trim(),
        });

      if (error) throw error;

      setCustomName("");
      setCustomTemplate("");
      setCustomCategory("Custom");
      
      toast({
        title: "Template Saved!",
        description: "Your custom template has been saved to the database.",
      });
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Error",
        description: "Failed to save template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('brand_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Template Deleted",
        description: "Your custom template has been removed.",
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-3 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
          <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
          Content Template Library
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Brand Templates
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional templates for all your content needs - synced across all devices
        </p>
      </div>

      <Tabs defaultValue="browse" className="max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 backdrop-blur-sm text-xs sm:text-sm">
          <TabsTrigger value="browse" className="gap-1 sm:gap-2">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Browse</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-1 sm:gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Create</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-1 sm:gap-2">
            <History className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Saved ({savedTemplates.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6 space-y-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-primary">{template.category}</span>
                      {!template.isDefault && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground">Custom</span>
                      )}
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 min-h-[150px] max-h-[200px] overflow-y-auto">
                      <pre className="text-xs whitespace-pre-wrap font-mono">{template.template}</pre>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCopyTemplate(template.template, template.name)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleUseTemplate(template.template, template.category)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Create Custom Template
              </CardTitle>
              <CardDescription>Build your own reusable content templates - saved to cloud and synced across devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customName">Template Name</Label>
                  <Input
                    id="customName"
                    placeholder="My Custom Template"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customCategory">Category</Label>
                  <Input
                    id="customCategory"
                    placeholder="Custom"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customTemplate">Template Content</Label>
                <Textarea
                  id="customTemplate"
                  placeholder="Enter your template content here..."
                  value={customTemplate}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <Button
                onClick={handleSaveCustomTemplate}
                className="w-full h-12"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Custom Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                My Saved Templates
              </CardTitle>
              <CardDescription>Your custom created templates - synced across all devices</CardDescription>
            </CardHeader>
            <CardContent>
              {savedTemplates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No custom templates yet</p>
                  <p className="text-sm mt-2">Create your first template in the "Create" tab</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTemplates.map((template) => (
                    <Card key={template.id} className="glass-effect">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4 max-h-[200px] overflow-y-auto">
                          <pre className="text-xs whitespace-pre-wrap font-mono">{template.template}</pre>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleCopyTemplate(template.template, template.name)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleUseTemplate(template.template, template.category)}
                          >
                            Use
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandTemplates;