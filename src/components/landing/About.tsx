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
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What <span className="gradient-text neon-text">We Do</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Inqreate is your all-in-one platform for automating content creation, SEO optimization,
            and digital workflow management using advanced AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 text-center glass-card hover-lift cursor-pointer animate-scale-in group border-2 border-transparent hover-glow relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 animate-glow group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3 gradient-text">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
