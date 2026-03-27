import cron from 'node-cron';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mon-Fri 12:00 UTC (6AM MDT)
cron.schedule('0 12 * * 1-5', () => {
  console.log(`[cron] Triggering article generation at ${new Date().toISOString()}`);
  try {
    execSync(`node ${path.resolve(__dirname, 'generate-articles.mjs')}`, {
      timeout: 600000, // 600s timeout
      stdio: 'inherit',
    });
    console.log('[cron] Article generation complete.');
  } catch (err) {
    console.error('[cron] Article generation failed:', err.message);
  }
}, {
  timezone: 'UTC',
});

console.log('[cron] Cron worker started. Schedule: Mon-Fri 12:00 UTC.');
