import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CATEGORIES, getPublishedCount } from '../utils/articles';
import { NewsletterForm } from './NewsletterForm';

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cookieAccepted, setCookieAccepted] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) setCookieAccepted(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setCookieAccepted(true);
  };

  const count = getPublishedCount();

  return (
    <>
      {/* Mobile Nav Overlay */}
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
      
      {/* Mobile Nav */}
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '2rem' }}>
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/articles" onClick={() => setMobileOpen(false)}>Articles</Link>
        {CATEGORIES.map(c => (
          <Link key={c.slug} to={`/${c.slug}`} onClick={() => setMobileOpen(false)}>{c.name}</Link>
        ))}
        <Link to="/tools" onClick={() => setMobileOpen(false)}>Tools We Recommend</Link>
        <Link to="/start-here" onClick={() => setMobileOpen(false)}>Start Here</Link>
        <Link to="/quizzes" onClick={() => setMobileOpen(false)}>Quizzes</Link>
        <Link to="/assessments" onClick={() => setMobileOpen(false)}>Assessments</Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link to="/burnout-check" onClick={() => setMobileOpen(false)}>Burnout Check</Link>
      </nav>

      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
          <Link to="/" className="site-name">The Keeper's Flame</Link>
          <nav className="header-nav">
            <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B4C3B', fontFamily: 'var(--font-body)' }} aria-label="Search articles">Search</button>
            <Link to="/articles">Sections</Link>
            <Link to="/tools">Tools</Link>
            <Link to="/start-here">Start Here</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={e => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
              aria-label="Search articles"
            />
            {searchQuery.length > 2 && (
              <div className="search-results">
                <p style={{ fontSize: '0.85rem', color: '#6B4C3B' }}>Search functionality active. Browse our {count} published articles.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>The Keeper's Flame</h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>When You're the One Holding Everyone Together</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>{count} articles published</p>
          </div>
          <div className="footer-col">
            <h4>Sections</h4>
            {CATEGORIES.map(c => (
              <Link key={c.slug} to={`/${c.slug}`}>{c.name}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/start-here">Start Here</Link>
            <Link to="/tools">Tools We Recommend</Link>
            <Link to="/quizzes">Quizzes</Link>
            <Link to="/assessments">Assessments</Link>
            <Link to="/burnout-check">Burnout Assessment</Link>
            <Link to="/articles">All Articles</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Keeper's Flame. All rights reserved.</p>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>As an Amazon Associate I earn from qualifying purchases.</p>
        </div>
      </footer>

      {/* Cookie Consent */}
      {!cookieAccepted && (
        <div className="cookie-banner">
          <p>We use cookies to improve your experience. By continuing to use this site, you consent to our use of cookies as described in our <Link to="/privacy" style={{ color: '#D4A017' }}>Privacy Policy</Link>.</p>
          <button onClick={acceptCookies}>Accept</button>
        </div>
      )}
    </>
  );
}
