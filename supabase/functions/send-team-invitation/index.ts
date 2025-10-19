import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  teamId: string;
  teamName: string;
  inviterName: string;
  token: string;
  role: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, teamName, inviterName, token, role }: InvitationRequest = await req.json();

    if (!email || !teamName || !token) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Construct invitation link
    const baseUrl = Deno.env.get("SUPABASE_URL")?.replace(/\.supabase\.co$/, ".lovable.app") || "";
    const invitationLink = `${baseUrl}/dashboard?invitation=${token}`;

    // Send email using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Inqreate <onboarding@resend.dev>",
        to: [email],
        subject: `${inviterName} invited you to join ${teamName} on Inqreate`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Poppins', sans-serif; background: #0D0D0D; color: #FFFFFF; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.6)); border: 1px solid rgba(96, 165, 250, 0.2); border-radius: 16px; padding: 40px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #3B82F6, #9333EA, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                h1 { font-size: 28px; margin: 20px 0; }
                p { font-size: 16px; line-height: 1.6; color: #9CA3AF; margin: 16px 0; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #3B82F6, #9333EA, #EC4899); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 18px; margin: 24px 0; }
                .role-badge { display: inline-block; background: rgba(59, 130, 246, 0.2); color: #3B82F6; padding: 4px 12px; border-radius: 8px; font-size: 14px; margin: 8px 0; }
                .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #2D2D2D; color: #9CA3AF; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">Inqreate</div>
                </div>
                
                <h1>You've been invited to collaborate!</h1>
                
                <p><strong>${inviterName}</strong> has invited you to join <strong>${teamName}</strong> on Inqreate.</p>
                
                <p>You'll be joining as a <span class="role-badge">${role}</span></p>
                
                <p>Join your team and start creating amazing AI-powered content together!</p>
                
                <div style="text-align: center;">
                  <a href="${invitationLink}" class="cta-button">Accept Invitation</a>
                </div>
                
                <p style="font-size: 14px;">This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.</p>
                
                <div class="footer">
                  <p>© 2025 Inqreate. All Rights Reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Resend API error:", errorData);
      throw new Error(errorData.message || "Failed to send email");
    }

    const result = await emailResponse.json();
    console.log("Invitation email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending invitation email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send invitation" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
