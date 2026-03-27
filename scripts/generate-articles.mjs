// ─── FEATURE FLAG (stays in code — not a secret) ───
const AUTO_GEN_ENABLED = false; // Wildman flips to true on GitHub when ready

// ─── FROM RENDER ENV VARS (auto-revoked if found in code) ───
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FAL_KEY = process.env.FAL_API_KEY;
const GH_PAT = process.env.GH_PAT;

// ─── HARDCODED (Bunny is safe in code) ───
const BUNNY_STORAGE_ZONE = "keepers-flame";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "7940564d-abc6-43e5-a472cbba3ae6-0fac-4c26";
const BUNNY_CDN_BASE = "https://keepers-flame.b-cdn.net";
const GITHUB_REPO = "peacefulgeek/keepers-flame";
const SITE_DOMAIN = "https://keepersflame.love";
const SITE_NAME = "The Keeper's Flame";
const AUTHOR_NAME = "Kalesh";
const AUTHOR_TITLE = "Consciousness Teacher & Writer";
const AUTHOR_URL = "https://kalesh.love";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.resolve(ROOT, 'src/data/articles.json');

const CATEGORIES = [
  { slug: "the-weight", name: "The Weight" },
  { slug: "the-guilt", name: "The Guilt" },
  { slug: "the-practical", name: "The Practical" },
  { slug: "the-family", name: "The Family" },
  { slug: "the-sacred", name: "The Sacred" },
];

const EXTERNAL_AUTHORITY_SITES = [
  "https://www.caregiver.org",
  "https://www.aarp.org/caregiving",
  "https://www.nia.nih.gov",
  "https://www.apa.org",
  "https://www.alz.org",
  "https://www.mayoclinic.org",
  "https://www.ncbi.nlm.nih.gov",
  "https://www.nami.org",
];

const KALESH_PHRASES = [
  "The mind is not the enemy. The identification with it is.",
  "Most of what passes for healing is just rearranging the furniture in a burning house.",
  "Awareness doesn't need to be cultivated. It needs to be uncovered.",
  "The nervous system doesn't respond to what you believe. It responds to what it senses.",
  "You cannot think your way into a felt sense of safety. The body has its own logic.",
  "Every resistance is information. The question is whether you're willing to read it.",
  "The gap between stimulus and response is where your entire life lives.",
  "Consciousness doesn't arrive. It's what's left when everything else quiets down.",
  "There is no version of growth that doesn't involve the dissolution of something you thought was permanent.",
  "Trauma reorganizes perception. Recovery reorganizes it again, but this time with your participation.",
  "Embodiment is not a technique. It's what happens when you stop living exclusively in your head.",
  "Most people don't fear change. They fear the gap between who they were and who they haven't become yet.",
  "Attention is the most undervalued resource you have. Everything else follows from where you place it.",
  "Sit with it long enough and even the worst feeling reveals its edges.",
  "The body remembers what the mind would prefer to file away.",
  "The paradox of acceptance is that nothing changes until you stop demanding that it does.",
  "Information without integration is just intellectual hoarding.",
  "Your nervous system doesn't care about your philosophy. It cares about what happened at three years old.",
  "Not every insight requires action. Some just need to be witnessed.",
  "You are not a problem to be solved. You are a process to be witnessed.",
];

async function main() {
  if (!AUTO_GEN_ENABLED) {
    console.log('[generate] AUTO_GEN_ENABLED is false. Exiting.');
    process.exit(0);
  }

  if (!ANTHROPIC_API_KEY || !FAL_KEY || !GH_PAT) {
    console.error('[generate] Missing required env vars. Exiting.');
    process.exit(1);
  }

  console.log('[generate] Starting article generation...');

  // Load existing articles
  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const existingCount = articles.length;
  console.log(`[generate] ${existingCount} existing articles.`);

  // Pick category (round-robin)
  const categoryCounts = {};
  for (const cat of CATEGORIES) categoryCounts[cat.slug] = 0;
  for (const a of articles) categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  const minCat = CATEGORIES.reduce((a, b) => (categoryCounts[a.slug] || 0) <= (categoryCounts[b.slug] || 0) ? a : b);

  // Determine backlink type
  const rand = Math.random();
  const backlinkType = rand < 0.23 ? 'kalesh' : rand < 0.65 ? 'external' : 'internal';

  // Pick FAQ count
  const faqRand = Math.random();
  const faqCount = faqRand < 0.10 ? 0 : faqRand < 0.40 ? 2 : faqRand < 0.70 ? 3 : faqRand < 0.90 ? 4 : 5;

  // Pick opener type
  const openerTypes = ['scene-setting', 'provocation', 'first-person', 'question', 'named-reference', 'gut-punch'];
  const openerType = openerTypes[Math.floor(Math.random() * openerTypes.length)];

  // Pick phrases (3-5 random)
  const phraseCount = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...KALESH_PHRASES].sort(() => Math.random() - 0.5);
  const selectedPhrases = shuffled.slice(0, phraseCount);

  // Pick existing articles for internal links
  const internalLinks = articles
    .filter(a => a.category !== minCat.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(a => ({ title: a.title, url: `/${a.category}/${a.slug}` }));

  // Build Claude prompt
  const systemPrompt = `You are writing for ${SITE_NAME} (${SITE_DOMAIN}). Author identity: ${AUTHOR_NAME} — ${AUTHOR_TITLE}. Write in Kalesh's voice: long, unfolding sentences that build and turn, average 18-28 words. 3-4 flowing sentences before dropping a short one. Intellectual warmth, contemplative, cross-traditional. References Buddhism, Taoism, Vedanta, and neuroscience equally. Uses em-dashes, triads, questions that open rather than close. 30% spiritual/healing threads woven into all content.`;

  const userPrompt = `Write a 2,500-2,800 word article for the "${minCat.name}" section about caregiver burnout.

REQUIREMENTS:
- Opener type: ${openerType}
- Include 1-2 first-person lived experience markers
- Include at least 1 named researcher reference (Pauline Boss, Barry Jacobs, Christina Maslach, Gabor Maté, Bessel van der Kolk, Stephen Porges, Tara Brach, Alan Watts, etc.)
- ${faqCount} FAQ Q&A pairs at the end (or none if 0)
- Backlink type: ${backlinkType}
${backlinkType === 'kalesh' ? `- Include 1 link to ${AUTHOR_URL} with topically relevant anchor text` : ''}
${backlinkType === 'external' ? `- Include 1 external link with rel="nofollow" to one of: ${EXTERNAL_AUTHORITY_SITES.join(', ')}` : ''}
- Include 3-5 internal cross-links using these: ${internalLinks.map(l => `<a href="${l.url}">${l.title}</a>`).join(', ')}
- Weave in these Kalesh voice phrases naturally: ${selectedPhrases.map(p => `"${p}"`).join('; ')}
- Zero "this is where" transitions
- Zero generic phrases (manifest, lean into, authentic self, safe space, hold space, sacred container, raise your vibration)
- All links as HTML <a href> tags, NOT markdown
- Include a medical/mental health disclaimer at the end
- Output as HTML (p, h2, blockquote, a tags only)

Return JSON: { "title": "...", "excerpt": "...", "body": "...", "faqs": [["Q","A"],...] }`;

  try {
    // Call Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    
    const article = JSON.parse(jsonMatch[0]);
    const slug = article.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Generate image via FAL.ai
    const imagePrompt = `Painterly watercolor editorial illustration for '${article.title}': warm golden light, tender caregiving scene, luminous amber and cream tones. No text, no words, no watermarks.`;
    
    const falResponse = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${FAL_KEY}`,
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        image_size: { width: 1200, height: 675 },
        num_images: 1,
      }),
    });

    let heroImage = `${BUNNY_CDN_BASE}/images/default-hero.webp`;
    let ogImage = `${BUNNY_CDN_BASE}/images/default-og.webp`;

    if (falResponse.ok) {
      const falData = await falResponse.json();
      const imageUrl = falData.images[0].url;
      
      // Download and upload to Bunny
      const imgResponse = await fetch(imageUrl);
      const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());
      
      // Upload hero
      const heroPath = `images/hero/${slug}.webp`;
      await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${heroPath}`, {
        method: 'PUT',
        headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
        body: imgBuffer,
      });
      heroImage = `${BUNNY_CDN_BASE}/${heroPath}`;

      // Upload OG
      const ogPath = `images/og/${slug}.webp`;
      await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${ogPath}`, {
        method: 'PUT',
        headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
        body: imgBuffer,
      });
      ogImage = `${BUNNY_CDN_BASE}/${ogPath}`;
    }

    // Build article object
    const newArticle = {
      id: existingCount + 1,
      slug,
      title: article.title,
      excerpt: article.excerpt,
      category: minCat.slug,
      categoryName: minCat.name,
      dateISO: new Date().toISOString(),
      readingTime: Math.ceil(article.body.split(/\s+/).length / 250),
      body: article.body,
      faqs: article.faqs || [],
      faqCount: faqCount,
      openerType,
      backlinkType,
      isChallengeConclusion: Math.random() < 0.3,
      imagePrompt,
      heroImage,
      ogImage,
      wordCount: article.body.split(/\s+/).length,
    };

    articles.push(newArticle);
    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
    console.log(`[generate] Created: "${newArticle.title}" in ${minCat.name}`);

    // Push to GitHub
    const { execSync } = await import('child_process');
    execSync(`cd ${ROOT} && git add -A && git commit -m "Auto-gen: ${newArticle.title}" && git push`, {
      env: { ...process.env, GIT_AUTHOR_NAME: 'Auto-Gen', GIT_AUTHOR_EMAIL: 'auto@keepersflame.love', GIT_COMMITTER_NAME: 'Auto-Gen', GIT_COMMITTER_EMAIL: 'auto@keepersflame.love' },
      stdio: 'inherit',
    });

    console.log('[generate] Pushed to GitHub.');
  } catch (err) {
    console.error('[generate] Error:', err.message);
    process.exit(1);
  }
}

main();
