import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const articlesPath = path.resolve(root, 'src/data/articles.json');

// Import quality gate functions inline (file-based, no DB)
function countWords(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return stripped ? stripped.split(/\s+/).length : 0;
}

function hasEmDash(text) { return text.includes('\u2014'); }

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

async function refreshMonthly() {
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Pick articles older than 30 days that haven't been refreshed recently
  const candidates = articles
    .filter(a => {
      const pubDate = new Date(a.dateISO);
      return pubDate < thirtyDaysAgo;
    })
    .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))
    .slice(0, 10);

  if (candidates.length === 0) {
    console.log('[refresh-monthly] No articles need refresh.');
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log('[refresh-monthly] No ANTHROPIC_API_KEY, skipping.');
    return;
  }

  let refreshed = 0;
  for (const article of candidates) {
    const original = article.body;
    let passed = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const prompt = `Refresh and improve this existing article for a caregiver support website. Keep the same topic and title "${article.title}" but rewrite for freshness. Keep all Amazon product links (tag=${AMAZON_TAG}).

HARD RULES:
- 1,600 to 2,000 words (strict)
- Zero em-dashes. Use commas, periods, colons, or parentheses instead.
- Never use these words: ${AI_WORDS.join(', ')}.
- Contractions throughout. Vary sentence length. Direct address ("you") throughout.
- Include at least 2 conversational markers: "Here's the thing," "Honestly," "Look," "Truth is."
- Keep exactly 3 Amazon product links in prose, each followed by "(paid link)".
- No em-dashes. No em-dashes. No em-dashes.
- Output clean HTML.

EXISTING ARTICLE TO REFRESH:
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
          // Update in place
          const idx = articles.findIndex(a => a.id === article.id);
          if (idx >= 0) {
            articles[idx].body = newBody.replace(/\u2014/g, ', ').replace(/\u2013/g, ', ');
            articles[idx].lastRefreshed = now.toISOString();
            passed = true;
            refreshed++;
            console.log(`[refresh-monthly] Refreshed: ${article.slug} (attempt ${attempt})`);
          }
          break;
        } else {
          console.warn(`[refresh-monthly] ${article.slug} attempt ${attempt} failed gate`);
        }
      } catch (err) {
        console.error(`[refresh-monthly] ${article.slug} attempt ${attempt} error:`, err.message);
      }
    }

    if (!passed) {
      console.error(`[refresh-monthly] ${article.slug} FAILED gate 3x, keeping original`);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 5000));
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  console.log(`[refresh-monthly] Done. Refreshed ${refreshed} of ${candidates.length} articles.`);
}

refreshMonthly().catch(err => {
  console.error('[refresh-monthly] Fatal error:', err);
  process.exit(1);
});
