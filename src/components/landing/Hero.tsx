import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard-3d.png";
import aiBrain from "@/assets/ai-brain-3d.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Inqreate gradient background with 3D AI brain animation */}
      <div className="absolute inset-0 bg-[#0D0D0D]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3B82F6] via-[#9333EA] to-[#EC4899] opacity-40"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(at 27% 37%, #3B82F6 0px, transparent 50%), 
                             radial-gradient(at 97% 21%, #9333EA 0px, transparent 50%), 
                             radial-gradient(at 52% 99%, #EC4899 0px, transparent 50%)`
          }}></div>
        </div>
      </div>

      {/* 3D AI Brain Animation */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-30 animate-float hidden lg:block">
        <img src={aiBrain} alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#3B82F6] rounded-full animate-float opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#9333EA] rounded-full animate-float-delay opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#EC4899] rounded-full animate-bounce-subtle opacity-50"></div>
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#06B6D4] rounded-full animate-pulse-slow opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#14F5E1] rounded-full animate-float opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-scale-in">
            {/* Headline matching Inqreate design */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-white">Automate </span>
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Smarter.
              </span>
              <br />
              <span className="text-white">Create </span>
              <span className="bg-gradient-to-r from-[#EC4899] via-[#9333EA] to-[#06B6D4] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Faster.
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-[#9CA3AF] leading-relaxed">
              Inqreate is your all-in-one AI platform for content creation, posting, and growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6 items-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="group h-14 px-8 text-lg font-semibold bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] hover:shadow-neon relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group h-14 px-8 text-lg font-semibold glass-card hover-glow border-2 border-[#3B82F6]/50 text-white rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 w-5 h-5" />
                See Demo
              </Button>
            </div>
          </div>

          {/* 3D Dashboard Mockup */}
          <div className="relative animate-float">
            {/* Glowing orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3B82F6] rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#EC4899] rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
            
            {/* Main dashboard mockup with glass effect border */}
            <div className="relative glass-card p-2 rounded-3xl hover-lift border-2 border-[#3B82F6]/30">
              <img
                src={heroDashboard}
                alt="3D dashboard mockup showing AI content automation with posts and analytics"
                className="relative rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/10 via-transparent to-[#EC4899]/10 rounded-3xl animate-gradient bg-[length:200%_200%] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
