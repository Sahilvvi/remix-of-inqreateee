import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import AIShowcase from "@/components/landing/AIShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import Comparison from "@/components/landing/Comparison";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturesGrid />
      <AIShowcase />
      <HowItWorks />
      <UseCases />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
