import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import AutomationVisualization from "@/components/landing/AutomationVisualization";
import Testimonials from "@/components/landing/Testimonials";
import Subscribe from "@/components/landing/Subscribe";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <AutomationVisualization />
      <Testimonials />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Landing;
