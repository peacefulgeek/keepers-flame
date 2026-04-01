import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: { q: string; options: string[] }[];
  getResult: (answers: number[]) => { title: string; description: string; tips: string[] };
}

const QUIZZES: Quiz[] = [
  {
    id: 'burnout-type',
    title: 'What Type of Caregiver Burnout Do You Have?',
    description: 'Not all burnout looks the same. This quiz helps you identify whether your exhaustion is primarily physical, emotional, or existential — so you can address the right root.',
    questions: [
      { q: 'When you wake up in the morning, your first feeling is usually:', options: ['Physical exhaustion — my body aches before the day begins', 'Emotional dread — I can\'t face another day of this', 'Emptiness — I don\'t feel much of anything anymore', 'Anxiety — my mind is already racing with tasks'] },
      { q: 'The thing that drains you most is:', options: ['The physical demands — lifting, cleaning, constant movement', 'The emotional weight — absorbing their fear, pain, or anger', 'The loss of meaning — I don\'t know why I\'m doing this anymore', 'The mental load — tracking medications, appointments, decisions'] },
      { q: 'When someone asks how you\'re doing, you:', options: ['Say "tired" because it\'s the simplest truth', 'Say "fine" while feeling like you might cry', 'Feel nothing — the question doesn\'t even register', 'Launch into your to-do list because that\'s all you can think about'] },
      { q: 'Your sleep is most disrupted by:', options: ['Physical pain or discomfort', 'Worry, guilt, or sadness', 'Waking up and staring at the ceiling feeling hollow', 'Racing thoughts about tomorrow\'s logistics'] },
      { q: 'If you had one free day, you would:', options: ['Sleep — just sleep', 'Cry, or finally let yourself feel something', 'Try to remember what you used to enjoy', 'Probably still plan and organize — I can\'t turn it off'] },
      { q: 'The phrase that resonates most:', options: ['My body is breaking down', 'My heart is breaking', 'I\'ve lost myself somewhere in this', 'My brain never stops'] },
    ],
    getResult: (answers) => {
      const counts = [0, 0, 0, 0];
      answers.forEach(a => counts[a]++);
      const max = counts.indexOf(Math.max(...counts));
      const results = [
        { title: 'Physical Burnout', description: 'Your body is carrying the heaviest load. The constant physical demands of caregiving have depleted your physical reserves. Your nervous system is running on fumes.', tips: ['Prioritize sleep above all else — even 30 extra minutes matters', 'Ask for help with physical tasks specifically', 'Consider a transfer belt or assistive devices to protect your back', 'Magnesium glycinate before bed can support muscle recovery and sleep'] },
        { title: 'Emotional Burnout', description: 'You\'re absorbing more emotional pain than any one person should carry. Compassion fatigue has set in, and your emotional reserves are depleted. This is not weakness — it\'s the natural consequence of sustained empathy.', tips: ['Find one person you can be honest with — not performatively strong', 'Allow yourself to feel without trying to fix the feeling', 'Consider a therapist who specializes in caregiver support', 'Read "It\'s OK That You\'re Not OK" by Megan Devine'] },
        { title: 'Existential Burnout', description: 'You\'ve lost connection to meaning. The "why" behind your caregiving has become unclear, and you may feel like you\'re going through the motions. This is the deepest form of burnout — and the one least talked about.', tips: ['Reconnect with something that existed before caregiving defined you', 'Journal about who you were before this role consumed you', 'Explore contemplative practices — not for productivity, but for presence', 'Read "Man\'s Search for Meaning" by Viktor Frankl'] },
        { title: 'Cognitive Burnout', description: 'Your mental load is crushing you. The constant decision-making, planning, and tracking has overwhelmed your executive function. You\'re not forgetful — you\'re overloaded.', tips: ['Use a caregiver organizer binder to externalize the mental load', 'Delegate specific tasks with clear instructions — don\'t just ask for "help"', 'Set phone reminders for everything — stop relying on memory', 'Take 5-minute breaks where you do absolutely nothing — no planning allowed'] },
      ];
      return results[max];
    }
  },
  {
    id: 'boundary-style',
    title: 'What\'s Your Boundary Style?',
    description: 'Understanding how you set (or don\'t set) boundaries reveals why you feel drained. This quiz identifies your pattern.',
    questions: [
      { q: 'When a family member asks you to take on more caregiving tasks:', options: ['I say yes immediately — they need me', 'I say yes but feel resentful afterward', 'I try to negotiate but usually cave', 'I assess whether I actually can before responding'] },
      { q: 'When you need a break:', options: ['I don\'t take one — there\'s no one else', 'I take one but feel guilty the entire time', 'I wait until I\'m completely depleted, then crash', 'I schedule breaks proactively before I need them'] },
      { q: 'Your response to "you\'re so strong" is:', options: ['Pride — at least someone notices', 'Exhaustion — I don\'t want to be strong anymore', 'Anger — strength shouldn\'t be required', 'Discomfort — strength isn\'t the point'] },
      { q: 'When someone criticizes your caregiving:', options: ['I absorb it and try harder', 'I defend myself but doubt myself later', 'I shut down and withdraw', 'I consider whether the feedback is valid, then decide'] },
      { q: 'Your relationship with the word "no":', options: ['I physically cannot say it', 'I can say it but it costs me sleep', 'I say it when I\'m angry, then feel bad', 'I say it when needed without excessive guilt'] },
    ],
    getResult: (answers) => {
      const avg = answers.reduce((s, a) => s + a, 0) / answers.length;
      if (avg < 1) return { title: 'The Absorber', description: 'You take everything on without filtering. Your boundaries are essentially nonexistent — not because you don\'t want them, but because saying no feels like abandonment.', tips: ['Start with one small "no" per week — practice builds capacity', 'Notice the physical sensation when you want to say no but don\'t', 'Read "Set Boundaries, Find Peace" by Nedra Glover Tawwab', 'Remember: a boundary is not a rejection of someone — it\'s a protection of yourself'] };
      if (avg < 2) return { title: 'The Guilty Boundary-Setter', description: 'You can set boundaries, but the guilt afterward is almost as exhausting as not having them. You\'re in the messy middle — which is actually progress.', tips: ['Guilt after setting a boundary is normal — it doesn\'t mean you were wrong', 'Write down why you set each boundary so you can re-read it when guilt hits', 'Find one person who validates your boundaries instead of questioning them', 'The guilt will decrease with practice — your nervous system needs time to adjust'] };
      if (avg < 3) return { title: 'The Crash-and-Burn Boundary-Setter', description: 'You push through until you can\'t, then set boundaries from a place of anger or desperation. The pattern is: absorb, absorb, absorb, explode, feel guilty, repeat.', tips: ['Set boundaries before you\'re desperate — proactive beats reactive', 'Notice your early warning signs (irritability, insomnia, body tension)', 'Schedule non-negotiable rest before you need it', 'Anger is information — it\'s telling you a boundary was needed three weeks ago'] };
      return { title: 'The Healthy Boundary-Setter', description: 'You\'ve developed the rare ability to assess, decide, and hold boundaries without excessive guilt. This doesn\'t mean it\'s easy — it means you\'ve done the work.', tips: ['Continue modeling healthy boundaries for others in your caregiving circle', 'Share your approach with other caregivers who are struggling', 'Remember that boundaries need maintenance — check in with yourself regularly', 'Your capacity to set boundaries is a gift to everyone around you, including the person you care for'] };
    }
  },
  {
    id: 'grief-stage',
    title: 'Where Are You in the Grief Process?',
    description: 'Caregivers often experience grief long before loss. This quiz helps you name what you\'re feeling — because naming it is the first step toward carrying it differently.',
    questions: [
      { q: 'When you think about the person you care for:', options: ['I still believe things will get better', 'I feel angry that this is happening', 'I\'m trying to bargain — if I just do more, maybe...', 'I feel a deep sadness I can\'t shake', 'I\'ve found a way to hold both the love and the loss'] },
      { q: 'Your relationship with hope:', options: ['I\'m holding onto it tightly', 'Hope feels like a cruel joke', 'I swing between hope and despair', 'Hope has been replaced by something quieter', 'I\'ve redefined what hope means in this context'] },
      { q: 'When you see old photos of them:', options: ['I think "they\'ll be like that again"', 'I feel rage at what\'s been taken', 'I think "if only I had done something differently"', 'I cry — sometimes for a long time', 'I feel gratitude and sadness simultaneously'] },
      { q: 'Your energy level is best described as:', options: ['Manic — I\'m doing everything I can', 'Explosive — I\'m angry at everyone', 'Scattered — I\'m trying everything', 'Depleted — I have nothing left', 'Steady — not great, but sustainable'] },
      { q: 'The hardest part right now is:', options: ['Accepting that this is really happening', 'The unfairness of it all', 'Wondering if I could have prevented this', 'The weight of sadness', 'Learning to live in this new reality'] },
    ],
    getResult: (answers) => {
      const counts = [0, 0, 0, 0, 0];
      answers.forEach(a => counts[a]++);
      const max = counts.indexOf(Math.max(...counts));
      const results = [
        { title: 'Denial / Protective Hope', description: 'You\'re in the early stage where your mind is protecting you from the full weight of what\'s happening. This isn\'t delusion — it\'s your psyche\'s way of letting you absorb reality in doses.', tips: ['Don\'t force yourself to "accept" faster than you\'re ready', 'Notice when hope becomes avoidance of necessary conversations', 'Talk to someone who can hold space without rushing you', 'This stage serves a purpose — trust your own timeline'] },
        { title: 'Anger', description: 'The anger is real, and it\'s valid. You\'re angry at the disease, the situation, the family members who aren\'t helping, the universe. This anger is grief wearing a mask it thinks you\'ll accept.', tips: ['Anger needs a physical outlet — walk, hit a pillow, scream in your car', 'Underneath the anger is usually hurt — when you\'re ready, look there', 'Don\'t direct the anger at yourself — you\'re not the problem', 'Read our article on the anger that is also holy'] },
        { title: 'Bargaining', description: 'You\'re in the "if only" stage — replaying decisions, wondering what you could have done differently, trying to control what can\'t be controlled. This is your mind\'s attempt to find agency in a situation that feels powerless.', tips: ['The past cannot be changed — but it can be understood', 'Notice when bargaining becomes self-blame', 'You did the best you could with what you knew at the time', 'Consider journaling the "if onlys" to externalize them'] },
        { title: 'Deep Sadness', description: 'The sadness has arrived. This is the stage most people call "depression" but it\'s actually grief doing its work. You\'re feeling the full weight of what\'s being lost — and that takes enormous courage.', tips: ['Sadness is not a problem to solve — it\'s a response to love', 'Let yourself cry without judging the tears', 'Reduce your obligations to the bare minimum right now', 'If the sadness becomes unmanageable, a grief counselor can help'] },
        { title: 'Integration', description: 'You\'ve reached a place where grief and love coexist. This doesn\'t mean you\'re "over it" — it means you\'ve found a way to carry it. This is the most mature and difficult stage.', tips: ['Share what you\'ve learned with caregivers who are earlier in the process', 'Integration isn\'t permanent — you may cycle back through earlier stages', 'Honor the growth that came from this pain without romanticizing it', 'Continue practices that keep you grounded — this stage requires maintenance'] },
      ];
      return results[max];
    }
  },
  {
    id: 'self-care-type',
    title: 'What Self-Care Do You Actually Need?',
    description: 'Not all self-care is bubble baths. This quiz identifies the specific type of restoration your body and mind are craving.',
    questions: [
      { q: 'Right now, the thing you crave most is:', options: ['Physical rest — sleep, stillness, no movement', 'Emotional release — crying, laughing, feeling something', 'Mental quiet — no decisions, no planning, no thinking', 'Connection — being seen by someone who understands'] },
      { q: 'Your body is telling you:', options: ['I\'m in pain — muscles, joints, headaches', 'I\'m numb — I can\'t feel my body at all', 'I\'m wired — I can\'t relax even when I try', 'I\'m heavy — everything feels like effort'] },
      { q: 'The last time you did something just for yourself:', options: ['I can\'t remember', 'It was recent but I felt guilty the whole time', 'I tried but couldn\'t enjoy it', 'It was brief but genuinely restorative'] },
      { q: 'When you imagine a perfect hour alone:', options: ['I\'m sleeping or lying in complete silence', 'I\'m watching something that makes me feel', 'I\'m outside with no phone and no agenda', 'I\'m talking to someone who truly listens'] },
      { q: 'The word that best describes your current state:', options: ['Depleted', 'Overwhelmed', 'Disconnected', 'Invisible'] },
    ],
    getResult: (answers) => {
      const counts = [0, 0, 0, 0];
      answers.forEach(a => counts[a]++);
      const max = counts.indexOf(Math.max(...counts));
      const results = [
        { title: 'You Need Physical Restoration', description: 'Your body has been carrying the weight and it\'s breaking down. The self-care you need isn\'t emotional — it\'s physical. Sleep, rest, and body-level recovery.', tips: ['Sleep is not lazy — it\'s medicine. Prioritize 8 hours non-negotiably', 'A weighted blanket can help your nervous system downregulate', 'Magnesium before bed supports muscle recovery and sleep quality', 'Even 10 minutes of lying flat on the floor with no stimulation helps'] },
        { title: 'You Need Emotional Release', description: 'You\'ve been holding it together for so long that your emotions are backed up. You don\'t need to "manage" your feelings — you need to let them move through you.', tips: ['Watch a movie that makes you cry — give yourself permission', 'Write a letter to yourself that says everything you can\'t say out loud', 'Find a therapist or support group specifically for caregivers', 'Laughter counts too — humor is an underrated form of emotional release'] },
        { title: 'You Need Mental Silence', description: 'Your cognitive load is maxed out. You don\'t need more information or more strategies — you need your brain to stop working for a while.', tips: ['Leave your phone in another room for one hour', 'Walk outside without a destination or a podcast', 'Try a body scan meditation — it moves attention from thinking to feeling', 'Delegate one decision per day to someone else, even a small one'] },
        { title: 'You Need Connection', description: 'You\'re surrounded by people who need you, but no one is seeing you. The self-care you need isn\'t solitary — it\'s relational. You need to be witnessed.', tips: ['Call someone who knew you before caregiving defined you', 'Join a caregiver support group — online counts', 'Tell one person the truth when they ask how you\'re doing', 'Connection doesn\'t require a long conversation — even 10 minutes of being truly seen helps'] },
      ];
      return results[max];
    }
  },
  {
    id: 'communication-style',
    title: 'How Do You Communicate Under Stress?',
    description: 'Caregiving stress changes how we communicate with family, doctors, and the person we care for. Identify your stress communication pattern.',
    questions: [
      { q: 'When a family member doesn\'t help enough, you:', options: ['Say nothing and do it yourself', 'Drop hints and hope they notice', 'Explode after weeks of silence', 'State clearly what you need and when'] },
      { q: 'In conversations with doctors, you tend to:', options: ['Defer to their expertise without questioning', 'Prepare questions but forget them in the moment', 'Challenge everything — you\'ve done your research', 'Ask questions calmly and advocate for your loved one'] },
      { q: 'When the person you care for is difficult, you:', options: ['Absorb it — they\'re suffering, I can handle it', 'Feel hurt but don\'t show it', 'Snap back and then feel terrible', 'Acknowledge their frustration while maintaining your own boundaries'] },
      { q: 'Your typical text to a sibling about caregiving:', options: ['I don\'t text them about it — they wouldn\'t understand', '"Everything\'s fine, don\'t worry"', 'A long, frustrated message at midnight', 'A specific request with clear details'] },
      { q: 'After a hard caregiving day, you:', options: ['Go silent — I don\'t want to burden anyone', 'Vent to whoever will listen', 'Post something vague on social media', 'Call one trusted person and be honest'] },
    ],
    getResult: (answers) => {
      const avg = answers.reduce((s, a) => s + a, 0) / answers.length;
      if (avg < 1) return { title: 'The Silent Carrier', description: 'You absorb everything and communicate almost nothing. Your silence isn\'t peace — it\'s a pressure cooker. The people around you may not even know you\'re struggling because you\'ve gotten so good at hiding it.', tips: ['Start small — tell one person one true thing about how you\'re feeling', 'Write what you can\'t say out loud', 'Silence protects others but it\'s destroying you', 'You deserve to be heard as much as anyone you care for'] };
      if (avg < 2) return { title: 'The Hint Dropper', description: 'You communicate indirectly, hoping others will pick up on your needs without you having to state them explicitly. This rarely works — and the gap between what you need and what you get grows wider.', tips: ['Replace hints with direct requests: "I need you to take Tuesday shifts"', 'People can\'t read your mind — even the ones who love you', 'Practice one direct ask per week', 'Directness isn\'t rudeness — it\'s clarity'] };
      if (avg < 3) return { title: 'The Pressure Valve', description: 'You hold it in until you can\'t, then release everything at once — usually at the wrong time, to the wrong person, in the wrong way. The explosion isn\'t the problem. The weeks of silence before it are.', tips: ['Set a weekly check-in with someone to release pressure gradually', 'When you feel the pressure building, that\'s the signal to speak — not wait', 'Apologize for the delivery, not the content — your feelings were valid', 'Regular small releases prevent catastrophic ones'] };
      return { title: 'The Clear Communicator', description: 'You\'ve developed the ability to state your needs clearly, advocate effectively, and maintain relationships even under stress. This is rare and valuable — especially in caregiving.', tips: ['Continue modeling clear communication for your caregiving circle', 'Help other caregivers find their voice — your example matters', 'Even clear communicators need someone to listen — don\'t neglect your own needs', 'Remember that communication is a skill that needs maintenance under stress'] };
    }
  },
  {
    id: 'resilience-profile',
    title: 'What\'s Your Resilience Profile?',
    description: 'Resilience isn\'t one thing. This quiz identifies your specific resilience strengths and gaps.',
    questions: [
      { q: 'After a crisis, you typically:', options: ['Collapse — I have nothing left', 'Push through on adrenaline, then crash later', 'Process it slowly over days', 'Adapt and adjust relatively quickly'] },
      { q: 'Your support network is:', options: ['Nonexistent — I\'m doing this alone', 'There but unreliable', 'Small but solid', 'Strong and I use it'] },
      { q: 'When plans fall apart, you:', options: ['Panic and freeze', 'Get angry and force a solution', 'Feel anxious but eventually adapt', 'Accept it and pivot'] },
      { q: 'Your relationship with uncertainty:', options: ['It terrifies me', 'I try to control everything to avoid it', 'I tolerate it but don\'t like it', 'I\'ve made peace with it'] },
      { q: 'How do you recharge?', options: ['I don\'t — I just keep going', 'I crash when my body forces me to stop', 'I have some practices but they\'re inconsistent', 'I have regular practices that sustain me'] },
    ],
    getResult: (answers) => {
      const avg = answers.reduce((s, a) => s + a, 0) / answers.length;
      if (avg < 1) return { title: 'Depleted Resilience', description: 'Your resilience reserves are critically low. This isn\'t a character flaw — it\'s the natural result of sustained stress without adequate support or recovery. Your system is running on empty.', tips: ['This is not the time for self-improvement — it\'s the time for triage', 'Accept any help offered, even if it\'s imperfect', 'Sleep and nutrition are your first priorities — everything else is secondary', 'Consider calling a caregiver support hotline: 1-855-227-3640'] };
      if (avg < 2) return { title: 'Brittle Resilience', description: 'You can handle crises in the moment, but the recovery takes longer each time. You\'re running on adrenaline and willpower — both of which have expiration dates.', tips: ['Build recovery time into your schedule — don\'t wait for collapse', 'Identify your early warning signs (irritability, insomnia, appetite changes)', 'Strengthen one support relationship this week', 'Brittle doesn\'t mean broken — it means you need reinforcement'] };
      if (avg < 3) return { title: 'Developing Resilience', description: 'You have real resilience capacity, but it\'s inconsistent. Some days you handle everything; other days, small things break you. This inconsistency is normal — and it\'s workable.', tips: ['Consistency matters more than intensity — small daily practices beat occasional big ones', 'Track what helps and what doesn\'t — build your personal resilience toolkit', 'Your good days prove your capacity — your bad days prove your humanity', 'Focus on making your support practices non-negotiable, not optional'] };
      return { title: 'Robust Resilience', description: 'You\'ve built genuine resilience through practice, support, and self-awareness. This doesn\'t mean you don\'t struggle — it means you\'ve learned how to carry the struggle without being crushed by it.', tips: ['Share your resilience practices with other caregivers', 'Remember that resilience needs maintenance — don\'t take it for granted', 'Watch for compassion fatigue — even resilient people have limits', 'Your resilience is a gift to everyone in your caregiving circle'] };
    }
  },
  {
    id: 'guilt-pattern',
    title: 'What\'s Your Guilt Pattern?',
    description: 'Caregiver guilt comes in different flavors. Understanding your specific pattern helps you address the root, not just the symptom.',
    questions: [
      { q: 'You feel most guilty when:', options: ['I take time for myself', 'I feel angry or resentful', 'I think about my own future', 'I can\'t fix their suffering'] },
      { q: 'Your guilt sounds like:', options: ['"I should be doing more"', '"I shouldn\'t feel this way"', '"I\'m a bad person for wanting my life back"', '"If I were better at this, they wouldn\'t suffer"'] },
      { q: 'When you do something enjoyable:', options: ['I can\'t enjoy it — guilt ruins everything', 'I enjoy it but pay for it with guilt afterward', 'I avoid enjoyment to avoid the guilt', 'I\'ve learned to enjoy things without excessive guilt'] },
      { q: 'The person you compare yourself to:', options: ['The caregiver I think I should be', 'Other caregivers who seem to handle it better', 'The person I was before caregiving', 'I\'ve mostly stopped comparing'] },
      { q: 'Your guilt is strongest:', options: ['When I\'m resting', 'When I\'m feeling negative emotions', 'When I imagine life after caregiving', 'When things go wrong despite my best efforts'] },
    ],
    getResult: (answers) => {
      const counts = [0, 0, 0, 0];
      answers.forEach(a => counts[a]++);
      const max = counts.indexOf(Math.max(...counts));
      const results = [
        { title: 'Rest Guilt', description: 'You feel guilty for having needs. Every moment of rest feels stolen from the person you care for. This guilt is lying to you — rest isn\'t selfish, it\'s necessary.', tips: ['Schedule rest like a medical appointment — non-negotiable', 'Remind yourself: a depleted caregiver helps no one', 'Start with 15 minutes of guilt-free rest and build from there', 'Your body\'s need for rest is not optional — it\'s biological'] },
        { title: 'Emotion Guilt', description: 'You feel guilty for feeling. Anger, resentment, frustration — you judge yourself for having normal human responses to an abnormal situation. Your emotions are not the enemy.', tips: ['Every emotion you feel is valid — even the ugly ones', 'Resentment is not the opposite of love — it\'s the consequence of unsustainable giving', 'Find a space where you can express without being judged', 'Read our articles on the guilt section for deeper exploration'] },
        { title: 'Identity Guilt', description: 'You feel guilty for wanting your own life. The thought of a future beyond caregiving triggers shame, as if wanting something for yourself means you don\'t care enough.', tips: ['Wanting your life back doesn\'t mean you want them gone', 'You existed before this role — that person still matters', 'Plan one thing for your future this week — even something small', 'Identity guilt often masks anticipatory grief — look deeper'] },
        { title: 'Competence Guilt', description: 'You feel guilty because you can\'t fix it. Despite your best efforts, they still suffer — and you blame yourself. This guilt confuses effort with outcome.', tips: ['You are not responsible for their disease — only for your response to it', 'Doing your best is enough, even when the outcome isn\'t what you want', 'No amount of caregiving can stop a progressive illness', 'Redirect the energy from guilt to acceptance — it\'s more useful'] },
      ];
      return results[max];
    }
  },
  {
    id: 'support-needs',
    title: 'What Support Do You Actually Need Right Now?',
    description: 'Caregivers often say "I need help" without knowing what kind. This quiz gets specific.',
    questions: [
      { q: 'If someone offered to help right now, you\'d want them to:', options: ['Take over caregiving tasks for a few hours', 'Listen to me without trying to fix anything', 'Handle the logistics — calls, paperwork, scheduling', 'Just be present — sit with me in the hard'] },
      { q: 'The gap in your support is:', options: ['Practical — no one helps with the actual work', 'Emotional — no one understands what I\'m going through', 'Informational — I don\'t know what I don\'t know', 'Financial — I can\'t afford the help I need'] },
      { q: 'The help you\'ve received so far has been:', options: ['Absent — no one offers', 'Well-meaning but unhelpful', 'Inconsistent — sometimes there, sometimes not', 'Present but not enough'] },
      { q: 'What would change your life most right now:', options: ['Regular respite care — even a few hours weekly', 'A therapist or support group who gets it', 'A care coordinator who handles the bureaucracy', 'Financial assistance for caregiving costs'] },
      { q: 'When you think about asking for help:', options: ['I don\'t know who to ask', 'I know who to ask but I can\'t bring myself to', 'I\'ve asked and been disappointed', 'I ask but the help isn\'t the right kind'] },
    ],
    getResult: (answers) => {
      const counts = [0, 0, 0, 0];
      answers.forEach(a => counts[a]++);
      const max = counts.indexOf(Math.max(...counts));
      const results = [
        { title: 'You Need Practical Support', description: 'You need hands — someone to physically share the caregiving load. Not advice, not sympathy. Actual help with actual tasks.', tips: ['Be specific when asking: "Can you sit with Mom from 2-5 on Thursday?"', 'Look into local respite care services through your Area Agency on Aging', 'Consider a home health aide even for a few hours per week', 'Create a task list others can choose from — people help more when it\'s concrete'] },
        { title: 'You Need Emotional Support', description: 'You need to be heard. Not fixed, not advised — heard. The loneliness of caregiving is its own form of suffering, and you need someone who can witness it.', tips: ['Caregiver support groups (online or in-person) connect you with people who understand', 'A therapist specializing in caregiver burnout can provide professional support', 'Tell one person the unfiltered truth this week', 'Emotional support doesn\'t require hours — even 10 minutes of real connection helps'] },
        { title: 'You Need Informational Support', description: 'You\'re navigating a complex system without a map. You need guidance on medical decisions, insurance, legal matters, and care options.', tips: ['Contact your local Area Agency on Aging for free care coordination', 'A geriatric care manager can navigate the medical system for you', 'The Eldercare Locator (eldercare.acl.gov) connects you with local resources', 'Don\'t Google medical questions at 3 AM — write them down for the doctor'] },
        { title: 'You Need Financial Support', description: 'The financial burden of caregiving is real and under-discussed. You may be losing income, paying for care, or both.', tips: ['Check if your state has a paid family caregiver program', 'The VA offers caregiver support programs for veterans\' families', 'Look into the National Family Caregiver Support Program (NFCSP)', 'A financial advisor familiar with eldercare can identify benefits you\'re missing'] },
      ];
      return results[max];
    }
  },
];

function generatePDF(quiz: Quiz, result: ReturnType<Quiz['getResult']>, answers: number[]) {
  const content = `
THE KEEPER'S FLAME — QUIZ RESULTS
===================================

Quiz: ${quiz.title}
Date: ${new Date().toLocaleDateString()}

YOUR RESULT: ${result.title}

${result.description}

RECOMMENDATIONS:
${result.tips.map((t, i) => `${i + 1}. ${t}`).join('\n')}

YOUR ANSWERS:
${quiz.questions.map((q, i) => `Q: ${q.q}\nA: ${q.options[answers[i]]}`).join('\n\n')}

---
This assessment is for educational purposes only and is not a substitute for professional medical or psychological advice.
Visit keepersflame.love for more resources.
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `keepers-flame-${quiz.id}-results.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ReturnType<Quiz['getResult']> | null>(null);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setResult(quiz.getResult(newAnswers));
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  };

  if (!started) {
    return (
      <div className="quiz-card">
        <h3>{quiz.title}</h3>
        <p>{quiz.description}</p>
        <button onClick={() => setStarted(true)} className="btn-primary">{quiz.questions.length} Questions — Start Quiz</button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="quiz-card quiz-result">
        <h3>Your Result: {result.title}</h3>
        <p>{result.description}</p>
        <h4>What You Can Do:</h4>
        <ul>
          {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => generatePDF(quiz, result, answers)} className="btn-secondary">Download Results</button>
          <button onClick={reset} className="btn-outline">Retake Quiz</button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[currentQ];
  return (
    <div className="quiz-card quiz-active">
      <div className="quiz-progress">Question {currentQ + 1} of {quiz.questions.length}</div>
      <h3>{q.q}</h3>
      <div className="quiz-options">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} className="quiz-option">{opt}</button>
        ))}
      </div>
    </div>
  );
}

export function QuizzesPage() {
  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
        <h1>Caregiver Quizzes</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          These quizzes are designed to help you understand yourself better — not to diagnose or label you. 
          Take them honestly, read the results carefully, and use what resonates. Nothing is stored. 
          Your answers stay on your screen and disappear when you leave.
        </p>
        <div className="quizzes-grid">
          {QUIZZES.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p>Looking for more structured evaluation? Try our <Link to="/assessments">in-depth assessments</Link> or the <Link to="/burnout-check">burnout check</Link>.</p>
        </div>
      </div>
    </div>
  );
}
