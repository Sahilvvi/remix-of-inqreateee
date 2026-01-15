import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all counts in parallel
    const [
      { count: usersCount },
      { count: blogsCount },
      { count: socialCount },
      { count: productsCount },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('generated_blogs').select('*', { count: 'exact', head: true }),
      supabase.from('social_media_posts').select('*', { count: 'exact', head: true }),
      supabase.from('ecommerce_products').select('*', { count: 'exact', head: true }),
    ]);

    const totalContent = (blogsCount || 0) + (socialCount || 0) + (productsCount || 0);

    // Calculate "countries" based on timezones in user_settings (approximation)
    const { data: timezones } = await supabase
      .from('user_settings')
      .select('timezone')
      .not('timezone', 'is', null);
    
    const uniqueTimezones = new Set(timezones?.map(t => t.timezone) || []);
    const countriesEstimate = Math.max(uniqueTimezones.size, 1);

    return new Response(
      JSON.stringify({
        users: usersCount || 0,
        content: totalContent,
        countries: countriesEstimate,
        uptime: 99.9, // This would typically come from monitoring service
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching platform stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
