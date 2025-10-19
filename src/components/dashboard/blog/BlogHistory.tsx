import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Eye, Download, Copy, Clock, FileText } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface BlogHistoryProps {
  refreshTrigger?: number;
}

interface SavedBlog {
  id: string;
  title: string;
  content: string;
  topic: string;
  keywords: string | null;
  tone: string;
  language: string;
  word_count: number;
  image_url: string | null;
  created_at: string;
}

export const BlogHistory = ({ refreshTrigger }: BlogHistoryProps) => {
  const [blogs, setBlogs] = useState<SavedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<SavedBlog | null>(null);
  const { toast } = useToast();

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("generated_blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch blog history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("generated_blogs").delete().eq("id", id);
      if (error) throw error;
      
      toast({
        title: "Deleted!",
        description: "Blog post removed from history.",
      });
      fetchBlogs();
      if (selectedBlog?.id === id) setSelectedBlog(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (blog: SavedBlog) => {
    const fullContent = `${blog.image_url ? `![${blog.title}](${blog.image_url})\n\n` : ''}${blog.content}`;
    navigator.clipboard.writeText(fullContent);
    toast({
      title: "Copied!",
      description: "Blog content copied to clipboard.",
    });
  };

  const handleDownload = (blog: SavedBlog) => {
    const fullContent = `# ${blog.title}\n\n${blog.image_url ? `![${blog.title}](${blog.image_url})\n\n` : ''}${blog.content}`;
    const element = document.createElement("a");
    const file = new Blob([fullContent], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${blog.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <Card className="p-16 text-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading your blog history...</p>
      </Card>
    );
  }

  if (blogs.length === 0) {
    return (
      <Card className="p-16 text-center border-2 border-dashed">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No Saved Blogs Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Generate and save your first blog to start building your content library
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Blog List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Your Blogs</h3>
          <Badge variant="secondary" className="text-sm">{blogs.length} saved</Badge>
        </div>
        
        <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
          {blogs.map((blog) => (
            <Card 
              key={blog.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedBlog?.id === blog.id ? "border-2 border-primary shadow-lg" : "border-2"
              }`}
              onClick={() => setSelectedBlog(blog)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <Clock className="w-3 h-3" />
                  {format(new Date(blog.created_at), "PPP")}
                </CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="text-xs">{blog.tone}</Badge>
                  <Badge variant="outline" className="text-xs">{blog.language}</Badge>
                  <Badge variant="outline" className="text-xs">{blog.word_count} words</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlog(blog);
                    }}
                    className="gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(blog);
                    }}
                    className="gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(blog);
                    }}
                    className="gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(blog.id);
                    }}
                    className="gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Blog Preview */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        {selectedBlog ? (
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-3 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardTitle className="text-2xl">{selectedBlog.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge>{selectedBlog.tone}</Badge>
                <Badge>{selectedBlog.language}</Badge>
                <Badge>{selectedBlog.word_count} words</Badge>
              </div>
              {selectedBlog.keywords && (
                <CardDescription className="text-sm">
                  Keywords: {selectedBlog.keywords}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4 p-6 max-h-[700px] overflow-y-auto">
              {selectedBlog.image_url && (
                <img 
                  src={selectedBlog.image_url} 
                  alt={selectedBlog.title} 
                  className="w-full rounded-lg shadow-md" 
                />
              )}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap">{selectedBlog.content}</div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-16 text-center border-2 border-dashed">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Eye className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">Select a blog to view details</p>
          </Card>
        )}
      </div>
    </div>
  );
};
