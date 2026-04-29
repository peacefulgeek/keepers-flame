// ─── FEATURE FLAG ───
const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === 'true';

// ─── DEEPSEEK V4-PRO via OpenAI-compatible env vars ───
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.deepseek.com';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'deepseek-v4-pro';
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

// ─── 40-IMAGE BUNNY LIBRARY (replaces Fal.ai) ───
const LIBRARY_IMAGES = Array.from({ length: 40 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  const names = [
    'hands-holding-candle','empty-chair-by-window','two-cups-of-tea','woman-looking-at-horizon',
    'hands-on-journal','walking-path-through-trees','sleeping-figure-on-couch','hand-reaching-for-hand',
    'kitchen-morning-light','person-sitting-on-porch','stacked-books-nightstand','rain-on-window-reflection',
    'garden-hands-in-soil','bridge-over-still-water','wheelchair-beside-window','tangled-yarn',
    'sunrise-through-curtains','old-photo-album','person-in-bathtub','two-shadows-walking',
    'cracked-pottery-gold','lighthouse-in-fog','hands-folding-laundry','tree-roots-exposed',
    'mirror-reflection','staircase-light','wilted-flowers-vase','person-at-desk-night',
    'open-door-sunlight','hands-braiding-hair','empty-swing','pill-organizer',
    'person-hugging-pillow','river-stones','cooking-together','night-sky-stars',
    'hospital-hallway','hands-holding-coffee','autumn-leaves-path','window-condensation',
  ];
  return `${BUNNY_CDN_BASE}/library/lib-${num}-${names[i]}.webp`;
});

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
  "Stay with me here.", "I know, I know.", "Wild, right?",
  "Think about that for a second.", "Here is the thing though.",
  "And honestly?", "Look.", "Sit with that for a moment.",
  "No really.", "Bear with me.",
];

const RESEARCHERS = [
  "Jiddu Krishnamurti", "Alan Watts", "Sam Harris", "Sadhguru", "Tara Brach",
  "Pauline Boss", "Barry Jacobs", "Christina Maslach", "Bessel van der Kolk",
  "Stephen Porges", "Gabor Mate", "Jon Kabat-Zinn",
];

const BANNED_WORDS = [
  'delve','delving','tapestry','paradigm','synergy','leverage','leveraging','unlock','empower',
  'utilize','utilizing','pivotal','embark','embarking','underscore','paramount','seamlessly',
  'robust','beacon','foster','fostering','elevate','curate','curated','bespoke',
  'resonate','harness','intricate','plethora','myriad','comprehensive',
  'transformative','groundbreaking','innovative','cutting-edge','revolutionary',
  'state-of-the-art','ever-evolving','game-changing','next-level','world-class',
  'unparalleled','unprecedented','remarkable','extraordinary','exceptional',
  'profound','profoundly','holistic','nuanced','multifaceted','stakeholders',
  'ecosystem','landscape','realm','sphere','domain',
  'arguably','notably','crucially','importantly','essentially',
  'fundamentally','inherently','intrinsically','substantively',
  'streamline','streamlining','optimize','optimizing','facilitate','facilitating',
  'amplify','catalyze','propel','spearhead','orchestrate','navigate','traverse',
  'furthermore','moreover','additionally','consequently','subsequently',
  'thereby','thusly','wherein','whereby',
  'manifest','manifesting','manifestation','lean into','leaning into',
  'showing up for','show up for','authentic self','safe space','hold space',
  'holding space','sacred container','raise your vibration',
  'needless to say','in conclusion','it is important to note','it is worth noting',
];

const FALLBACK_PRODUCTS = [
  { name: 'The Body Keeps the Score by Bessel van der Kolk', asin: '0143127748' },
  { name: 'Burnout: The Secret to Unlocking the Stress Cycle', asin: '1984818325' },
  { name: 'YnM Weighted Blanket', asin: 'B073429DV2' },
  { name: 'The 36-Hour Day by Nancy Mace', asin: '1421422239' },
  { name: 'UTK Cordless Heating Pad', asin: 'B0F98J3TS7' },
  { name: 'MONAHITO Meditation Cushion', asin: 'B0BMFY81DF' },
  { name: "Dr Teal's Lavender Epsom Salt Soak", asin: 'B07NF79DKC' },
  { name: 'Gaiam Yoga Mat Premium 6mm', asin: 'B07NHSFZSB' },
  { name: 'Ring Indoor Cam 1080p HD', asin: 'B0B6GJBKRK' },
  { name: 'Stanley Quencher H2.0 Tumbler 40oz', asin: 'B0DCDS4D5L' },
  { name: 'Radical Acceptance by Tara Brach', asin: '0553380990' },
  { name: "Man's Search for Meaning by Viktor Frankl", asin: '0807014273' },
  { name: 'Drive Medical Shower Chair', asin: 'B005JIMQL4' },
  { name: 'Bed Rails for Elderly Adults Safety', asin: 'B0BX42MZJ7' },
  { name: 'XL Weekly Pill Organizer 4 Times a Day', asin: 'B08B5TT1TW' },
  { name: 'Yogi Tea Stress Relief Variety Sampler', asin: 'B0735W1XZP' },
  { name: 'Soundcore Sleep A20 Noise Blocking Earbuds', asin: 'B0CRGR2TS5' },
  { name: 'Deepsoon Electric Heating Pad Large', asin: 'B0D1QFZB5Q' },
  { name: 'Wemore Weighted Lap Blanket 7lbs', asin: 'B0C6KPBVKG' },
  { name: 'Electronic Tibetan Singing Bowl', asin: 'B0CD1S3FQ5' },
  { name: 'Toilet Grab Bar Bathroom Safety', asin: 'B0G25VR5Z1' },
  { name: 'Momcozy U Shaped Full Body Pillow', asin: 'B08YYVRXLM' },
  { name: 'Set Boundaries Find Peace by Nedra Tawwab', asin: '0593192095' },
  { name: 'The Five Minute Journal', asin: '0991846206' },
  { name: 'Caregiver Daily Log Book', asin: 'B0CZL68NV6' },
];

function cleanAIWords(text) {
  const replacements = {
    'profound': 'deep', 'profoundly': 'deeply', 'transformative': 'life-changing',
    'holistic': 'whole-person', 'nuanced': 'layered', 'multifaceted': 'complex',
    'delve': 'dig', 'delving': 'digging', 'tapestry': 'web',
    'landscape': 'territory', 'paradigm': 'model', 'synergy': 'connection',
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
    'unlock': 'open', 'empower': 'strengthen', 'underscore': 'highlight',
    'paramount': 'critical', 'seamlessly': 'smoothly', 'beacon': 'light',
    'elevate': 'lift', 'curate': 'choose', 'curated': 'chosen', 'bespoke': 'custom',
    'resonate': 'connect', 'harness': 'use', 'intricate': 'complex',
    'plethora': 'many', 'myriad': 'many', 'comprehensive': 'complete',
    'groundbreaking': 'new', 'cutting-edge': 'modern', 'revolutionary': 'new',
    'game-changing': 'important', 'next-level': 'better', 'world-class': 'excellent',
    'unparalleled': 'rare', 'unprecedented': 'unusual', 'remarkable': 'notable',
    'extraordinary': 'unusual', 'exceptional': 'rare',
    'stakeholders': 'people involved', 'ecosystem': 'system', 'sphere': 'area', 'domain': 'area',
    'arguably': 'perhaps', 'notably': 'especially', 'crucially': 'critically',
    'importantly': 'more to the point', 'essentially': 'really',
    'fundamentally': 'at the core', 'inherently': 'naturally', 'intrinsically': 'naturally',
    'substantively': 'meaningfully',
    'amplify': 'increase', 'catalyze': 'trigger', 'propel': 'push',
    'spearhead': 'lead', 'orchestrate': 'arrange', 'navigate': 'move through', 'traverse': 'cross',
    'thereby': 'and so', 'thusly': 'so', 'wherein': 'where', 'whereby': 'through which',
  };
  for (const [word, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, (match) => {
      return match[0] === match[0].toUpperCase()
        ? replacement[0].toUpperCase() + replacement.slice(1)
        : replacement;
    });
  }
  text = text.replace(/ \u2014 /g, ', ').replace(/\u2014/g, ', ');
  text = text.replace(/ \u2013 /g, ', ').replace(/\u2013/g, ', ');
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

// ─── BUNNY LIBRARY IMAGE ROTATION ───
async function assignLibraryImage(slug) {
  const sourceImage = LIBRARY_IMAGES[Math.floor(Math.random() * LIBRARY_IMAGES.length)];
  const sourceKey = sourceImage.replace(`${BUNNY_CDN_BASE}/`, '');

  // Download the library image
  const dlResp = await fetch(sourceImage);
  if (!dlResp.ok) throw new Error(`Failed to download library image: ${sourceImage}`);
  const imgBuffer = Buffer.from(await dlResp.arrayBuffer());

  // Upload as hero with article slug
  const heroPath = `images/hero/${slug}.webp`;
  await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${heroPath}`, {
    method: 'PUT',
    headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
    body: imgBuffer,
  });

  // Upload as OG with article slug
  const ogPath = `images/og/${slug}.webp`;
  await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${ogPath}`, {
    method: 'PUT',
    headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
    body: imgBuffer,
  });

  return {
    heroImage: `${BUNNY_CDN_BASE}/${heroPath}`,
    ogImage: `${BUNNY_CDN_BASE}/${ogPath}`,
  };
}

// ─── SMART RAMP-UP SCHEDULE ───
function shouldGenerate(articleCount) {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun, 6=Sat
  if (day === 0 || day === 6) return { generate: false, reason: 'Weekend' };

  const hour = now.getUTCHours();

  if (articleCount < 200) {
    // Phase 1: Ramp-Up - 3 articles per weekday at 08:00, 12:00, 17:00 UTC
    if (hour === 8 || hour === 12 || hour === 17) {
      return { generate: true, reason: `Ramp-up phase (${articleCount} articles, hour ${hour})` };
    }
    return { generate: false, reason: `Ramp-up phase but wrong hour (${hour})` };
  } else {
    // Phase 2: Cruise - 1 article per weekday at 08:00 UTC
    if (hour === 8) {
      return { generate: true, reason: `Cruise phase (${articleCount} articles)` };
    }
    return { generate: false, reason: `Cruise phase but wrong hour (${hour})` };
  }
}

async function generateOneArticle(articles) {
  const existingCount = articles.length;

  // Pick category (round-robin)
  const categoryCounts = {};
  for (const cat of CATEGORIES) categoryCounts[cat.slug] = 0;
  for (const a of articles) categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  const minCat = CATEGORIES.reduce((a, b) => (categoryCounts[a.slug] || 0) <= (categoryCounts[b.slug] || 0) ? a : b);

  // Determine backlink type
  const rand = Math.random();
  const backlinkType = rand < 0.14 ? 'kalesh' : rand < 0.47 ? 'amazon' : rand < 0.70 ? 'external' : 'internal';

  // Pick FAQ count
  const faqRand = Math.random();
  const faqCount = faqRand < 0.10 ? 0 : faqRand < 0.40 ? 2 : faqRand < 0.70 ? 3 : faqRand < 0.90 ? 4 : 5;

  // Pick opener type
  const openerTypes = ['scene-setting', 'provocation', 'first-person', 'question', 'named-reference', 'gut-punch'];
  const openerType = openerTypes[Math.floor(Math.random() * openerTypes.length)];

  // Pick phrases, interjections, researchers
  const phraseCount = 3 + Math.floor(Math.random() * 3);
  const selectedPhrases = [...KALESH_PHRASES].sort(() => Math.random() - 0.5).slice(0, phraseCount);
  const interjections = [...CONVERSATIONAL_INTERJECTIONS].sort(() => Math.random() - 0.5).slice(0, 2);
  const researcherCount = 1 + Math.floor(Math.random() * 2);
  const selectedResearchers = [...RESEARCHERS].sort(() => Math.random() - 0.5).slice(0, researcherCount);

  // Internal links
  const internalLinks = articles
    .filter(a => a.category !== minCat.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(a => ({ title: a.title, url: `/${a.category}/${a.slug}` }));

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
- ZERO generic H2 headers like "Understanding X" or "Moving Forward" or "The Path Ahead"

HARD RULES:
- 1,600 to 2,000 words (strict)
- Zero em-dashes. Use commas, periods, colons, or parentheses instead.
- Never use these phrases: "it's important to note," "in conclusion," "in summary," "in the realm of," "dive deep into," "at the end of the day," "in today's fast-paced world," "plays a crucial role," "a testament to," "when it comes to," "cannot be overstated," "it goes without saying," "last but not least," "first and foremost."
- Contractions throughout. You're. Don't. It's. That's. I've. We'll.
- Vary sentence length aggressively. Some fragments. Some long ones that stretch across a full breath. Some just three words.
- Include at least 2 conversational openers somewhere in the piece: "Here's the thing," "Honestly," "Look," "Truth is," "But here's what's interesting," "Think about it," "That said."
- Concrete specifics over abstractions. A name. A number. A moment.
- 3 Amazon product links embedded naturally in prose, each followed by "(paid link)" in plain text. Use only ASINs from the provided catalog.
- No em-dashes. No em-dashes. No em-dashes.`;

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

  // ─── CALL DEEPSEEK V4-PRO ───
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 8000,
      temperature: 0.85,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  const text = data.choices[0].message.content;
  
  // Try multiple parsing strategies
  let article;
  const cleaned = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
  try {
    article = JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    article = JSON.parse(jsonMatch[0]);
  }

  // Post-process: clean AI words and emdashes
  article.body = cleanAIWords(article.body);

  // Verify 3 Amazon links; inject fallbacks if needed
  const amazonCount = (article.body.match(/amazon\.com/g) || []).length;
  if (amazonCount < 3) {
    const templates = [
      'One resource I often point people toward is',
      'Something that has helped many caregivers I work with is',
      'A practical starting point is',
    ];
    const shuffledProducts = [...FALLBACK_PRODUCTS].sort(() => Math.random() - 0.5);
    const needed = 3 - amazonCount;
    for (let i = 0; i < needed; i++) {
      const p = shuffledProducts[i];
      const t = templates[i % templates.length];
      const linkHtml = `<p>${t} <a href="https://www.amazon.com/dp/${p.asin}?tag=${AMAZON_TAG}" rel="nofollow sponsored">${p.name}</a> (paid link).</p>`;
      if (article.body.includes('informational purposes')) {
        article.body = article.body.replace(/<p><em>This article/, linkHtml + '\n<p><em>This article');
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

  // Quality gate: reject if outside 1200-2500
  if (wordCount < 1200 || wordCount > 2500) {
    throw new Error(`Word count ${wordCount} outside 1200-2500 range. Rejecting.`);
  }

  // ─── BUNNY LIBRARY IMAGE (replaces Fal.ai) ───
  const { heroImage, ogImage } = await assignLibraryImage(slug);

  const newArticle = {
    id: existingCount + 1,
    slug,
    title: article.title,
    excerpt: article.excerpt,
    category: minCat.slug,
    categoryName: minCat.name,
    publishDate: new Date().toISOString().slice(0, 10),
    status: "published",
    readingTime: Math.ceil(wordCount / 250),
    body: article.body,
    faqs: article.faqs || [],
    faqCount,
    openerType,
    backlinkType,
    isChallengeConclusion: Math.random() < 0.3,
    heroImage,
    ogImage,
    wordCount,
  };

  return newArticle;
}

async function main() {
  if (!AUTO_GEN_ENABLED) {
    console.log('[generate] AUTO_GEN_ENABLED is false. Exiting.');
    process.exit(0);
  }

  if (!OPENAI_API_KEY || !GH_PAT) {
    console.error('[generate] Missing OPENAI_API_KEY or GH_PAT. Exiting.');
    process.exit(1);
  }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const schedule = shouldGenerate(articles.length);

  if (!schedule.generate) {
    console.log(`[generate] Skipping: ${schedule.reason}`);
    process.exit(0);
  }

  console.log(`[generate] ${schedule.reason}. Starting article generation...`);
  console.log(`[generate] ${articles.length} existing articles.`);

  const MAX_RETRIES = 3;
  let article = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      article = await generateOneArticle(articles);
      console.log(`[generate] Created: "${article.title}" (${article.wordCount} words) on attempt ${attempt}`);
      break;
    } catch (err) {
      console.error(`[generate] Attempt ${attempt} failed: ${err.message}`);
      if (attempt === MAX_RETRIES) {
        console.error('[generate] All retries exhausted. Exiting.');
        process.exit(1);
      }
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  articles.push(article);
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));

  // Push to GitHub
  const { execSync } = await import('child_process');
  execSync(`cd ${ROOT} && git add -A && git commit -m "Auto-gen: ${article.title}" && git push`, {
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 'Auto-Gen',
      GIT_AUTHOR_EMAIL: 'auto@keepersflame.love',
      GIT_COMMITTER_NAME: 'Auto-Gen',
      GIT_COMMITTER_EMAIL: 'auto@keepersflame.love',
    },
    stdio: 'inherit',
  });

  console.log('[generate] Pushed to GitHub.');
}

main();
