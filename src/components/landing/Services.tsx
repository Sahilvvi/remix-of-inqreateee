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
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered tools to automate your entire digital workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group glass-effect"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
