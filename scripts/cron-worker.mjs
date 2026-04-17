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

// Cron #1: Mon-Fri 06:00 UTC — Article generation (5/week)
cron.schedule('0 6 * * 1-5', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping article gen'); return; }
  console.log(`[cron] Article generation at ${new Date().toISOString()}`);
  runScript('generate-articles.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #2: Saturday 08:00 UTC — Product spotlight (1/week)
cron.schedule('0 8 * * 6', () => {
  if (!AUTO_GEN_ENABLED) { console.log('[cron] AUTO_GEN_ENABLED=false, skipping spotlight'); return; }
  console.log(`[cron] Product spotlight at ${new Date().toISOString()}`);
  runScript('product-spotlight.mjs', 600000);
}, { timezone: 'UTC' });

// Cron #3: 1st of month 03:00 UTC — Monthly content refresh
cron.schedule('0 3 1 * *', () => {
  console.log(`[cron] Monthly content refresh at ${new Date().toISOString()}`);
  runScript('refresh-monthly.mjs', 1800000);
}, { timezone: 'UTC' });

// Cron #4: Jan/Apr/Jul/Oct 1st 04:00 UTC — Quarterly content refresh
cron.schedule('0 4 1 1,4,7,10 *', () => {
  console.log(`[cron] Quarterly content refresh at ${new Date().toISOString()}`);
  runScript('refresh-quarterly.mjs', 3600000);
}, { timezone: 'UTC' });

// Cron #5: Sunday 05:00 UTC — ASIN health check + product link refresh
cron.schedule('0 5 * * 0', () => {
  console.log(`[cron] ASIN health check at ${new Date().toISOString()}`);
  runScript('refresh-products.mjs', 900000);
}, { timezone: 'UTC' });

console.log(`[cron] Cron worker started. AUTO_GEN_ENABLED=${AUTO_GEN_ENABLED}`);
console.log('[cron] Schedules:');
console.log('  #1 Mon-Fri 06:00 UTC — Article generation');
console.log('  #2 Saturday 08:00 UTC — Product spotlight');
console.log('  #3 1st of month 03:00 UTC — Monthly refresh');
console.log('  #4 Jan/Apr/Jul/Oct 1st 04:00 UTC — Quarterly refresh');
console.log('  #5 Sunday 05:00 UTC — ASIN health check');
