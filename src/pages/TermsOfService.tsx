import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={inqreateLogo} alt="Inqreate" className="h-10 w-auto" />
            </Link>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#9333EA]/30 mb-6">
              <FileText className="w-4 h-4 text-[#9333EA]" />
              <span className="text-sm font-medium text-[#9333EA]">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-[#9CA3AF] mb-12">Last updated: January 15, 2025</p>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8 text-[#9CA3AF]">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using Inqreate's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                  <p>
                    Inqreate provides an AI-powered content creation platform that enables users to generate blog posts, social media content, e-commerce product descriptions, and other written content. Our service includes content generation, SEO optimization, scheduling, and analytics features.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                  <p className="mb-4">When you create an account, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Promptly update any changes to your information</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
                  <p className="mb-4">You agree not to use our service to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Generate content that is illegal, harmful, or offensive</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Spread misinformation or fake news</li>
                    <li>Create spam or unsolicited content</li>
                    <li>Attempt to bypass usage limits or security measures</li>
                    <li>Resell or redistribute our service without authorization</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Content Ownership</h2>
                  <p>
                    Content you create using our platform belongs to you. However, you grant us a limited license to store, process, and improve our AI models using anonymized data. We do not claim ownership of your content and will not use identifiable content for marketing without your permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Subscription and Payment</h2>
                  <p className="mb-4">For paid subscriptions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Billing occurs at the start of each billing period</li>
                    <li>Prices are subject to change with 30 days notice</li>
                    <li>Refunds are available within 7 days for annual plans</li>
                    <li>Unused credits do not roll over to the next period</li>
                    <li>You can cancel your subscription at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
                  <p>
                    We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may temporarily suspend service for maintenance, updates, or security reasons. We will provide advance notice when possible.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                  <p>
                    Inqreate shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
                  <p>
                    Our service is provided "as is" without warranties of any kind. We do not guarantee that AI-generated content will be error-free, original, or suitable for your specific purposes. You are responsible for reviewing and editing all generated content.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
                  <p>
                    We may terminate or suspend your account immediately for violations of these terms. Upon termination, your right to use the service ceases immediately. You may download your data within 30 days of termination.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Material changes will be communicated via email or in-app notification at least 30 days before taking effect. Continued use after changes constitutes acceptance.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
                  <p>
                    These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">13. Contact</h2>
                  <p>
                    For questions about these terms, please contact us at:
                  </p>
                  <p className="mt-4">
                    <strong className="text-white">Email:</strong> legal@inqreate.com<br />
                    <strong className="text-white">Address:</strong> Bangalore, Karnataka, India
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-[#9CA3AF]">
          <p>© 2025 Inqreate. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
