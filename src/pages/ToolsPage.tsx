import { Link } from 'react-router-dom';

const TOOLS_CATEGORIES = [
  {
    name: 'Books That Actually Help',
    products: [
      { title: 'The Body Keeps the Score by Bessel van der Kolk', url: 'https://www.amazon.com/dp/0143127748?tag=spankyspinola-20', desc: 'If you read one book on how stress lives in the body, make it this one. Van der Kolk\'s research changed how the world understands trauma — and it applies directly to caregivers carrying years of accumulated tension.', isAmazon: true },
      { title: 'When Things Fall Apart by Pema Chödrön', url: 'https://www.amazon.com/dp/1611803438?tag=spankyspinola-20', desc: 'Pema Chödrön doesn\'t offer easy answers. She offers something better — the permission to stop pretending everything is fine. Essential reading for anyone in the thick of caregiving.', isAmazon: true },
      { title: 'Burnout: The Secret to Unlocking the Stress Cycle by Emily & Amelia Nagoski', url: 'https://www.amazon.com/dp/1984818325?tag=spankyspinola-20', desc: 'The Nagoski sisters explain why you can remove the stressor and still feel stressed. The concept of completing the stress cycle is something every caregiver needs to understand.', isAmazon: true },
      { title: 'It\'s OK That You\'re Not OK by Megan Devine', url: 'https://www.amazon.com/dp/1622039076?tag=spankyspinola-20', desc: 'The most honest book on grief I\'ve encountered. Megan Devine doesn\'t try to fix your pain — she sits with it. For caregivers experiencing anticipatory grief, this is a lifeline.', isAmazon: true },
      { title: 'Set Boundaries, Find Peace by Nedra Glover Tawwab', url: 'https://www.amazon.com/dp/0593192095?tag=spankyspinola-20', desc: 'Boundaries aren\'t selfish — they\'re survival. Tawwab writes with clarity about the guilt that comes with saying no, especially when someone you love needs you.', isAmazon: true },
      { title: 'Being Mortal by Atul Gawande', url: 'https://www.amazon.com/dp/1250076226?tag=spankyspinola-20', desc: 'Gawande writes about what medicine can and cannot do at the end of life. For caregivers navigating medical decisions, this book provides the framework your doctor probably won\'t.', isAmazon: true },
      { title: 'Man\'s Search for Meaning by Viktor Frankl', url: 'https://www.amazon.com/dp/0807014273?tag=spankyspinola-20', desc: 'Frankl\'s insight that meaning can be found even in suffering is not a platitude — it\'s a practice. We wrote about this in our guide to <a href="/the-sacred/caregiving-as-a-spiritual-practice">caregiving as a spiritual practice</a>.', isAmazon: true },
    ]
  },
  {
    name: 'Journals & Workbooks',
    products: [
      { title: 'The Caregiver\'s Journal', url: 'https://www.amazon.com/dp/B0BSHCVKP6?tag=spankyspinola-20', desc: 'A journal designed specifically for caregivers — with prompts that actually understand what you\'re going through. Not generic self-help. Real space for real feelings.', isAmazon: true },
      { title: 'Caregiver Daily Log Book', url: 'https://www.amazon.com/dp/B0BN1HPWQH?tag=spankyspinola-20', desc: 'Track medications, symptoms, appointments, and daily observations in one place. When you\'re managing someone else\'s health, having a system matters more than memory.', isAmazon: true },
      { title: 'The Five Minute Journal', url: 'https://www.amazon.com/dp/0991846206?tag=spankyspinola-20', desc: 'Five minutes in the morning, five at night. It won\'t solve your problems, but it will shift your attention — and as Kalesh often says, attention is the most undervalued resource we have.', isAmazon: true },
      { title: 'Caregiver Organizer Binder', url: 'https://www.amazon.com/dp/B09NRGPYTL?tag=spankyspinola-20', desc: 'Medical records, insurance documents, emergency contacts, medication lists — all in one binder. The kind of practical tool that saves you at 2 AM when the ER asks questions you can\'t remember.', isAmazon: true },
    ]
  },
  {
    name: 'Body & Nervous System Support',
    products: [
      { title: 'Magnesium Glycinate by Doctor\'s Best', url: 'https://www.amazon.com/dp/B000BD0RT0?tag=spankyspinola-20', desc: 'Magnesium glycinate is one of the most bioavailable forms and supports sleep quality and nervous system regulation. Many caregivers are chronically depleted without knowing it.', isAmazon: true },
      { title: 'Weighted Blanket (15 lbs)', url: 'https://www.amazon.com/dp/B07H2517CF?tag=spankyspinola-20', desc: 'The deep pressure stimulation from a weighted blanket activates the parasympathetic nervous system. It\'s not a cure — it\'s a tool. And on the hardest nights, tools matter.', isAmazon: true },
      { title: 'Calm Strips Sensory Stickers', url: 'https://www.amazon.com/dp/B08YRWT5LH?tag=spankyspinola-20', desc: 'These textured stickers give your hands something to do during anxious moments. Stick them on your phone, laptop, or steering wheel. Small intervention, real effect.', isAmazon: true },
      { title: 'Aromatherapy Essential Oil Set', url: 'https://www.amazon.com/dp/B07BFNPC5N?tag=spankyspinola-20', desc: 'Lavender, eucalyptus, peppermint — scent is one of the fastest pathways to the limbic system. A few drops on your pillow can shift the nervous system more than you\'d expect.', isAmazon: true },
      { title: 'Yoga Mat (Extra Thick)', url: 'https://www.amazon.com/dp/B01LP0V3JO?tag=spankyspinola-20', desc: 'You don\'t need a yoga practice. You need a place to lie down on the floor and breathe. An extra-thick mat makes that possible without hurting your back.', isAmazon: true },
    ]
  },
  {
    name: 'Practical Caregiving Tools',
    products: [
      { title: 'Medical Alert System', url: 'https://www.amazon.com/dp/B07PMSYQWP?tag=spankyspinola-20', desc: 'Peace of mind when you can\'t be in the room. A medical alert system doesn\'t replace your presence — it extends it. We discuss this in our article on <a href="/the-practical/technology-tools-that-actually-help-caregivers">technology tools that actually help</a>.', isAmazon: true },
      { title: 'Pill Organizer (Weekly AM/PM)', url: 'https://www.amazon.com/dp/B09KGFHG1V?tag=spankyspinola-20', desc: 'Medication errors are one of the most common caregiver stressors. A simple weekly organizer with AM/PM compartments eliminates the daily question of "did they take it?"', isAmazon: true },
      { title: 'Non-Slip Bath Mat', url: 'https://www.amazon.com/dp/B07FMGZ1FB?tag=spankyspinola-20', desc: 'Falls are the number one injury risk for elderly care recipients. A proper non-slip mat costs less than a single ER visit. Prevention is always cheaper than crisis.', isAmazon: true },
      { title: 'Bed Rail for Elderly', url: 'https://www.amazon.com/dp/B07GNMHXJF?tag=spankyspinola-20', desc: 'Nighttime is when most falls happen. A sturdy bed rail provides support for getting in and out of bed safely — and lets you sleep without listening for a thud.', isAmazon: true },
      { title: 'Transfer Belt for Patient Lifting', url: 'https://www.amazon.com/dp/B009ONXBHQ?tag=spankyspinola-20', desc: 'Your back is not replaceable. A transfer belt distributes the weight properly and protects both you and the person you\'re helping. Every physical therapist recommends one.', isAmazon: true },
      { title: 'Baby Monitor (Works for Elderly)', url: 'https://www.amazon.com/dp/B0B7RCCYZ7?tag=spankyspinola-20', desc: 'A simple audio/video monitor lets you check in without physically entering the room every hour. Surveillance isn\'t the goal — rest is.', isAmazon: true },
    ]
  },
  {
    name: 'Apps & Digital Tools',
    products: [
      { title: 'Headspace', url: 'https://www.headspace.com', desc: 'Guided meditations starting at 3 minutes. When you don\'t have the bandwidth for a full practice, Headspace meets you where you are. The sleep content alone is worth it.', isAmazon: false },
      { title: 'CareZone App', url: 'https://www.carezone.com', desc: 'Medication tracking, appointment scheduling, and care coordination in one app. Free. If you\'re managing multiple medications and doctors, this simplifies the chaos.', isAmazon: false },
      { title: 'Insight Timer', url: 'https://insighttimer.com', desc: 'The world\'s largest free meditation library. Thousands of guided sessions, sleep music, and talks. No subscription required for the core features.', isAmazon: false },
      { title: 'Lotsa Helping Hands', url: 'https://lotsahelpinghands.com', desc: 'Coordinate help from friends, family, and community. Create a care calendar, post updates, and let people sign up for specific tasks. Asking for help is hard — this makes it structured.', isAmazon: false },
    ]
  },
  {
    name: 'Meditation & Sacred Practice',
    products: [
      { title: 'Meditation Cushion (Zafu)', url: 'https://www.amazon.com/dp/B01N0TFKOS?tag=spankyspinola-20', desc: 'A proper cushion changes your practice. It supports your posture so your body isn\'t fighting you while you\'re trying to sit still. Kalesh often says stillness is not something you achieve — it\'s something you allow.', isAmazon: true },
      { title: 'Singing Bowl Set', url: 'https://www.amazon.com/dp/B07BFNPC5N?tag=spankyspinola-20', desc: 'The resonance of a singing bowl can bring you back to the present moment faster than any technique. Use it to mark transitions — the start of rest, the end of a hard day.', isAmazon: true },
      { title: 'Sandalwood Incense', url: 'https://www.amazon.com/dp/B07BNQHF7W?tag=spankyspinola-20', desc: 'Scent creates ritual. Lighting incense before sitting quietly isn\'t about religion — it\'s about signaling to your nervous system that this moment is different from the last one.', isAmazon: true },
      { title: 'The Untethered Soul by Michael Singer', url: 'https://www.amazon.com/dp/1572245379?tag=spankyspinola-20', desc: 'Singer asks one question that changes everything: who is the one watching? For caregivers trapped in the identity of "the one who holds it all together," this book opens a door.', isAmazon: true },
    ]
  },
];

export function ToolsPage() {
  const amazonCount = TOOLS_CATEGORIES.reduce((sum, cat) => sum + cat.products.filter(p => p.isAmazon).length, 0);
  const totalCount = TOOLS_CATEGORIES.reduce((sum, cat) => sum + cat.products.length, 0);

  return (
    <div className="tools-page">
      <div className="article-hero" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1>The Caregiver's Toolkit</h1>
        <p className="article-subtitle" style={{ maxWidth: '700px', margin: '1rem auto' }}>
          These are the tools, books, and resources we actually trust. Every recommendation here has been chosen because it serves the work this site is about — supporting those who carry the weight of caring for someone else.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 3rem' }}>
        <div className="affiliate-disclosure">
          <p>This page contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.</p>
        </div>

        {TOOLS_CATEGORIES.map((cat, ci) => (
          <section key={ci} style={{ marginBottom: '3rem' }}>
            <h2 style={{ borderBottom: '2px solid var(--color-accent)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>{cat.name}</h2>
            <div className="tools-grid">
              {cat.products.map((prod, pi) => (
                <div key={pi} className="tool-card">
                  <h3>
                    <a href={prod.url} target="_blank" rel={prod.isAmazon ? undefined : 'noopener noreferrer'}>
                      {prod.title}
                    </a>
                    {prod.isAmazon && <span className="paid-link-tag">(paid link)</span>}
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: prod.desc }} />
                </div>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--color-cream)', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Looking for More Support?</h3>
          <p style={{ marginBottom: '1rem' }}>Browse our articles for deeper guidance on every aspect of the caregiving journey.</p>
          <Link to="/start-here" className="btn-primary" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--color-accent)', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>Start Here</Link>
        </div>
      </div>
    </div>
  );
}
