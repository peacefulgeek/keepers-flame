import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const articlesPath = path.resolve(root, 'src/data/articles.json');

const AMAZON_TAG = process.env.AMAZON_TAG || 'spankyspinola-20';

// Product spotlight templates — rotate weekly
const SPOTLIGHT_TEMPLATES = [
  { titleTemplate: 'Best Books for Caregivers Who Need {{THEME}}', category: 'the-weight', theme: 'books' },
  { titleTemplate: 'Practical Tools That Make {{THEME}} Easier', category: 'the-practical', theme: 'tools' },
  { titleTemplate: 'Self-Care Products Every Caregiver Deserves: {{THEME}}', category: 'the-weight', theme: 'self-care' },
  { titleTemplate: 'Comfort Items for Long Caregiving Days: {{THEME}}', category: 'the-guilt', theme: 'comfort' },
  { titleTemplate: 'Meditation and Mindfulness Tools for Caregivers: {{THEME}}', category: 'the-sacred', theme: 'meditation' },
  { titleTemplate: 'Journals and Reflection Tools for the Caregiving Journey: {{THEME}}', category: 'the-sacred', theme: 'journals' },
];

const THEMES = [
  'Emotional Recovery', 'Stress Relief', 'Better Sleep', 'Daily Organization',
  'Physical Comfort', 'Mental Clarity', 'Grief Processing', 'Boundary Setting',
  'Family Communication', 'Personal Growth', 'Burnout Prevention', 'Finding Peace',
];

async function generateSpotlight() {
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const template = SPOTLIGHT_TEMPLATES[weekNum % SPOTLIGHT_TEMPLATES.length];
  const theme = THEMES[weekNum % THEMES.length];
  const title = template.titleTemplate.replace('{{THEME}}', theme);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Check if already exists
  if (articles.some(a => a.slug === slug)) {
    console.log(`[spotlight] Article "${slug}" already exists, skipping.`);
    return;
  }

  // If ANTHROPIC_API_KEY is set, generate via API. Otherwise, create template.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  let body;

  if (apiKey) {
    // Use Anthropic to generate the spotlight article
    const prompt = `Write a product spotlight article titled "${title}" for a caregiver support website called The Keeper's Flame. Author is Kalesh, a consciousness teacher.

HARD RULES:
- 1,600 to 2,000 words (strict)
- Zero em-dashes. Use commas, periods, colons, or parentheses instead.
- Never use these words: delve, tapestry, paradigm, synergy, leverage, unlock, empower, utilize, pivotal, embark, underscore, paramount, seamlessly, robust, beacon, foster, elevate, curate, curated, bespoke, resonate, harness, intricate, plethora, myriad, comprehensive, transformative, groundbreaking, innovative, cutting-edge, revolutionary, state-of-the-art, ever-evolving, profound, holistic, nuanced, multifaceted, stakeholders, ecosystem, furthermore, moreover, additionally, consequently, subsequently, thereby, streamline, optimize, facilitate, amplify, catalyze, landscape, realm, sphere, domain, arguably, notably, crucially, importantly, essentially, fundamentally, inherently, intrinsically, substantively, propel, spearhead, orchestrate, navigate, traverse, thusly, wherein, whereby.
- Never use these phrases: "it's important to note," "in conclusion," "in summary," "in the realm of," "dive deep into," "at the end of the day," "in today's fast-paced world," "plays a crucial role," "a testament to," "when it comes to," "cannot be overstated."
- Contractions throughout. You're. Don't. It's. That's. I've. We'll.
- Vary sentence length aggressively. Some fragments. Some long ones. Some just three words.
- Direct address ("you") throughout.
- Include at least 2 conversational openers: "Here's the thing," "Honestly," "Look," "Truth is," "But here's what's interesting."
- Include exactly 3 Amazon product links naturally in prose, each followed by "(paid link)". Use this format: <a href="https://www.amazon.com/dp/ASIN?tag=${AMAZON_TAG}" target="_blank" rel="nofollow sponsored noopener">Product Name</a> (paid link)
- No em-dashes. No em-dashes. No em-dashes.
- Output clean HTML (p, h2, h3, ul, li tags). No markdown.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await res.json();
      body = data.content?.[0]?.text || '';
    } catch (err) {
      console.error('[spotlight] Anthropic generation failed:', err.message);
      return;
    }
  } else {
    console.log('[spotlight] No ANTHROPIC_API_KEY set, skipping generation.');
    return;
  }

  // Post-process: remove em-dashes
  body = body.replace(/\u2014/g, ', ');
  body = body.replace(/\u2013/g, ', ');

  const newArticle = {
    id: articles.length + 1,
    title,
    slug,
    category: template.category,
    categoryName: template.category.replace('the-', 'The ').replace(/^\w/, c => c.toUpperCase()),
    excerpt: `A curated selection of ${theme.toLowerCase()} products for caregivers who deserve better support.`,
    body,
    author: 'Kalesh',
    dateISO: new Date().toISOString().split('T')[0],
    heroImage: 'https://keepers-flame.b-cdn.net/images/hero/default-hero.webp',
    ogImage: 'https://keepers-flame.b-cdn.net/images/og/default-og.webp',
    tags: [theme.toLowerCase(), template.theme, 'product-spotlight'],
    backlinkType: 'amazon',
    faqCount: 2,
    openerType: 'scene-setting',
    conclusionType: 'challenge',
  };

  articles.push(newArticle);
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  console.log(`[spotlight] Created: "${title}" (ID ${newArticle.id})`);
}

generateSpotlight().catch(err => {
  console.error('[spotlight] Fatal error:', err);
  process.exit(1);
});
