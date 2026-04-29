// ─── PRODUCT SPOTLIGHT (Weekly) ─── DeepSeek V4-Pro + Bunny Library ───
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const GH_PAT = process.env.GH_PAT;
const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === 'true';

const BUNNY_STORAGE_ZONE = "keepers-flame";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "7940564d-abc6-43e5-a472cbba3ae6-0fac-4c26";
const BUNNY_CDN_BASE = "https://keepers-flame.b-cdn.net";
const AMAZON_TAG = "spankyspinola-20";
const SITE_NAME = "The Keeper's Flame";
const AUTHOR_NAME = "Kalesh";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.resolve(ROOT, 'src/data/articles.json');

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

const SPOTLIGHT_TEMPLATES = [
  { theme: 'Books That Carried Me Through Caregiving', focus: 'books', category: 'the-weight' },
  { theme: 'Body Support Tools for Caregivers Who Carry Everything', focus: 'body-care', category: 'the-practical' },
  { theme: 'Tech That Actually Helps (Not Just Adds Noise)', focus: 'technology', category: 'the-practical' },
  { theme: 'Small Comforts That Make the Hard Days Bearable', focus: 'comfort', category: 'the-guilt' },
  { theme: 'Meditation and Mindfulness Tools Worth Your Time', focus: 'meditation', category: 'the-sacred' },
  { theme: 'Journals and Writing Tools for Processing It All', focus: 'journals', category: 'the-sacred' },
];

const THEMES = [
  'Emotional Recovery', 'Stress Relief', 'Better Sleep', 'Daily Organization',
  'Physical Comfort', 'Mental Clarity', 'Grief Processing', 'Boundary Setting',
  'Family Communication', 'Personal Growth', 'Burnout Prevention', 'Finding Peace',
];

const BANNED_WORDS = [
  'delve','tapestry','paradigm','synergy','leverage','unlock','empower','utilize','pivotal',
  'embark','underscore','paramount','seamlessly','robust','beacon','foster','elevate','curate',
  'bespoke','resonate','harness','intricate','plethora','myriad','comprehensive','transformative',
  'groundbreaking','innovative','revolutionary','profound','profoundly','holistic','nuanced',
  'multifaceted','landscape','realm','furthermore','moreover','additionally','consequently',
  'subsequently','streamline','optimize','facilitate','amplify','catalyze','navigate','traverse',
  'stakeholders','ecosystem','sphere','domain','arguably','notably','crucially','importantly',
  'essentially','fundamentally','inherently','intrinsically','substantively',
];

function cleanAIWords(text) {
  const replacements = {
    'profound': 'deep', 'profoundly': 'deeply', 'transformative': 'life-changing',
    'holistic': 'whole-person', 'nuanced': 'layered', 'multifaceted': 'complex',
    'delve': 'dig', 'tapestry': 'web', 'landscape': 'territory', 'paradigm': 'model',
    'leverage': 'use', 'robust': 'strong', 'utilize': 'use', 'facilitate': 'support',
    'innovative': 'creative', 'streamline': 'simplify', 'optimize': 'improve',
    'pivotal': 'critical', 'realm': 'territory', 'embark': 'start', 'foster': 'build',
    'moreover': 'And', 'furthermore': 'And', 'additionally': 'Also',
    'consequently': 'So', 'subsequently': 'Then', 'unlock': 'open', 'empower': 'strengthen',
    'beacon': 'light', 'elevate': 'lift', 'curate': 'choose', 'resonate': 'connect',
    'harness': 'use', 'plethora': 'many', 'myriad': 'many', 'comprehensive': 'complete',
    'groundbreaking': 'new', 'revolutionary': 'new', 'navigate': 'move through',
    'traverse': 'cross', 'amplify': 'increase', 'catalyze': 'trigger',
    'stakeholders': 'people involved', 'ecosystem': 'system', 'sphere': 'area', 'domain': 'area',
    'arguably': 'perhaps', 'notably': 'especially', 'crucially': 'critically',
    'importantly': 'more to the point', 'essentially': 'really',
    'fundamentally': 'at the core', 'inherently': 'naturally', 'intrinsically': 'naturally',
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

async function assignLibraryImage(slug) {
  const sourceImage = LIBRARY_IMAGES[Math.floor(Math.random() * LIBRARY_IMAGES.length)];
  const dlResp = await fetch(sourceImage);
  if (!dlResp.ok) throw new Error(`Failed to download library image`);
  const imgBuffer = Buffer.from(await dlResp.arrayBuffer());

  for (const prefix of ['images/hero', 'images/og']) {
    const p = `${prefix}/${slug}.webp`;
    await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${p}`, {
      method: 'PUT',
      headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
      body: imgBuffer,
    });
  }
  return {
    heroImage: `${BUNNY_CDN_BASE}/images/hero/${slug}.webp`,
    ogImage: `${BUNNY_CDN_BASE}/images/og/${slug}.webp`,
  };
}

async function main() {
  if (!AUTO_GEN_ENABLED) { console.log('[spotlight] Disabled. Exiting.'); process.exit(0); }
  if (!DEEPSEEK_API_KEY) { console.error('[spotlight] Missing DEEPSEEK_API_KEY.'); process.exit(1); }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const template = SPOTLIGHT_TEMPLATES[weekNum % SPOTLIGHT_TEMPLATES.length];
  const theme = THEMES[weekNum % THEMES.length];

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: [
        { role: 'system', content: `You write product spotlight articles for ${SITE_NAME}. Author: ${AUTHOR_NAME}, Consciousness Teacher & Writer. Voice: warm, conversational, honest. ZERO em-dashes. ZERO of these words: ${BANNED_WORDS.join(', ')}. Use contractions. Vary sentence lengths aggressively. Short fragments mixed with long flowing sentences.` },
        { role: 'user', content: `Write a 1400-1800 word product spotlight article themed "${template.theme}: ${theme}" for caregivers.

REQUIREMENTS:
- Include exactly 5 Amazon product recommendations naturally embedded in prose
- Format each as: <a href="https://www.amazon.com/dp/ASIN?tag=${AMAZON_TAG}" rel="nofollow sponsored">Product Name</a> (paid link)
- Use real, well-known product names relevant to ${template.focus}
- Include 2 conversational interjections like "Here's the thing," or "Look," or "Honestly,"
- Include a health disclaimer at the end: "<p><em>This article is for informational purposes only and does not replace professional medical or mental health advice.</em></p>"
- Output as HTML (p, h2, blockquote, a, strong, em tags only). No div, no classes, no styles.
- ZERO em-dashes. Use commas, periods, colons instead.

Return JSON: { "title": "...", "excerpt": "...", "body": "...", "faqs": [] }` },
      ],
      max_tokens: 8000,
      temperature: 0.85,
    }),
  });

  if (!response.ok) throw new Error(`DeepSeek error: ${response.status}`);
  const data = await response.json();
  const text = data.choices[0].message.content;
  
  // Try multiple parsing strategies
  let article;
  const cleanedText = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
  try {
    article = JSON.parse(cleanedText);
  } catch {
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    article = JSON.parse(jsonMatch[0]);
  }
  article.body = cleanAIWords(article.body);

  const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const wordCount = article.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w).length;

  if (articles.some(a => a.slug === slug)) {
    console.log(`[spotlight] "${slug}" already exists. Skipping.`);
    return;
  }

  const { heroImage, ogImage } = await assignLibraryImage(slug);

  const newArticle = {
    id: articles.length + 1, slug,
    title: article.title, excerpt: article.excerpt,
    category: template.category,
    categoryName: template.category.replace('the-', '').replace(/^\w/, c => c.toUpperCase()),
    publishDate: new Date().toISOString().slice(0, 10),
    status: "published",
    readingTime: Math.ceil(wordCount / 250),
    body: article.body, faqs: [], faqCount: 0,
    openerType: 'product-spotlight', backlinkType: 'amazon',
    isChallengeConclusion: false, heroImage, ogImage, wordCount,
  };

  articles.push(newArticle);
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  console.log(`[spotlight] Created: "${newArticle.title}" (${wordCount} words)`);

  const { execSync } = await import('child_process');
  execSync(`cd ${ROOT} && git add -A && git commit -m "Spotlight: ${newArticle.title}" && git push`, {
    env: { ...process.env, GIT_AUTHOR_NAME: 'Auto-Gen', GIT_AUTHOR_EMAIL: 'auto@keepersflame.love', GIT_COMMITTER_NAME: 'Auto-Gen', GIT_COMMITTER_EMAIL: 'auto@keepersflame.love' },
    stdio: 'inherit',
  });
}

main().catch(err => { console.error('[spotlight] Error:', err.message); process.exit(1); });
