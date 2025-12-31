import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, UserPlus, Trash2, Crown, Shield, User as UserIcon, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  expires_at: string;
}

const TeamCollaboration = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"member" | "admin">("member");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTeams();
  }, []);

  // Accept invitation via token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('invitation');
    if (!token) return;

    const accept = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('accept-team-invitation', {
          body: { token },
        });
        if (error) throw error;
        toast({
          title: 'Invitation accepted',
          description: 'You have joined the team.',
        });
        // Set current team to the one joined
        if (data?.team_id) {
          const { data: team } = await supabase
            .from('teams')
            .select('*')
            .eq('id', data.team_id)
            .maybeSingle();
          if (team) {
            setCurrentTeam(team as Team);
          }
        }
        await loadTeams();
        await loadInvitations();
        await loadTeamMembers();
      } catch (e: any) {
        console.error('Accept invitation error:', e);
        toast({
          title: 'Failed to accept invitation',
          description: e.message || 'Please try again later.',
          variant: 'destructive',
        });
      } finally {
        const url = new URL(window.location.href);
        url.searchParams.delete('invitation');
        window.history.replaceState({}, '', url.toString());
      }
    };

    accept();
  }, []);

  useEffect(() => {
    if (currentTeam) {
      loadTeamMembers();
      loadInvitations();
    }
  }, [currentTeam]);

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
      toast({
        title: "Error loading teams",
        description: error.message,
        variant: "destructive",
      });
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

      // Fetch user emails from profiles table
      const memberUserIds = (data || []).map(m => m.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .in("id", memberUserIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      const membersWithEmails = (data || []).map((member) => {
        const profile = profileMap.get(member.user_id);
        return {
          ...member,
          user_email: profile?.email || profile?.full_name || member.user_id.slice(0, 8) + '...',
        };
      });

      setMembers(membersWithEmails);
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
    if (!newTeamName.trim()) {
      toast({
        title: "Team name required",
        description: "Please enter a team name",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "Team created!",
        description: `${newTeamName} has been created successfully.`,
      });

      setNewTeamName("");
      await loadTeams();
      setCurrentTeam(data);
    } catch (error: any) {
      toast({
        title: "Error creating team",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendInvitation = async () => {
    if (!currentTeam || !inviteEmail.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      // Generate invitation token
      const token = crypto.randomUUID();

      // Create invitation in database
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

      // Send invitation email
      const { error: emailError } = await supabase.functions.invoke("send-team-invitation", {
        body: {
          email: inviteEmail,
          teamId: currentTeam.id,
          teamName: currentTeam.name,
          inviterName: userData.user.email,
          token,
          role: inviteRole,
        },
      });

      if (emailError) {
        console.error("Email send error:", emailError);
        toast({
          title: "Invitation created",
          description: "Invitation was created but email delivery failed. The user can still accept via the dashboard.",
        });
      } else {
        toast({
          title: "Invitation sent!",
          description: `Invitation email sent to ${inviteEmail}`,
        });
      }

      setInviteEmail("");
      setInviteRole("member");
      await loadInvitations();
    } catch (error: any) {
      toast({
        title: "Error sending invitation",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", memberId);

      if (error) throw error;

      toast({
        title: "Member removed",
        description: "Team member has been removed successfully",
      });

      await loadTeamMembers();
    } catch (error: any) {
      toast({
        title: "Error removing member",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4" />;
      case "admin":
        return <Shield className="w-4 h-4" />;
      default:
        return <UserIcon className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      owner: "bg-gradient-to-r from-[#EC4899] to-[#9333EA]",
      admin: "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]",
      member: "bg-muted",
    };

    return (
      <Badge className={`${variants[role]} text-white flex items-center gap-1`}>
        {getRoleIcon(role)}
        {role}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Background effects */}
      <div className="absolute -top-20 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl opacity-10 animate-pulse-slow pointer-events-none"></div>

      <div className="animate-slide-up">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 gradient-text neon-text">Team Collaboration</h1>
        <p className="text-sm sm:text-lg text-muted-foreground">Work together with your team on AI-powered content</p>
      </div>

      {/* Create Team Section */}
      <Card className="glass-card hover-lift animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Users className="w-6 h-6" />
            Create New Team
          </CardTitle>
          <CardDescription>Start collaborating by creating a team workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter team name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="glass-effect border-2"
              />
            </div>
            <Button 
              onClick={createTeam} 
              disabled={loading}
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-neon"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Selection */}
      {teams.length > 0 && (
        <Card className="glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="gradient-text">Select Team</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={currentTeam?.id}
              onValueChange={(value) => {
                const team = teams.find((t) => t.id === value);
                setCurrentTeam(team || null);
              }}
            >
              <SelectTrigger className="glass-effect border-2">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {currentTeam && (
        <>
          {/* Invite Members Section */}
          <Card className="glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <Mail className="w-6 h-6" />
                Invite Team Members
              </CardTitle>
              <CardDescription>Send email invitations to collaborate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="glass-effect border-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                      <SelectTrigger className="glass-effect border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={sendInvitation} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-neon"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Invitations */}
          {invitations.length > 0 && (
            <Card className="glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="gradient-text">Pending Invitations</CardTitle>
                <CardDescription>{invitations.length} invitation(s) waiting for response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="flex items-center justify-between p-4 glass-effect rounded-xl hover:bg-accent/50 transition-all"
                    >
                      <div>
                        <p className="font-semibold">{invitation.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {new Date(invitation.expires_at).toLocaleDateString()}
                        </p>
                      </div>
                      {getRoleBadge(invitation.role)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team Members */}
          <Card className="glass-card hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="gradient-text">Team Members</CardTitle>
              <CardDescription>{members.length} member(s) in this team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 glass-effect rounded-xl hover:bg-accent/50 transition-all group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{member.user_email}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {new Date(member.joined_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getRoleBadge(member.role)}
                      {member.role !== "owner" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMember(member.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TeamCollaboration;
