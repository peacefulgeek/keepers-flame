import { useParams } from 'react-router-dom';
import { getArticlesByCategory, CATEGORIES } from '../utils/articles';
import { ArticleCard } from '../components/ArticleCard';
import { NotFoundPage } from './NotFoundPage';
import { useState } from 'react';

export function CategoryPage() {
  const { category } = useParams();
  const cat = CATEGORIES.find(c => c.slug === category);
  const [page, setPage] = useState(1);
  const perPage = 20;

  if (!cat) return <NotFoundPage />;

  const articles = getArticlesByCategory(cat.slug);
  const totalPages = Math.ceil(articles.length / perPage);
  const pageArticles = articles.slice((page - 1) * perPage, page * perPage);
  const featured = pageArticles[0];
  const rest = pageArticles.slice(1);

  return (
    <div className="container">
      <div className="newspaper-banner" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <h1>{cat.name}</h1>
        <p className="date-line">{articles.length} articles in this section</p>
      </div>

      <div className="articles-listing">
        {featured && (
          <div className="articles-featured">
            <ArticleCard article={featured} size="large" />
          </div>
        )}
        <div className="articles-grid">
          {rest.map(a => (
            <ArticleCard key={a.id} article={a} size="compact" />
          ))}
        </div>
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
