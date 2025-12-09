import { Link } from "react-router-dom";
import { Twitter, Linkedin, Youtube } from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Demo", href: "#demo" },
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "FAQs", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  };

  return (
    <footer className="relative py-20 overflow-hidden border-t border-[#2D2D2D]">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D0D0D]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img 
                src={inqreateLogo} 
                alt="Inqreate Logo" 
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-[#9CA3AF] mb-6 max-w-sm">
              Automate Smarter. Create Faster. Your all-in-one AI platform for content creation, posting, and growth.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover-glow border border-[#2D2D2D] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-[#3B82F6]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover-glow border border-[#2D2D2D] transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-[#EC4899]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover-glow border border-[#2D2D2D] transition-all duration-300"
              >
                <Twitter className="w-5 h-5 text-[#06B6D4]" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2D2D2D] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-sm">
            © 2025 Inqreate. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-[#9CA3AF] hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-[#9CA3AF] hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
