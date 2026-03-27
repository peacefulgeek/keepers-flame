import { getPublishedCount } from '../utils/articles';

export function AboutPage() {
  const count = getPublishedCount();

  return (
    <div className="container">
      <div className="about-page">
        <h1>About The Keeper's Flame</h1>

        <p>The Keeper's Flame exists for the people who hold everything together — and have no one holding them. We publish deeply researched, emotionally honest articles about caregiver burnout, compassion fatigue, family dynamics, and the sacred dimension of caring for someone you love through decline.</p>

        <p>Our editorial team brings together expertise in neuroscience, psychology, contemplative practice, and the lived reality of caregiving. Every article is written with the understanding that caregivers are not looking for platitudes — they are looking for someone who understands what 3 AM feels like when the monitor beeps and you have not slept in days.</p>

        <p>With {count} articles published and growing, we cover five essential dimensions of the caregiving experience: the physical and emotional weight, the guilt that accompanies every decision, the practical challenges of daily care, the family dynamics that caregiving exposes, and the sacred dimension of service that can sustain you when nothing else does.</p>

        <h2>Our Approach</h2>

        <p>We do not offer easy answers because caregiving does not have easy answers. What we offer is honest, research-backed writing that names what you are experiencing, validates what you are feeling, and provides practical guidance grounded in both science and contemplative wisdom. We believe that the intersection of modern neuroscience and ancient contemplative traditions offers the most complete framework for understanding — and surviving — the caregiving journey.</p>

        <h2>For New Readers</h2>

        <p>If you are new here, we recommend starting with our <a href="/start-here">Start Here</a> page, which curates our most essential articles across all five sections. You can also take our <a href="/burnout-check">Caregiver Burnout Assessment</a> to get a clear picture of where you are right now.</p>

        {/* Kalesh Advisor Card */}
        <div className="advisor-card">
          <img src="https://keepers-flame.b-cdn.net/images/kalesh-portrait.webp" alt="Kalesh" width={100} height={100} loading="lazy" />
          <div>
            <h3 style={{ margin: '0 0 0.25rem' }}>Kalesh</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Spiritual Advisor</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness.</p>
            <a href="https://kalesh.love" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Visit Kalesh's Website</a>
          </div>
        </div>
      </div>
    </div>
  );
}
