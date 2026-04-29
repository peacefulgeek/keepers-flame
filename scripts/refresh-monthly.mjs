// ─── MONTHLY CONTENT REFRESH ─── DeepSeek V4-Pro ───
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const GH_PAT = process.env.GH_PAT;
const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === 'true';
const AMAZON_TAG = 'spankyspinola-20';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.resolve(ROOT, 'src/data/articles.json');

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
  'consequently','subsequently','thereby','thusly','wherein','whereby',
];

function countWords(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).filter(w => w).length;
}

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
    'traverse': 'cross', 'amplify': 'increase',
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

function passesGate(body) {
  const words = countWords(body);
  if (words < 1200 || words > 2500) return false;
  if (body.includes('\u2014') || body.includes('\u2013')) return false;
  const stripped = body.replace(/<[^>]+>/g, ' ').toLowerCase();
  if (AI_WORDS.some(w => new RegExp(`\\b${w}\\b`).test(stripped))) return false;
  if ((body.match(/amazon\.com\/dp\/[A-Z0-9]{10}/g) || []).length < 3) return false;
  return true;
}

async function refreshMonthly() {
  if (!AUTO_GEN_ENABLED) { console.log('[refresh-monthly] Disabled.'); process.exit(0); }
  if (!DEEPSEEK_API_KEY) { console.error('[refresh-monthly] Missing DEEPSEEK_API_KEY.'); process.exit(1); }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const candidates = articles
    .filter(a => new Date(a.dateISO) < thirtyDaysAgo)
    .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))
    .slice(0, 10);

  if (candidates.length === 0) {
    console.log('[refresh-monthly] No articles need refresh.');
    return;
  }

  let refreshed = 0;
  for (const article of candidates) {
    let passed = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'deepseek-v4-pro',
            messages: [
              { role: 'system', content: `You refresh articles for The Keeper's Flame. Author: Kalesh. Voice: warm, conversational, honest. ZERO em-dashes. ZERO of these words: ${AI_WORDS.join(', ')}. Use contractions. Vary sentence lengths aggressively.` },
              { role: 'user', content: `Refresh and improve this article. Keep the same topic and title "${article.title}" but rewrite for freshness. Keep all Amazon product links (tag=${AMAZON_TAG}).

HARD RULES:
- 1,400 to 1,800 words
- Zero em-dashes. Use commas, periods, colons instead.
- Never use these words: ${AI_WORDS.join(', ')}.
- Contractions throughout. Vary sentence length. Direct address ("you") throughout.
- Include at least 2 conversational markers: "Here's the thing," "Honestly," "Look," "Truth is."
- Keep exactly 3 Amazon product links in prose, each followed by "(paid link)".
- Include health disclaimer at end.
- Output clean HTML (p, h2, blockquote, a, strong, em tags only).

EXISTING ARTICLE:
${article.body.substring(0, 4000)}` },
            ],
            max_tokens: 8000,
            temperature: 0.85,
          }),
        });

        if (!response.ok) throw new Error(`DeepSeek error: ${response.status}`);
        const data = await response.json();
        let newBody = data.choices[0].message.content;

        // Strip any markdown code fences
        newBody = newBody.replace(/```html?\n?/g, '').replace(/```\n?/g, '').trim();
        newBody = cleanAIWords(newBody);

        if (passesGate(newBody)) {
          const idx = articles.findIndex(a => a.id === article.id);
          if (idx >= 0) {
            articles[idx].body = newBody;
            articles[idx].wordCount = countWords(newBody);
            articles[idx].lastRefreshed = now.toISOString();
            passed = true;
            refreshed++;
            console.log(`[refresh-monthly] Refreshed: ${article.slug} (attempt ${attempt}, ${articles[idx].wordCount} words)`);
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

    await new Promise(r => setTimeout(r, 3000));
  }

  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  console.log(`[refresh-monthly] Done. Refreshed ${refreshed} of ${candidates.length} articles.`);

  if (refreshed > 0) {
    const { execSync } = await import('child_process');
    execSync(`cd ${ROOT} && git add -A && git commit -m "Monthly refresh: ${refreshed} articles" && git push`, {
      env: { ...process.env, GIT_AUTHOR_NAME: 'Auto-Gen', GIT_AUTHOR_EMAIL: 'auto@keepersflame.love', GIT_COMMITTER_NAME: 'Auto-Gen', GIT_COMMITTER_EMAIL: 'auto@keepersflame.love' },
      stdio: 'inherit',
    });
  }
}

refreshMonthly().catch(err => { console.error('[refresh-monthly] Fatal error:', err); process.exit(1); });
