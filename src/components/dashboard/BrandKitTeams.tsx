import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, Mail, UserPlus, Trash2, Crown, Shield, User as UserIcon, 
  Upload, Palette, Type, Hash, Sparkles, FileText, ShoppingCart, 
  MessageSquare, Loader2, Plus, X, Save, Eye, Clock, Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Team {
  id: string;
  name: string;
  created_at: string;
}

interface TeamMember {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  user_email?: string;
  full_name?: string;
  avatar_url?: string;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  expires_at: string;
}

interface BrandAssets {
  id?: string;
  logo_url: string | null;
  brand_colors: string[];
  heading_font: string;
  body_font: string;
}

interface SavedHashtag {
  id: string;
  hashtag: string;
  created_at: string;
}

interface ContentDraft {
  id: string;
  title: string;
  content: string | null;
  content_type: string;
  status: string;
  submitted_by: string;
  created_at: string;
  submitter_name?: string;
}

const defaultTemplates = [
  {
    id: "festival-greetings",
    name: "Festival Greetings",
    description: "Pre-designed posts for major holidays and events.",
    icon: Sparkles,
    category: "Festival",
  },
  {
    id: "product-promotions",
    name: "Product Promotions",
    description: "Boost sales with engaging product launch templates.",
    icon: ShoppingCart,
    category: "Marketing",
  },
  {
    id: "industry-insights",
    name: "Industry Insights",
    description: "Share thought leadership with these expert templates.",
    icon: FileText,
    category: "Blog",
  },
  {
    id: "social-media-blast",
    name: "Social Media Blast",
    description: "Quick templates for daily social media updates.",
    icon: MessageSquare,
    category: "Social",
  },
];

const availableFonts = [
  "Poppins", "Open Sans", "Roboto", "Inter", "Montserrat", "Lato", 
  "Playfair Display", "Merriweather", "Source Sans Pro", "Raleway"
];

const BrandKitTeams = () => {
  // Team state
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"member" | "admin">("member");
  
  // Brand assets state
  const [brandAssets, setBrandAssets] = useState<BrandAssets>({
    logo_url: null,
    brand_colors: ["#3B82F6", "#10B981"],
    heading_font: "Poppins",
    body_font: "Open Sans",
  });
  const [newColor, setNewColor] = useState("#6366F1");
  
  // Hashtags state
  const [hashtags, setHashtags] = useState<SavedHashtag[]>([]);
  const [newHashtag, setNewHashtag] = useState("");
  
  // Drafts state
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSavingAssets, setIsSavingAssets] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    loadTeams();
    loadBrandAssets();
    loadHashtags();
    loadDrafts();
    
    // Realtime subscriptions
    const brandChannel = supabase
      .channel('brand-assets-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'brand_assets' }, () => loadBrandAssets())
      .subscribe();
      
    const hashtagChannel = supabase
      .channel('hashtags-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'saved_hashtags' }, () => loadHashtags())
      .subscribe();
      
    const draftChannel = supabase
      .channel('drafts-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content_drafts' }, () => loadDrafts())
      .subscribe();

    return () => {
      supabase.removeChannel(brandChannel);
      supabase.removeChannel(hashtagChannel);
      supabase.removeChannel(draftChannel);
    };
  }, []);

  useEffect(() => {
    if (currentTeam) {
      loadTeamMembers();
      loadInvitations();
    }
  }, [currentTeam]);

  // Brand Assets Functions
  const loadBrandAssets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('brand_assets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setBrandAssets({
          id: data.id,
          logo_url: data.logo_url,
          brand_colors: (data.brand_colors as string[]) || [],
          heading_font: data.heading_font || "Poppins",
          body_font: data.body_font || "Open Sans",
        });
      }
    } catch (error) {
      console.error('Error loading brand assets:', error);
    }
  };

  const saveBrandAssets = async () => {
    setIsSavingAssets(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('brand_assets')
        .upsert({
          user_id: user.id,
          logo_url: brandAssets.logo_url,
          brand_colors: brandAssets.brand_colors,
          heading_font: brandAssets.heading_font,
          body_font: brandAssets.body_font,
        }, { onConflict: 'user_id' });

      if (error) throw error;
      toast({ title: "Brand assets saved!", description: "Your brand settings have been updated." });
    } catch (error: any) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } finally {
      setIsSavingAssets(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setBrandAssets(prev => ({ ...prev, logo_url: publicUrl }));
      toast({ title: "Logo uploaded!", description: "Your brand logo has been updated." });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const addColor = () => {
    if (brandAssets.brand_colors.length >= 5) {
      toast({ title: "Maximum colors", description: "You can add up to 5 brand colors.", variant: "destructive" });
      return;
    }
    setBrandAssets(prev => ({
      ...prev,
      brand_colors: [...prev.brand_colors, newColor]
    }));
  };

  const removeColor = (index: number) => {
    setBrandAssets(prev => ({
      ...prev,
      brand_colors: prev.brand_colors.filter((_, i) => i !== index)
    }));
  };

  // Hashtags Functions
  const loadHashtags = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('saved_hashtags')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHashtags(data || []);
    } catch (error) {
      console.error('Error loading hashtags:', error);
    }
  };

  const addHashtag = async () => {
    if (!newHashtag.trim()) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const hashtag = newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`;
      
      const { error } = await supabase
        .from('saved_hashtags')
        .insert({ user_id: user.id, hashtag });

      if (error) throw error;
      setNewHashtag("");
      toast({ title: "Hashtag saved!" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const removeHashtag = async (id: string) => {
    try {
      const { error } = await supabase.from('saved_hashtags').delete().eq('id', id);
      if (error) throw error;
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  // Drafts Functions
  const loadDrafts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('content_drafts')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      
      // Get submitter names
      const submitterIds = [...new Set((data || []).map(d => d.submitted_by))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', submitterIds);
      
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      const draftsWithNames = (data || []).map(draft => ({
        ...draft,
        submitter_name: profileMap.get(draft.submitted_by)?.full_name || 
                        profileMap.get(draft.submitted_by)?.email || 
                        'Unknown'
      }));
      
      setDrafts(draftsWithNames);
    } catch (error) {
      console.error('Error loading drafts:', error);
    }
  };

  // Team Functions
  const loadTeams = async () => {
    try {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTeams(data || []);
      if (data && data.length > 0 && !currentTeam) {
        setCurrentTeam(data[0]);
      }
    } catch (error: any) {
      console.error("Error loading teams:", error);
    }
  };

  const loadTeamMembers = async () => {
    if (!currentTeam) return;

    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", currentTeam.id);

      if (error) throw error;

      const memberUserIds = (data || []).map(m => m.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email, full_name, avatar_url")
        .in("id", memberUserIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      const membersWithProfiles = (data || []).map((member) => {
        const profile = profileMap.get(member.user_id);
        return {
          ...member,
          user_email: profile?.email || member.user_id.slice(0, 8) + '...',
          full_name: profile?.full_name,
          avatar_url: profile?.avatar_url,
        };
      });

      setMembers(membersWithProfiles);
    } catch (error: any) {
      console.error("Error loading team members:", error);
    }
  };

  const loadInvitations = async () => {
    if (!currentTeam) return;

    try {
      const { data, error } = await supabase
        .from("team_invitations")
        .select("*")
        .eq("team_id", currentTeam.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error: any) {
      console.error("Error loading invitations:", error);
    }
  };

  const createTeam = async () => {
    if (!newTeamName.trim()) return;

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("teams")
        .insert({ name: newTeamName, created_by: userData.user.id })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Team created!", description: `${newTeamName} has been created successfully.` });
      setNewTeamName("");
      await loadTeams();
      setCurrentTeam(data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const sendInvitation = async () => {
    if (!currentTeam || !inviteEmail.trim()) return;

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const token = crypto.randomUUID();

      const { error: inviteError } = await supabase
        .from("team_invitations")
        .insert({
          team_id: currentTeam.id,
          email: inviteEmail,
          invited_by: userData.user.id,
          role: inviteRole,
          token,
        });

      if (inviteError) throw inviteError;

      await supabase.functions.invoke("send-team-invitation", {
        body: {
          email: inviteEmail,
          teamId: currentTeam.id,
          teamName: currentTeam.name,
          inviterName: userData.user.email,
          token,
          role: inviteRole,
        },
      });

      toast({ title: "Invitation sent!", description: `Invitation sent to ${inviteEmail}` });
      setInviteEmail("");
      await loadInvitations();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId: string) => {
    if (!confirm("Remove this team member?")) return;

    try {
      const { error } = await supabase.from("team_members").delete().eq("id", memberId);
      if (error) throw error;
      toast({ title: "Member removed" });
      await loadTeamMembers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner": return <Crown className="w-3 h-3" />;
      case "admin": return <Shield className="w-3 h-3" />;
      default: return <UserIcon className="w-3 h-3" />;
    }
  };

  const useTemplate = (templateId: string) => {
    toast({ title: "Template selected", description: "Navigate to the content generator to use this template." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Brand Kit & Teams</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your brand identity and collaborate with your team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Brand Assets & Templates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Assets Section */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Brand Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <Label className="w-24 text-sm text-muted-foreground">Brand Logo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={brandAssets.logo_url || undefined} />
                    <AvatarFallback className="bg-primary/10">
                      <Palette className="w-6 h-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" asChild disabled={isUploadingLogo}>
                      <span>
                        {isUploadingLogo ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        Upload Logo
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {/* Colors */}
              <div className="flex items-start gap-4">
                <Label className="w-24 text-sm text-muted-foreground pt-2">Brand Colors</Label>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {brandAssets.brand_colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-background shadow-md cursor-pointer hover:scale-110 transition-transform relative group"
                        style={{ backgroundColor: color }}
                        onClick={() => removeColor(index)}
                      >
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer border-0"
                      />
                      <Button variant="outline" size="sm" onClick={addColor}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Color
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonts */}
              <div className="flex items-center gap-4">
                <Label className="w-24 text-sm text-muted-foreground">Brand Fonts</Label>
                <div className="flex-1 flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ fontFamily: brandAssets.heading_font }}>
                      {brandAssets.heading_font}
                    </span>
                    <span className="text-xs text-muted-foreground">(Headings)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ fontFamily: brandAssets.body_font }}>
                      {brandAssets.body_font}
                    </span>
                    <span className="text-xs text-muted-foreground">(Body)</span>
                  </div>
                  <Select
                    value={brandAssets.heading_font}
                    onValueChange={(value) => setBrandAssets(prev => ({ ...prev, heading_font: value }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Heading Font" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFonts.map(font => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={saveBrandAssets} disabled={isSavingAssets} className="w-full">
                {isSavingAssets ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Brand Assets
              </Button>
            </CardContent>
          </Card>

          {/* Content Templates & Hashtags */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Content Templates & Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Saved Hashtags */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Saved Hashtags</Label>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <Badge 
                      key={tag.id} 
                      variant="secondary" 
                      className="px-3 py-1 cursor-pointer hover:bg-destructive/20 group"
                      onClick={() => removeHashtag(tag.id)}
                    >
                      {tag.hashtag}
                      <X className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                    </Badge>
                  ))}
                  {hashtags.length === 0 && (
                    <span className="text-sm text-muted-foreground">No hashtags saved yet</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new hashtag..."
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addHashtag()}
                    className="flex-1"
                  />
                  <Button onClick={addHashtag} size="sm">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Templates Library */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Templates Library</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {defaultTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={template.id}
                        className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                          onClick={() => useTemplate(template.id)}
                        >
                          Use Template
                        </Button>
                      </div>
                    );
                  })}
                </div>
                <Button variant="ghost" className="w-full text-primary">
                  Browse More Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team & Drafts */}
        <div className="space-y-6">
          {/* Team Members */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {members.length > 0 ? (
                <div className="space-y-3">
                  {members.slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {(member.full_name || member.user_email || '?').slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.full_name || member.user_email}</p>
                          <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                            {getRoleIcon(member.role)} {member.role}
                          </p>
                        </div>
                      </div>
                      {member.role !== 'owner' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No team members yet. Create a team to get started.
                </p>
              )}

              {/* Invite */}
              {currentTeam && (
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Email address"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={inviteRole} onValueChange={(v: any) => setInviteRole(v)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={sendInvitation}
                    disabled={loading}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite New Member
                  </Button>
                </div>
              )}

              {/* Create Team if none */}
              {teams.length === 0 && (
                <div className="space-y-2 pt-2">
                  <Input
                    placeholder="Team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                  <Button className="w-full" onClick={createTeam} disabled={loading}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Team
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Drafts for Approval */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Drafts for Approval
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {drafts.length > 0 ? (
                <>
                  {drafts.map((draft) => (
                    <div key={draft.id} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{draft.title}</p>
                        <p className="text-xs text-muted-foreground">
                          By {draft.submitter_name}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Drafts
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pending drafts
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrandKitTeams;
