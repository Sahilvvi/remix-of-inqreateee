import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, FileText, MessageSquare, ShoppingCart, Sparkles, Save, History, BarChart3, Palette } from "lucide-react";

const defaultTemplates = [
  {
    id: 1,
    name: "Professional Blog Post",
    category: "Blog",
    icon: FileText,
    template: "## [Your Title Here]\n\n### Introduction\n[Engaging opening paragraph]\n\n### Main Points\n- Point 1\n- Point 2\n- Point 3\n\n### Conclusion\n[Compelling conclusion with CTA]",
  },
  {
    id: 2,
    name: "Instagram Caption",
    category: "Social",
    icon: MessageSquare,
    template: "✨ [Attention-grabbing hook]\n\n[Value-packed content]\n\n💡 [Call to action]\n\n#hashtag1 #hashtag2 #hashtag3",
  },
  {
    id: 3,
    name: "Product Description",
    category: "E-commerce",
    icon: ShoppingCart,
    template: "🌟 [Product Name]\n\n✅ Key Features:\n• Feature 1\n• Feature 2\n• Feature 3\n\n💎 Benefits:\n[Explain value proposition]\n\n🛒 [CTA: Shop Now]",
  },
  {
    id: 4,
    name: "LinkedIn Post",
    category: "Social",
    icon: Sparkles,
    template: "[Professional hook question]\n\nHere are 3 insights:\n\n1️⃣ [First insight]\n2️⃣ [Second insight]\n3️⃣ [Third insight]\n\nWhat's your experience? Share in comments 👇",
  },
  {
    id: 5,
    name: "SEO Article Template",
    category: "Blog",
    icon: FileText,
    template: "# [SEO-Optimized Title with Keyword]\n\n## Table of Contents\n1. [Section 1]\n2. [Section 2]\n3. [Section 3]\n\n## Introduction\n[Hook with target keyword]\n\n## [H2: Main Section]\n### [H3: Subsection]\n[Content with keywords naturally integrated]\n\n## Conclusion\n[Summary with keyword and CTA]",
  },
  {
    id: 6,
    name: "Email Campaign",
    category: "Marketing",
    icon: MessageSquare,
    template: "Subject: [Compelling subject line]\n\nHi [Name],\n\n[Personalized opening]\n\n[Value proposition]\n\n[Social proof or benefits]\n\n[Clear CTA button]\n\nBest regards,\n[Your Name]",
  },
  {
    id: 7,
    name: "Twitter Thread Starter",
    category: "Social",
    icon: MessageSquare,
    template: "🧵 Thread: [Hook Topic]\n\n1/ [Opening statement that grabs attention]\n\n[Continue with 280-character insights]",
  },
  {
    id: 8,
    name: "Product Launch Announcement",
    category: "Marketing",
    icon: Sparkles,
    template: "🚀 BIG NEWS!\n\nWe're thrilled to announce [Product Name]!\n\n✨ What makes it special:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\n🎉 [Limited time offer/Launch details]\n\n👉 [CTA]",
  },
  {
    id: 9,
    name: "Case Study Template",
    category: "Blog",
    icon: FileText,
    template: "# Case Study: [Client/Project Name]\n\n## Challenge\n[Problem description]\n\n## Solution\n[How you solved it]\n\n## Results\n- [Metric 1]\n- [Metric 2]\n- [Metric 3]\n\n## Conclusion\n[Key takeaways]",
  },
  {
    id: 10,
    name: "Facebook Ad Copy",
    category: "Marketing",
    icon: MessageSquare,
    template: "[Attention-grabbing headline]\n\n[Problem statement]\n\n[Solution/Benefit]\n\n[Social proof]\n\n[CTA with urgency]",
  },
];

const BrandTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customName, setCustomName] = useState("");
  const [customTemplate, setCustomTemplate] = useState("");
  const [customCategory, setCustomCategory] = useState("Custom");
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedTemplates();
  }, []);

  const fetchSavedTemplates = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const saved = localStorage.getItem(`templates_${user.id}`);
    if (saved) {
      setSavedTemplates(JSON.parse(saved));
    }
  };

  const categories = ["All", "Blog", "Social", "E-commerce", "Marketing", "Custom"];

  const allTemplates = [...defaultTemplates, ...savedTemplates];
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newTemplate = {
      id: Date.now(),
      name: customName,
      category: customCategory,
      icon: Palette,
      template: customTemplate,
    };

    const updated = [...savedTemplates, newTemplate];
    setSavedTemplates(updated);
    localStorage.setItem(`templates_${user.id}`, JSON.stringify(updated));

    setCustomName("");
    setCustomTemplate("");
    
    toast({
      title: "Template Saved!",
      description: "Your custom template has been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Palette className="w-4 h-4" />
          Content Template Library
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Brand Templates
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional templates for all your content needs
        </p>
      </div>

      <Tabs defaultValue="browse" className="max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="browse" className="gap-2">
            <FileText className="w-4 h-4" />
            Browse Templates
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Create Custom
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <History className="w-4 w-4" />
            My Templates
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
              <CardDescription>Build your own reusable content templates</CardDescription>
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
              >
                <Save className="mr-2 h-4 w-4" />
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
              <CardDescription>Your custom created templates</CardDescription>
            </CardHeader>
            <CardContent>
              {savedTemplates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No custom templates yet</p>
                  <p className="text-sm mt-2">Create your first template in the "Create Custom" tab</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTemplates.map((template) => (
                    <Card key={template.id} className="glass-effect">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
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