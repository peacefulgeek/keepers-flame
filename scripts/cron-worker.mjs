import cron from 'node-cron';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function runScript(name, timeoutMs = 600000) {
  const script = path.resolve(__dirname, name);
  try {
    execSync(`node ${script}`, { timeout: timeoutMs, stdio: 'inherit' });
    console.log(`[cron] ${name} complete.`);
  } catch (err) {
    console.error(`[cron] ${name} failed:`, err.message);
  }
}

// ─── QUEUE-BASED PUBLISHING SCHEDULE ───
//
// The publish-queue.mjs script handles all the logic:
//   Phase 1 (first 60 queued): 5 per day, every day
//   Phase 2 (remaining 424+):  1 per weekday (Mon-Fri)
//   Fallback: When queue empty, generates via DeepSeek V4-Pro
//
// We call it multiple times per day so Phase 1 can release 5/day.
// The script itself tracks how many were published today and won't exceed the limit.

// Cron #1: Daily 06:00 UTC — Main publish slot (handles both phases)
cron.schedule('0 6 * * *', () => {
  console.log(`[cron] Publish queue (06:00) at ${new Date().toISOString()}`);
  runScript('publish-queue.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #2: Daily 09:00 UTC — Second publish slot (Phase 1 needs 5/day)
cron.schedule('0 9 * * *', () => {
  console.log(`[cron] Publish queue (09:00) at ${new Date().toISOString()}`);
  runScript('publish-queue.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #3: Daily 12:00 UTC — Third publish slot
cron.schedule('0 12 * * *', () => {
  console.log(`[cron] Publish queue (12:00) at ${new Date().toISOString()}`);
  runScript('publish-queue.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #4: Daily 15:00 UTC — Fourth publish slot
cron.schedule('0 15 * * *', () => {
  console.log(`[cron] Publish queue (15:00) at ${new Date().toISOString()}`);
  runScript('publish-queue.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #5: Daily 18:00 UTC — Fifth publish slot (ensures Phase 1 hits 5/day)
cron.schedule('0 18 * * *', () => {
  console.log(`[cron] Publish queue (18:00) at ${new Date().toISOString()}`);
  runScript('publish-queue.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #6: Saturday 08:00 UTC — Product spotlight (1/week)
cron.schedule('0 8 * * 6', () => {
  console.log(`[cron] Product spotlight at ${new Date().toISOString()}`);
  runScript('product-spotlight.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #7: 1st of month 03:00 UTC — Monthly content refresh (10 oldest)
cron.schedule('0 3 1 * *', () => {
  console.log(`[cron] Monthly content refresh at ${new Date().toISOString()}`);
  runScript('refresh-monthly.mjs', 1800000);
}, { timezone: 'UTC' });

// Cron #8: Jan/Apr/Jul/Oct 1st 04:00 UTC — Quarterly deep refresh (20 articles)
cron.schedule('0 4 1 1,4,7,10 *', () => {
  console.log(`[cron] Quarterly deep refresh at ${new Date().toISOString()}`);
  runScript('refresh-quarterly.mjs', 3600000);
}, { timezone: 'UTC' });

// Cron #9: Sunday 05:00 UTC — ASIN health check + dead link replacement
cron.schedule('0 5 * * 0', () => {
  console.log(`[cron] ASIN health check at ${new Date().toISOString()}`);
  runScript('refresh-products.mjs', 900000);
}, { timezone: 'UTC' });

console.log('[cron] Cron worker started — Queue-based publishing');
console.log('[cron] Schedules (all UTC):');
console.log('  #1-5 Daily 06:00/09:00/12:00/15:00/18:00 — Publish from queue');
console.log('       Phase 1 (first 60): 5/day every day');
console.log('       Phase 2 (remaining): 1/weekday Mon-Fri');
console.log('       Fallback: DeepSeek generation when queue empty');
console.log('  #6   Saturday 08:00 — Product spotlight');
console.log('  #7   1st of month 03:00 — Monthly refresh (10 oldest)');
console.log('  #8   Jan/Apr/Jul/Oct 1st 04:00 — Quarterly deep refresh');
console.log('  #9   Sunday 05:00 — ASIN health check');
