import automationFlow from "@/assets/automation-flow.png";

const AutomationVisualization = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">See Automation in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI seamlessly connects your entire digital workflow
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
          <img
            src={automationFlow}
            alt="Automation Workflow Visualization"
            className="relative rounded-2xl shadow-2xl w-full animate-float"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { step: "1", title: "Input", desc: "Provide your content requirements" },
            { step: "2", title: "AI Process", desc: "AI analyzes and generates content" },
            { step: "3", title: "Optimize", desc: "Auto-optimize for SEO and platforms" },
            { step: "4", title: "Publish", desc: "Schedule or publish instantly" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationVisualization;
