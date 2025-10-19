import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-automation.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated background gradient mesh */}
      <div className="absolute inset-0 particle-bg opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary rounded-full animate-float-delay opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-bounce-subtle opacity-50"></div>
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse-slow opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-scale-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Automate Everything with{" "}
              <span className="gradient-text neon-text animate-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
                AI Block Automation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Generate blogs, social media posts, SEO reports, and e-commerce content — all in one place.
              Save time and boost productivity with AI-powered automation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button size="lg" className="group relative overflow-hidden animate-shine hover-lift bg-gradient-to-r from-primary to-secondary">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="group glass-card hover-glow border-2">
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative animate-float">
            {/* Glowing orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
            
            {/* Main image with glass effect border */}
            <div className="relative glass-card p-2 rounded-3xl hover-lift">
              <img
                src={heroImage}
                alt="AI Automation Platform showcasing holographic interfaces and neural networks"
                className="relative rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl animate-gradient bg-[length:200%_200%]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
