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
    const { text, imageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const messages: any[] = [
      {
        role: 'system',
        content: `You are an expert cyber safety AI that analyzes messages for potential threats with high accuracy.

CATEGORIES:
- SAFE: Normal, friendly communication with no concerning patterns
- TOXIC: Offensive, aggressive, mean, or disrespectful language
- HARASSMENT: Bullying, threats, intimidation, repeated unwanted contact
- GROOMING: Predatory behavior, inappropriate requests for personal info/photos, manipulation, age-inappropriate content, trust-building followed by boundary-pushing
- SCAM: Phishing, fraud, fake offers, requests for money/credentials, impersonation
- SUSPICIOUS: Red flags that don't fit other categories, unusual patterns, potential manipulation

DETECTION GUIDELINES:
- Look for power imbalances, manipulation tactics, isolation attempts
- Check for urgency pressure, too-good-to-be-true offers
- Identify emotional manipulation, gaslighting, love bombing
- Detect requests for personal information, money, or inappropriate content
- Notice age-inappropriate language or topics
- Identify impersonation of authority figures or organizations
- Look for inconsistencies in story or identity

Respond ONLY with valid JSON:
{
  "category": "SAFE|TOXIC|HARASSMENT|GROOMING|SCAM|SUSPICIOUS",
  "confidence": 85,
  "message": "Clear explanation of why this was classified this way",
  "recommendations": ["Specific actionable recommendation 1", "Specific actionable recommendation 2", "Specific actionable recommendation 3"],
  "detectedPatterns": ["Pattern 1", "Pattern 2"],
  "riskFactors": ["Risk factor 1", "Risk factor 2"]
}`
      },
      {
        role: 'user',
        content: imageBase64 ? [
          { type: 'text', text: 'Analyze this message screenshot for safety concerns.' },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ] : `Analyze this message: "${text}"`
      }
    ];

    console.log('Calling Lovable AI for message analysis...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI Response:', content);

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from AI response');
    }

    const result = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-message:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});