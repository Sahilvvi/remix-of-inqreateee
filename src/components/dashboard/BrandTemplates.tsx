import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileText, MessageSquare, ShoppingCart, Sparkles } from "lucide-react";

const templates = [
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
];

const BrandTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const categories = ["All", "Blog", "Social", "E-commerce", "Marketing"];

  const filteredTemplates = selectedCategory === "All"
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleCopyTemplate = (template: string, name: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Template Copied!",
      description: `${name} copied to clipboard.`,
    });
  };

  const handleUseTemplate = (template: string, category: string) => {
    // Store template in localStorage for use in other features
    localStorage.setItem('selectedTemplate', template);
    localStorage.setItem('templateCategory', category);
    
    toast({
      title: "Template Selected!",
      description: `Navigate to ${category} Generator to use this template.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Brand Templates</h1>
        <p className="text-muted-foreground">Pre-designed templates for all your content needs</p>
      </div>

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
            <Card key={template.id} className="glass-effect hover:shadow-lg transition-shadow">
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
    </div>
  );
};

export default BrandTemplates;
