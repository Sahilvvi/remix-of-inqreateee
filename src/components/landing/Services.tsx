import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, Calendar, Search, Palette, ShoppingCart } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Automatic Blog Generation",
      description: "Create engaging blog posts instantly with AI-powered content generation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      title: "Social Media Posts",
      description: "Generate captivating social media content for all platforms",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      title: "Automatic Posting",
      description: "Schedule and automate your content publishing across channels",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Optimize your content for search engines with AI-driven insights",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Palette,
      title: "Brand Templates",
      description: "Create consistent, professional content with customizable templates",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Product Generation",
      description: "Generate product descriptions, titles, and SEO data automatically",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 particle-bg opacity-10"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10 animate-float-delay"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text neon-text">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered tools to automate your entire digital workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 glass-card hover-lift cursor-pointer animate-scale-in group border-2 border-transparent hover-glow relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-glow`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">{service.title}</h3>
                <p className="text-muted-foreground text-lg">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
