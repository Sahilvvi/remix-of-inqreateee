import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, Users, Briefcase } from "lucide-react";
import analyticsImage from "@/assets/analytics-3d.png";
import socialImage from "@/assets/social-platforms-3d.png";
import ecommerceImage from "@/assets/ecommerce-3d.png";
import collaborationImage from "@/assets/collaboration-3d.png";

const UseCases = () => {
  const useCases = [
    {
      icon: TrendingUp,
      title: "Content Creators & Influencers",
      description: "Automate your social media presence across all platforms. Schedule weeks of content in minutes and maintain consistent engagement.",
      image: socialImage,
      stats: "10x faster content creation",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Businesses",
      description: "Generate compelling product descriptions, blog posts, and social media campaigns that drive sales and boost conversions.",
      image: ecommerceImage,
      stats: "3x higher conversion rates",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Users,
      title: "Marketing Agencies",
      description: "Manage multiple clients effortlessly with team collaboration tools, brand kits, and automated content workflows.",
      image: collaborationImage,
      stats: "Handle 5x more clients",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Briefcase,
      title: "Growing Startups",
      description: "Build your brand presence without a massive marketing budget. AI-powered content that scales with your business.",
      image: analyticsImage,
      stats: "Save 80% on content costs",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Built for <span className="gradient-text neon-text">Every Creator</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From solo creators to enterprise teams, Inqreate adapts to your unique workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="glass-card hover-lift cursor-pointer group overflow-hidden border-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${useCase.color} text-white text-sm font-bold animate-bounce-subtle`}>
                    {useCase.stats}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} group-hover:scale-110 transition-transform duration-300`}>
                      <useCase.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">{useCase.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{useCase.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
