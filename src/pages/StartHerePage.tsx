import { Link } from 'react-router-dom';
import { getPublishedArticles, CATEGORIES } from '../utils/articles';

export function StartHerePage() {
  const articles = getPublishedArticles();
  
  // Pick one pillar article per category (first published in each)
  const pillars = CATEGORIES.map(cat => {
    return articles.find(a => a.category === cat.slug);
  }).filter(Boolean);

  return (
    <div className="container">
      <div className="start-here">
        <h1>Start Here</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          If you are new to The Keeper's Flame, these articles are the best place to begin. Each one represents a core dimension of the caregiving experience — the weight you carry, the guilt you feel, the practical challenges you face, the family dynamics you navigate, and the sacred dimension that can sustain you through all of it.
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
          Read them in any order. There is no wrong place to start. The fact that you are here means you are already doing the most important thing — acknowledging that you matter too.
        </p>

        {pillars.map(article => article && (
          <Link key={article.id} to={`/${article.category}/${article.slug}`} className="pillar-card">
            <img src={article.heroImage} alt={article.title} width={150} height={100} loading="lazy" />
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.08em' }}>{article.categoryName}</span>
              <h3 style={{ fontSize: '1.1rem', margin: '0.25rem 0' }}>{article.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', margin: 0 }}>{article.excerpt}</p>
            </div>
          </Link>
        ))}

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-secondary)', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Take the Burnout Assessment</h3>
          <p style={{ marginBottom: '1rem' }}>Not sure where you are? Our 12-question assessment gives you a compassionate, honest picture of your current state — and points you toward the articles that will help most.</p>
          <Link to="/burnout-check" style={{ display: 'inline-block', padding: '0.6rem 1.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Take the Assessment</Link>
        </div>
      </div>
    </div>
  );
}
