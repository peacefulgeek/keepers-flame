import { Link } from 'react-router-dom';
import { Article, formatDate } from '../utils/articles';

interface Props {
  article: Article;
  size?: 'large' | 'small' | 'compact';
}

export function ArticleCard({ article, size = 'small' }: Props) {
  const url = `/${article.category}/${article.slug}`;

  if (size === 'compact') {
    return (
      <Link to={url} className="articles-compact">
        <img
          src={article.heroImage}
          alt={article.title}
          width={120}
          height={80}
          loading="lazy"
        />
        <div>
          <span className="card-category">{article.categoryName}</span>
          <h3 style={{ fontSize: '0.95rem', margin: '0.2rem 0', fontFamily: 'var(--font-headline)' }}>{article.title}</h3>
          <span style={{ fontSize: '0.75rem', color: '#6B4C3B' }}>{formatDate(article.publishDate)} &middot; {article.readingTime}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={url} className={`article-card ${size === 'large' ? 'article-card-large' : 'article-card-small'}`}>
      <img
        src={article.heroImage}
        alt={article.title}
        width={size === 'large' ? 600 : 300}
        height={size === 'large' ? 338 : 169}
        loading="lazy"
      />
      <span className="card-category">{article.categoryName}</span>
      {size === 'large' ? (
        <h2>{article.title}</h2>
      ) : (
        <h3>{article.title}</h3>
      )}
      <p className="card-excerpt">{article.excerpt}</p>
    </Link>
  );
}
