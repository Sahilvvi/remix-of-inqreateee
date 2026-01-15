import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, MessageSquare, Search, ShoppingCart, Zap, TrendingUp } from "lucide-react";

interface UsageOverviewProps {
  blogsGenerated: number;
  socialPosts: number;
  seoAnalyses: number;
  productListings: number;
}

export const UsageOverview = ({ blogsGenerated, socialPosts, seoAnalyses, productListings }: UsageOverviewProps) => {
  const monthlyLimits = {
    blogs: 100,
    social: 200,
    seo: 50,
    products: 75,
  };

  const usageData = [
    {
      label: "Blog Posts",
      current: blogsGenerated,
      limit: monthlyLimits.blogs,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Social Media Posts",
      current: socialPosts,
      limit: monthlyLimits.social,
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "SEO Analyses",
      current: seoAnalyses,
      limit: monthlyLimits.seo,
      icon: Search,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Product Listings",
      current: productListings,
      limit: monthlyLimits.products,
      icon: ShoppingCart,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Usage Overview
            </CardTitle>
            <CardDescription className="text-sm">Your monthly content generation usage</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {usageData.map((item, index) => {
          const Icon = item.icon;
          const percentage = (item.current / item.limit) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${item.bgColor}`}>
                    <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.current} / {item.limit}
                </span>
              </div>
              <Progress value={percentage} className="h-1.5" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(0)}% used</span>
                <span>{item.limit - item.current} remaining</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
