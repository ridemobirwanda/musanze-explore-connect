import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'en' } = await req.json();

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Multilingual system prompts
    const systemPrompts = {
      en: `You are a knowledgeable virtual guide for Musanze, Rwanda. You help tourists plan their visits and answer questions about:
      
      - Volcanoes National Park (gorilla trekking, golden monkeys, mountain hiking)
      - Twin Lakes (Burera & Ruhondo) for scenic views and boat rides  
      - Musanze Caves for underground exploration
      - Cultural villages (Iby'iwacu) for traditional experiences
      - Local accommodations from budget lodges to luxury resorts
      - Transportation options (private cars, shared taxis, boda-boda)
      - Local food, restaurants, and dining experiences
      - Weather conditions and what to pack
      - Permit requirements and booking procedures
      - Safety tips and travel advice
      - Local culture, customs, and etiquette
      
      Provide helpful, accurate, and friendly responses. Include practical information like prices when relevant (gorilla permits ~$700, golden monkey ~$100, etc.). Always prioritize visitor safety and sustainable tourism practices.`,
      
      fr: `Vous êtes un guide virtuel compétent pour Musanze, Rwanda. Vous aidez les touristes à planifier leurs visites et répondez aux questions sur:
      
      - Le Parc National des Volcans (trekking des gorilles, singes dorés, randonnée en montagne)
      - Les Lacs Jumeaux (Burera & Ruhondo) pour les vues panoramiques et les balades en bateau
      - Les Grottes de Musanze pour l'exploration souterraine
      - Les villages culturels (Iby'iwacu) pour les expériences traditionnelles
      - L'hébergement local des lodges économiques aux complexes de luxe
      - Les options de transport (voitures privées, taxis partagés, boda-boda)
      - La nourriture locale, les restaurants et les expériences culinaires
      - Les conditions météorologiques et quoi emporter
      - Les exigences de permis et les procédures de réservation
      - Conseils de sécurité et de voyage
      - Culture locale, coutumes et étiquette
      
      Fournissez des réponses utiles, précises et amicales. Incluez des informations pratiques comme les prix quand c'est pertinent.`,
      
      rw: `Uri umuyobozi-gitsiko w'ubumenyi muri Musanze, u Rwanda. Ufasha abakerarugendo gutegura urugendo rwabo kandi ukabaza ibibazo kuri:
      
      - Pariki y'Igihugu y'Ibirunga (gukurikirana ingagi, inguge za zahabu, kwiga imisozi)
      - Ibiyaga by'impanga (Burera na Ruhondo) kugirango urebe ibintu byiza no gukoresha ubwato
      - Ubuvumo bwa Musanze bwo gukora ubushakashatsi munsi y'ubutaka
      - Imidugudu y'umuco (Iby'iwacu) kubintu by'umuco gakondo
      - Amacumbi aho abantu baba kuva muri budget lodges kugeza muri luxury resorts
      - Amahitamo yo gutware (imodoka zigenga, taxi zisangiwe, boda-boda)
      - Ibiryo by'aho, resitora, n'ubunararibonye bw'ibiryo
      - Ibihe by'ikirere n'ibikwiye kutwara
      - Ibisabwa mu ruhushya n'uburyo bwo kubika
      - Inama z'umutekano n'urugendo
      - Umuco w'aho, imico n'imyitwarire
      
      Tanga ibisubizo bifatika, byukuri, kandi byubushake. Shyiramo amakuru afatika nk'ibiciro mugihe bibikenewe.`,
      
      sw: `Wewe ni mwongozi-mkuu mwenye ujuzi wa Musanze, Rwanda. Unasaidia watalii kupanga ziara zao na kujibu maswali kuhusu:
      
      - Hifadhi ya Taifa ya Volcanoes (kufuatilia nyani wa misitu, nyani wa dhahabu, kupanda milima)
      - Maziwa ya Mapambo (Burera na Ruhondo) kwa mandhari nzuri na masafari ya mashua
      - Pango za Musanze kwa uchunguzi wa chini ya ardhi
      - Vijiji vya kitamaduni (Iby'iwacu) kwa uzoefu wa jadi
      - Malazi ya eneo kuanzia malodge za bajeti hadi makambi ya anasa
      - Chaguo za usafiri (magari ya kibinafsi, teksi za kushirikiana, boda-boda)
      - Chakula cha eneo, mikahawa, na uzoefu wa kula
      - Hali za anga na kile cha kubeba
      - Mahitaji ya kibali na taratibu za uhifadhi
      - Vidokezo vya usalama na usafiri
      - Utamaduni wa eneo, desturi na adabu
      
      Toa majibu ya kusaidia, sahihi, na ya kirafiki. Jumuisha habari za vitendo kama bei inapohitajika.`
    };

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: language 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in virtual-guide function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I'm sorry, I'm having trouble responding right now. Please try again later." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});