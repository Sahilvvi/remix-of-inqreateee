import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import inqreateLogo from "@/assets/inqreate-logo.png";

const Blog = () => {
  const featuredPost = {
    title: "The Future of AI-Powered Content Creation: Trends for 2025",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses create, optimize, and distribute content at scale.",
    date: "Jan 10, 2025",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
  };

  const posts = [
    {
      title: "10 SEO Strategies That Actually Work in 2025",
      excerpt: "Learn the latest SEO techniques that can help your content rank higher and reach more audiences.",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      category: "SEO",
    },
    {
      title: "How to Create a Content Calendar That Works",
      excerpt: "A step-by-step guide to planning and organizing your content for maximum efficiency.",
      date: "Jan 5, 2025",
      readTime: "5 min read",
      category: "Productivity",
    },
    {
      title: "Multi-Language Content: Reaching Global Audiences",
      excerpt: "Tips for creating content that resonates with audiences across different languages and cultures.",
      date: "Jan 3, 2025",
      readTime: "7 min read",
      category: "Marketing",
    },
    {
      title: "E-commerce Product Descriptions That Convert",
      excerpt: "Master the art of writing product descriptions that drive sales and engage customers.",
      date: "Dec 28, 2024",
      readTime: "4 min read",
      category: "E-commerce",
    },
    {
      title: "Social Media Automation: Best Practices",
      excerpt: "How to automate your social media without losing the human touch.",
      date: "Dec 25, 2024",
      readTime: "6 min read",
      category: "Social Media",
    },
    {
      title: "Building a Strong Brand Voice with AI",
      excerpt: "Learn how to maintain brand consistency while using AI for content generation.",
      date: "Dec 20, 2024",
      readTime: "5 min read",
      category: "Branding",
    },
  ];

  const categories = ["All", "AI & Technology", "SEO", "Marketing", "E-commerce", "Social Media", "Productivity"];

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

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#10B981]/30 mb-6">
              <BookOpen className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-medium text-[#10B981]">Inqreate Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Insights & <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] leading-relaxed">
              Expert tips, guides, and insights on AI content creation, SEO, marketing, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white"
                    : "glass-card border border-white/10 text-[#9CA3AF] hover:text-white hover:border-[#10B981]/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Card className="glass-card border-white/10 overflow-hidden group cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#10B981] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-[#9CA3AF] mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="glass-card border-white/10 hover:border-[#10B981]/30 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs font-medium text-[#10B981]">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="hover:bg-[#10B981] hover:text-white hover:border-[#10B981]">
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-[#9CA3AF] mb-6 max-w-xl mx-auto">
            Get the latest articles, tips, and insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#10B981]"
            />
            <Button className="bg-gradient-to-r from-[#10B981] to-[#3B82F6]">
              Subscribe
            </Button>
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

export default Blog;
