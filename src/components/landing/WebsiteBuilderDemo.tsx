import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Sparkles, Play, RotateCcw, Loader2, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const examplePrompts = [
  "Create a modern portfolio website for a photographer with a dark theme and gallery",
  "Build a restaurant website with menu, reservations, and warm colors",
  "Design a tech startup landing page with gradients and pricing section",
  "Make an e-commerce store for handmade jewelry with elegant styling",
  "Create a fitness gym website with membership plans and class schedules",
];

const WebsiteBuilderDemo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  const steps = [
    { label: "Enter Prompt", active: currentStep >= 0 },
    { label: "AI Processing", active: currentStep >= 1 },
    { label: "Generating HTML", active: currentStep >= 2 },
    { label: "Styling CSS", active: currentStep >= 3 },
    { label: "Preview Ready", active: currentStep >= 4 },
  ];

  const generateWebsite = async () => {
    if (!customPrompt.trim()) {
      toast.error("Please enter a prompt describing your website");
      return;
    }

    setIsGenerating(true);
    setCurrentStep(1);

    try {
      // Simulate step progression while generating
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < 3) return prev + 1;
          return prev;
        });
      }, 1500);

      // Extract business type from prompt
      const businessType = customPrompt.split(" ").slice(0, 5).join(" ");
      const projectName = "Custom Website";

      const { data, error } = await supabase.functions.invoke('generate-website', {
        body: {
          template: "custom",
          businessType: businessType,
          colorScheme: "#0a0a0a, #3b82f6, #9333ea, #22c55e",
          contentRequirements: customPrompt,
          projectName: projectName
        }
      });

      clearInterval(stepInterval);

      if (error) {
        console.error('Generation error:', error);
        if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
          toast.error('Demo is busy. Try again in a moment!');
        } else if (error.message?.includes('402')) {
          toast.error('Demo credits exhausted. Sign up to generate your own!');
        } else {
          toast.error('Generation failed. Please try again.');
        }
        resetDemo();
        return;
      }

      setCurrentStep(4);
      
      // Combine HTML and CSS for the iframe
      const fullHtml = data.html?.includes('<style>') 
        ? data.html 
        : `${data.html}<style>${data.css || ''}</style>`;
      
      setGeneratedHtml(fullHtml);
      
    } catch (err) {
      console.error('Error generating website:', err);
      toast.error('Something went wrong. Please try again.');
      resetDemo();
    } finally {
      setIsGenerating(false);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setGeneratedHtml(null);
    setIsGenerating(false);
  };

  const handleTryAgain = () => {
    resetDemo();
    setCustomPrompt("");
  };

  const handleExampleClick = (example: string) => {
    setCustomPrompt(example);
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
            Try <span className="bg-gradient-to-r from-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent">AI Website Builder</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Enter your own prompt and watch our AI generate a real website in seconds!
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
                <span className="text-[#9CA3AF] text-sm font-medium">
                  Live Website Generator
                </span>
              </div>
              <div className="flex items-center gap-2">
                {generatedHtml && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleTryAgain}
                    className="text-[#9CA3AF] hover:text-white gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                )}
              </div>
            </div>

            {/* Demo Content */}
            <div className="grid md:grid-cols-2 gap-0">
              {/* Input Panel */}
              <div className="p-6 border-r border-white/10">
                <div className="mb-4">
                  <label className="text-sm font-medium text-[#9CA3AF] mb-2 block">
                    Describe Your Website
                  </label>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="E.g., Create a modern portfolio website for a photographer with a dark theme, gallery section, and contact form..."
                    className="bg-[#0D0D0D] border-white/10 text-white placeholder:text-[#6B7280] min-h-[100px] resize-none focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                    disabled={isGenerating || !!generatedHtml}
                  />
                </div>

                {/* Example Prompts */}
                {!generatedHtml && !isGenerating && (
                  <div className="mb-4">
                    <label className="text-xs font-medium text-[#6B7280] mb-2 block">
                      Try an example:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.slice(0, 3).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleClick(example)}
                          className="text-xs px-3 py-1.5 rounded-full bg-[#2D2D2D] text-[#9CA3AF] hover:bg-[#3D3D3D] hover:text-white transition-colors truncate max-w-[200px]"
                        >
                          {example.slice(0, 40)}...
                        </button>
                      ))}
                    </div>
                  </div>
                )}

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
                        {step.active && currentStep === index && isGenerating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : step.active && currentStep > index ? (
                          <span className="text-white">✓</span>
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
                    </div>
                  ))}
                </div>

                {/* Generate Button */}
                {!generatedHtml && (
                  <Button
                    onClick={generateWebsite}
                    disabled={isGenerating || !customPrompt.trim()}
                    className="mt-6 w-full bg-gradient-to-r from-[#3B82F6] to-[#9333EA] hover:opacity-90 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Website
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Preview Panel */}
              <div className="p-6 bg-[#0D0D0D]">
                <label className="text-sm font-medium text-[#9CA3AF] mb-2 block">
                  Live Preview {generatedHtml && <span className="text-[#22C55E]">• Real Generated Code</span>}
                </label>
                <div
                  className={`bg-white rounded-xl border border-white/10 h-[300px] overflow-hidden transition-all duration-700 ${
                    generatedHtml ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {generatedHtml ? (
                    <iframe
                      srcDoc={generatedHtml}
                      className="w-full h-full border-0"
                      title="Generated Website Preview"
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1A1A1A]">
                      <div className="text-center">
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-12 h-12 text-[#3B82F6] mx-auto mb-3 animate-spin" />
                            <p className="text-[#9CA3AF] text-sm">
                              AI is generating your website...
                            </p>
                            <p className="text-[#9CA3AF] text-xs mt-1">
                              This takes about 10-15 seconds
                            </p>
                          </>
                        ) : (
                          <>
                            <Globe className="w-12 h-12 text-[#3B82F6] mx-auto mb-3 opacity-50" />
                            <p className="text-[#9CA3AF] text-sm">
                              {customPrompt.trim() ? "Click 'Generate Website' to start" : "Enter a prompt to get started"}
                            </p>
                          </>
                        )}
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
                {generatedHtml 
                  ? "✨ Website by Inqreate" 
                  : "Powered by Inqreate AI • Generate in seconds"}
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
