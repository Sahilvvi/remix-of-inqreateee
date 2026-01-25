import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Globe, 
  Sparkles, 
  Download, 
  Eye, 
  Trash2, 
  Calendar,
  Briefcase,
  ShoppingCart,
  FileText,
  Rocket,
  Layout,
  Loader2,
  ExternalLink,
  Code
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WebsiteProject {
  id: string;
  name: string;
  template: string;
  description: string | null;
  html_content: string | null;
  css_content: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const templates = [
  { id: "portfolio", name: "Portfolio", icon: Briefcase, description: "Showcase your work and skills" },
  { id: "business", name: "Business", icon: Globe, description: "Professional company website" },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingCart, description: "Online store with products" },
  { id: "blog", name: "Blog", icon: FileText, description: "Content-focused blog layout" },
  { id: "landing", name: "Landing Page", icon: Rocket, description: "High-converting landing page" },
  { id: "saas", name: "SaaS", icon: Layout, description: "Software as a Service website" },
];

const colorSchemes = [
  { id: "blue", name: "Professional Blue", colors: "#3B82F6, #1E40AF, #DBEAFE" },
  { id: "purple", name: "Creative Purple", colors: "#9333EA, #6B21A8, #F3E8FF" },
  { id: "green", name: "Nature Green", colors: "#10B981, #047857, #D1FAE5" },
  { id: "orange", name: "Energetic Orange", colors: "#F97316, #C2410C, #FED7AA" },
  { id: "dark", name: "Modern Dark", colors: "#1F2937, #111827, #F9FAFB" },
  { id: "minimal", name: "Minimal Monochrome", colors: "#000000, #374151, #FFFFFF" },
];

const WebsiteBuilder = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [colorScheme, setColorScheme] = useState("");
  const [contentRequirements, setContentRequirements] = useState("");
  const [previewProject, setPreviewProject] = useState<WebsiteProject | null>(null);
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [codeProject, setCodeProject] = useState<WebsiteProject | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects((data as WebsiteProject[]) || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedTemplate || !projectName || !businessType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-website', {
        body: {
          template: selectedTemplate,
          businessType,
          colorScheme: colorSchemes.find(c => c.id === colorScheme)?.colors || colorSchemes[0].colors,
          contentRequirements,
          projectName,
        },
      });

      if (functionError) throw functionError;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data: insertData, error: insertError } = await supabase
        .from('website_projects')
        .insert({
          user_id: userData.user.id,
          name: projectName,
          template: selectedTemplate,
          description: functionData.description || `A ${selectedTemplate} website for ${businessType}`,
          html_content: functionData.html,
          css_content: functionData.css,
          status: 'draft',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "Website generated!",
        description: "Your website has been created successfully.",
      });

      // Reset form
      setSelectedTemplate("");
      setProjectName("");
      setBusinessType("");
      setColorScheme("");
      setContentRequirements("");
      
      // Refresh projects and switch to My Websites tab
      await fetchProjects();
      setActiveTab("projects");
    } catch (error: any) {
      console.error('Error generating website:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate website",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The website project has been removed.",
      });

      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDownload = (project: WebsiteProject) => {
    const htmlWithCss = `
${project.html_content?.replace('</head>', `<style>${project.css_content || ''}</style></head>`)}
    `.trim();

    const blob = new Blob([htmlWithCss], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Your website has been downloaded as HTML.",
    });
  };

  const getPreviewContent = (project: WebsiteProject) => {
    if (!project.html_content) return '';
    return project.html_content.replace('</head>', `<style>${project.css_content || ''}</style></head>`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Website Builder</h1>
        <p className="text-muted-foreground">Create stunning websites with AI assistance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="projects">My Websites ({projects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          {/* Template Selection */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                Choose a Template
              </CardTitle>
              <CardDescription>Select a template that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50 bg-background/50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        selectedTemplate === template.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Customization Form */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI-Powered Customization
              </CardTitle>
              <CardDescription>Describe your website and let AI create it for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    placeholder="My Amazing Website"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business/Website Type *</Label>
                  <Input
                    id="businessType"
                    placeholder="e.g., Photography studio, Tech startup, Restaurant"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorScheme">Color Scheme</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorSchemes.map((scheme) => (
                      <SelectItem key={scheme.id} value={scheme.id}>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {scheme.colors.split(', ').map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-border/50"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span>{scheme.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentRequirements">Content Requirements</Label>
                <Textarea
                  id="contentRequirements"
                  placeholder="Describe what you want on your website... e.g., 'A modern photography portfolio with a gallery section, about me page, and contact form. Include testimonials from clients.'"
                  value={contentRequirements}
                  onChange={(e) => setContentRequirements(e.target.value)}
                  rows={4}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !selectedTemplate || !projectName || !businessType}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Website...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Website with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="py-12 text-center">
                <Globe className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No websites yet</h3>
                <p className="text-muted-foreground mb-4">Create your first website using our AI-powered builder</p>
                <Button onClick={() => setActiveTab("create")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Website
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {project.html_content ? (
                      <iframe
                        srcDoc={getPreviewContent(project)}
                        className="w-full h-full border-0 pointer-events-none"
                        title={project.name}
                        sandbox="allow-same-origin"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Globe className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur">
                      {project.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description || `${project.template} template`}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewProject(project)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCodeProject(project);
                          setShowCodeDialog(true);
                        }}
                      >
                        <Code className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(project)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={!!previewProject} onOpenChange={() => setPreviewProject(null)}>
        <DialogContent className="max-w-6xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {previewProject?.name} Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden rounded-lg border border-border">
            {previewProject && (
              <iframe
                srcDoc={getPreviewContent(previewProject)}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Code Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              {codeProject?.name} Source Code
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="html">
            <TabsList>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="html">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[50vh] text-sm">
                <code>{codeProject?.html_content || 'No HTML content'}</code>
              </pre>
            </TabsContent>
            <TabsContent value="css">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[50vh] text-sm">
                <code>{codeProject?.css_content || 'No CSS content'}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsiteBuilder;
