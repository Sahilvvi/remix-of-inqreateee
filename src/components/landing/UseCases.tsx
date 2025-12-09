import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, Users, Briefcase, Youtube, Smartphone } from "lucide-react";
import analyticsImage from "@/assets/analytics-3d.png";
import socialImage from "@/assets/social-platforms-3d.png";
import ecommerceImage from "@/assets/ecommerce-3d.png";
import collaborationImage from "@/assets/collaboration-3d.png";

const UseCases = () => {
  const useCases = [
    {
      icon: TrendingUp,
      title: "Content Creators & Influencers",
      description: "Generate blog posts, LinkedIn updates, YouTube titles/descriptions, and Instagram captions in multiple languages. Schedule weeks of content in minutes.",
      image: socialImage,
      stats: "10x faster content creation",
      color: "from-pink-500 to-rose-500",
      features: ["Voice to content", "Multi-platform posting", "Festival templates"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Businesses",
      description: "Bulk generate product descriptions optimized for Amazon, Flipkart, Meesho & Shopify. Auto-include bullet points and SEO keywords.",
      image: ecommerceImage,
      stats: "3x higher conversion rates",
      color: "from-purple-500 to-indigo-500",
      features: ["Bulk generator", "Platform-optimized", "SEO keywords"],
    },
    {
      icon: Users,
      title: "Marketing Agencies",
      description: "Manage multiple brands with team collaboration. Share drafts for approval, use brand kits for consistency, and track analytics across all clients.",
      image: collaborationImage,
      stats: "Handle 5x more clients",
      color: "from-cyan-500 to-blue-500",
      features: ["Multi-brand management", "Role-based access", "White-label ready"],
    },
    {
      icon: Briefcase,
      title: "Growing Startups & SMBs",
      description: "Build brand presence without a massive marketing budget. AI-powered content in English + Hindi, Marathi, Telugu, Tamil & more Indian languages.",
      image: analyticsImage,
      stats: "Save 80% on content costs",
      color: "from-green-500 to-emerald-500",
      features: ["Indian language focus", "Credit-based pricing", "Beginner-friendly"],
    },
  ];

  const targetAudience = [
    { icon: Youtube, label: "YouTubers", description: "Titles & descriptions" },
    { icon: Smartphone, label: "Social Media Managers", description: "Multi-platform posts" },
    { icon: ShoppingCart, label: "D2C Brands", description: "Product content" },
    { icon: Users, label: "Freelancers", description: "Client content" },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating graphics */}
      <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl rotate-12 animate-float opacity-60"></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full animate-float-delay opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            Perfect For Every Creator
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Built for <span className="gradient-text neon-text">Every Creator</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From solo creators to enterprise agencies, Inqreate adapts to your unique workflow with Indian language focus + Global reach
          </p>
        </div>

        {/* Target audience pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {targetAudience.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-5 py-3 glass-card rounded-full hover-lift cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="glass-card hover-lift cursor-pointer group overflow-hidden border-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${useCase.color} text-white text-sm font-bold animate-bounce-subtle`}>
                    {useCase.stats}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <useCase.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">{useCase.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">{useCase.description}</p>
                  
                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Indian market focus */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 px-8 py-6 glass-card rounded-2xl border-2 border-secondary/20 animate-scale-in">
            <span className="text-5xl">🇮🇳</span>
            <div className="text-left">
              <p className="font-bold text-xl gradient-text">Indian Language Focus</p>
              <p className="text-muted-foreground">Perfect for India + International languages for global creators. Hindi, Marathi, Gujarati, Telugu, Tamil & more!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;