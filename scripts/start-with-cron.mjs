import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

console.log('[start] Launching web server + cron worker...');

// Start web server
const web = spawn('node', [path.resolve(ROOT, 'server/index.mjs')], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: process.env.NODE_ENV || 'production' },
});

web.on('error', (err) => {
  console.error('[start] Web server error:', err.message);
  process.exit(1);
});

web.on('exit', (code) => {
  console.error(`[start] Web server exited with code ${code}`);
  process.exit(code || 1);
});

// Start cron worker
const cronWorker = spawn('node', [path.resolve(__dirname, 'cron-worker.mjs')], {
  stdio: 'inherit',
  env: process.env,
});

cronWorker.on('error', (err) => {
  console.error('[start] Cron worker error:', err.message);
});

cronWorker.on('exit', (code) => {
  console.error(`[start] Cron worker exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('[start] SIGTERM received. Shutting down...');
  web.kill('SIGTERM');
  cronWorker.kill('SIGTERM');
  setTimeout(() => process.exit(0), 5000);
});

process.on('SIGINT', () => {
  console.log('[start] SIGINT received. Shutting down...');
  web.kill('SIGINT');
  cronWorker.kill('SIGINT');
  setTimeout(() => process.exit(0), 5000);
});
