import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI content generation work?",
      answer: "Our AI uses advanced language models (GPT-5 and Gemini) to understand your brand voice, target audience, and content requirements. Simply provide a topic or brief, and the AI generates high-quality, SEO-optimized content in seconds. You can then edit and customize it before publishing.",
    },
    {
      question: "Can I connect multiple social media accounts?",
      answer: "Yes! Inqreate supports connecting multiple accounts across all major platforms including Instagram, Facebook, Twitter/X, LinkedIn, and TikTok. You can manage and publish to all your accounts from a single dashboard.",
    },
    {
      question: "Is there a limit to how much content I can generate?",
      answer: "It depends on your plan. Our Starter plan includes 50 AI-generated pieces per month, Professional gets 200, and Enterprise users enjoy unlimited content generation. All plans include unlimited editing and scheduling.",
    },
    {
      question: "Do I need any technical skills to use Inqreate?",
      answer: "Not at all! Inqreate is designed to be user-friendly and intuitive. If you can use social media, you can use Inqreate. Our platform guides you through every step, and our support team is always ready to help.",
    },
    {
      question: "Can I customize the AI-generated content?",
      answer: "Absolutely! All AI-generated content is fully editable. You can adjust the tone, style, length, and any specific details. You can also save brand guidelines and templates to ensure consistency across all your content.",
    },
    {
      question: "How does the scheduling feature work?",
      answer: "Our smart scheduling tool analyzes your audience engagement patterns and suggests optimal posting times. You can also manually schedule posts for specific dates and times. Content is automatically published to your connected platforms at the scheduled time.",
    },
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use bank-level encryption for all data transmission and storage. We never share your content or data with third parties, and you maintain full ownership of everything you create.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties or hidden fees. Your access will continue until the end of your current billing period, and you can download all your content before canceling.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="gradient-text neon-text">Questions</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Inqreate
          </p>
        </div>

        <Card className="glass-card max-w-4xl mx-auto p-8 animate-scale-in">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;
