// ─── FEATURE FLAG (stays in code — not a secret) ───
const AUTO_GEN_ENABLED = false; // Wildman flips to true on GitHub when ready

// ─── FROM RENDER ENV VARS (auto-revoked if found in code) ───
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FAL_KEY = process.env.FAL_API_KEY;
const GH_PAT = process.env.GH_PAT;

// ─── HARDCODED (Bunny is safe in code) ───
const BUNNY_STORAGE_ZONE = "keepers-flame";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "7940564d-abc6-43e5-a472cbba3ae6-0fac-4c26";
const BUNNY_CDN_BASE = "https://keepers-flame.b-cdn.net";
const GITHUB_REPO = "peacefulgeek/keepers-flame";
const SITE_DOMAIN = "https://keepersflame.love";
const SITE_NAME = "The Keeper's Flame";
const AUTHOR_NAME = "Kalesh";
const AUTHOR_TITLE = "Consciousness Teacher & Writer";
const AUTHOR_URL = "https://kalesh.love";
const AMAZON_TAG = "spankyspinola-20";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.resolve(ROOT, 'src/data/articles.json');

const CATEGORIES = [
  { slug: "the-weight", name: "The Weight" },
  { slug: "the-guilt", name: "The Guilt" },
  { slug: "the-practical", name: "The Practical" },
  { slug: "the-family", name: "The Family" },
  { slug: "the-sacred", name: "The Sacred" },
];

const EXTERNAL_AUTHORITY_SITES = [
  "https://www.caregiver.org",
  "https://www.aarp.org/caregiving",
  "https://www.nia.nih.gov",
  "https://www.apa.org",
  "https://www.alz.org",
  "https://www.mayoclinic.org",
  "https://www.ncbi.nlm.nih.gov",
  "https://www.nami.org",
];

const KALESH_PHRASES = [
  "The mind is not the enemy. The identification with it is.",
  "Most of what passes for healing is just rearranging the furniture in a burning house.",
  "Awareness doesn't need to be cultivated. It needs to be uncovered.",
  "The nervous system doesn't respond to what you believe. It responds to what it senses.",
  "You cannot think your way into a felt sense of safety. The body has its own logic.",
  "Every resistance is information. The question is whether you're willing to read it.",
  "The gap between stimulus and response is where your entire life lives.",
  "Consciousness doesn't arrive. It's what's left when everything else quiets down.",
  "There is no version of growth that doesn't involve the dissolution of something you thought was permanent.",
  "Trauma reorganizes perception. Recovery reorganizes it again, but this time with your participation.",
  "Embodiment is not a technique. It's what happens when you stop living exclusively in your head.",
  "Most people don't fear change. They fear the gap between who they were and who they haven't become yet.",
  "Attention is the most undervalued resource you have. Everything else follows from where you place it.",
  "Sit with it long enough and even the worst feeling reveals its edges.",
  "The body remembers what the mind would prefer to file away.",
  "The paradox of acceptance is that nothing changes until you stop demanding that it does.",
  "Information without integration is just intellectual hoarding.",
  "Your nervous system doesn't care about your philosophy. It cares about what happened at three years old.",
  "Not every insight requires action. Some just need to be witnessed.",
  "You are not a problem to be solved. You are a process to be witnessed.",
  "Silence is not the absence of noise. It's the presence of attention.",
  "The breath doesn't need your management. It needs your companionship.",
  "We are not our thoughts, but we are responsible for our relationship to them.",
  "Reading about meditation is to meditation what reading the menu is to eating.",
  "The wellness industry sells solutions to problems it helps you believe you have.",
  "Complexity is the ego's favorite hiding place.",
  "The body has a grammar. Most of us never learned to read it.",
  "Freedom is not the absence of constraint. It's the capacity to choose your relationship to it.",
  "The most important things in life cannot be understood, only experienced.",
  "The brain is prediction machinery. Anxiety is just prediction running without a stop button.",
];

const CONVERSATIONAL_INTERJECTIONS = [
  "Stay with me here.",
  "I know, I know.",
  "Wild, right?",
  "Think about that for a second.",
  "Here is the thing though.",
  "And honestly?",
  "Look.",
  "Sit with that for a moment.",
  "No really.",
  "Bear with me.",
];

const RESEARCHERS = [
  "Jiddu Krishnamurti", "Alan Watts", "Sam Harris", "Sadhguru", "Tara Brach",
  "Pauline Boss", "Barry Jacobs", "Christina Maslach", "Bessel van der Kolk",
  "Stephen Porges", "Gabor Mate", "Jon Kabat-Zinn",
];

const BANNED_WORDS = [
  "profound", "profoundly", "transformative", "holistic", "nuanced", "multifaceted",
  "delve", "delving", "tapestry", "landscape", "paradigm", "synergy",
  "leverage", "leveraging", "robust", "utilize", "utilizing", "facilitate",
  "facilitating", "innovative", "streamline", "streamlining", "optimize",
  "optimizing", "pivotal", "realm", "embark", "embarking", "foster", "fostering",
  "moreover", "furthermore", "additionally", "consequently", "subsequently",
  "needless to say", "in conclusion", "it is important to note", "it is worth noting",
  "manifest", "manifesting", "manifestation", "lean into", "leaning into",
  "showing up for", "show up for", "authentic self", "safe space", "hold space",
  "holding space", "sacred container", "raise your vibration",
];

// Post-process to remove any AI words that slip through
function cleanAIWords(text) {
  const replacements = {
    'profound': 'deep', 'profoundly': 'deeply', 'transformative': 'life-changing',
    'holistic': 'whole-person', 'nuanced': 'layered', 'multifaceted': 'complex',
    'delve': 'dig', 'delving': 'digging', 'tapestry': 'web',
    'landscape': 'territory', 'paradigm': 'framework', 'synergy': 'connection',
    'leverage': 'use', 'leveraging': 'using', 'robust': 'strong',
    'utilize': 'use', 'utilizing': 'using', 'facilitate': 'support',
    'facilitating': 'supporting', 'innovative': 'creative',
    'streamline': 'simplify', 'streamlining': 'simplifying',
    'optimize': 'improve', 'optimizing': 'improving',
    'pivotal': 'critical', 'realm': 'territory',
    'embark': 'start', 'embarking': 'starting',
    'foster': 'build', 'fostering': 'building',
    'moreover': 'And', 'furthermore': 'And',
    'additionally': 'Also', 'consequently': 'So', 'subsequently': 'Then',
  };
  
  for (const [word, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, (match) => {
      return match[0] === match[0].toUpperCase()
        ? replacement[0].toUpperCase() + replacement.slice(1)
        : replacement;
    });
  }
  
  // Remove emdashes
  text = text.replace(/ \u2014 /g, ', ').replace(/\u2014/g, ', ');
  text = text.replace(/ \u2013 /g, ', ').replace(/\u2013/g, ', ');
  
  // Remove banned phrases
  text = text.replace(/this is where\b/gi, 'Here');
  text = text.replace(/lean into/gi, 'move toward');
  text = text.replace(/leaning into/gi, 'moving toward');
  text = text.replace(/showing up for/gi, 'being there for');
  text = text.replace(/show up for/gi, 'be there for');
  text = text.replace(/authentic self/gi, 'real self');
  text = text.replace(/safe space/gi, 'place of trust');
  text = text.replace(/hold space/gi, 'sit with');
  text = text.replace(/holding space/gi, 'sitting with');
  text = text.replace(/sacred container/gi, 'trusted ground');
  text = text.replace(/raise your vibration/gi, 'shift your attention');
  text = text.replace(/manifest(?:ing|ation)?/gi, 'create');
  text = text.replace(/needless to say/gi, 'Obviously');
  text = text.replace(/in conclusion/gi, 'So');
  text = text.replace(/it is important to note/gi, 'Worth noting');
  text = text.replace(/it is worth noting/gi, 'Worth noting');
  
  return text;
}

async function main() {
  if (!AUTO_GEN_ENABLED) {
    console.log('[generate] AUTO_GEN_ENABLED is false. Exiting.');
    process.exit(0);
  }

  if (!ANTHROPIC_API_KEY || !FAL_KEY || !GH_PAT) {
    console.error('[generate] Missing required env vars. Exiting.');
    process.exit(1);
  }

  console.log('[generate] Starting article generation...');

  // Load existing articles
  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const existingCount = articles.length;
  console.log(`[generate] ${existingCount} existing articles.`);

  // Pick category (round-robin)
  const categoryCounts = {};
  for (const cat of CATEGORIES) categoryCounts[cat.slug] = 0;
  for (const a of articles) categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  const minCat = CATEGORIES.reduce((a, b) => (categoryCounts[a.slug] || 0) <= (categoryCounts[b.slug] || 0) ? a : b);

  // Determine backlink type: 14% kalesh, 33% amazon, 23% external, 30% internal
  const rand = Math.random();
  const backlinkType = rand < 0.14 ? 'kalesh' : rand < 0.47 ? 'amazon' : rand < 0.70 ? 'external' : 'internal';

  // Pick FAQ count
  const faqRand = Math.random();
  const faqCount = faqRand < 0.10 ? 0 : faqRand < 0.40 ? 2 : faqRand < 0.70 ? 3 : faqRand < 0.90 ? 4 : 5;

  // Pick opener type
  const openerTypes = ['scene-setting', 'provocation', 'first-person', 'question', 'named-reference', 'gut-punch'];
  const openerType = openerTypes[Math.floor(Math.random() * openerTypes.length)];

  // Pick phrases (3-5 random)
  const phraseCount = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...KALESH_PHRASES].sort(() => Math.random() - 0.5);
  const selectedPhrases = shuffled.slice(0, phraseCount);

  // Pick interjections (2 random)
  const interjections = [...CONVERSATIONAL_INTERJECTIONS].sort(() => Math.random() - 0.5).slice(0, 2);

  // Pick researchers (1-2 random)
  const researcherCount = 1 + Math.floor(Math.random() * 2);
  const selectedResearchers = [...RESEARCHERS].sort(() => Math.random() - 0.5).slice(0, researcherCount);

  // Pick existing articles for internal links
  const internalLinks = articles
    .filter(a => a.category !== minCat.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(a => ({ title: a.title, url: `/${a.category}/${a.slug}` }));

  // Build Claude prompt with full humanization rules
  const systemPrompt = `You are writing for ${SITE_NAME} (${SITE_DOMAIN}). Author identity: ${AUTHOR_NAME}, ${AUTHOR_TITLE}. Website: ${AUTHOR_URL}.

VOICE RULES (follow exactly):
- Long, unfolding sentences that build and turn (avg 18-28 words), then drop a short one like a stone
- Pattern: Long -> Long -> Long (with internal comma rhythm) -> Short drop -> Long -> Short drop
- 40% teaching + 30% tender + 20% philosophical + 10% fierce
- Cross-traditional: references Buddhism, Taoism, Vedanta, and neuroscience equally
- Uses "we" and "one" and "a person who" more than "you"
- Builds analogies across 2-3 sentences before revealing the point
- Ends sections with questions that open rather than close
- Loves triads: "not the thought, not the thinker, but the space in which both appear"
- Intellectual wit, unexpected metaphors
- Use contractions naturally (don't, can't, won't, it's, that's, there's, you're, they're)

ABSOLUTELY BANNED (zero tolerance):
- ZERO em dashes or en dashes. Use commas, periods, colons, semicolons, or ellipses instead
- ZERO of these words: ${BANNED_WORDS.join(', ')}
- ZERO "This is where" as a sentence starter
- ZERO generic H2 headers like "Understanding X" or "Moving Forward" or "The Path Ahead"`;

  const userPrompt = `Write a 1200-1800 word article for the "${minCat.name}" section about caregiver burnout, emotional weight, or spiritual caregiving.

REQUIREMENTS:
- Word count: STRICTLY 1200-1800 words. No more, no less.
- Opener type: ${openerType}
- 4-6 H2 sections with UNIQUE, evocative headers (not generic)
- 1 blockquote per article (from a voice phrase or researcher)
- Include exactly 2 conversational interjections: "${interjections[0]}" and "${interjections[1]}"
- Include 1-2 first-person lived experience markers ("In my years of working in this territory..." or "I have sat with people who...")
- Cite these researchers naturally: ${selectedResearchers.join(', ')}
- ${faqCount} FAQ Q&A pairs at the end (or none if 0)
- Backlink type: ${backlinkType}
- ALWAYS include exactly 3 Amazon product recommendations naturally embedded in the text. Use real product names relevant to the article topic (caregiver books, self-care tools, journals, practical aids, meditation supplies, comfort items). Format each as: <a href="https://www.amazon.com/dp/ASIN?tag=${AMAZON_TAG}" rel="nofollow sponsored">Product Name</a>. Spread them at roughly 1/3, 1/2, and 2/3 through the article. Introduce each with a natural sentence like "One resource I often point people toward is..." or "Something that has helped many caregivers I work with is..."
${backlinkType === 'kalesh' ? `- Also include 1 link to ${AUTHOR_URL} with topically relevant anchor text` : ''}
${backlinkType === 'external' ? `- Also include 1 external link with rel="nofollow" to one of: ${EXTERNAL_AUTHORITY_SITES.join(', ')}` : ''}
- Include 2-3 internal cross-links using these: ${internalLinks.slice(0, 3).map(l => `<a href="${l.url}">${l.title}</a>`).join(', ')}
- Weave in these Kalesh voice phrases naturally: ${selectedPhrases.map(p => `"${p}"`).join('; ')}
- Aggressively vary sentence lengths. Mix 5-word sentences with 30-word sentences.
- Include a health disclaimer at the end: "<p><em>This article is for informational purposes only and does not replace professional medical or mental health advice.</em></p>"
- Output as HTML (p, h2, blockquote, a, strong, em tags only). No div, no classes, no styles.

Return JSON: { "title": "...", "excerpt": "...", "body": "...", "faqs": [["Q","A"],...] }`;

  try {
    // Call Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    
    let article = JSON.parse(jsonMatch[0]);
    
    // Post-process: clean AI words and emdashes
    article.body = cleanAIWords(article.body);

    // Verify 3 Amazon links exist; inject fallbacks if LLM missed any
    const amazonCount = (article.body.match(/amazon\.com/g) || []).length;
    if (amazonCount < 3) {
      const fallbackProducts = [
        { name: 'The Body Keeps the Score by Bessel van der Kolk', asin: '0143127748', desc: 'a book that changed how many people understand trauma and the nervous system' },
        { name: 'Burnout: The Secret to Unlocking the Stress Cycle by Emily Nagoski', asin: '0399592458', desc: 'a book that finally explains why rest alone does not fix burnout' },
        { name: 'Weighted Blanket by YnM', asin: 'B073429DV2', desc: 'a weighted blanket that helps the nervous system settle when sleep will not come' },
        { name: 'The 36-Hour Day by Nancy Mace', asin: '1421422239', desc: 'the most practical guide to dementia caregiving that exists' },
        { name: 'Heating Pad by Mighty Bliss', asin: 'B07GQ4YDQG', desc: 'a heating pad for the back pain that comes from lifting, bending, and carrying' },
        { name: 'Meditation Cushion by Florensi', asin: 'B07VB3YZRQ', desc: 'a meditation cushion for the five minutes of stillness that matter more than you think' },
      ];
      const templates = [
        'One resource I often point people toward is',
        'Something that has helped many caregivers I work with is',
        'A practical starting point is',
      ];
      const needed = 3 - amazonCount;
      const shuffledProducts = fallbackProducts.sort(() => Math.random() - 0.5);
      for (let i = 0; i < needed; i++) {
        const p = shuffledProducts[i];
        const t = templates[i % templates.length];
        const linkHtml = `<p>${t} <a href="https://www.amazon.com/dp/${p.asin}?tag=${AMAZON_TAG}" rel="nofollow sponsored">${p.name}</a>, ${p.desc}.</p>`;
        // Insert before the health disclaimer
        if (article.body.includes('informational purposes')) {
          article.body = article.body.replace(/<p><em>This article/,  linkHtml + '\n<p><em>This article');
        } else {
          article.body += '\n' + linkHtml;
        }
      }
      console.log(`[generate] Injected ${needed} fallback Amazon links.`);
    }
    
    const slug = article.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Verify word count
    const wordCount = article.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w).length;
    if (wordCount < 1200 || wordCount > 1800) {
      console.warn(`[generate] Word count ${wordCount} outside range. Proceeding anyway.`);
    }

    // Generate image via FAL.ai
    const imagePrompt = `Painterly watercolor editorial illustration for '${article.title}': warm golden light, tender caregiving scene, luminous amber and cream tones. No text, no words, no watermarks.`;
    
    const falResponse = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${FAL_KEY}`,
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        image_size: { width: 1200, height: 675 },
        num_images: 1,
      }),
    });

    let heroImage = `${BUNNY_CDN_BASE}/images/default-hero.webp`;
    let ogImage = `${BUNNY_CDN_BASE}/images/default-og.webp`;

    if (falResponse.ok) {
      const falData = await falResponse.json();
      const imageUrl = falData.images[0].url;
      
      // Download and upload to Bunny
      const imgResponse = await fetch(imageUrl);
      const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());
      
      // Upload hero
      const heroPath = `images/hero/${slug}.webp`;
      await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${heroPath}`, {
        method: 'PUT',
        headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
        body: imgBuffer,
      });
      heroImage = `${BUNNY_CDN_BASE}/${heroPath}`;

      // Upload OG
      const ogPath = `images/og/${slug}.webp`;
      await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${ogPath}`, {
        method: 'PUT',
        headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
        body: imgBuffer,
      });
      ogImage = `${BUNNY_CDN_BASE}/${ogPath}`;
    }

    // Build article object
    const newArticle = {
      id: existingCount + 1,
      slug,
      title: article.title,
      excerpt: article.excerpt,
      category: minCat.slug,
      categoryName: minCat.name,
      dateISO: new Date().toISOString(),
      readingTime: Math.ceil(wordCount / 250),
      body: article.body,
      faqs: article.faqs || [],
      faqCount: faqCount,
      openerType,
      backlinkType,
      isChallengeConclusion: Math.random() < 0.3,
      imagePrompt,
      heroImage,
      ogImage,
      wordCount,
    };

    articles.push(newArticle);
    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
    console.log(`[generate] Created: "${newArticle.title}" in ${minCat.name} (${wordCount} words)`);

    // Push to GitHub
    const { execSync } = await import('child_process');
    execSync(`cd ${ROOT} && git add -A && git commit -m "Auto-gen: ${newArticle.title}" && git push`, {
      env: { ...process.env, GIT_AUTHOR_NAME: 'Auto-Gen', GIT_AUTHOR_EMAIL: 'auto@keepersflame.love', GIT_COMMITTER_NAME: 'Auto-Gen', GIT_COMMITTER_EMAIL: 'auto@keepersflame.love' },
      stdio: 'inherit',
    });

    console.log('[generate] Pushed to GitHub.');
  } catch (err) {
    console.error('[generate] Error:', err.message);
    process.exit(1);
  }
}

main();
