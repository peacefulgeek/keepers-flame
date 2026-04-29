// ─── QUARTERLY DEEP REFRESH ─── DeepSeek V4-Pro ───
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.deepseek.com';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'deepseek-v4-pro';
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

async function refreshQuarterly() {
  if (!AUTO_GEN_ENABLED) { console.log('[refresh-quarterly] Disabled.'); process.exit(0); }
  if (!OPENAI_API_KEY) { console.error('[refresh-quarterly] Missing OPENAI_API_KEY.'); process.exit(1); }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const now = new Date();
  const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  const candidates = articles
    .filter(a => {
      const pubDate = new Date(a.publishDate);
      const lastQ = a.lastQuarterlyRefresh ? new Date(a.lastQuarterlyRefresh) : new Date(0);
      return pubDate < ninetyDaysAgo && lastQ < ninetyDaysAgo;
    })
    .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
    .slice(0, 20);

  if (candidates.length === 0) {
    console.log('[refresh-quarterly] No articles need deep refresh.');
    return;
  }

  let refreshed = 0;
  for (const article of candidates) {
    let passed = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: OPENAI_MODEL,
            messages: [
              { role: 'system', content: `You do deep quarterly refreshes for The Keeper's Flame. Author: Kalesh, Consciousness Teacher. Voice: warm, conversational, honest, cross-traditional. ZERO em-dashes. ZERO of these words: ${AI_WORDS.join(', ')}. Use contractions. Vary sentence lengths aggressively.` },
              { role: 'user', content: `Do a DEEP refresh of this article. Same topic, same title "${article.title}", but substantially rewrite with new angles, updated insights, fresh examples. This is a quarterly deep refresh, not a light edit.

HARD RULES:
- 1,400 to 1,800 words
- Zero em-dashes. Use commas, periods, colons instead.
- Never use these words: ${AI_WORDS.join(', ')}.
- Contractions throughout. Vary sentence length aggressively.
- Include at least 2 conversational markers: "Here's the thing," "Honestly," "Look," "Truth is."
- Keep exactly 3 Amazon product links in prose, each followed by "(paid link)".
- Include 1-2 first-person experience markers.
- Include health disclaimer at end.
- Output clean HTML (p, h2, blockquote, a, strong, em tags only).

EXISTING ARTICLE:
${article.body.substring(0, 4000)}` },
            ],
            max_tokens: 8000,
            temperature: 0.9,
          }),
        });

        if (!response.ok) throw new Error(`DeepSeek error: ${response.status}`);
        const data = await response.json();
        let newBody = data.choices[0].message.content;
        newBody = newBody.replace(/```html?\n?/g, '').replace(/```\n?/g, '').trim();
        newBody = cleanAIWords(newBody);

        if (passesGate(newBody)) {
          const idx = articles.findIndex(a => a.id === article.id);
          if (idx >= 0) {
            articles[idx].body = newBody;
            articles[idx].wordCount = countWords(newBody);
            articles[idx].lastQuarterlyRefresh = now.toISOString();
            passed = true;
            refreshed++;
            console.log(`[refresh-quarterly] Deep refreshed: ${article.slug} (attempt ${attempt}, ${articles[idx].wordCount} words)`);
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

    await new Promise(r => setTimeout(r, 3000));
  }

  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  console.log(`[refresh-quarterly] Done. Deep refreshed ${refreshed} of ${candidates.length} articles.`);

  if (refreshed > 0) {
    const { execSync } = await import('child_process');
    execSync(`cd ${ROOT} && git add -A && git commit -m "Quarterly deep refresh: ${refreshed} articles" && git push`, {
      env: { ...process.env, GIT_AUTHOR_NAME: 'Auto-Gen', GIT_AUTHOR_EMAIL: 'auto@keepersflame.love', GIT_COMMITTER_NAME: 'Auto-Gen', GIT_COMMITTER_EMAIL: 'auto@keepersflame.love' },
      stdio: 'inherit',
    });
  }
}

refreshQuarterly().catch(err => { console.error('[refresh-quarterly] Fatal error:', err); process.exit(1); });
