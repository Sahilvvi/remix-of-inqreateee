import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, MessageSquare, ShoppingCart, Search, 
  Copy, Eye, Star, Filter, Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "blog" | "social" | "ecommerce";
  content: string;
  tags: string[];
  popularity: number;
}

const blogTemplates: Template[] = [
  {
    id: "blog-1",
    name: "How-To Guide",
    description: "Step-by-step tutorial format for teaching skills or processes",
    category: "Educational",
    type: "blog",
    content: `# How to [Topic]: A Complete Guide

## Introduction
[Hook your readers with a compelling opening that addresses their pain point]

## What You'll Learn
- Point 1
- Point 2
- Point 3

## Prerequisites
Before getting started, you'll need:
- Requirement 1
- Requirement 2

## Step 1: [First Step Title]
[Detailed explanation of the first step]

## Step 2: [Second Step Title]
[Detailed explanation of the second step]

## Step 3: [Third Step Title]
[Detailed explanation of the third step]

## Common Mistakes to Avoid
1. Mistake 1 and how to avoid it
2. Mistake 2 and how to avoid it

## Conclusion
[Summarize key takeaways and include a call-to-action]

## FAQs
**Q: [Common question]?**
A: [Answer]`,
    tags: ["tutorial", "educational", "guide"],
    popularity: 95,
  },
  {
    id: "blog-2",
    name: "Listicle",
    description: "Numbered list format, great for tips, tools, or recommendations",
    category: "Entertainment",
    type: "blog",
    content: `# [Number] [Topic] That Will [Benefit]

## Introduction
[Brief intro explaining why this list matters]

## 1. [First Item]
![Image placeholder]
[Description of the first item - 2-3 sentences]
**Why it matters:** [Brief explanation]

## 2. [Second Item]
![Image placeholder]
[Description of the second item - 2-3 sentences]
**Why it matters:** [Brief explanation]

## 3. [Third Item]
![Image placeholder]
[Description of the third item - 2-3 sentences]
**Why it matters:** [Brief explanation]

[Continue with more items...]

## Bonus: [Extra Item]
[Surprise addition for extra value]

## Wrapping Up
[Summary and call-to-action]`,
    tags: ["list", "tips", "recommendations"],
    popularity: 90,
  },
  {
    id: "blog-3",
    name: "Product Review",
    description: "In-depth product analysis with pros, cons, and verdict",
    category: "Reviews",
    type: "blog",
    content: `# [Product Name] Review: Is It Worth It in [Year]?

## Quick Verdict
⭐ Rating: [X]/5
**Best for:** [Target audience]
**Price:** [Price]

## What is [Product Name]?
[Brief overview of the product]

## Key Features
### Feature 1
[Description]

### Feature 2
[Description]

### Feature 3
[Description]

## Pros ✅
- Pro 1
- Pro 2
- Pro 3

## Cons ❌
- Con 1
- Con 2

## Who Should Buy This?
[Ideal customer profile]

## Who Should Skip This?
[People who wouldn't benefit]

## Pricing & Value
[Pricing breakdown and value assessment]

## Final Verdict
[Comprehensive conclusion with recommendation]`,
    tags: ["review", "product", "comparison"],
    popularity: 85,
  },
  {
    id: "blog-4",
    name: "Case Study",
    description: "Real-world example with problem, solution, and results",
    category: "Business",
    type: "blog",
    content: `# How [Company/Person] Achieved [Result]: A Case Study

## Executive Summary
[2-3 sentence overview of the case study]

## The Challenge
### Background
[Context about the company/person]

### The Problem
[Detailed description of the challenge faced]

### Goals
- Goal 1
- Goal 2
- Goal 3

## The Solution
### Strategy
[Overview of the approach taken]

### Implementation
[Step-by-step breakdown of what was done]

### Tools Used
- Tool 1
- Tool 2

## The Results
### Key Metrics
- Metric 1: [Before] → [After]
- Metric 2: [Before] → [After]

### Qualitative Outcomes
[Non-numerical improvements]

## Key Takeaways
1. Lesson 1
2. Lesson 2
3. Lesson 3

## How to Apply This
[Actionable advice for readers]`,
    tags: ["case study", "business", "results"],
    popularity: 80,
  },
];

const socialTemplates: Template[] = [
  {
    id: "social-1",
    name: "Engagement Hook",
    description: "Question-based post to drive comments and interaction",
    category: "Engagement",
    type: "social",
    content: `🤔 Quick question for my [niche] friends:

[Thought-provoking question]?

Drop your answer below! 👇

I'll share my take in the comments.

#[hashtag1] #[hashtag2] #[hashtag3]`,
    tags: ["engagement", "question", "comments"],
    popularity: 95,
  },
  {
    id: "social-2",
    name: "Value Thread",
    description: "Multi-part thread sharing valuable insights",
    category: "Educational",
    type: "social",
    content: `🧵 [Number] [Topic] tips that took me [time] to learn:

(Save this for later)

1/ [First tip]
[Brief explanation]

2/ [Second tip]
[Brief explanation]

3/ [Third tip]
[Brief explanation]

4/ [Fourth tip]
[Brief explanation]

5/ [Fifth tip]
[Brief explanation]

💡 Which one resonates most with you?

Follow for more [niche] tips!

#[hashtag1] #[hashtag2]`,
    tags: ["thread", "tips", "value"],
    popularity: 92,
  },
  {
    id: "social-3",
    name: "Story Post",
    description: "Personal story with a lesson or insight",
    category: "Storytelling",
    type: "social",
    content: `[Year] ago, I [situation].

I felt [emotion].

But then I realized [insight].

Here's what changed everything:

→ [Lesson 1]
→ [Lesson 2]
→ [Lesson 3]

Today, I [current result].

The takeaway?

[One-line lesson]

♻️ Repost if this resonates
📌 Save for when you need a reminder

#[hashtag1] #[hashtag2]`,
    tags: ["story", "personal", "inspiration"],
    popularity: 88,
  },
  {
    id: "social-4",
    name: "Product Announcement",
    description: "Launch or feature announcement post",
    category: "Promotional",
    type: "social",
    content: `🚀 BIG NEWS!

Introducing [Product/Feature Name]

[One-line description of what it does]

Here's why you'll love it:

✅ [Benefit 1]
✅ [Benefit 2]
✅ [Benefit 3]

🎁 Special launch offer: [Offer details]

Link in bio to get started!

#[hashtag1] #[hashtag2] #[hashtag3]`,
    tags: ["announcement", "launch", "product"],
    popularity: 85,
  },
  {
    id: "social-5",
    name: "Carousel Hook",
    description: "Attention-grabbing first slide for carousels",
    category: "Carousel",
    type: "social",
    content: `SLIDE 1 (HOOK):
"[Bold statement or question]"

SLIDE 2-9 (CONTENT):
Point 1: [Key insight]
Point 2: [Key insight]
Point 3: [Key insight]
Point 4: [Key insight]
Point 5: [Key insight]

SLIDE 10 (CTA):
"Found this helpful?"
→ Save for later
→ Share with a friend
→ Follow for more

CAPTION:
[Engaging intro that expands on the carousel topic]

Comment "[word]" and I'll send you [freebie]!

#[hashtag1] #[hashtag2] #[hashtag3]`,
    tags: ["carousel", "instagram", "slides"],
    popularity: 90,
  },
];

const ecommerceTemplates: Template[] = [
  {
    id: "ecom-1",
    name: "Amazon Listing",
    description: "Optimized product listing for Amazon marketplace",
    category: "Amazon",
    type: "ecommerce",
    content: `TITLE (200 chars max):
[Brand] [Product Name] - [Key Feature 1] [Key Feature 2] - [Size/Color] for [Target Use]

BULLET POINTS:
• ✅ [PRIMARY BENEFIT] - [Explanation of main value proposition and how it helps the customer]
• 💎 [QUALITY FEATURE] - [Materials, craftsmanship, or durability details]
• 🎯 [USE CASE] - [Specific scenarios where product excels]
• 📦 [WHAT'S INCLUDED] - [Package contents and any extras]
• 🔒 [GUARANTEE] - [Warranty, return policy, or satisfaction guarantee]

DESCRIPTION:
[Opening paragraph about the brand and product story]

KEY FEATURES:
→ Feature 1: [Detail]
→ Feature 2: [Detail]
→ Feature 3: [Detail]

SPECIFICATIONS:
- Dimensions: [X x Y x Z]
- Weight: [Weight]
- Material: [Material]
- Color: [Color options]

KEYWORDS (Backend):
[keyword1], [keyword2], [keyword3], [keyword4], [keyword5]`,
    tags: ["amazon", "listing", "product"],
    popularity: 95,
  },
  {
    id: "ecom-2",
    name: "Shopify Product",
    description: "Product page content for Shopify stores",
    category: "Shopify",
    type: "ecommerce",
    content: `PRODUCT TITLE:
[Product Name] | [Key Differentiator]

SHORT DESCRIPTION (for product cards):
[One compelling sentence about the product]

FULL DESCRIPTION:

## Why You'll Love It
[Emotional benefit paragraph connecting with customer desires]

## Features
- **[Feature 1]:** [Benefit]
- **[Feature 2]:** [Benefit]
- **[Feature 3]:** [Benefit]

## Specifications
| Attribute | Details |
|-----------|---------|
| Material | [Material] |
| Dimensions | [Dimensions] |
| Weight | [Weight] |

## What's in the Box
- 1x [Main product]
- 1x [Accessory if any]
- 1x [User guide/manual]

## Our Promise
[Trust-building statement about quality, returns, or guarantee]

SEO TITLE:
[Product] - [Benefit] | [Store Name]

META DESCRIPTION:
[155 characters describing product with call-to-action]`,
    tags: ["shopify", "store", "product"],
    popularity: 90,
  },
  {
    id: "ecom-3",
    name: "Flipkart Listing",
    description: "Product listing optimized for Flipkart marketplace",
    category: "Flipkart",
    type: "ecommerce",
    content: `PRODUCT TITLE:
[Brand] [Product Name] ([Key Spec 1], [Key Spec 2], [Color])

KEY HIGHLIGHTS:
• [Main feature/benefit]
• [Second feature]
• [Third feature]
• [Material/Quality point]
• [Warranty/Service info]

PRODUCT DESCRIPTION:
[Brand] presents [Product Name], designed for [target audience].

FEATURES:
★ [Feature 1]: [Detailed explanation]
★ [Feature 2]: [Detailed explanation]
★ [Feature 3]: [Detailed explanation]

SPECIFICATIONS:
- Model Name: [Model]
- Color: [Color]
- Type: [Type]
- Material: [Material]
- Ideal For: [Target audience]
- Pattern: [Pattern if applicable]

SEARCH KEYWORDS:
[keyword1] [keyword2] [keyword3] [keyword4]`,
    tags: ["flipkart", "india", "product"],
    popularity: 85,
  },
  {
    id: "ecom-4",
    name: "Product Email",
    description: "Email marketing template for product promotion",
    category: "Email",
    type: "ecommerce",
    content: `SUBJECT LINE OPTIONS:
1. [Emoji] [Benefit] - [Time-limited offer]
2. Your [problem] ends today
3. [Number]% OFF [Product] - [Urgency]

PREVIEW TEXT:
[Compelling teaser that continues from subject line]

---

EMAIL BODY:

Hi [First Name],

[Opening hook addressing pain point or desire]

Introducing **[Product Name]** - [one-line value prop].

**Here's what makes it special:**

✓ [Benefit 1]
✓ [Benefit 2]
✓ [Benefit 3]

[Social proof - testimonial or statistic]

**[Limited time offer details]**

[CTA BUTTON: Shop Now / Get Yours / Claim Offer]

[Secondary CTA - Learn More link]

Questions? Just reply to this email!

[Sign off]
[Name/Brand]

P.S. [Urgency reminder or bonus mention]`,
    tags: ["email", "marketing", "promotion"],
    popularity: 88,
  },
];

const allTemplates = [...blogTemplates, ...socialTemplates, ...ecommerceTemplates];

const TemplatesLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<string[]>([]);
  const { toast } = useToast();

  const filterTemplates = (templates: Template[]) => {
    if (!searchQuery) return templates;
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const getTemplatesByType = () => {
    switch (activeTab) {
      case "blog":
        return filterTemplates(blogTemplates);
      case "social":
        return filterTemplates(socialTemplates);
      case "ecommerce":
        return filterTemplates(ecommerceTemplates);
      default:
        return filterTemplates(allTemplates);
    }
  };

  const copyTemplate = (template: Template) => {
    navigator.clipboard.writeText(template.content);
    toast({ title: "Copied!", description: `${template.name} template copied to clipboard.` });
  };

  const toggleSaveTemplate = (templateId: string) => {
    setSavedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
    toast({
      title: savedTemplates.includes(templateId) ? "Removed" : "Saved!",
      description: savedTemplates.includes(templateId)
        ? "Template removed from saved"
        : "Template saved for quick access",
    });
  };

  const templates = getTemplatesByType();

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Templates Library</h1>
        <p className="text-muted-foreground text-sm">
          Pre-built templates for blogs, social media, and e-commerce content. Copy and customize for your needs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-card rounded-lg border border-border p-5 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {template.type === "blog" && <FileText className="w-4 h-4 text-primary" />}
                {template.type === "social" && <MessageSquare className="w-4 h-4 text-green-500" />}
                {template.type === "ecommerce" && <ShoppingCart className="w-4 h-4 text-orange-500" />}
                <Badge variant="outline" className="text-xs capitalize">
                  {template.category}
                </Badge>
              </div>
              <button
                onClick={() => toggleSaveTemplate(template.id)}
                className={`p-1 rounded hover:bg-muted transition-colors ${
                  savedTemplates.includes(template.id) ? "text-yellow-500" : "text-muted-foreground"
                }`}
              >
                <Bookmark className="w-4 h-4" fill={savedTemplates.includes(template.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span>{template.popularity}% popular</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTemplate(template)}
                  className="h-8"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  onClick={() => copyTemplate(template)}
                  className="h-8 bg-[#0d9488] hover:bg-[#0f766e] text-white"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>No templates found matching your search.</p>
        </div>
      )}

      {/* Template Preview Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTemplate?.type === "blog" && <FileText className="w-5 h-5 text-primary" />}
              {selectedTemplate?.type === "social" && <MessageSquare className="w-5 h-5 text-green-500" />}
              {selectedTemplate?.type === "ecommerce" && <ShoppingCart className="w-5 h-5 text-orange-500" />}
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription>{selectedTemplate?.description}</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
              {selectedTemplate?.content}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  if (selectedTemplate) copyTemplate(selectedTemplate);
                }}
                className="bg-[#0d9488] hover:bg-[#0f766e] text-white"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplatesLibrary;
