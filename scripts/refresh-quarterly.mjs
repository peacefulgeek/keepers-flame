import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const articlesPath = path.resolve(root, 'src/data/articles.json');

const AI_WORDS = [
  'delve','tapestry','paradigm','synergy','leverage','unlock','empower','utilize','pivotal',
  'embark','underscore','paramount','seamlessly','robust','beacon','foster','elevate','curate',
  'curated','bespoke','resonate','harness','intricate','plethora','myriad','comprehensive',
  'transformative','groundbreaking','innovative','cutting-edge','revolutionary','state-of-the-art',
  'ever-evolving','game-changing','next-level','world-class','unparalleled','unprecedented',
  'remarkable','extraordinary','exceptional','profound','holistic','nuanced','multifaceted',
  'stakeholders','ecosystem','landscape','realm','sphere','domain','arguably','notably',
  'crucially','importantly','essentially','fundamentally','inherently','intrinsically',
  'substantively','streamline','optimize','facilitate','amplify','catalyze','propel',
  'spearhead','orchestrate','navigate','traverse','furthermore','moreover','additionally',
  'consequently','subsequently','thereby','thusly','wherein','whereby'
];

function countWords(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return stripped ? stripped.split(/\s+/).length : 0;
}

function hasEmDash(text) { return text.includes('\u2014'); }

function findFlaggedWords(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ').toLowerCase();
  return AI_WORDS.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(stripped));
}

function countAmazonLinks(text) {
  return (text.match(/amazon\.com\/dp\/[A-Z0-9]{10}/g) || []).length;
}

function passesGate(body) {
  const words = countWords(body);
  if (words < 1200 || words > 2500) return false;
  if (hasEmDash(body)) return false;
  if (findFlaggedWords(body).length > 0) return false;
  if (countAmazonLinks(body) < 3) return false;
  return true;
}

const AMAZON_TAG = process.env.AMAZON_TAG || 'spankyspinola-20';

async function refreshQuarterly() {
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const now = new Date();
  const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  // Pick articles older than 90 days, prioritize those never quarterly-refreshed
  const candidates = articles
    .filter(a => {
      const pubDate = new Date(a.dateISO);
      const lastQ = a.lastQuarterlyRefresh ? new Date(a.lastQuarterlyRefresh) : new Date(0);
      return pubDate < ninetyDaysAgo && lastQ < ninetyDaysAgo;
    })
    .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))
    .slice(0, 20);

  if (candidates.length === 0) {
    console.log('[refresh-quarterly] No articles need quarterly refresh.');
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log('[refresh-quarterly] No ANTHROPIC_API_KEY, skipping.');
    return;
  }

  let refreshed = 0;
  for (const article of candidates) {
    const original = article.body;
    let passed = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const prompt = `Deep refresh this article for a caregiver support website. Title: "${article.title}". This is a quarterly refresh, so make meaningful improvements: update statistics, add new insights, restructure for better flow. Keep all Amazon product links (tag=${AMAZON_TAG}).

HARD RULES:
- 1,600 to 2,000 words (strict)
- Zero em-dashes. Use commas, periods, colons, or parentheses instead.
- Never use these words: ${AI_WORDS.join(', ')}.
- Contractions throughout. Vary sentence length aggressively. Direct address ("you") throughout.
- Include at least 2 conversational markers: "Here's the thing," "Honestly," "Look," "Truth is."
- Keep exactly 3 Amazon product links in prose, each followed by "(paid link)".
- No em-dashes. No em-dashes. No em-dashes.
- Output clean HTML.

EXISTING ARTICLE:
${original.substring(0, 3000)}`;

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
        const newBody = data.content?.[0]?.text || '';

        if (newBody && passesGate(newBody)) {
          const idx = articles.findIndex(a => a.id === article.id);
          if (idx >= 0) {
            articles[idx].body = newBody.replace(/\u2014/g, ', ').replace(/\u2013/g, ', ');
            articles[idx].lastQuarterlyRefresh = now.toISOString();
            passed = true;
            refreshed++;
            console.log(`[refresh-quarterly] Refreshed: ${article.slug} (attempt ${attempt})`);
          }
          break;
        } else {
          console.warn(`[refresh-quarterly] ${article.slug} attempt ${attempt} failed gate`);
        }
      } catch (err) {
        console.error(`[refresh-quarterly] ${article.slug} attempt ${attempt} error:`, err.message);
      }
    }

    if (!passed) {
      console.error(`[refresh-quarterly] ${article.slug} FAILED gate 3x, keeping original`);
    }

    await new Promise(r => setTimeout(r, 5000));
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  console.log(`[refresh-quarterly] Done. Refreshed ${refreshed} of ${candidates.length} articles.`);
}

refreshQuarterly().catch(err => {
  console.error('[refresh-quarterly] Fatal error:', err);
  process.exit(1);
});
