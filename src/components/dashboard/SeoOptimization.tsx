import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, AlertCircle, History, FileSearch } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeoHistory } from "./seo/SeoHistory";

const SeoOptimization = () => {
  const [content, setContent] = useState("");
  const [targetKeywords, setTargetKeywords] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-seo', {
        body: { content, targetKeywords }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      
      // Save to history
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('seo_analyses').insert({
          user_id: user.id,
          content,
          target_keywords: targetKeywords,
          seo_score: data.analysis.score || 0,
          readability_score: typeof data.analysis.readability === 'object' 
            ? data.analysis.readability?.fleschReadingEase || 0 
            : data.analysis.readability || 0,
          meta_description: data.analysis.metaDescription || '',
          suggestions: data.analysis.suggestions || [],
          missing_keywords: data.analysis.missingKeywords || []
        });
      }
      
      toast({
        title: "Success",
        description: "SEO analysis completed!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">SEO Optimization</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Analyze and improve your content's SEO</p>
      </div>

      <Tabs defaultValue="analyze" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="analyze" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <FileSearch className="h-3 w-3 sm:h-4 sm:w-4" />
            Analyze
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <History className="h-3 w-3 sm:h-4 sm:w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="mt-4 sm:mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Content Analysis</CardTitle>
            <CardDescription>Paste your content for SEO analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input
                id="keywords"
                placeholder="e.g., AI automation, content marketing..."
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your blog post or article content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze SEO"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>SEO performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!analysis ? (
              <div className="text-center py-12 text-muted-foreground">
                Run an analysis to see results
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">SEO Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(analysis.score || 0)}`}>
                        {analysis.score || 0}/100
                      </span>
                    </div>
                    <Progress value={analysis.score || 0} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Readability</span>
                      <span className={`text-lg font-semibold ${getScoreColor(
                        typeof analysis.readability === 'object' 
                          ? analysis.readability?.fleschReadingEase || 0 
                          : analysis.readability || 0
                      )}`}>
                        {typeof analysis.readability === 'object' 
                          ? `${analysis.readability?.fleschReadingEase || 0}/100` 
                          : `${analysis.readability || 0}/100`}
                      </span>
                    </div>
                    <Progress 
                      value={
                        typeof analysis.readability === 'object' 
                          ? analysis.readability?.fleschReadingEase || 0 
                          : analysis.readability || 0
                      } 
                      className="h-2" 
                    />
                    {typeof analysis.readability === 'object' && analysis.readability?.gradeLevel && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Grade Level: {analysis.readability.gradeLevel}
                      </p>
                    )}
                  </div>

                  {analysis.metaDescription && (
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-1">Suggested Meta Description:</p>
                      <p className="text-sm text-muted-foreground">{analysis.metaDescription}</p>
                    </div>
                  )}

                  {analysis.suggestions && analysis.suggestions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Improvement Suggestions:
                      </p>
                      <ul className="space-y-2">
                        {analysis.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="text-sm p-2 rounded bg-muted/30">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Missing Keywords:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingKeywords.map((keyword: string, index: number) => (
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <SeoHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoOptimization;
