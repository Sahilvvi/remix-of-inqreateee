import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const BlogPreview = () => {
  const posts = [
    {
      title: "The Future of AI-Powered Content Creation: Trends for 2025",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way businesses create, optimize, and distribute content at scale.",
      date: "Jan 10, 2025",
      readTime: "8 min read",
      category: "AI & Technology",
      gradient: "from-[#10B981]/30 to-[#3B82F6]/30",
    },
    {
      title: "10 SEO Strategies That Actually Work in 2025",
      excerpt:
        "Learn the latest SEO techniques that can help your content rank higher and reach more audiences.",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      category: "SEO",
      gradient: "from-[#9333EA]/30 to-[#EC4899]/30",
    },
    {
      title: "How to Create a Content Calendar That Works",
      excerpt:
        "A step-by-step guide to planning and organizing your content for maximum efficiency.",
      date: "Jan 5, 2025",
      readTime: "5 min read",
      category: "Productivity",
      gradient: "from-[#3B82F6]/30 to-[#10B981]/30",
    },
  ];

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10B981]/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#10B981]/30 mb-6">
            <BookOpen className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-medium text-[#10B981]">From the Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Insights &{" "}
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Resources
            </span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Expert tips, guides, and the latest trends in AI content creation, SEO, and marketing.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <Link to="/blog" key={index} className="group">
              <Card className="glass-card border-white/10 hover:border-[#10B981]/40 transition-all duration-300 h-full overflow-hidden hover:shadow-neon hover:-translate-y-1">
                <div className={`h-40 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center`}>
                  <BookOpen className="w-12 h-12 text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
                <CardContent className="p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs font-medium text-[#10B981]">{post.category}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mb-5 line-clamp-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-4 border-t border-white/5">
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
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#EC4899] hover:shadow-neon font-semibold rounded-xl"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
