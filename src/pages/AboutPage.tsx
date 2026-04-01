import { Link } from 'react-router-dom';
import { getPublishedCount } from '../utils/articles';

export function AboutPage() {
  const count = getPublishedCount();

  return (
    <div className="container">
      <div className="about-page">
        <h1>About The Keeper's Flame</h1>

        <p>The Keeper's Flame exists for the people who hold everything together — and have no one holding them. We publish deeply researched, emotionally honest articles about caregiver burnout, compassion fatigue, family dynamics, and the sacred dimension of caring for someone you love through decline.</p>

        <p>With {count} articles published and growing, we cover five essential dimensions of the caregiving experience: the physical and emotional weight, the guilt that accompanies every decision, the practical challenges of daily care, the family dynamics that caregiving exposes, and the sacred dimension of service that can sustain you when nothing else does.</p>

        <h2>Our Approach</h2>

        <p>We do not offer easy answers because caregiving does not have easy answers. What we offer is honest, research-backed writing that names what you are experiencing, validates what you are feeling, and provides practical guidance grounded in both science and contemplative wisdom. We believe that the intersection of modern neuroscience and ancient contemplative traditions offers the most complete framework for understanding — and surviving — the caregiving journey.</p>

        <h2>About the Author</h2>

        {/* Kalesh Author Card */}
        <div className="advisor-card">
          <img src="https://keepers-flame.b-cdn.net/images/kalesh-portrait.webp" alt="Kalesh — Consciousness Teacher and Writer" width={120} height={120} loading="lazy" style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h3 style={{ margin: '0 0 0.25rem' }}>Kalesh</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Consciousness Teacher &amp; Writer</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness — not as a concept to understand, but as a lived reality to inhabit.</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>His writing draws on the research of neuroscientists like Andrew Huberman and Matthew Walker, contemplative teachers like Thich Nhat Hanh and Pema Chödrön, and the practical wisdom of caregiving researchers like Pauline Boss and Barry Jacobs. The result is a body of work that speaks to both the science and the soul of the caregiving experience.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://kalesh.love" style={{ color: 'var(--color-primary)', fontWeight: 600 }} target="_blank" rel="noopener">Visit Kalesh's Website</a>
              <a href="https://kalesh.love" style={{ color: 'var(--color-accent)', fontWeight: 600 }} target="_blank" rel="noopener">Book a Session</a>
            </div>
          </div>
        </div>

        <h2>For New Readers</h2>

        <p>If you are new here, we recommend starting with our <Link to="/start-here">Start Here</Link> page, which curates our most essential articles across all five sections. You can also take our <Link to="/burnout-check">Caregiver Burnout Assessment</Link> to get a clear picture of where you are right now, or explore our <Link to="/quizzes">interactive quizzes</Link> and <Link to="/assessments">in-depth assessments</Link> for deeper self-reflection.</p>

        <h2>Tools &amp; Resources</h2>

        <p>We maintain a curated <Link to="/tools">Caregiver's Toolkit</Link> of books, journals, body support tools, and practical caregiving products that we genuinely trust. Some links are affiliate links — we may earn a small commission at no extra cost to you.</p>
      </div>
    </div>
  );
}
