import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Eye, Download, Copy } from "lucide-react";
import { format } from "date-fns";

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
    return <div className="text-center p-8">Loading history...</div>;
  }

  if (blogs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No saved blogs yet. Generate and save your first blog!</p>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Saved Blogs ({blogs.length})</h3>
        {blogs.map((blog) => (
          <Card key={blog.id} className={selectedBlog?.id === blog.id ? "border-primary" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{blog.title}</CardTitle>
              <CardDescription>
                {format(new Date(blog.created_at), "PPP")} • {blog.word_count} words • {blog.language}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(blog)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(blog)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(blog.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        {selectedBlog ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedBlog.title}</CardTitle>
              <CardDescription>
                {selectedBlog.tone} • {selectedBlog.language} • {selectedBlog.word_count} words
                {selectedBlog.keywords && ` • Keywords: ${selectedBlog.keywords}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedBlog.image_url && (
                <img src={selectedBlog.image_url} alt={selectedBlog.title} className="w-full rounded-lg" />
              )}
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{selectedBlog.content}</div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Select a blog to view details</p>
          </Card>
        )}
      </div>
    </div>
  );
};
