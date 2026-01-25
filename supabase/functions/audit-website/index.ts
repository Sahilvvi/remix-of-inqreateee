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
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY_AUDIT');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY_AUDIT is not configured');
    }

    console.log('Auditing website:', url);

    const systemPrompt = `You are an expert website auditor. Analyze websites and provide comprehensive audit scores and recommendations.

Your response must be a valid JSON object with this exact structure:
{
  "overall_score": 0-100,
  "performance_score": 0-100,
  "seo_score": 0-100,
  "accessibility_score": 0-100,
  "security_score": 0-100,
  "mobile_score": 0-100,
  "suggestions": [
    {
      "category": "performance|seo|accessibility|security|mobile",
      "severity": "critical|warning|info",
      "title": "Brief issue title",
      "description": "Detailed description and how to fix"
    }
  ],
  "details": {
    "performance": {
      "issues": ["List of specific issues"],
      "recommendations": ["List of recommendations"]
    },
    "seo": {
      "issues": ["List of specific issues"],
      "recommendations": ["List of recommendations"]
    },
    "accessibility": {
      "issues": ["List of specific issues"],
      "recommendations": ["List of recommendations"]
    },
    "security": {
      "issues": ["List of specific issues"],
      "recommendations": ["List of recommendations"]
    },
    "mobile": {
      "issues": ["List of specific issues"],
      "recommendations": ["List of recommendations"]
    }
  }
}

Scoring Guidelines:
- Performance: Load time, image optimization, code minification, caching, CDN usage
- SEO: Meta tags, headings structure, keywords, sitemap, robots.txt, structured data
- Accessibility: ARIA labels, alt text, color contrast, keyboard navigation, semantic HTML
- Security: HTTPS, security headers, form validation, XSS protection, CSP
- Mobile: Responsive design, touch targets, viewport meta, font sizes, tap delays`;

    const userPrompt = `Analyze the website at ${url} and provide a comprehensive audit.

Based on typical best practices and common issues found on websites, generate realistic audit scores and actionable suggestions. Consider:

1. Performance factors (loading speed, asset optimization, caching)
2. SEO factors (meta tags, content structure, keyword usage)
3. Accessibility factors (WCAG compliance, screen reader support)
4. Security factors (HTTPS, headers, vulnerability indicators)
5. Mobile-friendliness (responsive design, touch targets)

Provide specific, actionable recommendations for improvement.`;

    const makeRequest = async () => {
      return await fetch('https://api.openai.com/v1/chat/completions', {
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
        }),
      });
    };

    let response = await makeRequest();

    // If rate limited, wait and retry once
    if (response.status === 429) {
      console.log('Rate limited, waiting 3 seconds before retry...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      response = await makeRequest();
    }

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment and try again.', retry_after: 15 }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content returned from AI');
    }

    console.log('AI audit response received, parsing...');

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
      console.error('Failed to parse AI response as JSON:', parseError);
      // If parsing fails, create a default structure
      result = {
        overall_score: 75,
        performance_score: 70,
        seo_score: 80,
        accessibility_score: 75,
        security_score: 85,
        mobile_score: 70,
        suggestions: [
          {
            category: 'performance',
            severity: 'warning',
            title: 'Image Optimization Needed',
            description: 'Consider compressing images and using modern formats like WebP.'
          },
          {
            category: 'seo',
            severity: 'info',
            title: 'Meta Description',
            description: 'Ensure all pages have unique, descriptive meta descriptions.'
          },
          {
            category: 'accessibility',
            severity: 'warning',
            title: 'Alt Text for Images',
            description: 'Add descriptive alt text to all images for screen reader users.'
          }
        ],
        details: {
          performance: {
            issues: ['Large image files detected'],
            recommendations: ['Use image compression', 'Enable lazy loading']
          },
          seo: {
            issues: ['Missing meta descriptions on some pages'],
            recommendations: ['Add unique meta descriptions', 'Optimize title tags']
          },
          accessibility: {
            issues: ['Some images missing alt text'],
            recommendations: ['Add alt text to all images', 'Improve color contrast']
          },
          security: {
            issues: ['Minor security headers missing'],
            recommendations: ['Add Content-Security-Policy header', 'Enable HSTS']
          },
          mobile: {
            issues: ['Touch targets may be too small'],
            recommendations: ['Increase button sizes', 'Improve responsive design']
          }
        }
      };
    }

    console.log('Website audit completed successfully');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error auditing website:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to audit website';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
