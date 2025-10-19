import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface SeoAnalysis {
  id: string;
  content: string;
  target_keywords: string;
  seo_score: number;
  readability_score: number;
  meta_description: string;
  suggestions: any;
  missing_keywords: any;
  created_at: string;
}

export const SeoHistory = () => {
  const [analyses, setAnalyses] = useState<SeoAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SeoAnalysis | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyses();
    
    const channel = supabase
      .channel('seo-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'seo_analyses'
      }, () => {
        fetchAnalyses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnalyses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('seo_analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAnalyses(data);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('seo_analyses')
      .delete()
      .eq('id', id);

    if (!error) {
      toast({ title: "Deleted", description: "Analysis removed from history." });
    }
  };

  const handleView = (analysis: SeoAnalysis) => {
    setSelectedAnalysis(analysis);
    setIsDialogOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>SEO Analysis History</CardTitle>
          <CardDescription>Your previous SEO analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {analyses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No analyses yet</p>
            ) : (
              analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`text-lg font-bold ${getScoreColor(analysis.seo_score)}`}>
                          Score: {analysis.seo_score}/100
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(analysis.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Keywords: {analysis.target_keywords || 'None'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(analysis)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(analysis.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{analysis.content}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>SEO Analysis Details</DialogTitle>
          </DialogHeader>
          {selectedAnalysis && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">SEO Score</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(selectedAnalysis.seo_score)}`}>
                      {selectedAnalysis.seo_score}/100
                    </span>
                  </div>
                  <Progress value={selectedAnalysis.seo_score} className="h-2 mt-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Readability</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(selectedAnalysis.readability_score)}`}>
                      {selectedAnalysis.readability_score}/100
                    </span>
                  </div>
                  <Progress value={selectedAnalysis.readability_score} className="h-2 mt-2" />
                </div>
              </div>

              {selectedAnalysis.meta_description && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-2">Meta Description</p>
                  <p className="text-sm">{selectedAnalysis.meta_description}</p>
                </div>
              )}

              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-2">Content</p>
                <p className="text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                  {selectedAnalysis.content}
                </p>
              </div>

              {selectedAnalysis.suggestions && selectedAnalysis.suggestions.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Suggestions</p>
                  <ul className="space-y-2">
                    {selectedAnalysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm p-2 rounded bg-muted/30">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedAnalysis.missing_keywords && selectedAnalysis.missing_keywords.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Missing Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnalysis.missing_keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
