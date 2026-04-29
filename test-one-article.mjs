#!/usr/bin/env node
// Test: generate 1 article via DeepSeek V4-Pro and check quality

const DEEPSEEK_API_KEY = 'sk-82bdad0a1fd34987b73030504ae67080';
const AMAZON_TAG = 'spankyspinola-20';

const AI_WORDS = [
  'delve','delving','tapestry','paradigm','synergy','leverage','leveraging','unlock','empower',
  'utilize','utilizing','pivotal','embark','embarking','underscore','paramount','seamlessly',
  'robust','beacon','foster','fostering','elevate','curate','curated','bespoke',
  'resonate','harness','intricate','plethora','myriad','comprehensive',
  'transformative','groundbreaking','innovative','cutting-edge','revolutionary',
  'profound','profoundly','holistic','nuanced','multifaceted',
  'landscape','realm','sphere','domain',
  'moreover','furthermore','additionally','consequently','subsequently',
];

const KALESH_PHRASES = [
  "The mind is not the enemy. The identification with it is.",
  "Most of what passes for healing is just rearranging the furniture in a burning house.",
  "Awareness doesn't need to be cultivated. It needs to be uncovered.",
];

function cleanAIWords(text) {
  const replacements = {
    'profound': 'deep', 'profoundly': 'deeply', 'transformative': 'life-changing',
    'holistic': 'whole-person', 'nuanced': 'layered', 'multifaceted': 'complex',
    'delve': 'dig', 'delving': 'digging', 'tapestry': 'web',
    'landscape': 'territory', 'paradigm': 'model', 'synergy': 'connection',
    'leverage': 'use', 'leveraging': 'using', 'robust': 'strong',
    'utilize': 'use', 'utilizing': 'using', 'facilitate': 'support',
    'innovative': 'creative', 'comprehensive': 'complete',
    'moreover': 'And', 'furthermore': 'And', 'additionally': 'Also',
    'consequently': 'So', 'subsequently': 'Then',
    'realm': 'territory', 'sphere': 'area', 'domain': 'area',
    'pivotal': 'critical', 'embark': 'start', 'foster': 'build',
    'beacon': 'light', 'elevate': 'lift', 'curate': 'choose',
    'resonate': 'connect', 'harness': 'use', 'intricate': 'complex',
    'plethora': 'many', 'myriad': 'many', 'groundbreaking': 'new',
    'revolutionary': 'new', 'paramount': 'critical', 'seamlessly': 'smoothly',
    'unlock': 'open', 'empower': 'strengthen', 'underscore': 'highlight',
  };
  for (const [word, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, (match) =>
      match[0] === match[0].toUpperCase() ? replacement[0].toUpperCase() + replacement.slice(1) : replacement
    );
  }
  text = text.replace(/[\u2014\u2013]/g, ', ');
  return text;
}

function countWords(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).filter(w => w).length;
}

async function main() {
  console.log('Testing DeepSeek V4-Pro article generation...');
  
  const topic = 'The Exhaustion Nobody Warns You About';
  const category = { slug: 'the-weight', name: 'The Weight' };
  
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: [
        { role: 'system', content: `You write for The Keeper's Flame. Author: Kalesh, Consciousness Teacher & Writer. Voice: warm, conversational, honest, cross-traditional. ZERO em-dashes. ZERO of these words: ${AI_WORDS.join(', ')}. Use contractions. Vary sentence lengths aggressively.` },
        { role: 'user', content: `Write a 1400-1800 word article titled "${topic}" for the "${category.name}" section.

REQUIREMENTS:
- Opener type: scene-setting
- 4-6 H2 sections with UNIQUE, evocative headers
- 1 blockquote
- Include exactly 2 conversational interjections: "Stay with me here." and "I know, I know."
- 1-2 first-person lived experience markers
- Cite: Bessel van der Kolk
- 3 FAQ Q&A pairs at the end
- ALWAYS include exactly 3 Amazon product links naturally. Format: <a href="https://www.amazon.com/dp/ASIN?tag=${AMAZON_TAG}" rel="nofollow sponsored">Product Name</a> (paid link). Use real caregiver products like: The Body Keeps the Score (0143127748), Burnout: The Secret to Unlocking the Stress Cycle (1984818325), YnM Weighted Blanket (B073429DV2).
- Include 2-3 internal links: <a href="/the-guilt/the-guilt-of-wanting-your-life-back">The Guilt of Wanting Your Life Back</a>
- Weave in: "${KALESH_PHRASES[0]}"; "${KALESH_PHRASES[1]}"
- Health disclaimer at end
- Output as HTML. No div, no classes, no styles.

Return JSON: { "title": "${topic}", "excerpt": "...", "body": "...", "faqs": [["Q","A"],...] }` },
      ],
      max_tokens: 8000,
      temperature: 0.85,
    }),
  });

  console.log('Status:', response.status);
  const data = await response.json();
  
  if (!response.ok) {
    console.error('API Error:', JSON.stringify(data));
    process.exit(1);
  }

  const text = data.choices[0].message.content;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('No JSON found in response');
    console.log('Raw response:', text.slice(0, 500));
    process.exit(1);
  }

  const article = JSON.parse(jsonMatch[0]);
  article.body = cleanAIWords(article.body);
  
  const wordCount = countWords(article.body);
  const hasEmdash = article.body.includes('\u2014') || article.body.includes('\u2013');
  const amazonLinks = (article.body.match(/amazon\.com\/dp\/[A-Z0-9]{10}/g) || []).length;
  const stripped = article.body.replace(/<[^>]+>/g, ' ').toLowerCase();
  const foundAIWords = AI_WORDS.filter(w => new RegExp(`\\b${w}\\b`).test(stripped));

  console.log('\n═══ ARTICLE QUALITY CHECK ═══');
  console.log(`Title: ${article.title}`);
  console.log(`Words: ${wordCount} (target: 1200-2500)`);
  console.log(`Emdashes: ${hasEmdash ? 'YES (FAIL)' : 'NO (PASS)'}`);
  console.log(`Amazon links: ${amazonLinks} (target: 3+)`);
  console.log(`AI words found: ${foundAIWords.length > 0 ? foundAIWords.join(', ') + ' (cleaned)' : 'NONE (PASS)'}`);
  console.log(`FAQs: ${(article.faqs || []).length}`);
  console.log(`Excerpt: ${article.excerpt}`);
  console.log(`\nFirst 300 chars of body:\n${article.body.slice(0, 300)}`);
  
  const pass = wordCount >= 1200 && wordCount <= 2500 && !hasEmdash && amazonLinks >= 3;
  console.log(`\n═══ OVERALL: ${pass ? 'PASS' : 'FAIL'} ═══`);
}

main().catch(console.error);
