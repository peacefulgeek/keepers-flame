import { useState } from 'react';
import { getPublishedArticles, CATEGORIES, getPublishedCount } from '../utils/articles';
import { ArticleCard } from '../components/ArticleCard';

export function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 20;

  const allArticles = getPublishedArticles();
  const count = getPublishedCount();
  const filtered = selectedCategory === 'all' ? allArticles : allArticles.filter(a => a.category === selectedCategory);
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageArticles = filtered.slice((page - 1) * perPage, page * perPage);
  const featured = pageArticles[0];
  const rest = pageArticles.slice(1);

  return (
    <div className="container">
      <div className="newspaper-banner" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <h1>All Articles</h1>
        <p className="date-line">{count} articles published across {CATEGORIES.length} sections</p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <button
          onClick={() => { setSelectedCategory('all'); setPage(1); }}
          style={{
            padding: '0.4rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            background: selectedCategory === 'all' ? 'var(--color-primary)' : 'white',
            color: selectedCategory === 'all' ? 'white' : 'var(--color-text)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.slug}
            onClick={() => { setSelectedCategory(c.slug); setPage(1); }}
            style={{
              padding: '0.4rem 1rem',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              background: selectedCategory === c.slug ? 'var(--color-primary)' : 'white',
              color: selectedCategory === c.slug ? 'white' : 'var(--color-text)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="articles-listing">
        {/* Featured */}
        {featured && (
          <div className="articles-featured">
            <ArticleCard article={featured} size="large" />
          </div>
        )}

        {/* Grid */}
        <div className="articles-grid">
          {rest.map(a => (
            <ArticleCard key={a.id} article={a} size="compact" />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(p => (
              <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
            ))}
            {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
          </div>
        )}
      </div>
    </div>
  );
}
