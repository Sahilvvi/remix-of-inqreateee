import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import LanguageSupport from "@/components/landing/LanguageSupport";
import HowItWorks from "@/components/landing/HowItWorks";
import BrandKitSection from "@/components/landing/BrandKitSection";
import UseCases from "@/components/landing/UseCases";
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
      <LanguageSupport />
      <HowItWorks />
      <BrandKitSection />
      <UseCases />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
