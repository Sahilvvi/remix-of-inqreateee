import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, 
  Globe,
  Zap,
  Shield,
  Eye,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  Calendar,
  Trash2,
  ExternalLink,
  TrendingUp,
  ClipboardCheck
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Suggestion {
  category: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
}

interface AuditDetails {
  issues: string[];
  recommendations: string[];
}

interface WebsiteAudit {
  id: string;
  url: string;
  overall_score: number;
  performance_score: number;
  seo_score: number;
  accessibility_score: number;
  security_score: number;
  mobile_score: number;
  suggestions: Suggestion[];
  details: {
    performance?: AuditDetails;
    seo?: AuditDetails;
    accessibility?: AuditDetails;
    security?: AuditDetails;
    mobile?: AuditDetails;
  };
  created_at: string;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 50) return 'text-orange-500';
  return 'text-red-500';
};

const getScoreBgColor = (score: number) => {
  if (score >= 90) return 'bg-green-500/10 border-green-500/20';
  if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
  if (score >= 50) return 'bg-orange-500/10 border-orange-500/20';
  return 'bg-red-500/10 border-red-500/20';
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'info': return <Info className="w-4 h-4 text-blue-500" />;
    default: return <Info className="w-4 h-4 text-muted-foreground" />;
  }
};

const getSeverityBadgeColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'warning': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'info': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const WebsiteAuditor = () => {
  const [activeTab, setActiveTab] = useState("audit");
  const [audits, setAudits] = useState<WebsiteAudit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [url, setUrl] = useState("");
  const [currentAudit, setCurrentAudit] = useState<WebsiteAudit | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_audits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type the data properly
      const typedData = (data || []).map((item: any) => ({
        ...item,
        suggestions: item.suggestions || [],
        details: item.details || {}
      })) as WebsiteAudit[];
      
      setAudits(typedData);
    } catch (error: any) {
      console.error('Error fetching audits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudit = async () => {
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a website URL to audit",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setIsAuditing(true);
    setCurrentAudit(null);

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('audit-website', {
        body: { url: formattedUrl },
      });

      if (functionError) throw functionError;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data: insertData, error: insertError } = await supabase
        .from('website_audits')
        .insert({
          user_id: userData.user.id,
          url: formattedUrl,
          overall_score: functionData.overall_score,
          performance_score: functionData.performance_score,
          seo_score: functionData.seo_score,
          accessibility_score: functionData.accessibility_score,
          security_score: functionData.security_score,
          mobile_score: functionData.mobile_score,
          suggestions: functionData.suggestions as unknown as any,
          details: functionData.details as unknown as any,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const newAudit: WebsiteAudit = {
        id: insertData.id,
        url: insertData.url,
        overall_score: insertData.overall_score ?? 0,
        performance_score: insertData.performance_score ?? 0,
        seo_score: insertData.seo_score ?? 0,
        accessibility_score: insertData.accessibility_score ?? 0,
        security_score: insertData.security_score ?? 0,
        mobile_score: insertData.mobile_score ?? 0,
        suggestions: (insertData.suggestions as unknown as Suggestion[]) || [],
        details: (insertData.details as unknown as WebsiteAudit['details']) || {},
        created_at: insertData.created_at
      };

      setCurrentAudit(newAudit);
      
      toast({
        title: "Audit complete!",
        description: `Overall score: ${functionData.overall_score}/100`,
      });

      await fetchAudits();
    } catch (error: any) {
      console.error('Error auditing website:', error);
      toast({
        title: "Audit failed",
        description: error.message || "Failed to audit website",
        variant: "destructive",
      });
    } finally {
      setIsAuditing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_audits')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Audit deleted",
        description: "The audit has been removed.",
      });

      if (currentAudit?.id === id) {
        setCurrentAudit(null);
      }

      fetchAudits();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const viewAudit = (audit: WebsiteAudit) => {
    setCurrentAudit(audit);
    setActiveTab("audit");
  };

  const ScoreCard = ({ label, score, icon: Icon }: { label: string; score: number; icon: any }) => (
    <div className={`p-4 rounded-xl border ${getScoreBgColor(score)}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${getScoreColor(score)}`} />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
      <Progress value={score} className="h-2 mt-2" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Website Auditor</h1>
        <p className="text-muted-foreground">Analyze websites for performance, SEO, accessibility, and security</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="audit">Run Audit</TabsTrigger>
          <TabsTrigger value="history">Audit History ({audits.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-6 mt-6">
          {/* URL Input */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Website URL
              </CardTitle>
              <CardDescription>Enter any website URL to run a comprehensive audit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                  />
                </div>
                <Button
                  onClick={handleAudit}
                  disabled={isAuditing}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isAuditing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      Run Audit
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Results */}
          {currentAudit && (
            <>
              {/* Overall Score */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Audit Results
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <a 
                          href={currentAudit.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {currentAudit.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </CardDescription>
                    </div>
                    <div className={`text-center p-4 rounded-xl ${getScoreBgColor(currentAudit.overall_score)}`}>
                      <div className={`text-4xl font-bold ${getScoreColor(currentAudit.overall_score)}`}>
                        {currentAudit.overall_score}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Overall Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <ScoreCard label="Performance" score={currentAudit.performance_score} icon={Zap} />
                    <ScoreCard label="SEO" score={currentAudit.seo_score} icon={Search} />
                    <ScoreCard label="Accessibility" score={currentAudit.accessibility_score} icon={Eye} />
                    <ScoreCard label="Security" score={currentAudit.security_score} icon={Shield} />
                    <ScoreCard label="Mobile" score={currentAudit.mobile_score} icon={Smartphone} />
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions */}
              {currentAudit.suggestions && currentAudit.suggestions.length > 0 && (
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Improvement Suggestions
                    </CardTitle>
                    <CardDescription>
                      {currentAudit.suggestions.filter(s => s.severity === 'critical').length} critical, {' '}
                      {currentAudit.suggestions.filter(s => s.severity === 'warning').length} warnings, {' '}
                      {currentAudit.suggestions.filter(s => s.severity === 'info').length} info
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentAudit.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-border/50 bg-background/50"
                        >
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(suggestion.severity)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-foreground">{suggestion.title}</span>
                                <Badge variant="outline" className={`text-xs ${getSeverityBadgeColor(suggestion.severity)}`}>
                                  {suggestion.severity}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {suggestion.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Detailed Analysis */}
              {currentAudit.details && Object.keys(currentAudit.details).length > 0 && (
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="space-y-2">
                      {Object.entries(currentAudit.details).map(([category, data]) => (
                        <AccordionItem key={category} value={category} className="border border-border/50 rounded-lg px-4">
                          <AccordionTrigger className="hover:no-underline">
                            <span className="capitalize font-medium">{category}</span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-2">
                            {data?.issues && data.issues.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-destructive mb-2">Issues Found</h4>
                                <ul className="space-y-1">
                                  {data.issues.map((issue, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                      {issue}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {data?.recommendations && data.recommendations.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-green-500 mb-2">Recommendations</h4>
                                <ul className="space-y-1">
                                  {data.recommendations.map((rec, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!currentAudit && !isAuditing && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="py-12 text-center">
                <ClipboardCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Audit</h3>
                <p className="text-muted-foreground">Enter a website URL above to get a comprehensive analysis</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : audits.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="py-12 text-center">
                <ClipboardCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No audits yet</h3>
                <p className="text-muted-foreground mb-4">Run your first website audit to see results here</p>
                <Button onClick={() => setActiveTab("audit")}>
                  <Search className="w-4 h-4 mr-2" />
                  Run Audit
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {audits.map((audit) => (
                <Card key={audit.id} className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <a 
                          href={audit.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-foreground font-medium hover:text-primary flex items-center gap-1"
                        >
                          {audit.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(audit.created_at).toLocaleDateString()}
                          </span>
                          <span className={getScoreColor(audit.overall_score)}>
                            Overall: {audit.overall_score}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden md:flex gap-2">
                          <Badge variant="outline" className={`${getScoreBgColor(audit.performance_score)} ${getScoreColor(audit.performance_score)}`}>
                            <Zap className="w-3 h-3 mr-1" /> {audit.performance_score}
                          </Badge>
                          <Badge variant="outline" className={`${getScoreBgColor(audit.seo_score)} ${getScoreColor(audit.seo_score)}`}>
                            <Search className="w-3 h-3 mr-1" /> {audit.seo_score}
                          </Badge>
                          <Badge variant="outline" className={`${getScoreBgColor(audit.security_score)} ${getScoreColor(audit.security_score)}`}>
                            <Shield className="w-3 h-3 mr-1" /> {audit.security_score}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewAudit(audit)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(audit.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteAuditor;
