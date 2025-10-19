import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹499",
      period: "/month",
      description: "Perfect for individuals and small projects",
      features: [
        "100 AI-generated posts/month",
        "Basic SEO optimization",
        "5 social platform integrations",
        "Email support",
        "1 brand kit",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹999",
      period: "/month",
      description: "Best for growing businesses and content creators",
      features: [
        "Unlimited AI-generated posts",
        "Advanced SEO optimization",
        "All platform integrations",
        "Priority support + AI consulting",
        "5 brand kits",
        "Team collaboration (up to 5)",
        "Analytics dashboard",
        "Custom templates",
      ],
      highlight: true,
    },
    {
      name: "Agency",
      price: "Custom",
      period: "",
      description: "Enterprise solution for agencies and large teams",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "White-label solution",
        "Dedicated account manager",
        "Custom AI training",
        "API access",
        "Advanced analytics",
        "SLA guarantee",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 particle-bg opacity-5"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10 animate-float-delay"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Simple <span className="gradient-text neon-text">Pricing</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your content automation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative glass-card hover-lift cursor-pointer animate-scale-in ${
                plan.highlight
                  ? "border-2 border-primary shadow-neon scale-105"
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

              <CardHeader className="text-center pb-8 pt-12">
                <CardTitle className="text-3xl mb-2 gradient-text">{plan.name}</CardTitle>
                <div className="my-6">
                  <span className="text-6xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-xl">{plan.period}</span>
                </div>
                <CardDescription className="text-lg">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Link to="/auth">
                  <Button
                    className={`w-full mb-8 h-14 text-lg font-semibold ${
                      plan.highlight
                        ? "bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-neon"
                        : "bg-gradient-to-r from-primary to-secondary hover-lift"
                    }`}
                    size="lg"
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Link>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-gradient-to-br from-primary to-accent mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
