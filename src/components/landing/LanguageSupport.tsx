import { Card, CardContent } from "@/components/ui/card";
import { Globe, Check, Mic, Sparkles } from "lucide-react";

const LanguageSupport = () => {
  const indianLanguages = [
    { name: "Hindi", native: "हिंदी", flag: "🇮🇳" },
    { name: "Marathi", native: "मराठी", flag: "🇮🇳" },
    { name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
    { name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
    { name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
    { name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
    { name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
    { name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { name: "Odia", native: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  ];

  const globalLanguages = [
    { name: "English", flag: "🇺🇸" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Arabic", flag: "🇸🇦" },
    { name: "Japanese", flag: "🇯🇵" },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating graphics */}
      <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl rotate-12 animate-float opacity-60"></div>
      <div className="absolute bottom-40 left-16 w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full animate-float-delay opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Multi-Language Support
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text neon-text">10+ Indian Languages</span> + Global
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Create content in your native language. Perfect for India + International reach.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Indian Languages */}
          <Card className="glass-card animate-scale-in overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 bg-gradient-to-r from-orange-500/20 via-white/10 to-green-500/20 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🇮🇳</span>
                  <div>
                    <h3 className="text-2xl font-bold">Indian Languages</h3>
                    <p className="text-sm text-muted-foreground">Native SEO optimization included</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {indianLanguages.map((lang, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl glass-effect hover:bg-primary/10 cursor-pointer transition-all group"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{lang.native}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global Languages + Voice */}
          <div className="space-y-6">
            <Card className="glass-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Global Languages</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {globalLanguages.map((lang, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect hover:bg-primary/10 cursor-pointer transition-all"
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                    <span>+50 more</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voice Input Feature */}
            <Card className="glass-card animate-scale-in border-2 border-primary/30" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-slow">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold gradient-text">Voice Input</h3>
                    <p className="text-muted-foreground">Speak in any language - AI converts to polished content</p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span><strong>Unique Feature:</strong> Competitors don't offer voice input!</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Why it's better */}
            <Card className="glass-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Why Our Language Support is Better:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Competitors only offer English or 2-3 languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Native SEO optimization for each language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Perfect for Indian creators targeting local audiences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageSupport;