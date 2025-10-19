import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Search, ShoppingCart, TrendingUp, Eye } from "lucide-react";

interface QuickPreviewsProps {
  onNavigate: (route: string) => void;
}

export const QuickPreviews = ({ onNavigate }: QuickPreviewsProps) => {
  const previews = [
    {
      title: "Latest Blog Post",
      route: "blog",
      icon: FileText,
      preview: "AI-Powered Content Automation: A Complete Guide",
      date: "2 hours ago",
      color: "text-blue-500",
    },
    {
      title: "Recent Social Post",
      route: "social",
      icon: MessageSquare,
      preview: "🚀 Excited to share our new AI automation features...",
      date: "5 hours ago",
      color: "text-purple-500",
    },
    {
      title: "Latest SEO Analysis",
      route: "seo",
      icon: Search,
      preview: "Homepage - SEO Score: 85/100",
      date: "1 day ago",
      color: "text-green-500",
    },
    {
      title: "New Product Listing",
      route: "ecommerce",
      icon: ShoppingCart,
      preview: "Premium Wireless Headphones - Amazon Ready",
      date: "1 day ago",
      color: "text-orange-500",
    },
  ];

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Quick Previews
        </CardTitle>
        <CardDescription>Recent content across all modules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {previews.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer"
              onClick={() => onNavigate(item.route)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={`h-5 w-5 ${item.color} mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.preview}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="shrink-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
