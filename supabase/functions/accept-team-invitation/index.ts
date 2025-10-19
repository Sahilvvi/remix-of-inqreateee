import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AcceptInvitationRequest {
  token: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Server not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Authenticated client (uses caller's JWT)
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUser = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { token }: AcceptInvitationRequest = await req.json();
    if (!token || typeof token !== "string" || token.length > 256) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get current user
    const { data: userRes, error: userErr } = await supabaseUser.auth.getUser();
    if (userErr || !userRes?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const user = userRes.user;

    // Fetch invitation by token (privileged to avoid RLS edge cases)
    const { data: invitation, error: inviteErr } = await supabaseAdmin
      .from("team_invitations")
      .select("id, team_id, email, role, status, expires_at")
      .eq("token", token)
      .maybeSingle();

    if (inviteErr) {
      console.error("Error fetching invitation:", inviteErr);
      return new Response(
        JSON.stringify({ error: "Invitation lookup failed" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!invitation) {
      return new Response(
        JSON.stringify({ error: "Invitation not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (invitation.status !== "pending") {
      return new Response(
        JSON.stringify({ error: "Invitation is not pending" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const now = new Date();
    const expiresAt = new Date(invitation.expires_at);
    if (expiresAt.getTime() <= now.getTime()) {
      return new Response(
        JSON.stringify({ error: "Invitation expired" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email match against authenticated user
    const userEmail = user.email?.toLowerCase();
    const invitedEmail = String(invitation.email).toLowerCase();
    if (!userEmail || userEmail !== invitedEmail) {
      return new Response(
        JSON.stringify({ error: "This invitation is not for your account" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Add user to team_members (idempotent)
    const { error: upsertErr } = await supabaseAdmin
      .from("team_members")
      .upsert(
        {
          team_id: invitation.team_id,
          user_id: user.id,
          role: invitation.role,
        },
        { onConflict: "team_id,user_id" }
      );

    if (upsertErr) {
      console.error("Error adding member:", upsertErr);
      return new Response(
        JSON.stringify({ error: "Failed to add team member" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark invitation as accepted
    const { error: updateErr } = await supabaseAdmin
      .from("team_invitations")
      .update({ status: "accepted" })
      .eq("id", invitation.id);

    if (updateErr) {
      console.error("Error updating invitation status:", updateErr);
      // Do not fail the whole flow if membership worked; return warning
      return new Response(
        JSON.stringify({
          success: true,
          team_id: invitation.team_id,
          warning: "Member added but failed to update invitation status",
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, team_id: invitation.team_id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("accept-team-invitation error:", error);
    return new Response(
      JSON.stringify({ error: "Unexpected error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
