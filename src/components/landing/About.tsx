import { Card } from "@/components/ui/card";
import { Zap, Shield, Sparkles } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate content in seconds with our powerful AI engine",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Leverage cutting-edge AI technology for best results",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI Block Automation is your all-in-one platform for automating content creation, SEO optimization,
            and digital workflow management using advanced AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-effect"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
