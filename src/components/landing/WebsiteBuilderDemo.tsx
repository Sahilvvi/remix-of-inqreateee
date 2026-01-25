import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Sparkles, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const WebsiteBuilderDemo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const demoPrompt = "Create a modern portfolio website for a photographer with a dark theme, gallery section, and contact form.";
  
  const steps = [
    { label: "Enter Prompt", active: currentStep >= 0 },
    { label: "AI Processing", active: currentStep >= 1 },
    { label: "Generating HTML", active: currentStep >= 2 },
    { label: "Styling CSS", active: currentStep >= 3 },
    { label: "Preview Ready", active: currentStep >= 4 },
  ];

  // Typing animation
  useEffect(() => {
    if (!isPlaying) return;
    
    if (currentStep === 0 && typedText.length < demoPrompt.length) {
      const timeout = setTimeout(() => {
        setTypedText(demoPrompt.slice(0, typedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
    
    if (currentStep === 0 && typedText.length === demoPrompt.length) {
      const timeout = setTimeout(() => setCurrentStep(1), 500);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentStep, isPlaying]);

  // Step progression
  useEffect(() => {
    if (!isPlaying || currentStep === 0) return;
    
    if (currentStep < 4) {
      const timeout = setTimeout(() => setCurrentStep(prev => prev + 1), 1200);
      return () => clearTimeout(timeout);
    }
    
    if (currentStep === 4 && !showPreview) {
      const timeout = setTimeout(() => setShowPreview(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, isPlaying, showPreview]);

  const resetDemo = () => {
    setCurrentStep(0);
    setTypedText("");
    setShowPreview(false);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentStep === 4 && showPreview) {
      resetDemo();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#111111] to-[#0D0D0D]"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#9333EA] rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9333EA]/10 text-[#9333EA] text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See <span className="bg-gradient-to-r from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent">AI Magic</span> in Action
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Watch how our AI transforms a simple prompt into a stunning website
          </p>
        </div>

        {/* Demo Container */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-[#1A1A1A] border-2 border-white/10 rounded-3xl overflow-hidden">
            {/* Demo Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111111]">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                </div>
                <span className="text-[#9CA3AF] text-sm font-medium">Website Builder Demo</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-[#9CA3AF] hover:text-white"
                >
                  {currentStep === 4 && showPreview ? (
                    <RotateCcw className="w-4 h-4" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Demo Content */}
            <div className="grid md:grid-cols-2 gap-0">
              {/* Input Panel */}
              <div className="p-6 border-r border-white/10">
                <div className="mb-4">
                  <label className="text-sm font-medium text-[#9CA3AF] mb-2 block">Your Prompt</label>
                  <div className="bg-[#0D0D0D] rounded-xl p-4 min-h-[100px] border border-white/10">
                    <p className="text-white">
                      {typedText}
                      {currentStep === 0 && isPlaying && (
                        <span className="inline-block w-0.5 h-5 bg-[#3B82F6] ml-1 animate-pulse"></span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-3 mt-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          step.active
                            ? "bg-gradient-to-r from-[#3B82F6] to-[#9333EA] text-white"
                            : "bg-[#2D2D2D] text-[#9CA3AF]"
                        }`}
                      >
                        {step.active && currentStep === index ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          step.active ? "text-white" : "text-[#9CA3AF]"
                        }`}
                      >
                        {step.label}
                      </span>
                      {step.active && currentStep > index && (
                        <span className="text-[#22C55E] text-xs">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Panel */}
              <div className="p-6 bg-[#0D0D0D]">
                <label className="text-sm font-medium text-[#9CA3AF] mb-2 block">Live Preview</label>
                <div
                  className={`bg-[#1A1A1A] rounded-xl border border-white/10 h-[300px] overflow-hidden transition-all duration-700 ${
                    showPreview ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {showPreview ? (
                    <div className="w-full h-full animate-fade-in">
                      {/* Mock Website Preview */}
                      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] h-full p-4 text-white">
                        {/* Nav */}
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-bold text-lg">📸 PhotoStudio</span>
                          <div className="flex gap-4 text-xs text-[#9CA3AF]">
                            <span>Gallery</span>
                            <span>About</span>
                            <span>Contact</span>
                          </div>
                        </div>
                        {/* Hero */}
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold mb-2">Capturing Moments</h3>
                          <p className="text-xs text-[#9CA3AF]">Professional photography services</p>
                        </div>
                        {/* Gallery Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="aspect-square rounded bg-gradient-to-br from-[#3B82F6]/30 to-[#9333EA]/30"
                            ></div>
                          ))}
                        </div>
                        {/* CTA */}
                        <div className="text-center">
                          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#9333EA] text-xs font-medium">
                            Get in Touch
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="w-12 h-12 text-[#3B82F6] mx-auto mb-3 opacity-50" />
                        <p className="text-[#9CA3AF] text-sm">
                          {currentStep > 0 ? "Generating..." : "Waiting for input..."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Demo Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#111111] flex items-center justify-between">
              <p className="text-[#9CA3AF] text-sm">
                <Sparkles className="w-4 h-4 inline mr-1 text-[#9333EA]" />
                Powered by AI • Generate in seconds
              </p>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-[#3B82F6] to-[#9333EA] hover:opacity-90 text-sm">
                  Try It Free
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WebsiteBuilderDemo;
