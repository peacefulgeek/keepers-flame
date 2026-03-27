import { Link } from 'react-router-dom';
import { getPublishedArticles, CATEGORIES, getPublishedCount } from '../utils/articles';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterForm } from '../components/NewsletterForm';

export function HomePage() {
  const articles = getPublishedArticles();
  const count = getPublishedCount();
  const featured = articles[0];
  const sidebarCards = articles.slice(1, 9);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container">
      {/* Newspaper Banner */}
      <div className="newspaper-banner">
        <h1>The Keeper's Flame</h1>
        <p className="date-line">{today} &middot; {count} Articles Published</p>
        <p style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic', color: '#6B4C3B', fontSize: '1.1rem', marginTop: '0.5rem' }}>You've been carrying them. Who's carrying you?</p>
      </div>

      {/* Hero Grid */}
      {featured && (
        <div className="home-hero-grid">
          <div className="home-featured">
            <ArticleCard article={featured} size="large" />
          </div>
          <div className="home-sidebar-cards">
            {sidebarCards.map(a => (
              <ArticleCard key={a.id} article={a} size="small" />
            ))}
          </div>
        </div>
      )}

      {/* Category Sections */}
      {CATEGORIES.map((cat, ci) => {
        const catArticles = articles.filter(a => a.category === cat.slug).slice(0, 3);
        if (catArticles.length === 0) return null;
        return (
          <div key={cat.slug}>
            {ci === 3 && <NewsletterForm source="homepage" />}
            <section className="category-section">
              <div className="category-section-header">
                <h2>{cat.name}</h2>
                <Link to={`/${cat.slug}`}>View All &rarr;</Link>
              </div>
              <div className="category-row">
                {catArticles.map(a => (
                  <ArticleCard key={a.id} article={a} size="small" />
                ))}
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
