import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Assessment {
  id: string;
  title: string;
  description: string;
  statements: string[];
  scoring: { range: [number, number]; title: string; description: string; recommendations: string[] }[];
}

const ASSESSMENTS: Assessment[] = [
  {
    id: 'caregiver-burden',
    title: 'Caregiver Burden Assessment',
    description: 'Based on established caregiver burden research, this assessment measures the overall weight you\'re carrying across physical, emotional, social, and financial dimensions.',
    statements: [
      'I feel I don\'t have enough time for myself',
      'I feel stressed between caregiving and other responsibilities',
      'My health has suffered because of caregiving',
      'I feel I have lost control of my life since caregiving began',
      'I feel uncertain about what to do for the person I care for',
      'I feel I should be doing more for the person I care for',
      'I feel angry about my caregiving situation',
      'Caregiving has affected my relationships negatively',
      'I feel emotionally drained from caregiving',
      'I feel my social life has suffered because of caregiving',
      'I feel financially strained by caregiving expenses',
      'I feel trapped in my role as a caregiver',
    ],
    scoring: [
      { range: [0, 15], title: 'Low Burden', description: 'Your caregiving burden is currently manageable. This doesn\'t mean it\'s easy — it means your current support systems and coping strategies are working. Protect what\'s working.', recommendations: ['Maintain your current support systems', 'Continue setting boundaries proactively', 'Build reserves now for when things get harder', 'Check in with yourself monthly using this assessment'] },
      { range: [16, 30], title: 'Moderate Burden', description: 'You\'re carrying a significant load. The weight is noticeable and affecting multiple areas of your life. This is the stage where intervention prevents escalation.', recommendations: ['Identify the single biggest stressor and address it first', 'Ask for specific help from one person this week', 'Consider a caregiver support group for emotional processing', 'Review your caregiving schedule for any tasks that can be delegated'] },
      { range: [31, 42], title: 'High Burden', description: 'Your caregiving burden is at a critical level. Multiple areas of your life are significantly affected. This level of burden is unsustainable and requires immediate intervention.', recommendations: ['Contact your local Area Agency on Aging for respite care options', 'See your doctor — caregiver health decline is real and measurable', 'Reduce non-essential obligations immediately', 'Consider professional care coordination to share the decision-making load'] },
      { range: [43, 60], title: 'Severe Burden', description: 'You are in crisis-level caregiving burden. Your physical health, emotional wellbeing, relationships, and sense of self are all severely impacted. This is not sustainable.', recommendations: ['Call the Caregiver Support Line: 1-855-227-3640', 'See your doctor this week — not next month, this week', 'Accept any and all help offered, even if it\'s imperfect', 'Consider whether the current caregiving arrangement needs to fundamentally change'] },
    ]
  },
  {
    id: 'compassion-fatigue',
    title: 'Compassion Fatigue Scale',
    description: 'Compassion fatigue is the cost of caring. This assessment measures whether your capacity for empathy has been depleted by sustained caregiving.',
    statements: [
      'I find it difficult to feel sympathy for the person I care for',
      'I feel emotionally numb more often than not',
      'I dread the caregiving tasks I used to do willingly',
      'I feel detached from the person I care for',
      'Small requests feel like enormous demands',
      'I avoid emotional conversations with the person I care for',
      'I feel like I\'m going through the motions without feeling',
      'I\'m more irritable than I used to be',
      'I feel guilty about my lack of empathy',
      'I fantasize about escaping my caregiving role',
    ],
    scoring: [
      { range: [0, 12], title: 'Minimal Compassion Fatigue', description: 'Your empathy reserves are intact. You\'re still able to connect emotionally with the person you care for without significant depletion.', recommendations: ['Continue practices that replenish your emotional reserves', 'Set boundaries before you need them — prevention is easier than recovery', 'Notice early signs of emotional withdrawal', 'Maintain at least one relationship where you receive care, not just give it'] },
      { range: [13, 25], title: 'Moderate Compassion Fatigue', description: 'Your empathy is depleting. You may notice yourself going through the motions, feeling irritable, or avoiding emotional engagement. This is your nervous system protecting itself.', recommendations: ['Reduce emotional labor where possible — not every moment requires deep empathy', 'Schedule regular emotional processing time (therapy, journaling, support group)', 'Physical activity helps reset the nervous system — even a 15-minute walk', 'Read about compassion fatigue to normalize what you\'re experiencing'] },
      { range: [26, 37], title: 'Significant Compassion Fatigue', description: 'Your capacity for empathy is severely depleted. The numbness, irritability, and detachment you\'re feeling are not character flaws — they\'re symptoms of a system that has given more than it has.', recommendations: ['Professional support is not optional at this level — find a therapist', 'Take a break from caregiving, even if it\'s just 24 hours', 'Stop judging yourself for the numbness — it\'s a survival mechanism', 'Consider whether your caregiving arrangement needs structural changes'] },
      { range: [38, 50], title: 'Severe Compassion Fatigue', description: 'You are in compassion fatigue crisis. Your emotional system has shut down to protect itself. This is not a reflection of your love — it\'s a reflection of unsustainable demands.', recommendations: ['Immediate respite care is essential — you cannot continue at this level', 'Contact a mental health professional who specializes in caregiver burnout', 'This level of depletion affects physical health — see your doctor', 'The person you care for is better served by a rested caregiver than a depleted one'] },
    ]
  },
  {
    id: 'sleep-quality',
    title: 'Caregiver Sleep Quality Assessment',
    description: 'Sleep is the foundation of everything. This assessment evaluates how caregiving has affected your sleep quality and what to do about it.',
    statements: [
      'I have difficulty falling asleep because of caregiving worries',
      'I wake up during the night to check on or assist the person I care for',
      'I feel unrested even after a full night\'s sleep',
      'I use caffeine or stimulants to get through the day',
      'I fall asleep unintentionally during the day',
      'My sleep schedule is unpredictable due to caregiving demands',
      'I have nightmares or disturbing dreams related to caregiving',
      'I feel anxious when I try to go to sleep',
      'I get fewer than 6 hours of sleep most nights',
      'My sleep quality has significantly worsened since becoming a caregiver',
    ],
    scoring: [
      { range: [0, 12], title: 'Adequate Sleep Quality', description: 'Your sleep is reasonably protected despite caregiving demands. This is a significant protective factor for your overall health.', recommendations: ['Maintain your current sleep hygiene practices', 'Protect your sleep schedule as non-negotiable', 'Consider a sleep tracking app to monitor trends', 'Build a wind-down routine that signals your body it\'s time to rest'] },
      { range: [13, 25], title: 'Compromised Sleep Quality', description: 'Your sleep is suffering. The combination of nighttime caregiving demands and daytime stress is eroding your sleep quality. This affects everything — mood, cognition, immune function, and patience.', recommendations: ['Establish a firm "lights out" time and protect it', 'If nighttime caregiving is disrupting sleep, explore shared night duty', 'Magnesium glycinate before bed supports sleep quality', 'Avoid screens for 30 minutes before bed — the blue light disrupts melatonin'] },
      { range: [26, 37], title: 'Severely Compromised Sleep', description: 'Your sleep deprivation is at a level that significantly impacts your health and cognitive function. Chronic sleep deprivation in caregivers is associated with increased risk of depression, cardiovascular disease, and impaired decision-making.', recommendations: ['This is a medical issue — discuss it with your doctor', 'Explore respite care specifically for nighttime coverage', 'A weighted blanket can help with sleep onset and quality', 'Consider whether the current nighttime caregiving arrangement is sustainable'] },
      { range: [38, 50], title: 'Critical Sleep Deprivation', description: 'You are severely sleep-deprived. At this level, your cognitive function is comparable to legal intoxication. You are at risk for serious health consequences and impaired caregiving judgment.', recommendations: ['See your doctor immediately — this is a health emergency', 'Nighttime respite care is essential, not optional', 'Do not make major medical decisions for your loved one while this sleep-deprived', 'Your safety and the safety of the person you care for depends on addressing this now'] },
    ]
  },
  {
    id: 'social-isolation',
    title: 'Social Isolation Index',
    description: 'Caregiving can shrink your world to the size of one room. This assessment measures how isolated you\'ve become and what to do about it.',
    statements: [
      'I have fewer close friends than before I became a caregiver',
      'I rarely leave the house for non-caregiving reasons',
      'I feel like no one understands what I\'m going through',
      'I\'ve declined social invitations because of caregiving',
      'I feel lonely even when other people are around',
      'My conversations are almost entirely about caregiving',
      'I\'ve lost touch with hobbies or interests I used to enjoy',
      'I feel invisible in my social circles',
      'I can\'t remember the last time I laughed with a friend',
      'I feel like I\'m living in a parallel universe from everyone else',
    ],
    scoring: [
      { range: [0, 12], title: 'Mild Isolation', description: 'You\'ve maintained some social connections despite caregiving demands. This is protective — social connection is one of the strongest buffers against caregiver burnout.', recommendations: ['Protect the social connections you still have', 'Schedule one social activity per week, even if it\'s brief', 'Stay connected with at least one person who knew you before caregiving', 'Online connections count — don\'t dismiss them'] },
      { range: [13, 25], title: 'Moderate Isolation', description: 'Your social world is shrinking. You\'re losing connections, declining invitations, and spending most of your time in the caregiving bubble. This isolation compounds every other stressor.', recommendations: ['Join a caregiver support group — online groups are accessible from home', 'Tell one friend the truth about how isolated you feel', 'Accept invitations even when you don\'t feel like going — momentum matters', 'Schedule a weekly phone call with someone outside your caregiving world'] },
      { range: [26, 37], title: 'Significant Isolation', description: 'You are significantly isolated. Your social world has contracted to the point where loneliness is a constant companion. Research shows this level of isolation is as harmful to health as smoking 15 cigarettes a day.', recommendations: ['This isolation is a health risk — treat it as seriously as any physical symptom', 'Start with one small connection this week — a text, a call, a brief visit', 'Caregiver support groups provide instant community with people who understand', 'Consider whether respite care could free up time for social connection'] },
      { range: [38, 50], title: 'Severe Isolation', description: 'You are severely isolated. Your world has become almost entirely defined by caregiving, and the loneliness is profound. This level of isolation requires active intervention.', recommendations: ['Reach out to the Caregiver Support Line: 1-855-227-3640', 'Online caregiver communities can be accessed from anywhere, anytime', 'Ask your doctor about caregiver support resources in your area', 'Isolation at this level often accompanies depression — professional screening is important'] },
    ]
  },
  {
    id: 'financial-stress',
    title: 'Caregiving Financial Stress Assessment',
    description: 'The financial impact of caregiving is real and under-discussed. This assessment measures how caregiving is affecting your financial wellbeing.',
    statements: [
      'I\'ve reduced my work hours or left my job because of caregiving',
      'I\'m spending my own savings on caregiving expenses',
      'I worry about money more than I did before caregiving',
      'I\'ve gone into debt because of caregiving costs',
      'I can\'t afford the level of care my loved one needs',
      'I\'ve postponed my own medical care due to cost',
      'I feel anxious about my financial future after caregiving ends',
      'I\'ve had to make difficult financial trade-offs because of caregiving',
    ],
    scoring: [
      { range: [0, 10], title: 'Low Financial Stress', description: 'Your financial situation is currently manageable despite caregiving costs. This is a significant protective factor.', recommendations: ['Plan ahead for potential increases in care costs', 'Explore long-term care insurance options if not already in place', 'Build an emergency fund specifically for caregiving expenses', 'Document all caregiving expenses for potential tax deductions'] },
      { range: [11, 20], title: 'Moderate Financial Stress', description: 'Caregiving is creating noticeable financial strain. You\'re making trade-offs and worrying about money in ways you didn\'t before.', recommendations: ['Contact your local Area Agency on Aging about financial assistance programs', 'Explore whether your loved one qualifies for Medicaid or VA benefits', 'Look into the Family and Medical Leave Act (FMLA) for job protection', 'A financial advisor familiar with eldercare can identify benefits you\'re missing'] },
      { range: [21, 30], title: 'High Financial Stress', description: 'The financial burden of caregiving is severe. You\'re depleting savings, accumulating debt, or sacrificing your own financial security.', recommendations: ['Apply for every benefit program available — Medicaid, VA, state programs', 'Contact a benefits counselor through your local aging services', 'Explore paid family caregiver programs in your state', 'Don\'t postpone your own medical care — the cost of neglect is higher'] },
      { range: [31, 40], title: 'Critical Financial Stress', description: 'You are in financial crisis due to caregiving. This level of financial stress compounds every other aspect of caregiver burden and requires immediate attention.', recommendations: ['Contact 211 for local financial assistance resources', 'Apply for emergency assistance programs immediately', 'Explore whether the caregiving arrangement needs to change to be financially sustainable', 'A social worker can help navigate the complex web of financial support programs'] },
    ]
  },
  {
    id: 'relationship-health',
    title: 'Caregiving Relationship Health Check',
    description: 'Caregiving changes every relationship — with the person you care for, your partner, your family, and yourself. This assessment measures the health of those connections.',
    statements: [
      'My relationship with the person I care for has become strained',
      'My partner/spouse feels neglected because of my caregiving role',
      'I feel resentful toward family members who don\'t help',
      'I\'ve had more conflicts with family since becoming a caregiver',
      'I feel like I\'ve lost my identity outside of being a caregiver',
      'The person I care for doesn\'t appreciate my efforts',
      'I avoid difficult conversations about care with family members',
      'My children are affected by my caregiving responsibilities',
      'I feel guilty about the impact of caregiving on my relationships',
      'I\'ve lost relationships because of my caregiving role',
    ],
    scoring: [
      { range: [0, 12], title: 'Healthy Relationship Dynamics', description: 'Your relationships are weathering the caregiving storm relatively well. Communication is functioning and key relationships are intact.', recommendations: ['Continue prioritizing communication with your partner and family', 'Schedule regular check-ins with key relationships', 'Express appreciation for those who support you', 'Don\'t take relationship health for granted — it needs ongoing attention'] },
      { range: [13, 25], title: 'Strained Relationships', description: 'Caregiving is creating visible strain in your relationships. Resentment, guilt, and communication breakdowns are emerging.', recommendations: ['Have one honest conversation with a family member about the caregiving distribution', 'Schedule dedicated time with your partner that has nothing to do with caregiving', 'Family meetings with a clear agenda can reduce conflict', 'Consider family counseling if communication has broken down'] },
      { range: [26, 37], title: 'Significantly Damaged Relationships', description: 'Multiple relationships are suffering significantly. The combination of resentment, guilt, and communication failure is creating lasting damage.', recommendations: ['Family therapy or mediation may be necessary to repair communication', 'Address the caregiving distribution directly — avoidance makes it worse', 'Protect your relationship with your children — they need reassurance', 'Consider whether a family meeting with a professional mediator could help'] },
      { range: [38, 50], title: 'Critical Relationship Damage', description: 'Your relationships are in crisis. The caregiving burden has fundamentally altered your family dynamics and key relationships may be at risk.', recommendations: ['Professional family counseling is essential at this level', 'The caregiving arrangement itself may need to change to save relationships', 'Individual therapy can help you process the grief of relationship losses', 'Rebuilding takes time — start with the most important relationship first'] },
    ]
  },
  {
    id: 'physical-health',
    title: 'Caregiver Physical Health Assessment',
    description: 'Caregivers have higher rates of chronic illness, weakened immune function, and premature mortality. This assessment measures how caregiving is affecting your body.',
    statements: [
      'I experience chronic pain (back, neck, joints) related to caregiving tasks',
      'I get sick more often than I did before becoming a caregiver',
      'I\'ve gained or lost significant weight since becoming a caregiver',
      'I skip meals or eat poorly because of caregiving demands',
      'I don\'t exercise or move my body regularly',
      'I\'ve postponed my own medical appointments or screenings',
      'I rely on caffeine, alcohol, or medication to get through the day',
      'I experience frequent headaches, stomach problems, or tension',
      'My blood pressure or other health markers have worsened',
      'I feel physically older than my actual age',
    ],
    scoring: [
      { range: [0, 12], title: 'Maintained Physical Health', description: 'You\'ve managed to maintain reasonable physical health despite caregiving demands. This is a significant achievement and a critical protective factor.', recommendations: ['Continue prioritizing your physical health — it\'s your foundation', 'Keep all scheduled medical appointments and screenings', 'Maintain whatever exercise routine you have, even if it\'s minimal', 'Nutrition matters — even small improvements in diet help'] },
      { range: [13, 25], title: 'Declining Physical Health', description: 'Your physical health is noticeably declining. The combination of physical demands, stress, poor sleep, and neglected self-care is taking a measurable toll.', recommendations: ['Schedule a comprehensive physical exam — don\'t postpone it', 'Address the most impactful physical issue first (usually sleep or pain)', 'Even 15 minutes of walking daily has measurable health benefits', 'Use assistive devices for lifting and transfers to protect your body'] },
      { range: [26, 37], title: 'Significantly Compromised Health', description: 'Your physical health is significantly compromised. Multiple systems are affected — pain, immune function, weight, energy. Your body is telling you something your mind may be ignoring.', recommendations: ['See your doctor this week — this is not optional', 'Your health decline will eventually prevent you from caregiving at all', 'Physical therapy can address chronic pain from caregiving tasks', 'Consider whether the physical demands of caregiving need to be redistributed'] },
      { range: [38, 50], title: 'Critical Health Decline', description: 'Your physical health is in crisis. At this level, you are at significantly elevated risk for serious illness. The research is clear: caregiver health decline is real, measurable, and dangerous.', recommendations: ['Immediate medical attention is required — this is a health emergency', 'You cannot care for someone else if your own health collapses', 'The caregiving arrangement must change to protect your physical survival', 'Contact your doctor, a caregiver support line, or your local aging services today'] },
    ]
  },
  {
    id: 'meaning-purpose',
    title: 'Caregiving Meaning & Purpose Assessment',
    description: 'Finding meaning in caregiving is protective — but losing meaning is devastating. This assessment measures your relationship with purpose in the caregiving journey.',
    statements: [
      'I can find meaning in my caregiving role',
      'I feel that my caregiving makes a real difference',
      'I\'ve grown as a person through caregiving',
      'I feel connected to something larger than myself through this work',
      'I can see moments of beauty even in the difficulty',
      'My values are reflected in how I care for this person',
      'I feel a sense of purpose in my daily caregiving tasks',
      'I\'ve learned important things about life through caregiving',
    ],
    scoring: [
      { range: [24, 40], title: 'Strong Sense of Meaning', description: 'You\'ve found genuine meaning in your caregiving role. This is one of the most powerful protective factors against burnout. Meaning doesn\'t eliminate suffering — but it makes it bearable.', recommendations: ['Protect this sense of meaning — it\'s your most valuable resource', 'Share your perspective with other caregivers who are struggling', 'Journal about moments of meaning to return to on hard days', 'Meaning and exhaustion can coexist — don\'t let fatigue erase what matters'] },
      { range: [16, 23], title: 'Fluctuating Meaning', description: 'Your sense of meaning comes and goes. Some days you feel connected to purpose; other days, it all feels pointless. This fluctuation is normal but worth attending to.', recommendations: ['Notice what conditions support your sense of meaning', 'On meaningless days, focus on small acts rather than big purpose', 'Contemplative practices can help reconnect you to deeper purpose', 'Talk to someone who has found meaning in a similar journey'] },
      { range: [8, 15], title: 'Diminished Meaning', description: 'You\'re losing your connection to meaning. The daily grind of caregiving has obscured whatever purpose once sustained you. This is a warning sign for existential burnout.', recommendations: ['Reconnect with why you started — not out of guilt, but out of remembrance', 'Explore contemplative or spiritual practices that speak to you', 'Read "Man\'s Search for Meaning" by Viktor Frankl', 'A therapist can help you process the loss of meaning'] },
      { range: [0, 7], title: 'Lost Meaning', description: 'You\'ve lost your connection to meaning entirely. The caregiving feels meaningless, and you may feel like you\'re just surviving rather than living. This is the deepest form of burnout.', recommendations: ['This level of meaning loss often accompanies depression — professional screening is important', 'You don\'t need to find meaning right now — you need support', 'Start with one small thing that connects you to who you were before', 'Meaning can return — but it usually requires help, not willpower'] },
    ]
  },
];

function generateAssessmentPDF(assessment: Assessment, scores: number[], totalScore: number, result: Assessment['scoring'][0]) {
  const content = `
THE KEEPER'S FLAME — ASSESSMENT RESULTS
==========================================

Assessment: ${assessment.title}
Date: ${new Date().toLocaleDateString()}
Total Score: ${totalScore} out of ${assessment.statements.length * 5}

YOUR RESULT: ${result.title}

${result.description}

RECOMMENDATIONS:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

YOUR RESPONSES:
${assessment.statements.map((s, i) => `${s}: ${scores[i]}/5`).join('\n')}

---
This assessment is for educational purposes only and is not a substitute for professional medical or psychological advice.
Visit keepersflame.love for more resources.
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `keepers-flame-${assessment.id}-results.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const [started, setStarted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [result, setResult] = useState<Assessment['scoring'][0] | null>(null);

  const handleSubmit = () => {
    if (scores.length !== assessment.statements.length) return;
    const total = scores.reduce((s, v) => s + v, 0);
    const match = assessment.scoring.find(s => total >= s.range[0] && total <= s.range[1]);
    setResult(match || assessment.scoring[assessment.scoring.length - 1]);
  };

  const updateScore = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const reset = () => {
    setStarted(false);
    setScores([]);
    setResult(null);
  };

  if (!started) {
    return (
      <div className="assessment-card">
        <h3>{assessment.title}</h3>
        <p>{assessment.description}</p>
        <button onClick={() => { setStarted(true); setScores(new Array(assessment.statements.length).fill(0)); }} className="btn-primary">{assessment.statements.length} Statements — Begin Assessment</button>
      </div>
    );
  }

  if (result) {
    const total = scores.reduce((s, v) => s + v, 0);
    return (
      <div className="assessment-card assessment-result">
        <h3>Your Result: {result.title}</h3>
        <div className="score-display">Score: {total} / {assessment.statements.length * 5}</div>
        <p>{result.description}</p>
        <h4>Recommendations:</h4>
        <ul>
          {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => generateAssessmentPDF(assessment, scores, total, result)} className="btn-secondary">Download Results</button>
          <button onClick={reset} className="btn-outline">Retake Assessment</button>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-card assessment-active">
      <h3>{assessment.title}</h3>
      <p style={{ fontSize: '0.85rem', color: '#6B4C3B', marginBottom: '1.5rem' }}>Rate each statement from 0 (not at all) to 5 (extremely).</p>
      <div className="assessment-statements">
        {assessment.statements.map((stmt, i) => (
          <div key={i} className="statement-row">
            <p className="statement-text">{stmt}</p>
            <div className="rating-buttons">
              {[0, 1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  onClick={() => updateScore(i, v)}
                  className={`rating-btn ${scores[i] === v ? 'active' : ''}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="btn-primary" style={{ marginTop: '1.5rem' }} disabled={scores.some(s => s === undefined)}>View My Results</button>
    </div>
  );
}

export function AssessmentsPage() {
  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
        <h1>Caregiver Assessments</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          These assessments provide a structured way to evaluate different dimensions of your caregiving experience. 
          Rate each statement honestly on a scale of 0 to 5. Your results are calculated instantly on your screen — 
          nothing is stored, nothing is tracked. Download your results as a file if you want to keep them.
        </p>
        <div className="assessments-grid">
          {ASSESSMENTS.map(assessment => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p>For lighter self-reflection, try our <Link to="/quizzes">interactive quizzes</Link> or the quick <Link to="/burnout-check">burnout check</Link>.</p>
        </div>
      </div>
    </div>
  );
}
