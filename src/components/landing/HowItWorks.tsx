import { ArrowRight, Mic, Sparkles, Send, Zap, Brain, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Input",
      description: "Voice, Text or Keywords",
      detail: "Speak your ideas or type keywords. AI understands your content needs instantly.",
      icon: Mic,
      features: ["Voice input", "Keywords", "Topic selection"],
    },
    {
      number: "02",
      title: "AI Automation",
      description: "Content + Images + SEO",
      detail: "Our AI generates blog posts, social content, images & optimizes everything for SEO.",
      icon: Brain,
      features: ["GPT-4.5 / Gemini", "AI Images", "SEO optimization"],
    },
    {
      number: "03",
      title: "Publish or Schedule",
      description: "1-Click Multi-Platform",
      detail: "Post directly to LinkedIn, YouTube, Instagram, Facebook, Twitter/X or schedule for later.",
      icon: Send,
      features: ["Direct posting", "Calendar view", "Auto-resize images"],
    },
  ];

  const advantages = [
    { icon: Zap, text: "Saves hours for creators" },
    { icon: Globe, text: "10+ languages supported" },
    { icon: Sparkles, text: "Brand consistency always" },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>

      {/* Floating graphics */}
      <div className="absolute top-20 right-16 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl rotate-12 animate-float opacity-70"></div>
      <div className="absolute bottom-20 left-16 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full animate-float-delay opacity-70"></div>
      <div className="absolute top-1/2 left-8 w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg rotate-45 animate-bounce-subtle opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Simple 3-Step Process
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            How It <span className="gradient-text neon-text">Works</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to automate your content creation - faster than any competitor
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent hidden lg:block rounded-full"></div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-scale-in glass-card p-8 rounded-3xl hover-lift group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glowing number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-neon transition-all duration-300 animate-glow">
                  {step.number}
                </div>

                <div className="text-center pt-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  <h3 className="text-3xl font-bold mb-3 gradient-text">{step.title}</h3>
                  <p className="text-lg text-foreground mb-2 font-semibold">{step.description}</p>
                  <p className="text-muted-foreground mb-4">{step.detail}</p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {step.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary animate-pulse-slow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advantages section */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {advantages.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-6 py-3 glass-card rounded-full animate-scale-in"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-neon animate-scale-in"
              style={{ animationDelay: '0.9s' }}
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Start Creating Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Glowing arrows animation */}
        <div className="flex justify-center items-center gap-8 mt-16">
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-1 bg-gradient-to-r from-primary to-accent animate-shine rounded-full"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;