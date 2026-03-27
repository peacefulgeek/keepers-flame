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
  dateISO: string;
  readingTime: number;
  body: string;
  faqs: FAQ[];
  faqCount: number;
  openerType: string;
  backlinkType: string;
  isChallengeConclusion: boolean;
  imagePrompt: string;
  heroImage: string;
  ogImage: string;
  wordCount: number;
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
  const now = new Date();
  return articles.filter(a => new Date(a.dateISO) <= now);
}

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getPublishedArticles(): Article[] {
  return filterPublished();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return filterPublished().filter(a => a.category === category);
}

export function getRelatedArticles(article: Article, count: number = 6): Article[] {
  const published = filterPublished();
  const sameCategory = published.filter(a => a.category === article.category && a.id !== article.id);
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
  return filterPublished()
    .filter(a => exclude ? a.id !== exclude.id : true)
    .slice(0, 5);
}

export function getPublishedCount(): number {
  return filterPublished().length;
}

export function formatDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
