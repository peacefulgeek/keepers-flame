import cron from 'node-cron';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === 'true';

function runScript(name, timeoutMs = 600000) {
  const script = path.resolve(__dirname, name);
  try {
    execSync(`node ${script}`, { timeout: timeoutMs, stdio: 'inherit' });
    console.log(`[cron] ${name} complete.`);
  } catch (err) {
    console.error(`[cron] ${name} failed:`, err.message);
  }
}

// ─── SMART RAMP-UP SCHEDULE ───
// Phase 1 (<200 articles): 3x/weekday at 08:00, 12:00, 17:00 UTC
// Phase 2 (>=200 articles): 1x/weekday at 08:00 UTC
// The generate-articles.mjs script itself checks article count and decides whether to run

// Cron #1a: Mon-Fri 08:00 UTC — Article generation (always runs, script decides)
cron.schedule('0 8 * * 1-5', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping'); return; }
  console.log(`[cron] Article gen (08:00) at ${new Date().toISOString()}`);
  runScript('generate-articles.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #1b: Mon-Fri 12:00 UTC — Ramp-up slot (script skips if >=200 articles)
cron.schedule('0 12 * * 1-5', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping'); return; }
  console.log(`[cron] Article gen (12:00 ramp-up) at ${new Date().toISOString()}`);
  runScript('generate-articles.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #1c: Mon-Fri 17:00 UTC — Ramp-up slot (script skips if >=200 articles)
cron.schedule('0 17 * * 1-5', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping'); return; }
  console.log(`[cron] Article gen (17:00 ramp-up) at ${new Date().toISOString()}`);
  runScript('generate-articles.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #2: Saturday 08:00 UTC — Product spotlight (1/week)
cron.schedule('0 8 * * 6', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping spotlight'); return; }
  console.log(`[cron] Product spotlight at ${new Date().toISOString()}`);
  runScript('product-spotlight.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #3: 1st of month 03:00 UTC — Monthly content refresh (10 oldest)
cron.schedule('0 3 1 * *', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping monthly'); return; }
  console.log(`[cron] Monthly content refresh at ${new Date().toISOString()}`);
  runScript('refresh-monthly.mjs', 1800000);
}, { timezone: 'UTC' });

// Cron #4: Jan/Apr/Jul/Oct 1st 04:00 UTC — Quarterly deep refresh (20 articles)
cron.schedule('0 4 1 1,4,7,10 *', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping quarterly'); return; }
  console.log(`[cron] Quarterly deep refresh at ${new Date().toISOString()}`);
  runScript('refresh-quarterly.mjs', 3600000);
}, { timezone: 'UTC' });

// Cron #5: Sunday 05:00 UTC — ASIN health check + dead link replacement
cron.schedule('0 5 * * 0', () => {
  console.log(`[cron] ASIN health check at ${new Date().toISOString()}`);
  runScript('refresh-products.mjs', 900000);
}, { timezone: 'UTC' });

console.log(`[cron] Cron worker started. AUTO_GEN_ENABLED=${AUTO_GEN_ENABLED}`);
console.log('[cron] Schedules (all UTC):');
console.log('  #1a Mon-Fri 08:00 — Article gen (always)');
console.log('  #1b Mon-Fri 12:00 — Article gen (ramp-up only, <200 articles)');
console.log('  #1c Mon-Fri 17:00 — Article gen (ramp-up only, <200 articles)');
console.log('  #2  Saturday 08:00 — Product spotlight');
console.log('  #3  1st of month 03:00 — Monthly refresh (10 oldest)');
console.log('  #4  Jan/Apr/Jul/Oct 1st 04:00 — Quarterly deep refresh (20 articles)');
console.log('  #5  Sunday 05:00 — ASIN health check');
console.log('[cron] Smart ramp-up: 3x/weekday until 200 articles, then 1x/weekday');
