import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Get started with limited features",
      credits: "50 credits/month",
      features: [
        "50 AI-generated posts/month",
        "Basic SEO optimization",
        "3 social platform integrations",
        "Email support",
        "1 brand kit",
        "English + Hindi languages",
      ],
      highlight: false,
      icon: Zap,
      cta: "Start Free",
    },
    {
      name: "Starter",
      price: "₹499",
      period: "/month",
      description: "Perfect for individuals and small projects",
      credits: "500 credits/month",
      features: [
        "500 AI-generated posts/month",
        "Advanced SEO optimization",
        "5 social platform integrations",
        "Priority email support",
        "3 brand kits",
        "Voice input feature",
        "10+ languages (all Indian languages)",
        "AI image generator (100 images)",
        "Festival templates library",
      ],
      highlight: false,
      icon: Star,
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "₹999",
      period: "/month",
      description: "Best for growing businesses and content creators",
      credits: "Unlimited credits",
      features: [
        "Unlimited AI-generated posts",
        "Advanced SEO optimization + Internal linking",
        "All platform integrations",
        "Priority support + AI consulting",
        "10 brand kits",
        "Team collaboration (up to 5 members)",
        "Analytics dashboard",
        "Custom templates",
        "AI image library (unlimited)",
        "Bulk e-commerce generator",
        "All languages supported",
      ],
      highlight: true,
      icon: Crown,
      cta: "Go Pro",
    },
    {
      name: "Agency",
      price: "Custom",
      period: "",
      description: "Enterprise solution for agencies and large teams",
      credits: "Volume-based pricing",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "White-label solution",
        "Dedicated account manager",
        "Custom AI training",
        "API access",
        "Advanced analytics + Reports",
        "SLA guarantee",
        "Multi-brand management",
        "Priority feature requests",
      ],
      highlight: false,
      icon: Star,
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 particle-bg opacity-5"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10 animate-float-delay"></div>

      {/* Floating graphics */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl rotate-12 animate-float opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full animate-float-delay opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Flexible Plans
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Simple <span className="gradient-text neon-text">Pricing</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your content automation needs. Start free, upgrade as you grow.
          </p>
        </div>

        {/* Credit system explanation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 glass-card rounded-full">
            <span className="text-2xl">💳</span>
            <span className="text-muted-foreground">
              <strong className="text-foreground">Credit System:</strong> 1 credit = 1 post or 1 image generation
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`relative glass-card hover-lift cursor-pointer animate-scale-in ${
                  plan.highlight
                    ? "border-2 border-primary shadow-neon scale-105 lg:scale-110"
                    : "border-2 border-transparent hover-glow"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg animate-glow">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2 gradient-text">{plan.name}</CardTitle>
                  <div className="my-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">{plan.period}</span>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block">
                    {plan.credits}
                  </div>
                  <CardDescription className="text-sm mt-3">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <Link to="/auth">
                    <Button
                      className={`w-full mb-6 h-12 text-base font-semibold ${
                        plan.highlight
                          ? "bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-neon"
                          : "bg-gradient-to-r from-primary to-secondary hover-lift"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="p-0.5 rounded-full bg-gradient-to-br from-primary to-accent mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enterprise note */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 px-8 py-6 glass-card rounded-2xl border-2 border-accent/20">
            <span className="text-4xl">🏢</span>
            <div className="text-left">
              <p className="font-bold text-lg">Need Custom Enterprise Solution?</p>
              <p className="text-muted-foreground text-sm">Contact us for volume discounts, custom integrations, and dedicated support.</p>
            </div>
            <Button variant="outline" className="hover-glow">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;