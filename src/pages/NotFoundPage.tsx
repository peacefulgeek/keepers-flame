import { Link } from 'react-router-dom';
import { getPublishedArticles } from '../utils/articles';

export function NotFoundPage() {
  const articles = getPublishedArticles().slice(0, 6);
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container">
      <div className="page-404">
        <h1>PAGE NOT FOUND</h1>
        <p className="edition">Edition [404] &middot; {today}</p>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
          The page you are looking for does not exist — but you are exactly where you need to be. Sometimes getting lost is the first step toward finding what you actually need.
        </p>
        <Link to="/" style={{ display: 'inline-block', padding: '0.6rem 1.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2rem' }}>Return Home</Link>
      </div>

      <div style={{ borderTop: '2px solid var(--color-text)', paddingTop: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1.1rem', letterSpacing: '0.05em' }}>While You Are Here</h2>
        <div className="related-grid">
          {articles.map(a => (
            <Link key={a.id} to={`/${a.category}/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={a.heroImage} alt={a.title} width={300} height={169} loading="lazy" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '4px' }} />
              <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', margin: '0.5rem 0 0.2rem' }}>{a.categoryName}</span>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-headline)' }}>{a.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
