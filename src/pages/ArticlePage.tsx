import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug, getRelatedArticles, getSidebarArticles, getPopularArticles, formatDate } from '../utils/articles';
import { ArticleCard } from '../components/ArticleCard';
import { NotFoundPage } from './NotFoundPage';

export function ArticlePage() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <NotFoundPage />;

  const related = getRelatedArticles(article, 6);
  const sidebarArticles = getSidebarArticles(article);
  const popular = getPopularArticles(article);

  // Extract H2s for ToC
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  let match;
  const toc: { id: string; text: string }[] = [];
  let bodyWithIds = article.body;
  let tocIdx = 0;
  while ((match = h2Regex.exec(article.body)) !== null) {
    const id = `section-${tocIdx}`;
    const text = match[1];
    toc.push({ id, text });
    bodyWithIds = bodyWithIds.replace(match[0], `<h2 id="${id}">${text}</h2>`);
    tocIdx++;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(article.title);

  return (
    <div className="container">
      <div className="article-layout">
        {/* Left: Table of Contents */}
        <aside className="article-toc">
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B4C3B', marginBottom: '0.5rem' }}>Contents</h4>
          <ol>
            {toc.map((item, i) => (
              <li key={i}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Center: Article Body */}
        <article className="article-body-col">
          <img
            src={article.heroImage}
            alt={article.title}
            className="hero-image"
            width={1200}
            height={675}
          />
          <h1>{article.title}</h1>
          <div className="article-meta">
            <Link to={`/${article.category}`} className="category-badge">{article.categoryName}</Link>
            <span>{formatDate(article.dateISO)}</span>
            <span>{article.readingTime} min read</span>
          </div>

          {/* Share buttons top */}
          <div className="share-buttons">
            <button className="share-btn" onClick={() => navigator.clipboard?.writeText(shareUrl)} aria-label="Copy link to clipboard">Copy Link</button>
            <a className="share-btn" href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="nofollow noopener" aria-label="Share on X (Twitter)">X / Twitter</a>
            <a className="share-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="nofollow noopener" aria-label="Share on Facebook">Facebook</a>
          </div>

          <div className="article-content" dangerouslySetInnerHTML={{ __html: bodyWithIds }} />

          {/* FAQ Section */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              {article.faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-question">{faq[0]}</div>
                  <div className="faq-answer">{faq[1]}</div>
                </div>
              ))}
            </section>
          )}

          {/* Related Coverage */}
          <section className="related-coverage">
            <h2>Related Coverage</h2>
            <div className="related-grid">
              {related.map(a => (
                <ArticleCard key={a.id} article={a} size="small" />
              ))}
            </div>
          </section>
        </article>

        {/* Right: Sidebar */}
        <aside className="article-sidebar">
          {/* Bio Card */}
          <div className="bio-card">
            <img src="https://keepers-flame.b-cdn.net/images/kalesh-portrait.webp" alt="Kalesh" width={80} height={80} loading="lazy" />
            <h4>Kalesh</h4>
            <div className="bio-title">Consciousness Teacher &amp; Writer</div>
            <p>Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness.</p>
            <a href="https://kalesh.love" className="bio-link">Visit Kalesh's Website</a>
          </div>

          {/* Same Category */}
          <div className="sidebar-section">
            <h4>More in {article.categoryName}</h4>
            {sidebarArticles.map(a => (
              <Link key={a.id} to={`/${a.category}/${a.slug}`} className="sidebar-article">
                <img src={a.heroImage} alt={a.title} width={70} height={50} loading="lazy" />
                <span>{a.title}</span>
              </Link>
            ))}
          </div>

          {/* Popular */}
          <div className="sidebar-section" style={{ marginTop: '1.5rem' }}>
            <h4>Popular Articles</h4>
            {popular.map(a => (
              <Link key={a.id} to={`/${a.category}/${a.slug}`} className="sidebar-article">
                <img src={a.heroImage} alt={a.title} width={70} height={50} loading="lazy" />
                <span>{a.title}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
