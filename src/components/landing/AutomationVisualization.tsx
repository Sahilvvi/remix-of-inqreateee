import automationFlow from "@/assets/automation-flow.png";

const AutomationVisualization = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute inset-0 particle-bg opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            See <span className="gradient-text neon-text">Automation</span> in Action
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Watch how our AI seamlessly connects your entire digital workflow
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mb-20">
          {/* Glowing background effects */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          
          {/* Main visualization with glass effect */}
          <div className="relative glass-card p-4 rounded-3xl hover-lift animate-float">
            <img
              src={automationFlow}
              alt="3D visualization of automated workflow with interconnected nodes and data streams"
              className="relative rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 rounded-3xl pointer-events-none"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { step: "1", title: "Input", desc: "Provide your content requirements", delay: "0s" },
            { step: "2", title: "AI Process", desc: "AI analyzes and generates content", delay: "0.1s" },
            { step: "3", title: "Optimize", desc: "Auto-optimize for SEO and platforms", delay: "0.2s" },
            { step: "4", title: "Publish", desc: "Schedule or publish instantly", delay: "0.3s" },
          ].map((item) => (
            <div 
              key={item.step} 
              className="text-center group animate-scale-in glass-card p-6 rounded-2xl hover-lift"
              style={{ animationDelay: item.delay }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold mb-4 text-xl shadow-lg group-hover:shadow-neon transition-all duration-300 animate-glow">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2 gradient-text">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationVisualization;
