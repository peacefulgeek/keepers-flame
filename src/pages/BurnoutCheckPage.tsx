import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedArticles } from '../utils/articles';
import { NewsletterForm } from '../components/NewsletterForm';

const QUESTIONS = [
  { q: "How often do you feel physically exhausted, even after sleeping?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "Do you find yourself feeling resentful toward the person you care for?", options: ["Never", "Occasionally", "Frequently", "Most of the time"] },
  { q: "How often do you skip your own medical appointments or self-care?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "Do you feel isolated from friends and social connections?", options: ["Not at all", "Somewhat", "Significantly", "Completely"] },
  { q: "How often do you feel guilty about wanting time for yourself?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "Do you experience frequent headaches, back pain, or other physical symptoms?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "How often do you feel emotionally numb or unable to cry?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "Do you feel like you have lost your sense of identity outside of caregiving?", options: ["Not at all", "Somewhat", "Significantly", "Completely"] },
  { q: "How often do you feel angry or irritable without a clear reason?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "Do you feel that no amount of care you provide is ever enough?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "How often do you have trouble sleeping, even when you have the opportunity?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "Do you feel that your own needs are unimportant compared to the person you care for?", options: ["Not at all", "Somewhat", "Significantly", "Completely"] },
];

function getResult(score: number) {
  if (score <= 12) return { level: "Low Burnout Risk", color: "#4CAF50", message: "Your current caregiving situation appears manageable, but stay attentive to early warning signs. Prevention is always easier than recovery." };
  if (score <= 24) return { level: "Moderate Burnout Risk", color: "#D4A017", message: "You are showing signs of caregiver stress that deserve attention. This is not a crisis yet, but your nervous system is telling you something important. Small changes now prevent larger breakdowns later." };
  if (score <= 36) return { level: "High Burnout Risk", color: "#E67E22", message: "Your responses indicate significant caregiver burnout. This is not a character flaw — it is the predictable result of sustained, unsupported caregiving. Your body and mind are telling you that something needs to change. Please consider reaching out for support." };
  return { level: "Severe Burnout", color: "#A0522D", message: "Your responses indicate severe caregiver burnout. This level of depletion affects your physical health, cognitive function, and emotional well-being. You deserve immediate support. Burnout is not failure — it is what happens when a good person gives more than any human being was designed to sustain." };
}

export function BurnoutCheckPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const articles = getPublishedArticles().slice(0, 4);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const score = answers.reduce((a, b) => a + b, 0);
    const result = getResult(score);
    return (
      <div className="container">
        <div className="burnout-assessment" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h1>Your Assessment Results</h1>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-headline)', color: result.color, margin: '1.5rem 0' }}>{result.level}</div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2rem' }}>{result.message}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>Burnout is not failure. It is what happens when a good person gives more than any human being was designed to sustain.</p>
          
          <h3 style={{ marginBottom: '1rem' }}>Recommended Reading</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            {articles.map(a => (
              <Link key={a.id} to={`/${a.category}/${a.slug}`} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', textDecoration: 'none', color: 'inherit', textAlign: 'left' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>{a.categoryName}</span>
                <h4 style={{ fontSize: '0.9rem', margin: '0.25rem 0 0' }}>{a.title}</h4>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <NewsletterForm source="burnout-check" />
          </div>

          <button onClick={() => { setCurrent(0); setAnswers([]); setShowResult(false); }} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Retake Assessment</button>
        </div>
      </div>
    );
  }

  const progress = ((current) / QUESTIONS.length) * 100;

  return (
    <div className="container">
      <div className="quiz-container">
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Caregiver Burnout Assessment</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '2rem' }}>12 questions. Honest answers. No judgment.</p>
        
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textAlign: 'center', marginBottom: '1.5rem' }}>Question {current + 1} of {QUESTIONS.length}</p>

        <div className="quiz-question">
          <h3>{QUESTIONS[current].q}</h3>
          {QUESTIONS[current].options.map((opt, i) => (
            <button key={i} className="quiz-option" onClick={() => handleAnswer(i)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleAnswer(i)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
