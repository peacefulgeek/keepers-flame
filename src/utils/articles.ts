import articlesData from '../data/articles.json';

export interface FAQ {
  0: string;
  1: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  publishDate: string | null;
  status: 'published' | 'queued';
  readingTime: string;
  body: string;
  faqs: FAQ[];
  faqCount: number;
  heroImage: string;
  ogImage: string;
  wordCount: number;
  queuePosition?: number;
  // Optional fields from original articles
  openerType?: string;
  backlinkType?: string;
  isChallengeConclusion?: boolean;
  imagePrompt?: string;
  linkType?: string;
  author?: string;
  authorUrl?: string;
}

export const CATEGORIES = [
  { slug: 'the-weight', name: 'The Weight' },
  { slug: 'the-guilt', name: 'The Guilt' },
  { slug: 'the-practical', name: 'The Practical' },
  { slug: 'the-family', name: 'The Family' },
  { slug: 'the-sacred', name: 'The Sacred' },
];

const allArticles: Article[] = articlesData as Article[];

export function filterPublished(articles: Article[] = allArticles): Article[] {
  return articles.filter(a => a.status === 'published' && a.publishDate);
}

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getPublishedArticles(): Article[] {
  return filterPublished().sort((a, b) => {
    // Sort by publishDate descending (newest first)
    if (!a.publishDate || !b.publishDate) return 0;
    return b.publishDate.localeCompare(a.publishDate);
  });
}

export function getArticleBySlug(slug: string): Article | undefined {
  // Allow viewing any article by slug (published or queued — for preview/SEO)
  // But only published articles appear in listings
  return allArticles.find(a => a.slug === slug);
}

export function getPublishedArticleBySlug(slug: string): Article | undefined {
  return filterPublished().find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return filterPublished()
    .filter(a => a.category === category)
    .sort((a, b) => {
      if (!a.publishDate || !b.publishDate) return 0;
      return b.publishDate.localeCompare(a.publishDate);
    });
}

export function getRelatedArticles(article: Article, count: number = 6): Article[] {
  const published = filterPublished().filter(a => a.id !== article.id);
  const sameCategory = published.filter(a => a.category === article.category);
  const otherCategory = published.filter(a => a.category !== article.category);
  const related = [...sameCategory.slice(0, Math.ceil(count / 2)), ...otherCategory.slice(0, Math.floor(count / 2))];
  return related.slice(0, count);
}

export function getSidebarArticles(article: Article): Article[] {
  return filterPublished()
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 4);
}

export function getPopularArticles(exclude?: Article): Article[] {
  return getPublishedArticles()
    .filter(a => exclude ? a.id !== exclude.id : true)
    .slice(0, 5);
}

export function getPublishedCount(): number {
  return filterPublished().length;
}

export function getQueuedCount(): number {
  return allArticles.filter(a => a.status === 'queued').length;
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
