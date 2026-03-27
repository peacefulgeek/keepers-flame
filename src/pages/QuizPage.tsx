import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublishedArticles } from '../utils/articles';
import { NewsletterForm } from '../components/NewsletterForm';

interface Quiz {
  slug: string;
  title: string;
  description: string;
  questions: { q: string; options: string[] }[];
  results: { min: number; max: number; title: string; message: string }[];
}

const QUIZZES: Quiz[] = [
  {
    slug: "compassion-fatigue",
    title: "Compassion Fatigue Assessment",
    description: "Measure your current level of compassion fatigue",
    questions: [
      { q: "Do you feel emotionally drained by caring for others?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you find it hard to feel empathy for the person you care for?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you feel detached from your own emotions?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you dread the next caregiving task?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Have you noticed a decline in your own self-care?", options: ["Not at all", "Somewhat", "Significantly", "Completely"] },
    ],
    results: [
      { min: 0, max: 5, title: "Low Compassion Fatigue", message: "Your compassion reserves appear healthy. Continue monitoring and maintaining your self-care practices." },
      { min: 6, max: 10, title: "Moderate Compassion Fatigue", message: "You are showing signs of compassion depletion. This is your nervous system asking for restoration." },
      { min: 11, max: 20, title: "High Compassion Fatigue", message: "Your capacity for empathy is significantly depleted. This is not a personal failure — it is a predictable response to sustained emotional labor." },
    ],
  },
  {
    slug: "caregiver-guilt",
    title: "Caregiver Guilt Inventory",
    description: "Understand your relationship with caregiver guilt",
    questions: [
      { q: "Do you feel guilty when you take time for yourself?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you feel responsible for your loved one's happiness?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you compare yourself to other caregivers?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you feel guilty about negative emotions toward caregiving?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Do you feel you should be doing more?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
    ],
    results: [
      { min: 0, max: 5, title: "Manageable Guilt", message: "You have a healthy relationship with the natural guilt of caregiving." },
      { min: 6, max: 10, title: "Moderate Guilt Burden", message: "Guilt is becoming a significant weight in your caregiving experience." },
      { min: 11, max: 20, title: "Severe Guilt Pattern", message: "Guilt has become a dominant force in your caregiving. This level of self-blame is not sustainable." },
    ],
  },
  {
    slug: "family-dynamics",
    title: "Family Caregiving Dynamics Check",
    description: "Assess how family dynamics affect your caregiving",
    questions: [
      { q: "Do you feel the caregiving burden is shared fairly?", options: ["Yes, very fair", "Somewhat fair", "Unfair", "Extremely unfair"] },
      { q: "Do family members criticize your caregiving decisions?", options: ["Never", "Occasionally", "Frequently", "Constantly"] },
      { q: "Has caregiving created conflict in your family?", options: ["Not at all", "Some tension", "Significant conflict", "Family fracture"] },
      { q: "Do you feel supported by your immediate family?", options: ["Very supported", "Somewhat", "Barely", "Not at all"] },
      { q: "Has caregiving affected your primary relationship?", options: ["Not at all", "Somewhat", "Significantly", "Severely"] },
    ],
    results: [
      { min: 0, max: 5, title: "Healthy Family Dynamics", message: "Your family system appears to be functioning well around caregiving responsibilities." },
      { min: 6, max: 10, title: "Strained Family Dynamics", message: "Caregiving is creating notable strain in your family relationships." },
      { min: 11, max: 20, title: "Critical Family Strain", message: "Your family dynamics around caregiving need immediate attention." },
    ],
  },
  {
    slug: "self-care-audit",
    title: "Caregiver Self-Care Audit",
    description: "How well are you maintaining your own well-being?",
    questions: [
      { q: "How often do you eat regular, nutritious meals?", options: ["Always", "Usually", "Sometimes", "Rarely"] },
      { q: "How many hours of sleep do you typically get?", options: ["7-8 hours", "5-6 hours", "3-4 hours", "Less than 3"] },
      { q: "When did you last see your own doctor?", options: ["Within 6 months", "6-12 months", "1-2 years", "Over 2 years"] },
      { q: "How often do you engage in activities you enjoy?", options: ["Weekly", "Monthly", "Rarely", "Never"] },
      { q: "Do you have someone you can talk to about your feelings?", options: ["Yes, regularly", "Sometimes", "Rarely", "No one"] },
    ],
    results: [
      { min: 0, max: 5, title: "Good Self-Care", message: "You are maintaining reasonable self-care despite caregiving demands." },
      { min: 6, max: 10, title: "Declining Self-Care", message: "Your self-care is slipping. This is common but needs attention before it becomes critical." },
      { min: 11, max: 20, title: "Self-Care Crisis", message: "You have largely abandoned your own well-being. This is unsustainable and puts both you and your care recipient at risk." },
    ],
  },
  {
    slug: "emotional-resilience",
    title: "Emotional Resilience Check",
    description: "Measure your current emotional capacity",
    questions: [
      { q: "How quickly do you recover from emotional setbacks?", options: ["Quickly", "Within a day", "Takes several days", "I don't recover"] },
      { q: "Can you identify what you're feeling in the moment?", options: ["Usually", "Sometimes", "Rarely", "I feel numb"] },
      { q: "Do you have healthy ways to process difficult emotions?", options: ["Yes, several", "A few", "Not really", "None"] },
      { q: "How often do you feel overwhelmed?", options: ["Rarely", "Sometimes", "Often", "Constantly"] },
      { q: "Can you set emotional boundaries with others?", options: ["Yes", "Sometimes", "Rarely", "Never"] },
    ],
    results: [
      { min: 0, max: 5, title: "Strong Resilience", message: "Your emotional resilience is holding. Continue the practices that support it." },
      { min: 6, max: 10, title: "Depleted Resilience", message: "Your emotional reserves are running low. This is your system asking for restoration." },
      { min: 11, max: 20, title: "Resilience Crisis", message: "Your emotional capacity is severely depleted. Professional support would be beneficial." },
    ],
  },
  {
    slug: "isolation-index",
    title: "Caregiver Isolation Index",
    description: "How isolated has caregiving made you?",
    questions: [
      { q: "How often do you see friends or engage socially?", options: ["Weekly", "Monthly", "Rarely", "Never"] },
      { q: "Do you feel understood by the people in your life?", options: ["Yes", "Somewhat", "Rarely", "Not at all"] },
      { q: "How often do you leave the house for non-caregiving reasons?", options: ["Daily", "Weekly", "Monthly", "Almost never"] },
      { q: "Do you feel lonely even when others are around?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Have you lost friendships since becoming a caregiver?", options: ["None", "A few", "Several", "Most of them"] },
    ],
    results: [
      { min: 0, max: 5, title: "Connected", message: "You have maintained meaningful social connections despite caregiving demands." },
      { min: 6, max: 10, title: "Increasingly Isolated", message: "Your social world is shrinking. This is one of the most common and dangerous effects of caregiving." },
      { min: 11, max: 20, title: "Severely Isolated", message: "Caregiving has significantly cut you off from social connection. Isolation at this level affects both mental and physical health." },
    ],
  },
  {
    slug: "grief-awareness",
    title: "Anticipatory Grief Assessment",
    description: "Understanding your grief while they're still here",
    questions: [
      { q: "Do you grieve for the person your loved one used to be?", options: ["Rarely", "Sometimes", "Often", "Constantly"] },
      { q: "Do you feel a sense of loss about your own former life?", options: ["Not much", "Somewhat", "Significantly", "Overwhelmingly"] },
      { q: "Do you think about what life will be like after they're gone?", options: ["Rarely", "Sometimes", "Often", "Constantly"] },
      { q: "Do you feel guilty about grieving someone who is still alive?", options: ["Not at all", "Somewhat", "Often", "Very much"] },
      { q: "Do you feel like you're losing them gradually?", options: ["Not really", "Somewhat", "Significantly", "Every day"] },
    ],
    results: [
      { min: 0, max: 5, title: "Early Grief Awareness", message: "You are beginning to recognize the grief that accompanies caregiving." },
      { min: 6, max: 10, title: "Active Anticipatory Grief", message: "You are in the midst of grieving someone who is still present. This is one of the most complex forms of grief." },
      { min: 11, max: 20, title: "Profound Anticipatory Grief", message: "Your grief is deep and ongoing. This is not weakness — it is the natural response to watching someone you love decline." },
    ],
  },
  {
    slug: "boundary-check",
    title: "Caregiver Boundary Assessment",
    description: "How well are you maintaining healthy boundaries?",
    questions: [
      { q: "Can you say no to additional caregiving requests?", options: ["Yes, easily", "With difficulty", "Rarely", "Never"] },
      { q: "Do you feel obligated to meet every need immediately?", options: ["Rarely", "Sometimes", "Often", "Always"] },
      { q: "Do others respect your limits and boundaries?", options: ["Yes", "Usually", "Rarely", "Not at all"] },
      { q: "Do you feel guilty when you enforce a boundary?", options: ["Rarely", "Sometimes", "Often", "Always"] },
      { q: "Can you distinguish between your needs and your loved one's needs?", options: ["Clearly", "Usually", "With difficulty", "They've merged"] },
    ],
    results: [
      { min: 0, max: 5, title: "Healthy Boundaries", message: "You maintain reasonable boundaries in your caregiving role." },
      { min: 6, max: 10, title: "Eroding Boundaries", message: "Your boundaries are weakening under the pressure of caregiving demands." },
      { min: 11, max: 20, title: "Boundary Crisis", message: "You have lost most of your personal boundaries. Rebuilding them is essential for your survival." },
    ],
  },
  {
    slug: "spiritual-wellbeing",
    title: "Caregiver Spiritual Well-Being Check",
    description: "Assess the spiritual dimension of your caregiving journey",
    questions: [
      { q: "Do you find meaning or purpose in your caregiving?", options: ["Yes, often", "Sometimes", "Rarely", "Never"] },
      { q: "Do you have spiritual or contemplative practices that sustain you?", options: ["Yes, regular", "Occasional", "Lapsed", "None"] },
      { q: "Do you feel connected to something larger than yourself?", options: ["Deeply", "Somewhat", "Barely", "Not at all"] },
      { q: "Has caregiving affected your faith or spiritual beliefs?", options: ["Deepened them", "No change", "Challenged them", "Destroyed them"] },
      { q: "Can you find moments of peace in your daily caregiving?", options: ["Often", "Sometimes", "Rarely", "Never"] },
    ],
    results: [
      { min: 0, max: 5, title: "Spiritually Sustained", message: "Your spiritual resources are supporting you through caregiving." },
      { min: 6, max: 10, title: "Spiritual Strain", message: "Caregiving is testing your spiritual foundations. This is normal and can lead to deeper understanding." },
      { min: 11, max: 20, title: "Spiritual Crisis", message: "You are in what the contemplative traditions call a dark night of the soul. This is painful but can be transformative." },
    ],
  },
];

export function QuizPage() {
  const { quizSlug } = useParams();
  const quiz = QUIZZES.find(q => q.slug === quizSlug);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const articles = getPublishedArticles().slice(0, 3);

  if (!quiz) {
    return (
      <div className="container">
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1>Quiz Not Found</h1>
          <p>Available quizzes:</p>
          {QUIZZES.map(q => (
            <Link key={q.slug} to={`/quiz/${q.slug}`} style={{ display: 'block', margin: '0.5rem 0' }}>{q.title}</Link>
          ))}
        </div>
      </div>
    );
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const score = answers.reduce((a, b) => a + b, 0);
    const result = quiz.results.find(r => score >= r.min && score <= r.max) || quiz.results[quiz.results.length - 1];
    return (
      <div className="container">
        <div className="quiz-container" style={{ textAlign: 'center' }}>
          <h1>{quiz.title} — Results</h1>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-headline)', color: 'var(--color-primary)', margin: '1.5rem 0' }}>{result.title}</div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{result.message}</p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Recommended Reading</h3>
          {articles.map(a => (
            <Link key={a.id} to={`/${a.category}/${a.slug}`} style={{ display: 'block', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px', marginBottom: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 700 }}>{a.categoryName}</span>
              <h4 style={{ fontSize: '0.9rem', margin: '0.2rem 0 0' }}>{a.title}</h4>
            </Link>
          ))}
          
          <NewsletterForm source={`quiz-${quiz.slug}`} />
          
          <button onClick={() => { setCurrent(0); setAnswers([]); setShowResult(false); }} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Retake Quiz</button>
        </div>
      </div>
    );
  }

  const progress = (current / quiz.questions.length) * 100;

  return (
    <div className="container">
      <div className="quiz-container">
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{quiz.title}</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '2rem' }}>{quiz.description}</p>
        
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textAlign: 'center', marginBottom: '1.5rem' }}>Question {current + 1} of {quiz.questions.length}</p>

        <div className="quiz-question">
          <h3>{quiz.questions[current].q}</h3>
          {quiz.questions[current].options.map((opt, i) => (
            <button key={i} className="quiz-option" onClick={() => handleAnswer(i)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleAnswer(i)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { QUIZZES };
