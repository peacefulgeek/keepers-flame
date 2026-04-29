/**
 * publish-queue.mjs — Queue-based article publisher for The Keeper's Flame
 * 
 * Publishing schedule:
 *   Phase 1 (first 60 queued): 5 per day, every day (including weekends)
 *   Phase 2 (remaining 424+):  1 per weekday (Mon-Fri)
 *   Fallback: When queue is empty, generate new articles via DeepSeek V4-Pro
 * 
 * Called by cron-worker.mjs on schedule.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const ARTICLES_PATH = join(ROOT, 'src', 'data', 'articles.json');
const LOG_PATH = join(ROOT, 'publish-queue.log');

// Phase 1 threshold: first 60 queued articles get released at 5/day
const PHASE1_COUNT = 60;
// Phase 1: articles per day (every day)
const PHASE1_PER_DAY = 5;
// Phase 2: articles per day (weekdays only)
const PHASE2_PER_DAY = 1;

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try {
    const existing = existsSync(LOG_PATH) ? readFileSync(LOG_PATH, 'utf8') : '';
    writeFileSync(LOG_PATH, existing + line + '\n');
  } catch (e) { /* ignore log errors */ }
}

function loadArticles() {
  const raw = readFileSync(ARTICLES_PATH, 'utf8');
  return JSON.parse(raw);
}

function saveArticles(articles) {
  writeFileSync(ARTICLES_PATH, JSON.stringify(articles));
}

function isWeekday() {
  const day = new Date().getDay(); // 0=Sun, 6=Sat
  return day >= 1 && day <= 5;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function countPublishedToday(articles) {
  const today = todayISO();
  return articles.filter(a => a.status === 'published' && a.publishDate === today).length;
}

function getQueuedArticles(articles) {
  return articles
    .filter(a => a.status === 'queued')
    .sort((a, b) => (a.queuePosition || 999999) - (b.queuePosition || 999999));
}

function countTotalPublished(articles) {
  return articles.filter(a => a.status === 'published').length;
}

function countTotalQueued(articles) {
  return articles.filter(a => a.status === 'queued').length;
}

// Determine how many articles to publish right now
function getPublishCount(articles) {
  const queued = getQueuedArticles(articles);
  if (queued.length === 0) return 0;
  
  const publishedToday = countPublishedToday(articles);
  
  // Find the lowest queue position to determine which phase we're in
  const lowestQueuePos = queued[0]?.queuePosition || 1;
  
  if (lowestQueuePos <= PHASE1_COUNT) {
    // Phase 1: 5 per day, every day
    const remaining = Math.min(PHASE1_PER_DAY - publishedToday, queued.length);
    return Math.max(0, remaining);
  } else {
    // Phase 2: 1 per weekday only
    if (!isWeekday()) {
      log('Phase 2: Weekend — skipping publication');
      return 0;
    }
    const remaining = Math.min(PHASE2_PER_DAY - publishedToday, queued.length);
    return Math.max(0, remaining);
  }
}

async function publishFromQueue(articles, count) {
  const queued = getQueuedArticles(articles);
  const toPublish = queued.slice(0, count);
  const today = todayISO();
  
  for (const article of toPublish) {
    article.status = 'published';
    article.publishDate = today;
    log(`Published: "${article.title}" (queue pos ${article.queuePosition}, category: ${article.category})`);
  }
  
  return toPublish.length;
}

async function generateFallback() {
  // Queue is empty — fall back to DeepSeek generation
  log('Queue empty — falling back to DeepSeek article generation');
  try {
    const genScript = join(__dirname, 'generate-articles.mjs');
    // Set QUEUE_EMPTY=1 so generate-articles knows to create and immediately publish
    execSync(`QUEUE_EMPTY=1 node "${genScript}"`, {
      cwd: ROOT,
      timeout: 300000, // 5 min timeout
      stdio: 'inherit',
      env: { ...process.env, QUEUE_EMPTY: '1' }
    });
    log('DeepSeek fallback generation completed');
  } catch (err) {
    log(`DeepSeek fallback generation failed: ${err.message}`);
  }
}

function gitPush() {
  try {
    const pat = process.env.GH_PAT;
    if (!pat) {
      log('No GH_PAT — skipping git push');
      return;
    }
    execSync('git add -A && git commit -m "Auto-publish from queue" && git push', {
      cwd: ROOT,
      timeout: 60000,
      stdio: 'pipe',
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: 'Keeper Bot',
        GIT_AUTHOR_EMAIL: 'bot@keepersflame.love',
        GIT_COMMITTER_NAME: 'Keeper Bot',
        GIT_COMMITTER_EMAIL: 'bot@keepersflame.love'
      }
    });
    log('Git push completed');
  } catch (err) {
    log(`Git push skipped or failed: ${err.message?.slice(0, 100)}`);
  }
}

async function main() {
  log('=== Publish Queue Started ===');
  
  const articles = loadArticles();
  const totalPublished = countTotalPublished(articles);
  const totalQueued = countTotalQueued(articles);
  
  log(`Status: ${totalPublished} published, ${totalQueued} queued, ${articles.length} total`);
  
  if (totalQueued === 0) {
    // Queue is empty — generate via DeepSeek
    await generateFallback();
    log('=== Publish Queue Finished (fallback) ===');
    return;
  }
  
  const publishCount = getPublishCount(articles);
  
  if (publishCount === 0) {
    log('Nothing to publish right now (already published today\'s quota or weekend in Phase 2)');
    log('=== Publish Queue Finished (no-op) ===');
    return;
  }
  
  const published = await publishFromQueue(articles, publishCount);
  log(`Published ${published} articles today`);
  
  // Save updated articles
  saveArticles(articles);
  log('Saved articles.json');
  
  // Rebuild
  try {
    log('Rebuilding site...');
    execSync('pnpm build', { cwd: ROOT, timeout: 120000, stdio: 'pipe' });
    log('Build completed');
  } catch (err) {
    log(`Build failed: ${err.message?.slice(0, 100)}`);
  }
  
  // Push
  gitPush();
  
  const remainingQueued = countTotalQueued(articles);
  const lowestPos = getQueuedArticles(articles)[0]?.queuePosition || 0;
  const phase = lowestPos <= PHASE1_COUNT ? 1 : 2;
  log(`Remaining in queue: ${remainingQueued} (Phase ${phase})`);
  log('=== Publish Queue Finished ===');
}

main().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
