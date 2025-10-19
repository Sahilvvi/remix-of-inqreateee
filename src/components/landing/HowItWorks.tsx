import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Input",
      description: "Idea, voice, or keywords",
      detail: "Simply provide your content requirements",
    },
    {
      number: "02",
      title: "AI Automation",
      description: "Content + Images + SEO",
      detail: "Our AI processes and optimizes everything",
    },
    {
      number: "03",
      title: "Publish or Schedule",
      description: "Direct posting",
      detail: "Push to all platforms instantly",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            How It <span className="gradient-text neon-text">Works</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to automate your content creation
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent hidden lg:block"></div>

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

                <div className="text-center pt-8">
                  <h3 className="text-3xl font-bold mb-3 gradient-text">{step.title}</h3>
                  <p className="text-lg text-foreground mb-2 font-semibold">{step.description}</p>
                  <p className="text-muted-foreground">{step.detail}</p>
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

        {/* Glowing arrows animation */}
        <div className="flex justify-center items-center gap-8 mt-20">
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-1 bg-gradient-to-r from-primary to-accent animate-shine"
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
