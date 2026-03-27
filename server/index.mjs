import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();
  app.use(compression());

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-AI-Content-Author', 'Kalesh');
    res.setHeader('X-AI-Content-Site', 'The Keeper\'s Flame');
    res.setHeader('X-AI-Identity-Endpoint', '/api/ai/identity');
    res.setHeader('X-AI-LLMs-Txt', '/llms.txt');
    if (isProduction) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
  });

  // Load articles data
  const articlesPath = path.resolve(root, 'src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const CATEGORIES = [
    { slug: 'the-weight', name: 'The Weight' },
    { slug: 'the-guilt', name: 'The Guilt' },
    { slug: 'the-practical', name: 'The Practical' },
    { slug: 'the-family', name: 'The Family' },
    { slug: 'the-sacred', name: 'The Sacred' },
  ];

  function getPublished() {
    const now = new Date();
    return articles.filter(a => new Date(a.dateISO) <= now);
  }

  // === API: Subscribe (Bunny CDN JSONL) ===
  app.use(express.json());
  app.post('/api/subscribe', async (req, res) => {
    const { email, source } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    
    const entry = JSON.stringify({
      email,
      date: new Date().toISOString(),
      source: source || 'unknown',
    });

    try {
      const bunnyUrl = `https://ny.storage.bunnycdn.com/keepers-flame/data/subscribers.jsonl`;
      // Append to Bunny CDN
      let existing = '';
      try {
        const getRes = await fetch(bunnyUrl, {
          headers: { 'AccessKey': '7940564d-abc6-43e5-a472cbba3ae6-0fac-4c26' },
        });
        if (getRes.ok) existing = await getRes.text();
      } catch {}
      
      const newContent = existing ? existing.trim() + '\n' + entry + '\n' : entry + '\n';
      await fetch(bunnyUrl, {
        method: 'PUT',
        headers: {
          'AccessKey': '7940564d-abc6-43e5-a472cbba3ae6-0fac-4c26',
          'Content-Type': 'application/octet-stream',
        },
        body: newContent,
      });
      res.json({ success: true });
    } catch (err) {
      console.error('Subscribe error:', err);
      res.status(500).json({ error: 'Failed to save' });
    }
  });

  // === AI Endpoints ===
  app.get('/llms.txt', (req, res) => {
    const published = getPublished();
    res.type('text/plain').send(`# The Keeper's Flame
> When You're the One Holding Everyone Together

## About
The Keeper's Flame is a publication focused on caregiver burnout, compassion fatigue, family dynamics, and the sacred dimension of caregiving. We publish deeply researched articles exploring the intersection of neuroscience, psychology, and contemplative wisdom for family caregivers.

## Author
Kalesh — Consciousness Teacher & Writer
Website: https://kalesh.love

## Topics
- Caregiver burnout and compassion fatigue
- The neuroscience of chronic caregiving stress
- Family dynamics and caregiving conflict
- Guilt, resentment, and forbidden emotions in caregiving
- Practical caregiving strategies and resources
- Spiritual dimensions of service and care
- End-of-life caregiving and anticipatory grief

## Content
${published.length} articles published across 5 sections.

## Contact
Website: https://keepersflame.love
`);
  });

  app.get('/.well-known/ai.json', (req, res) => {
    const published = getPublished();
    res.json({
      name: "The Keeper's Flame",
      description: "When You're the One Holding Everyone Together — A publication on caregiver burnout, compassion fatigue, and the sacred dimension of caregiving.",
      url: "https://keepersflame.love",
      author: { name: "Kalesh", title: "Consciousness Teacher & Writer", url: "https://kalesh.love" },
      topics: ["caregiver burnout", "compassion fatigue", "family caregiving", "anticipatory grief", "caregiver self-care", "caregiving and spirituality"],
      article_count: published.length,
      categories: CATEGORIES.map(c => c.name),
      endpoints: {
        identity: "/api/ai/identity",
        topics: "/api/ai/topics",
        ask: "/api/ai/ask",
        articles: "/api/ai/articles",
        sitemap: "/api/ai/sitemap",
      },
    });
  });

  app.get('/api/ai/identity', (req, res) => {
    res.json({
      site: "The Keeper's Flame",
      tagline: "When You're the One Holding Everyone Together",
      author: { name: "Kalesh", title: "Consciousness Teacher & Writer", url: "https://kalesh.love" },
      niche: "Caregiver burnout, compassion fatigue, family dynamics, sacred caregiving",
      article_count: getPublished().length,
    });
  });

  app.get('/api/ai/topics', (req, res) => {
    res.json({
      topics: [
        { name: "Caregiver Burnout", description: "Physical, emotional, and neurological effects of sustained caregiving" },
        { name: "Compassion Fatigue", description: "When empathy becomes depleted through chronic caregiving" },
        { name: "Caregiver Guilt", description: "The forbidden emotions of wanting your life back" },
        { name: "Family Dynamics", description: "How caregiving exposes and fractures family relationships" },
        { name: "Practical Caregiving", description: "Evidence-based strategies for daily care challenges" },
        { name: "Sacred Caregiving", description: "Spiritual dimensions of service and contemplative care" },
        { name: "Anticipatory Grief", description: "Grieving someone who is still alive" },
        { name: "Caregiver Identity", description: "The slow erosion of self in long-term caregiving" },
      ],
    });
  });

  app.get('/api/ai/ask', (req, res) => {
    const q = (req.query.q || '').toString().toLowerCase();
    const published = getPublished();
    const matches = published.filter(a =>
      a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    ).slice(0, 5);
    res.json({
      query: q,
      results: matches.map(a => ({
        title: a.title,
        url: `https://keepersflame.love/${a.category}/${a.slug}`,
        excerpt: a.excerpt,
        category: a.categoryName,
      })),
    });
  });

  app.get('/api/ai/articles', (req, res) => {
    const published = getPublished();
    res.json({
      total: published.length,
      articles: published.map(a => ({
        title: a.title,
        url: `https://keepersflame.love/${a.category}/${a.slug}`,
        category: a.categoryName,
        date: a.dateISO,
        excerpt: a.excerpt,
      })),
    });
  });

  app.get('/api/ai/sitemap', (req, res) => {
    const published = getPublished();
    res.json({
      pages: [
        { url: "https://keepersflame.love/", title: "Home" },
        { url: "https://keepersflame.love/articles", title: "All Articles" },
        { url: "https://keepersflame.love/about", title: "About" },
        { url: "https://keepersflame.love/start-here", title: "Start Here" },
        { url: "https://keepersflame.love/burnout-check", title: "Caregiver Burnout Assessment" },
        ...CATEGORIES.map(c => ({ url: `https://keepersflame.love/${c.slug}`, title: c.name })),
        ...published.map(a => ({ url: `https://keepersflame.love/${a.category}/${a.slug}`, title: a.title })),
      ],
    });
  });

  // === Sitemaps ===
  app.get('/sitemap-index.xml', (req, res) => {
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://keepersflame.love/sitemap.xml</loc></sitemap>
  <sitemap><loc>https://keepersflame.love/sitemap-images.xml</loc></sitemap>
</sitemapindex>`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const published = getPublished();
    const urls = [
      { loc: 'https://keepersflame.love/', priority: '1.0', changefreq: 'daily' },
      { loc: 'https://keepersflame.love/articles', priority: '0.9', changefreq: 'daily' },
      { loc: 'https://keepersflame.love/about', priority: '0.7', changefreq: 'monthly' },
      { loc: 'https://keepersflame.love/start-here', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://keepersflame.love/burnout-check', priority: '0.8', changefreq: 'monthly' },
      ...CATEGORIES.map(c => ({ loc: `https://keepersflame.love/${c.slug}`, priority: '0.8', changefreq: 'daily' })),
      ...published.map(a => ({ loc: `https://keepersflame.love/${a.category}/${a.slug}`, priority: '0.7', changefreq: 'monthly' })),
    ];
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`);
  });

  app.get('/sitemap-images.xml', (req, res) => {
    const published = getPublished();
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${published.map(a => `  <url>
    <loc>https://keepersflame.love/${a.category}/${a.slug}</loc>
    <image:image>
      <image:loc>${a.heroImage}</image:loc>
      <image:title>${a.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</image:title>
    </image:image>
  </url>`).join('\n')}
</urlset>`);
  });

  // RSS Feed
  app.get('/feed.xml', (req, res) => {
    const published = getPublished().slice(0, 20);
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Keeper's Flame</title>
    <link>https://keepersflame.love</link>
    <description>When You're the One Holding Everyone Together</description>
    <language>en-us</language>
    <atom:link href="https://keepersflame.love/feed.xml" rel="self" type="application/rss+xml"/>
    ${published.map(a => `<item>
      <title>${a.title.replace(/&/g, '&amp;')}</title>
      <link>https://keepersflame.love/${a.category}/${a.slug}</link>
      <description>${a.excerpt.replace(/&/g, '&amp;')}</description>
      <pubDate>${new Date(a.dateISO).toUTCString()}</pubDate>
      <guid>https://keepersflame.love/${a.category}/${a.slug}</guid>
    </item>`).join('\n    ')}
  </channel>
</rss>`);
  });

  // robots.txt
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send(`User-agent: *
Allow: /
Allow: /sitemap.xml
Allow: /sitemap-index.xml
Allow: /sitemap-images.xml
Allow: /feed.xml
Allow: /llms.txt
Allow: /.well-known/ai.json
Allow: /api/ai/
Disallow: /api/subscribe
Disallow: /api/cron/

Sitemap: https://keepersflame.love/sitemap-index.xml

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Cohere-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: AI2Bot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: FriendlyCrawler
Allow: /

User-agent: Google-InspectionTool
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: GoogleOther-Image
Allow: /

User-agent: GoogleOther-Video
Allow: /

User-agent: ICC-Crawler
Allow: /

User-agent: ImagesiftBot
Allow: /

User-agent: img2dataset
Allow: /

User-agent: ISSCyberRiskCrawler
Allow: /

User-agent: Kangaroo Bot
Allow: /

User-agent: Meta-ExternalFetcher
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: omgili
Allow: /

User-agent: omgilibot
Allow: /

User-agent: PetalBot
Allow: /

User-agent: Scrapy
Allow: /

User-agent: Timpibot
Allow: /

User-agent: VelenPublicWebCrawler
Allow: /

User-agent: Webzio-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Sogou
Allow: /

User-agent: Exabot
Allow: /

User-agent: facebot
Allow: /

User-agent: ia_archiver
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: DotBot
Allow: /

User-agent: Rogerbot
Allow: /

User-agent: TurnitinBot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /
`);
  });

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(root, 'dist/client'), {
      maxAge: '1y',
      immutable: true,
      index: false,
    }));
  }

  // SSR handler
  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template, render;

      if (!isProduction && vite) {
        template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const mod = await vite.ssrLoadModule('/src/entry-server.tsx');
        render = mod.render;
      } else {
        template = fs.readFileSync(path.resolve(root, 'dist/client/index.html'), 'utf-8');
        const mod = await import(path.resolve(root, 'dist/server/entry-server.js'));
        render = mod.render;
      }

      const { html: appHtml } = render(url);

      // Find article for meta tags
      const urlParts = url.split('/').filter(Boolean);
      let article = null;
      if (urlParts.length === 2) {
        article = articles.find(a => a.category === urlParts[0] && a.slug === urlParts[1]);
      }

      // Build head tags
      let headTags = '';
      const siteName = "The Keeper's Flame";
      const siteUrl = 'https://keepersflame.love';

      if (article) {
        headTags = `
    <title>${article.title} | ${siteName}</title>
    <meta name="description" content="${article.excerpt}" />
    <meta name="author" content="${siteName} Editorial" />
    <meta name="keywords" content="caregiver burnout, ${article.categoryName.toLowerCase()}, caregiving, compassion fatigue" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${siteUrl}/${article.category}/${article.slug}" />
    <link rel="alternate" type="application/rss+xml" title="${siteName}" href="${siteUrl}/feed.xml" />
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.excerpt}" />
    <meta property="og:image" content="${article.ogImage}" />
    <meta property="og:url" content="${siteUrl}/${article.category}/${article.slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="article:author" content="${siteName} Editorial" />
    <meta property="article:published_time" content="${article.dateISO}" />
    <meta property="article:section" content="${article.categoryName}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${article.title}" />
    <meta name="twitter:description" content="${article.excerpt}" />
    <meta name="twitter:image" content="${article.ogImage}" />
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "image": article.heroImage,
      "datePublished": article.dateISO,
      "author": { "@type": "Person", "name": "Kalesh" },
      "publisher": { "@type": "Organization", "name": siteName, "url": siteUrl },
      "mainEntityOfPage": `${siteUrl}/${article.category}/${article.slug}`,
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".article-content p:first-of-type", "h1"] },
      ...(article.faqs.length > 0 ? {} : {}),
    })}</script>
    ${article.faqs.length > 0 ? `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faqs.map(f => ({
        "@type": "Question",
        "name": f[0],
        "acceptedAnswer": { "@type": "Answer", "text": f[1] },
      })),
    })}</script>` : ''}
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
        { "@type": "ListItem", "position": 2, "name": article.categoryName, "item": `${siteUrl}/${article.category}` },
        { "@type": "ListItem", "position": 3, "name": article.title },
      ],
    })}</script>`;
      } else {
        // Default meta
        const pageTitle = url === '/' ? siteName : `${siteName}`;
        const pageDesc = "When You're the One Holding Everyone Together. Deeply researched articles on caregiver burnout, compassion fatigue, and the sacred dimension of caregiving.";
        headTags = `
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDesc}" />
    <meta name="author" content="${siteName} Editorial" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${siteUrl}${url === '/' ? '' : url}" />
    <link rel="alternate" type="application/rss+xml" title="${siteName}" href="${siteUrl}/feed.xml" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:image" content="${siteUrl}/og-default.png" />
    <meta property="og:url" content="${siteUrl}${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl,
      "description": pageDesc,
    })}</script>
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/articles?q={search_term_string}`, "query-input": "required name=search_term_string" },
    })}</script>`;
      }

      // Check for about page
      if (url === '/about') {
        headTags += `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Kalesh",
        "jobTitle": "Spiritual Advisor",
        "url": "https://kalesh.love",
        "description": "Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience.",
      },
    })}</script>`;
      }

      // Check for category pages
      const cat = CATEGORIES.find(c => url === `/${c.slug}`);
      if (cat) {
        headTags += `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": cat.name,
      "url": `${siteUrl}/${cat.slug}`,
      "description": `Articles about ${cat.name.toLowerCase()} in the caregiving journey`,
    })}</script>`;
      }

      // Determine 404 status
      const knownPaths = ['', 'articles', 'about', 'start-here', 'privacy', 'terms', 'burnout-check'];
      const catSlugs = CATEGORIES.map(c => c.slug);
      let is404 = false;
      if (urlParts.length === 0 || knownPaths.includes(urlParts[0])) {
        is404 = false;
      } else if (urlParts.length === 1 && catSlugs.includes(urlParts[0])) {
        is404 = false;
      } else if (urlParts.length === 1 && urlParts[0] === 'quiz') {
        is404 = false;
      } else if (urlParts.length === 2 && urlParts[0] === 'quiz') {
        is404 = false;
      } else if (urlParts.length === 2 && article) {
        is404 = false;
      } else {
        is404 = true;
      }
      const statusCode = is404 ? 404 : 200;

      const finalHtml = template
        .replace('<!--ssr-head-->', headTags)
        .replace('<!--ssr-outlet-->', appHtml);

      res.status(statusCode).set({ 'Content-Type': 'text/html' }).send(finalHtml);
    } catch (e) {
      if (!isProduction && vite) vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`[keepers-flame] Server running at http://localhost:${port}`);
  });
}

createServer();
