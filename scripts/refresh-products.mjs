/**
 * refresh-products.mjs
 * 
 * Weekly cron job that:
 * 1. Extracts every Amazon ASIN from all articles
 * 2. Checks each ASIN against Amazon for availability (HEAD request + redirect detection)
 * 3. Replaces dead/unavailable ASINs with verified alternatives from the same category
 * 4. Updates article bodies in articles.json
 * 5. Commits and pushes changes to GitHub
 * 
 * Runs every Sunday at 03:00 UTC via cron-worker.mjs
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.resolve(ROOT, 'src/data/articles.json');

const AMAZON_TAG = 'spankyspinola-20';
const GH_PAT = process.env.GH_PAT;
const GITHUB_REPO = 'peacefulgeek/keepers-flame';

// ─── PRODUCT CATALOG ───
// Organized by category with verified ASINs. Each product has a natural
// recommendation sentence for seamless inline insertion.
const CATALOG = {
  books: [
    { asin: '1421422239', name: 'The 36-Hour Day', sentence: 'One resource that many caregivers swear by is' },
    { asin: '0805095152', name: 'Being Mortal by Atul Gawande', sentence: 'A book that often shifts perspective on aging and medicine is' },
    { asin: '1984818325', name: 'Burnout by Emily and Amelia Nagoski', sentence: 'A tool that often helps with understanding the stress cycle is' },
    { asin: '0143127748', name: 'The Body Keeps the Score', sentence: 'Something worth considering for understanding how stress lives in the body is' },
    { asin: '0593192095', name: 'Set Boundaries Find Peace', sentence: 'For those struggling with where to draw the line, a popular choice is' },
    { asin: '0553380990', name: 'Radical Acceptance by Tara Brach', sentence: 'A book that often opens something up for people carrying guilt is' },
    { asin: '1401307787', name: 'Wherever You Go There You Are', sentence: 'For a simple entry into mindfulness, this works well:' },
    { asin: '159285849X', name: 'The Gifts of Imperfection', sentence: 'Something that often helps with the guilt piece is' },
    { asin: '0061661201', name: 'When Things Fall Apart', sentence: 'A book that sits with you in the hard parts without trying to fix anything is' },
    { asin: '0061733520', name: 'The Art of Happiness', sentence: 'For a different way of thinking about what happiness actually means, you could try' },
    { asin: '0470923350', name: 'When the Body Says No', sentence: 'For understanding how chronic stress shows up in the body, one book that matters is' },
    { asin: '0674003810', name: 'Ambiguous Loss by Pauline Boss', sentence: 'For the grief that has no name, the book that finally gave it one is' },
    { asin: '0807014273', name: 'Mans Search for Meaning', sentence: 'A book about finding purpose in suffering that hits different when you are a caregiver is' },
    { asin: '1118002296', name: 'Loving Someone Who Has Dementia', sentence: 'For those loving someone who is still here but also gone, one book that helps is' },
    { asin: '1524732680', name: 'Option B by Sheryl Sandberg', sentence: 'For building resilience when plan A is no longer available, something worth reading is' },
    { asin: '0380810336', name: 'Feeling Good by David Burns', sentence: 'A classic that still helps people understand their own thought patterns is' },
    { asin: '0307472183', name: 'A Bittersweet Season', sentence: 'For understanding the full arc of caring for aging parents, one honest account is' },
    { asin: '8883701127', name: 'Moleskine Classic Notebook', sentence: 'Sometimes all you need is a good notebook and five minutes. A reliable choice is the' },
  ],
  'self-care': [
    { asin: 'B073429DV2', name: 'YnM Weighted Blanket 15lbs', sentence: 'One thing that many caregivers say helps them finally sleep is a' },
    { asin: 'B07NF79DKC', name: 'Dr Teals Lavender Epsom Salt Soak', sentence: 'For turning a bath into something close to therapy, something worth trying is' },
    { asin: 'B07NHSFZSB', name: 'Gaiam Yoga Mat Premium 6mm', sentence: 'Even ten minutes on a mat can shift something. A good option is the' },
    { asin: 'B0040EGNIU', name: 'TriggerPoint Foam Roller', sentence: 'For the physical tension that builds up in the back and shoulders, something that helps is the' },
    { asin: 'B00Y2CQRZY', name: 'URPOWER Essential Oil Diffuser', sentence: 'Something that helps shift the atmosphere of a caregiving space is an' },
    { asin: 'B000OQ2DL4', name: 'Natural Vitality Calm Magnesium', sentence: 'For the nights when your body will not settle, something many people find helpful is' },
    { asin: 'B00MY8V86Q', name: 'LectroFan White Noise Machine', sentence: 'When the house needs to be quiet but your mind will not stop, something that helps is a' },
    { asin: 'B07KC5DWCC', name: 'MZOO Sleep Eye Mask', sentence: 'For blocking out the world when you finally get to rest, a small thing that helps is an' },
    { asin: 'B08LQJXHZK', name: 'Calm App Gift Card', sentence: 'For guided meditation without the learning curve, something worth trying is a' },
    { asin: 'B0F98J3TS7', name: 'UTK Cordless Heating Pad', sentence: 'A simple tool that often helps with the physical strain is a' },
    { asin: 'B0FK4D5N61', name: 'Shiatsu Neck and Back Massager', sentence: 'For the neck and shoulder tension that never fully goes away, something worth trying is a' },
    { asin: 'B0D25G43TV', name: 'Neck Massager with Heat', sentence: 'For targeted relief in the neck and shoulders, one option is a' },
    { asin: 'B0D17Y3XBK', name: 'Acupressure Mat and Pillow Set', sentence: 'A popular choice for releasing tension after a long day is an' },
    { asin: 'B08YDFJLCM', name: 'HIQILI Lavender Essential Oil', sentence: 'For the calming scent that helps signal your brain it is time to rest, try' },
    { asin: 'B0D3XD5C3P', name: 'YOTTOY Extra Thick Yoga Mat', sentence: 'For the stretching your body has been asking for, a comfortable option is the' },
  ],
  practical: [
    { asin: 'B00FLYWNYQ', name: 'Instant Pot Duo', sentence: 'For making meals when you have no time or energy to cook, something that actually helps is an' },
    { asin: 'B0DSN2LHNK', name: 'HOMLAND Shower Chair', sentence: 'Something that makes bathing safer and less stressful is a' },
    { asin: 'B0CWL3RMNL', name: 'Shower Seat for Inside Shower', sentence: 'For bathroom safety that preserves dignity, a practical solution is a' },
    { asin: 'B0DM65RS9J', name: 'Foldable Shower Stool', sentence: 'A portable option for shower safety is a' },
    { asin: 'B0D4KH3KF7', name: 'Waterproof Bed Pads with Handles', sentence: 'One thing that saves a lot of middle-of-the-night stress is' },
    { asin: 'B0F53TCX7Q', name: 'Caregiver Gait Belt with Handles', sentence: 'A tool that protects both of you during transfers is a' },
    { asin: 'B0GF2QQGBV', name: 'Portable Bedside Commode', sentence: 'For nighttime bathroom needs, a practical option is a' },
    { asin: 'B07S2H3XB9', name: 'Omron Bronze Blood Pressure Monitor', sentence: 'For keeping track of blood pressure at home, a reliable choice is the' },
    { asin: 'B0B6GJBKRK', name: 'Ring Indoor Cam 1080p HD', sentence: 'When you need to check in without driving across town, something that helps is a' },
    { asin: 'B09LYVPXDF', name: 'Wyze Cam v3 Security Camera', sentence: 'For affordable home monitoring that actually works, one option is the' },
    { asin: 'B084DC4LW6', name: 'Echo Show 8 Smart Display', sentence: 'For video calls with a loved one who cannot manage a phone, something that works well is the' },
    { asin: 'B0BHZT5S12', name: 'Amazon Fire Tablet', sentence: 'For giving a loved one something simple for video calls and entertainment, try the' },
    { asin: 'B0FBW976L9', name: 'UGREEN Bluetooth Tracker Tags', sentence: 'For keeping track of keys, wallets, or a loved one who wanders, something worth trying is' },
    { asin: 'B0D3PM3GQ9', name: 'AUVON Lumbar Support Pillow', sentence: 'For the back pain that comes from sitting in hospital chairs all day, one option is the' },
    { asin: 'B0C836V5Y8', name: 'FORTEM Seat Cushion and Lumbar Support', sentence: 'For making any chair more bearable during long hospital visits, try the' },
  ],
  journals: [
    { asin: '0991846206', name: 'The Five Minute Journal', sentence: 'For those who have five minutes and nothing more, something worth trying is' },
    { asin: 'B002TSIMW4', name: 'Leuchtturm1917 Dotted Notebook', sentence: 'For putting thoughts on paper when they will not stay in your head, a reliable choice is the' },
    { asin: 'B0GML5LLKD', name: '5-Minute Guided Gratitude Journal', sentence: 'For a structured way to start or end the day with gratitude, one option is the' },
    { asin: 'B0CV4PP9NL', name: 'Daily Habits Journal', sentence: 'For building small daily habits that add up over time, something worth trying is the' },
  ],
  comfort: [
    { asin: 'B0DYV4CN78', name: 'Bedsure Fleece Blanket', sentence: 'For those nights when comfort matters more than anything, something worth trying is a' },
    { asin: 'B0G6CZF8P7', name: 'Bedsure 3D Fleece Bubble Blanket', sentence: 'A cozy blanket that feels like a hug when you need one is the' },
    { asin: 'B0CJ59BC43', name: 'Himalayan Salt Lamp', sentence: 'For shifting the energy of a room, one small thing that works is a' },
    { asin: 'B0DCDS4D5L', name: 'Stanley Quencher H2.0 Tumbler 40oz', sentence: 'For staying hydrated when you forget to drink water all day, something that helps is the' },
    { asin: 'B0C33XXS56', name: 'Sony WF-1000XM5 Noise Cancelling Earbuds', sentence: 'When you need ten minutes of silence in a house that never stops, something worth trying is' },
    { asin: 'B09HBJBTLN', name: '3D Contoured Sleep Eye Mask', sentence: 'For blocking out the world when you finally get to rest, try a' },
  ],
  meditation: [
    { asin: 'B0BMFY81DF', name: 'MONAHITO Meditation Cushion', sentence: 'For the five minutes of stillness that matter more than you think, a good cushion is the' },
    { asin: 'B0BMFWVJ47', name: 'MONAHITO Meditation Floor Cushion', sentence: 'For creating a small space dedicated to sitting with yourself, one option is the' },
    { asin: 'B0BNQ1KDFF', name: 'MONAHITO Tibetan Singing Bowl Set', sentence: 'For adding a grounding ritual to your practice, something worth trying is a' },
  ],
  nutrition: [
    { asin: 'B0FQFJBXH3', name: 'Liquid IV Hydration Multiplier', sentence: 'For the dehydration that makes everything worse, something that helps is' },
    { asin: 'B0G31J1TWJ', name: 'Clean Protein Bars Variety Pack', sentence: 'For something to eat when you forgot to eat again, a decent option is' },
    { asin: 'B0C4999Y58', name: 'CHARMKING Compression Socks 3 Pairs', sentence: 'For the swollen feet and legs that come from standing all day, something that helps is' },
    { asin: 'B0DY75FHX7', name: 'Compression Socks 20-30mmHg', sentence: 'For leg support during long caregiving days, a practical choice is' },
  ],
  creative: [
    { asin: 'B0CZ3WGMMS', name: 'Adult Coloring Book for Stress Relief', sentence: 'For something that occupies your hands while your mind rests, one option is an' },
    { asin: 'B0GDTX8PN2', name: 'Nature and Floral Escapes Coloring Book', sentence: 'For a creative escape that requires nothing but colored pencils, try the' },
  ],
};

// Build a flat lookup: ASIN -> { category, name, sentence }
const ASIN_LOOKUP = {};
for (const [cat, products] of Object.entries(CATALOG)) {
  for (const p of products) {
    ASIN_LOOKUP[p.asin] = { ...p, category: cat };
  }
}

// ─── CATEGORY MAPPING ───
// Maps article category slugs to preferred product categories for replacements
const CATEGORY_PRODUCT_MAP = {
  'the-weight': ['self-care', 'books', 'comfort', 'nutrition'],
  'the-guilt': ['books', 'journals', 'self-care', 'meditation'],
  'the-practical': ['practical', 'nutrition', 'self-care', 'books'],
  'the-family': ['books', 'practical', 'comfort', 'journals'],
  'the-sacred': ['meditation', 'books', 'journals', 'self-care'],
};

// ─── HTTP CHECK ───
// Check if an Amazon ASIN is still available by making a HEAD request.
// Returns: 'alive' | 'dead' | 'uncertain'
function checkAsin(asin) {
  return new Promise((resolve) => {
    const url = `https://www.amazon.com/dp/${asin}`;
    const options = {
      method: 'HEAD',
      hostname: 'www.amazon.com',
      path: `/dp/${asin}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      const status = res.statusCode;
      const location = res.headers['location'] || '';

      // 404 or redirect to search page = dead
      if (status === 404) {
        resolve('dead');
      } else if (status >= 300 && status < 400 && location.includes('/s?')) {
        // Redirect to search results = product removed
        resolve('dead');
      } else if (status === 200 || (status >= 300 && status < 400)) {
        resolve('alive');
      } else if (status === 503 || status === 429) {
        // Rate limited or bot blocked - uncertain
        resolve('uncertain');
      } else {
        resolve('uncertain');
      }
    });

    req.on('error', () => resolve('uncertain'));
    req.on('timeout', () => {
      req.destroy();
      resolve('uncertain');
    });

    req.end();
  });
}

// ─── SCRAPE PRODUCT TITLE ───
// Try to get the product title from the Amazon page via a GET request.
// Returns the title string or null if unable to extract.
function scrapeProductTitle(asin) {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      hostname: 'www.amazon.com',
      path: `/dp/${asin}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity',
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Try to extract title from <title> tag
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) {
          let title = titleMatch[1].trim();
          // Amazon titles end with " : Amazon.com" or similar
          title = title.replace(/\s*[:\-|]\s*Amazon\.com.*$/i, '').trim();
          title = title.replace(/\s*Amazon\.com\s*$/i, '').trim();
          if (title.length > 5 && !title.toLowerCase().includes('page not found')) {
            resolve(title);
            return;
          }
        }
        resolve(null);
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.end();
  });
}

// ─── FIND REPLACEMENT ───
// Given a dead ASIN and article category, find a replacement from the catalog
// that is NOT already used in the same article.
function findReplacement(deadAsin, articleCategory, existingAsins) {
  const preferredCategories = CATEGORY_PRODUCT_MAP[articleCategory] || Object.keys(CATALOG);

  for (const cat of preferredCategories) {
    const products = CATALOG[cat] || [];
    for (const p of products) {
      if (p.asin !== deadAsin && !existingAsins.includes(p.asin)) {
        return p;
      }
    }
  }

  // Fallback: any product not already in the article
  for (const [cat, products] of Object.entries(CATALOG)) {
    for (const p of products) {
      if (p.asin !== deadAsin && !existingAsins.includes(p.asin)) {
        return p;
      }
    }
  }

  return null;
}

// ─── REPLACE ASIN IN ARTICLE BODY ───
// Replaces one Amazon link (old ASIN) with a new one, including updating
// the surrounding recommendation text.
function replaceAsinInBody(body, oldAsin, newProduct) {
  const oldUrl = `https://www.amazon.com/dp/${oldAsin}?tag=${AMAZON_TAG}`;
  const newUrl = `https://www.amazon.com/dp/${newProduct.asin}?tag=${AMAZON_TAG}`;

  // Strategy 1: Direct URL replacement (always works for the link itself)
  body = body.replace(oldUrl, newUrl);

  // Strategy 2: Also update the anchor text if it contains the old product name
  // Find the <a> tag with the new URL and update its text
  const anchorRegex = new RegExp(
    `(<a[^>]*href="${newUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>)([^<]+)(</a>)`,
    'g'
  );
  body = body.replace(anchorRegex, `$1${newProduct.name} (paid link)$3`);

  return body;
}

// ─── MAIN ───
async function main() {
  console.log(`[product-refresh] Starting product refresh at ${new Date().toISOString()}`);

  // Load articles
  const raw = fs.readFileSync(ARTICLES_PATH, 'utf-8');
  const articles = JSON.parse(raw);

  // Extract all unique ASINs from all articles
  const asinRegex = /amazon\.com\/dp\/([A-Z0-9]{10})/g;
  const allAsins = new Set();
  for (const a of articles) {
    let match;
    while ((match = asinRegex.exec(a.body)) !== null) {
      allAsins.add(match[1]);
    }
    asinRegex.lastIndex = 0;
  }

  console.log(`[product-refresh] Found ${allAsins.size} unique ASINs across ${articles.length} articles`);

  // Check each ASIN with rate limiting (1 request per 2 seconds to avoid blocks)
  const results = {};
  const asinArray = Array.from(allAsins);

  for (let i = 0; i < asinArray.length; i++) {
    const asin = asinArray[i];
    const status = await checkAsin(asin);
    results[asin] = status;

    if (status === 'dead') {
      console.log(`[product-refresh] DEAD: ${asin} (${ASIN_LOOKUP[asin]?.name || 'unknown'})`);
    } else if (status === 'uncertain') {
      // For uncertain, try a second check after a delay
      await new Promise(r => setTimeout(r, 3000));
      const retry = await checkAsin(asin);
      results[asin] = retry;
      if (retry === 'dead') {
        console.log(`[product-refresh] DEAD (retry): ${asin}`);
      }
    }

    // Rate limit: wait 1.5 seconds between checks
    if (i < asinArray.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }

    // Progress log every 10
    if ((i + 1) % 10 === 0) {
      console.log(`[product-refresh] Checked ${i + 1}/${asinArray.length} ASINs...`);
    }
  }

  const deadAsins = Object.entries(results)
    .filter(([, status]) => status === 'dead')
    .map(([asin]) => asin);

  const aliveAsins = Object.entries(results)
    .filter(([, status]) => status === 'alive')
    .map(([asin]) => asin);

  const uncertainAsins = Object.entries(results)
    .filter(([, status]) => status === 'uncertain')
    .map(([asin]) => asin);

  console.log(`[product-refresh] Results: ${aliveAsins.length} alive, ${deadAsins.length} dead, ${uncertainAsins.length} uncertain`);

  // If no dead ASINs, try to refresh titles for alive ones
  if (deadAsins.length === 0) {
    console.log('[product-refresh] No dead ASINs found. Checking for title updates on a sample...');

    // Sample 5 random ASINs to check for title changes
    const sample = aliveAsins.sort(() => Math.random() - 0.5).slice(0, 5);
    let titleUpdates = 0;

    for (const asin of sample) {
      await new Promise(r => setTimeout(r, 2000));
      const newTitle = await scrapeProductTitle(asin);
      if (newTitle && ASIN_LOOKUP[asin]) {
        const oldName = ASIN_LOOKUP[asin].name;
        // Only update if significantly different (not just minor Amazon formatting)
        if (newTitle.length > 10 && !newTitle.toLowerCase().includes('robot check')) {
          // Log the title for monitoring
          console.log(`[product-refresh] Title check: ${asin} -> "${newTitle.substring(0, 60)}..."`);
          titleUpdates++;
        }
      }
    }

    console.log(`[product-refresh] Checked ${sample.length} titles. ${titleUpdates} readable.`);
    console.log('[product-refresh] No replacements needed. Done.');
    return;
  }

  // Replace dead ASINs in articles
  let replacementCount = 0;
  let articlesModified = 0;

  for (const article of articles) {
    let modified = false;

    // Get all ASINs currently in this article
    const currentAsins = [];
    let match;
    while ((match = asinRegex.exec(article.body)) !== null) {
      currentAsins.push(match[1]);
    }
    asinRegex.lastIndex = 0;

    for (const deadAsin of deadAsins) {
      if (currentAsins.includes(deadAsin)) {
        const replacement = findReplacement(deadAsin, article.category, currentAsins);
        if (replacement) {
          article.body = replaceAsinInBody(article.body, deadAsin, replacement);
          // Update currentAsins to reflect the change
          const idx = currentAsins.indexOf(deadAsin);
          if (idx !== -1) currentAsins[idx] = replacement.asin;

          console.log(`[product-refresh] Article ${article.id}: Replaced ${deadAsin} (${ASIN_LOOKUP[deadAsin]?.name || 'unknown'}) -> ${replacement.asin} (${replacement.name})`);
          replacementCount++;
          modified = true;
        } else {
          console.warn(`[product-refresh] Article ${article.id}: No replacement found for dead ASIN ${deadAsin}`);
        }
      }
    }

    if (modified) articlesModified++;
  }

  console.log(`[product-refresh] Made ${replacementCount} replacements across ${articlesModified} articles`);

  // Verify all articles still have 3 Amazon links
  let underCount = 0;
  for (const article of articles) {
    const links = (article.body.match(/amazon\.com\/dp\/[A-Z0-9]{10}/g) || []).length;
    if (links < 3) {
      console.warn(`[product-refresh] WARNING: Article ${article.id} has only ${links} Amazon links after refresh`);
      underCount++;
    }
  }

  if (underCount > 0) {
    console.warn(`[product-refresh] ${underCount} articles have fewer than 3 Amazon links. Manual review needed.`);
  }

  // Save updated articles
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  console.log('[product-refresh] Saved updated articles.json');

  // Rebuild and push to GitHub
  if (GH_PAT && replacementCount > 0) {
    try {
      console.log('[product-refresh] Rebuilding...');
      execSync('pnpm build', { cwd: ROOT, timeout: 120000, stdio: 'pipe' });

      console.log('[product-refresh] Committing and pushing...');
      execSync('git add -A', { cwd: ROOT, stdio: 'pipe' });
      execSync(
        `git commit -m "Auto-refresh: replaced ${replacementCount} dead Amazon ASINs in ${articlesModified} articles"`,
        { cwd: ROOT, stdio: 'pipe' }
      );
      execSync(
        `git push https://${GH_PAT}@github.com/${GITHUB_REPO}.git main`,
        { cwd: ROOT, timeout: 60000, stdio: 'pipe' }
      );
      console.log('[product-refresh] Pushed to GitHub successfully');
    } catch (err) {
      console.error('[product-refresh] Git push failed:', err.message);
    }
  } else if (replacementCount === 0) {
    console.log('[product-refresh] No changes to push.');
  } else {
    console.log('[product-refresh] GH_PAT not set. Skipping git push.');
  }

  // Write a log file for monitoring
  const logEntry = {
    timestamp: new Date().toISOString(),
    totalAsins: allAsins.size,
    alive: aliveAsins.length,
    dead: deadAsins.length,
    uncertain: uncertainAsins.length,
    replacements: replacementCount,
    articlesModified,
    deadAsinDetails: deadAsins.map(a => ({
      asin: a,
      name: ASIN_LOOKUP[a]?.name || 'unknown',
    })),
  };

  const logPath = path.resolve(ROOT, 'product-refresh.log');
  const logLine = JSON.stringify(logEntry) + '\n';
  fs.appendFileSync(logPath, logLine);
  console.log(`[product-refresh] Log written to ${logPath}`);
  console.log('[product-refresh] Done.');
}

main().catch((err) => {
  console.error('[product-refresh] Fatal error:', err);
  process.exit(1);
});
