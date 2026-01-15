import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-20"></div>
      <div className="absolute inset-0 particle-bg opacity-30"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-scale-in">
          {/* Sparkle icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent mb-8 animate-glow shadow-neon">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Start Automating Your Content{" "}
            <span className="gradient-text neon-text">Today with Inqreate</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join thousands of content creators who are saving time and scaling their business with AI automation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link to="/auth" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="group h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl font-bold glass-card hover-glow border-2 border-primary/50 transition-all duration-300 w-full sm:w-auto"
            >
              See Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
