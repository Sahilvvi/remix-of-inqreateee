import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { template, businessType, colorScheme, contentRequirements, projectName } = await req.json();

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Generating website for:', { template, businessType, projectName });

    const systemPrompt = `You are an expert web developer and designer. Generate complete, production-ready HTML and CSS for a website based on user requirements. 

Your response must be a valid JSON object with this exact structure:
{
  "html": "<!DOCTYPE html>...",
  "css": "/* CSS styles */...",
  "description": "Brief description of the generated website",
  "sections": ["list of main sections included"]
}

Guidelines:
- Create modern, responsive, and visually appealing designs
- Use semantic HTML5 elements
- Include smooth animations and transitions
- Ensure mobile-first responsive design
- Use the specified color scheme throughout
- Include placeholder images from https://placehold.co
- Add appropriate meta tags for SEO
- Include Font Awesome CDN for icons
- Make the design professional and conversion-focused`;

    const userPrompt = `Create a ${template} website for a ${businessType} business.

Project Name: ${projectName}
Color Scheme: ${colorScheme}
Content Requirements: ${contentRequirements}

Generate a complete, single-page website with:
1. Navigation header with logo and menu
2. Hero section with compelling headline and CTA
3. Features/Services section
4. About section
5. Testimonials or social proof
6. Contact section with form
7. Footer with links and copyright

Use the color scheme provided and make it visually stunning.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402 || response.status === 401) {
        return new Response(JSON.stringify({ error: 'OpenAI API key issue. Please check your API key.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content returned from AI');
    }

    console.log('AI response received, parsing...');

    // Try to parse the JSON response
    let result;
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON, using raw content');
      // If parsing fails, create a simple structure
      result = {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <header style="background: ${colorScheme || '#3B82F6'}; padding: 20px; color: white;">
    <h1>${projectName}</h1>
  </header>
  <main style="padding: 40px;">
    <section>
      <h2>Welcome to ${projectName}</h2>
      <p>${contentRequirements || 'Your amazing website is being created.'}</p>
    </section>
  </main>
  <footer style="background: #1a1a1a; color: white; padding: 20px; text-align: center;">
    <p>&copy; 2024 ${projectName}. All rights reserved.</p>
  </footer>
</body>
</html>`,
        css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
`,
        description: `A ${template} website for ${businessType}`,
        sections: ['Header', 'Main', 'Footer']
      };
    }

    console.log('Website generated successfully');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating website:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate website';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
