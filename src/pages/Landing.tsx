import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
