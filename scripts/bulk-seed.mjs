#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// BULK SEED — 500 Articles via DeepSeek V4-Pro
// Bunny CDN Library Rotation for images
// Quality gate enforced on every article
// ═══════════════════════════════════════════════════════════════

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-82bdad0a1fd34987b73030504ae67080';
const AMAZON_TAG = 'spankyspinola-20';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_PATH = path.resolve(ROOT, 'src/data/articles.json');

// ─── BUNNY CDN ───
const BUNNY_STORAGE_ZONE = "keepers-flame";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "7940564d-abc6-43e5-a472cbba3ae6-0fac-4c26";
const BUNNY_CDN_BASE = "https://keepers-flame.b-cdn.net";

const SITE_DOMAIN = "https://keepersflame.love";
const SITE_NAME = "The Keeper's Flame";
const AUTHOR_NAME = "Kalesh";
const AUTHOR_TITLE = "Consciousness Teacher & Writer";
const AUTHOR_URL = "https://kalesh.love";

// ─── 40-IMAGE LIBRARY ───
const LIBRARY_IMAGES = Array.from({ length: 40 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  const names = [
    'hands-holding-candle','empty-chair-by-window','two-cups-of-tea','woman-looking-at-horizon',
    'hands-on-journal','walking-path-through-trees','sleeping-figure-on-couch','hand-reaching-for-hand',
    'kitchen-morning-light','person-sitting-on-porch','stacked-books-nightstand','rain-on-window-reflection',
    'garden-hands-in-soil','bridge-over-still-water','wheelchair-beside-window','tangled-yarn',
    'sunrise-through-curtains','old-photo-album','person-in-bathtub','two-shadows-walking',
    'cracked-pottery-gold','lighthouse-in-fog','hands-folding-laundry','tree-roots-exposed',
    'mirror-reflection','staircase-light','wilted-flowers-vase','person-at-desk-night',
    'open-door-sunlight','hands-braiding-hair','empty-swing','pill-organizer',
    'person-hugging-pillow','river-stones','cooking-together','night-sky-stars',
    'hospital-hallway','hands-holding-coffee','autumn-leaves-path','window-condensation',
  ];
  return `${BUNNY_CDN_BASE}/library/lib-${num}-${names[i]}.webp`;
});

const CATEGORIES = [
  { slug: "the-weight", name: "The Weight" },
  { slug: "the-guilt", name: "The Guilt" },
  { slug: "the-practical", name: "The Practical" },
  { slug: "the-family", name: "The Family" },
  { slug: "the-sacred", name: "The Sacred" },
];

const EXTERNAL_AUTHORITY_SITES = [
  "https://www.caregiver.org", "https://www.aarp.org/caregiving",
  "https://www.nia.nih.gov", "https://www.apa.org", "https://www.alz.org",
  "https://www.mayoclinic.org", "https://www.ncbi.nlm.nih.gov", "https://www.nami.org",
];

const KALESH_PHRASES = [
  "The mind is not the enemy. The identification with it is.",
  "Most of what passes for healing is just rearranging the furniture in a burning house.",
  "Awareness doesn't need to be cultivated. It needs to be uncovered.",
  "The nervous system doesn't respond to what you believe. It responds to what it senses.",
  "You cannot think your way into a felt sense of safety. The body has its own logic.",
  "Every resistance is information. The question is whether you're willing to read it.",
  "The gap between stimulus and response is where your entire life lives.",
  "Consciousness doesn't arrive. It's what's left when everything else quiets down.",
  "There is no version of growth that doesn't involve the dissolution of something you thought was permanent.",
  "Trauma reorganizes perception. Recovery reorganizes it again, but this time with your participation.",
  "Embodiment is not a technique. It's what happens when you stop living exclusively in your head.",
  "Most people don't fear change. They fear the gap between who they were and who they haven't become yet.",
  "Attention is the most undervalued resource you have. Everything else follows from where you place it.",
  "Sit with it long enough and even the worst feeling reveals its edges.",
  "The body remembers what the mind would prefer to file away.",
  "The paradox of acceptance is that nothing changes until you stop demanding that it does.",
  "Information without integration is just intellectual hoarding.",
  "Your nervous system doesn't care about your philosophy. It cares about what happened at three years old.",
  "Not every insight requires action. Some just need to be witnessed.",
  "You are not a problem to be solved. You are a process to be witnessed.",
  "Silence is not the absence of noise. It's the presence of attention.",
  "The breath doesn't need your management. It needs your companionship.",
  "We are not our thoughts, but we are responsible for our relationship to them.",
  "Reading about meditation is to meditation what reading the menu is to eating.",
  "The wellness industry sells solutions to problems it helps you believe you have.",
  "Complexity is the ego's favorite hiding place.",
  "The body has a grammar. Most of us never learned to read it.",
  "Freedom is not the absence of constraint. It's the capacity to choose your relationship to it.",
  "The most important things in life cannot be understood, only experienced.",
  "The brain is prediction machinery. Anxiety is just prediction running without a stop button.",
];

const CONVERSATIONAL_INTERJECTIONS = [
  "Stay with me here.", "I know, I know.", "Wild, right?",
  "Think about that for a second.", "Here is the thing though.",
  "And honestly?", "Look.", "Sit with that for a moment.",
  "No really.", "Bear with me.", "How does that make you feel?",
  "Right?!", "Know what I mean?",
];

const RESEARCHERS = [
  "Jiddu Krishnamurti", "Alan Watts", "Sam Harris", "Sadhguru", "Tara Brach",
  "Pauline Boss", "Barry Jacobs", "Christina Maslach", "Bessel van der Kolk",
  "Stephen Porges", "Gabor Mate", "Jon Kabat-Zinn",
];

const OPENERS = ['scene-setting', 'provocation', 'first-person', 'question', 'named-reference', 'gut-punch'];

const AI_WORDS = [
  'delve','delving','tapestry','paradigm','synergy','leverage','leveraging','unlock','empower',
  'utilize','utilizing','pivotal','embark','embarking','underscore','paramount','seamlessly',
  'robust','beacon','foster','fostering','elevate','curate','curated','bespoke',
  'resonate','harness','intricate','plethora','myriad','comprehensive',
  'transformative','groundbreaking','innovative','cutting-edge','revolutionary',
  'state-of-the-art','ever-evolving','game-changing','next-level','world-class',
  'unparalleled','unprecedented','remarkable','extraordinary','exceptional',
  'profound','profoundly','holistic','nuanced','multifaceted','stakeholders',
  'ecosystem','landscape','realm','sphere','domain',
  'arguably','notably','crucially','importantly','essentially',
  'fundamentally','inherently','intrinsically','substantively',
  'streamline','streamlining','optimize','optimizing','facilitate','facilitating',
  'amplify','catalyze','propel','spearhead','orchestrate','navigate','traverse',
  'furthermore','moreover','additionally','consequently','subsequently',
  'thereby','thusly','wherein','whereby',
];

const FALLBACK_PRODUCTS = [
  { name: 'The Body Keeps the Score by Bessel van der Kolk', asin: '0143127748' },
  { name: 'Burnout: The Secret to Unlocking the Stress Cycle', asin: '1984818325' },
  { name: 'YnM Weighted Blanket', asin: 'B073429DV2' },
  { name: 'The 36-Hour Day by Nancy Mace', asin: '1421422239' },
  { name: 'UTK Cordless Heating Pad', asin: 'B0F98J3TS7' },
  { name: 'MONAHITO Meditation Cushion', asin: 'B0BMFY81DF' },
  { name: "Dr Teal's Lavender Epsom Salt Soak", asin: 'B07NF79DKC' },
  { name: 'Gaiam Yoga Mat Premium 6mm', asin: 'B07NHSFZSB' },
  { name: 'Ring Indoor Cam 1080p HD', asin: 'B0B6GJBKRK' },
  { name: 'Stanley Quencher H2.0 Tumbler 40oz', asin: 'B0DCDS4D5L' },
  { name: 'Radical Acceptance by Tara Brach', asin: '0553380990' },
  { name: "Man's Search for Meaning by Viktor Frankl", asin: '0807014273' },
];

// ─── TOPIC BANKS (500 unique topics across 5 categories) ───
const TOPIC_BANK = {
  'the-weight': [
    'The Exhaustion Nobody Warns You About',
    'When Your Body Starts Keeping Score',
    'The Invisible Tax of Constant Vigilance',
    'How Burnout Rewires Your Brain Chemistry',
    'The Weight of Being the Only One Who Notices',
    'When Rest Feels Like a Foreign Language',
    'Your Adrenal System Is Not Designed for This',
    'The Slow Collapse Nobody Talks About',
    'When Compassion Becomes a Full-Time Job',
    'The Neurological Cost of Hypervigilance',
    'Why Caregivers Age Faster Than Their Peers',
    'The Exhaustion That Sleep Cannot Fix',
    'When Your Nervous System Forgets How to Relax',
    'The Hidden Inflammation of Chronic Stress',
    'How Caregiving Changes Your Pain Threshold',
    'The Weight of Decisions Nobody Else Will Make',
    'When Your Body Whispers Before It Screams',
    'The Cortisol Trap That Keeps You Wired',
    'Why You Cannot Remember What You Used to Enjoy',
    'The Physical Cost of Emotional Labor',
    'When Adrenaline Becomes Your Default State',
    'The Exhaustion Spiral Nobody Teaches You About',
    'How Chronic Stress Steals Your Sleep Architecture',
    'The Weight of Anticipatory Grief on Your Body',
    'When Your Immune System Pays the Price',
    'The Muscle Tension You Stopped Noticing Years Ago',
    'How Burnout Mimics Depression',
    'The Weight of Being Strong for Everyone Else',
    'When Your Body Keeps the Calendar of Their Decline',
    'The Fatigue That Lives in Your Bones',
    'Why Your Jaw Hurts Every Morning',
    'The Weight of Medical Appointments Nobody Else Attends',
    'When Exhaustion Becomes Your Personality',
    'The Hidden Toll of Medication Management',
    'How Caregiving Rewires Your Threat Detection',
    'The Weight of Being the Emergency Contact',
    'When Your Body Forgets What Calm Feels Like',
    'The Chronic Headache of Chronic Caregiving',
    'Why Your Appetite Disappeared Six Months Ago',
    'The Weight of Watching Someone You Love Forget You',
    'When Your Heart Rate Never Comes Back Down',
    'The Physical Geography of Grief',
    'How Burnout Changes Your Relationship with Food',
    'The Weight of Being the Last One Standing',
    'When Your Back Pain Is Actually Grief',
    'The Exhaustion of Translating Medical Jargon',
    'Why Your Hands Shake When the Phone Rings',
    'The Weight of Nighttime Caregiving',
    'When Your Body Starts Speaking in Symptoms',
    'The Invisible Bruises of Emotional Caregiving',
    'How Chronic Stress Affects Your Gut',
    'The Weight of Being the Family Shock Absorber',
    'When Your Eyes Burn from Tears You Never Shed',
    'The Fatigue of Performing Wellness',
    'How Caregiving Changes Your Relationship with Time',
    'The Weight of Knowing What Is Coming',
    'When Your Body Runs on Fumes and Duty',
    'The Hidden Cost of Being the Responsible One',
    'How Burnout Steals Your Sense of Humor',
    'The Weight of Silence in a House Full of Need',
    'When Your Shoulders Carry More Than Groceries',
    'The Exhaustion of Explaining What You Do All Day',
    'How Chronic Caregiving Affects Your Memory',
    'The Weight of Being Both Nurse and Daughter',
    'When Your Body Keeps a Ledger of Every Sacrifice',
    'The Fatigue That No Vacation Can Touch',
    'How Burnout Changes Your Voice',
    'The Weight of Watching Medicine Fail',
    'When Your Nervous System Lives in Tomorrow',
    'The Physical Cost of Swallowed Anger',
    'How Caregiving Steals Your Weekends',
    'The Weight of Being the One Who Stays',
    'When Your Body Mourns What Your Mind Denies',
    'The Exhaustion of Being Needed Constantly',
    'How Chronic Stress Rewires Your Sleep Patterns',
    'The Weight of Carrying Two Lives',
    'When Your Fatigue Has Its Own Fatigue',
    'The Hidden Toll of Emotional Regulation',
    'How Burnout Changes What You See in the Mirror',
    'The Weight of Being the Family Memory',
    'When Your Body Stops Believing in Rest',
    'The Exhaustion of Advocating for Someone Else',
    'How Caregiving Changes Your Relationship with Anger',
    'The Weight of Being Present When You Want to Run',
    'When Your Stress Response Becomes Your Baseline',
    'The Physical Price of Unconditional Love',
    'How Burnout Erodes Your Sense of Self',
    'The Weight of Being the One Who Knows the Passwords',
    'When Your Body Keeps the Night Watch',
    'The Exhaustion of Being the Bridge Between Doctors',
    'How Chronic Caregiving Affects Your Hormones',
    'The Weight of Being the Family Translator',
    'When Your Muscles Remember What Your Mind Forgets',
    'The Fatigue of Making Decisions for Two',
    'How Burnout Changes Your Relationship with Hope',
    'The Weight of Being the One Who Never Gets Sick',
    'When Your Body Becomes the Battleground',
    'The Exhaustion of Maintaining Normal',
    'How Caregiving Changes Your Relationship with Your Own Body',
    'The Weight of Being the Last Voice They Hear at Night',
  ],
  'the-guilt': [
    'The Guilt of Wanting Your Life Back',
    'When You Feel Relief and Then Shame',
    'The Guilt of Not Being Enough',
    'How Guilt Becomes Your Constant Companion',
    'The Guilt of Taking a Day Off',
    'When You Resent the Person You Love Most',
    'The Guilt of Wishing It Were Over',
    'How Guilt Distorts Your Decision Making',
    'The Guilt of Choosing Your Children Over Your Parents',
    'When Guilt Wakes You at Three in the Morning',
    'The Guilt of Not Knowing What to Do',
    'How Guilt Masquerades as Responsibility',
    'The Guilt of Laughing When They Cannot',
    'When You Feel Guilty for Feeling Guilty',
    'The Guilt of Setting Boundaries with Someone Who Is Dying',
    'How Guilt Keeps You Trapped in Overgiving',
    'The Guilt of Hiring Help',
    'When Guilt Tells You That You Should Have Done More',
    'The Guilt of Moving On Before They Are Gone',
    'How Guilt Sabotages Your Self-Care',
    'The Guilt of Being Healthy While They Decline',
    'When Guilt Makes You Say Yes to Everything',
    'The Guilt of Losing Your Patience',
    'How Guilt Rewrites Your Memories',
    'The Guilt of Not Visiting Enough',
    'When Guilt Becomes Your Default Emotion',
    'The Guilt of Wanting to Be Somewhere Else',
    'How Guilt Prevents You from Asking for Help',
    'The Guilt of Not Being the Favorite Child',
    'When Guilt Makes You Overcompensate',
    'The Guilt of Choosing a Nursing Home',
    'How Guilt Affects Your Other Relationships',
    'The Guilt of Being the Distant Caregiver',
    'When Guilt Tells You Love Should Be Enough',
    'The Guilt of Not Crying at the Right Times',
    'How Guilt Keeps You from Sleeping',
    'The Guilt of Having Needs of Your Own',
    'When Guilt Makes You Invisible',
    'The Guilt of Not Being There at the End',
    'How Guilt Distorts Your Sense of Time',
    'The Guilt of Feeling Angry at Someone Who Is Sick',
    'When Guilt Becomes a Form of Self-Punishment',
    'The Guilt of Not Doing It the Way Your Mother Would Have',
    'How Guilt Makes You a Worse Caregiver',
    'The Guilt of Prioritizing Your Marriage',
    'When Guilt Steals Your Joy',
    'The Guilt of Not Being a Medical Professional',
    'How Guilt Keeps You from Grieving',
    'The Guilt of Wanting Recognition',
    'When Guilt Makes You Compete with Siblings',
    'The Guilt of Taking Medication to Cope',
    'When Guilt Follows You to the Grocery Store',
    'The Guilt of Forgetting Their Medication Once',
    'How Guilt Makes You Micromanage',
    'The Guilt of Not Being Patient Enough',
    'When Guilt Tells You Everyone Else Does It Better',
    'The Guilt of Feeling Trapped',
    'How Guilt Erodes Your Confidence',
    'The Guilt of Not Calling Every Day',
    'When Guilt Makes You Apologize for Existing',
    'The Guilt of Having a Good Day',
    'How Guilt Prevents You from Planning Your Future',
    'The Guilt of Saying No to Their Requests',
    'When Guilt Becomes Your Identity',
    'The Guilt of Not Being Sad Enough',
    'How Guilt Keeps You from Celebrating',
    'The Guilt of Eating Well When They Cannot',
    'When Guilt Makes You the Family Martyr',
    'The Guilt of Not Understanding Their Disease',
    'How Guilt Affects Your Physical Health',
    'The Guilt of Wanting to Travel',
    'When Guilt Tells You Rest Is Selfish',
    'The Guilt of Not Being Spiritual Enough About It',
    'How Guilt Prevents You from Being Honest',
    'The Guilt of Feeling Bored by Their Stories',
    'When Guilt Makes You Overspend on Their Care',
    'The Guilt of Not Being the Son They Wanted',
    'How Guilt Keeps You from Setting Limits',
    'The Guilt of Dreaming About After',
    'When Guilt Makes You Forget Who You Were Before',
    'The Guilt of Not Being Grateful Enough',
    'How Guilt Distorts Your Relationship with Money',
    'The Guilt of Feeling Nothing',
    'When Guilt Becomes the Only Way You Know You Care',
    'The Guilt of Not Doing Enough Research',
    'How Guilt Makes You Afraid of Happiness',
    'The Guilt of Being the One Who Lives Far Away',
    'When Guilt Tells You Their Pain Is Your Fault',
    'The Guilt of Not Being Able to Fix It',
    'How Guilt Keeps You Awake Replaying the Day',
    'The Guilt of Choosing Your Career',
    'When Guilt Makes You Promise Things You Cannot Deliver',
    'The Guilt of Not Being There for the Small Moments',
    'How Guilt Prevents You from Accepting Help Gracefully',
    'The Guilt of Feeling Jealous of Other Families',
    'When Guilt Becomes Your Morning Alarm',
    'The Guilt of Not Being Strong Enough',
    'How Guilt Makes You Lie About How You Are Doing',
    'The Guilt of Wanting Silence',
    'When Guilt Follows You Into Your Dreams',
  ],
  'the-practical': [
    'How to Build a Caregiving Schedule That Actually Works',
    'The Financial Planning Nobody Tells New Caregivers About',
    'Medication Management Without Losing Your Mind',
    'How to Talk to Doctors When They Do Not Listen',
    'Building a Care Team When You Are the Only One',
    'The Legal Documents Every Caregiver Needs Yesterday',
    'How to Manage Someone Else\'s Money Without Resentment',
    'The Technology That Actually Helps Caregivers',
    'How to Childproof a House for an Adult',
    'The Insurance Maze Nobody Prepared You For',
    'How to Have the Conversation About Driving',
    'Building a Medical Binder That Saves Lives',
    'The Art of Bathing Someone Who Refuses',
    'How to Feed Someone Who Has Lost Their Appetite',
    'Managing Incontinence Without Losing Dignity',
    'The Practical Guide to Hospital Discharge Planning',
    'How to Set Up a Safe Sleeping Environment',
    'The Caregiver\'s Guide to Home Modifications',
    'How to Manage Pain When They Cannot Tell You Where It Hurts',
    'The Practical Side of Hospice Nobody Explains',
    'How to Keep Track of Multiple Medications',
    'Building a Support Network from Scratch',
    'The Caregiver\'s Guide to Nutrition on No Time',
    'How to Handle Wandering Behavior Safely',
    'The Practical Guide to Respite Care',
    'How to Communicate with Someone Who Has Dementia',
    'The Financial Aid Programs Most Caregivers Never Find',
    'How to Manage Your Own Health While Managing Theirs',
    'The Practical Guide to Emergency Preparedness',
    'How to Navigate the VA Benefits System',
    'Building a Daily Routine That Serves Everyone',
    'The Caregiver\'s Guide to Sleep Hygiene',
    'How to Handle Aggressive Behavior with Compassion',
    'The Practical Guide to Adult Day Programs',
    'How to Create a Safe Bathroom for Aging Parents',
    'The Caregiver\'s Guide to Telehealth',
    'How to Manage Appointments Across Multiple Specialists',
    'The Practical Guide to Meal Prepping for Two Diets',
    'How to Handle Sundowning Without Medication',
    'The Caregiver\'s Guide to Physical Therapy at Home',
    'How to Set Up a Monitoring System That Respects Privacy',
    'The Practical Guide to Transitioning to Memory Care',
    'How to Manage Chronic Wound Care at Home',
    'The Caregiver\'s Guide to Mobility Equipment',
    'How to Handle Medication Side Effects',
    'The Practical Guide to Long-Distance Caregiving',
    'How to Create a Communication Plan for the Care Team',
    'The Caregiver\'s Guide to Understanding Lab Results',
    'How to Manage Dental Care for Someone Who Cannot Cooperate',
    'The Practical Guide to Funeral Planning While They Are Still Alive',
    'How to Handle the Paperwork Avalanche',
    'The Caregiver\'s Guide to Preventing Falls',
    'How to Set Up Automatic Bill Pay for Someone Else',
    'The Practical Guide to Choosing Home Health Aides',
    'How to Manage Oxygen Equipment at Home',
    'The Caregiver\'s Guide to Understanding Medicare Parts',
    'How to Handle Food Safety for Immunocompromised Patients',
    'The Practical Guide to Transportation Options',
    'How to Create a Medical Emergency Plan',
    'The Caregiver\'s Guide to Skin Care and Pressure Sores',
    'How to Manage Diabetes for Someone Else',
    'The Practical Guide to Adaptive Clothing',
    'How to Handle Hoarding Behavior with Compassion',
    'The Caregiver\'s Guide to Hydration Strategies',
    'How to Set Up a Pill Dispensing System',
    'The Practical Guide to Caregiver Tax Deductions',
    'How to Handle Resistance to Personal Care',
    'The Caregiver\'s Guide to Understanding Hospice Eligibility',
    'How to Create a Sensory-Friendly Environment',
    'The Practical Guide to Navigating Medicaid Applications',
    'How to Manage Multiple Chronic Conditions Simultaneously',
    'The Caregiver\'s Guide to Assistive Technology',
    'How to Handle the Transition from Hospital to Home',
    'The Practical Guide to Caregiver Support Groups',
    'How to Create a Safe Kitchen for Someone with Dementia',
    'The Caregiver\'s Guide to Understanding Palliative Care',
    'How to Manage Behavioral Changes After a Stroke',
    'The Practical Guide to Power of Attorney',
    'How to Handle Insurance Denials and Appeals',
    'The Caregiver\'s Guide to Wound Care Basics',
    'How to Set Up a Home Pharmacy System',
    'The Practical Guide to Choosing the Right Walker',
    'How to Manage Constipation in Elderly Patients',
    'The Caregiver\'s Guide to Understanding DNR Orders',
    'How to Handle the Logistics of Moving a Parent',
    'The Practical Guide to Caregiver Burnout Prevention Tools',
    'How to Create a Weekly Menu for Special Diets',
    'The Caregiver\'s Guide to Home Safety Assessments',
    'How to Manage Anxiety in Someone with Dementia',
    'The Practical Guide to Choosing Adult Diapers',
    'How to Handle the Financial Conversation with Siblings',
    'The Caregiver\'s Guide to Understanding Advance Directives',
    'How to Set Up a Caregiver Journal System',
    'The Practical Guide to Bed Transfer Techniques',
    'How to Manage Vision and Hearing Loss in Elderly Parents',
    'The Caregiver\'s Guide to Respite Care Options',
    'How to Handle the Emotional Side of Estate Planning',
    'The Practical Guide to Choosing a Medical Alert System',
    'How to Create a Caregiver Emergency Kit',
    'The Caregiver\'s Guide to Understanding Drug Interactions',
  ],
  'the-family': [
    'When Siblings Disappear During the Hard Parts',
    'The Family Meeting Nobody Wants to Have',
    'How Caregiving Exposes Every Family Fracture',
    'When Your Spouse Feels Like a Stranger',
    'The Sibling Who Does Nothing and Criticizes Everything',
    'How to Talk to Your Children About Grandma\'s Decline',
    'When Your Parent Plays Favorites from Their Sickbed',
    'The Marriage That Caregiving Almost Destroyed',
    'How to Handle the Sibling Who Lives Far Away',
    'When Your Family Gaslights Your Caregiving Experience',
    'The In-Law Dynamic Nobody Prepared You For',
    'How Caregiving Changes Your Relationship with Your Children',
    'When Your Parent Refuses Help from Anyone But You',
    'The Family Secret That Surfaces During Caregiving',
    'How to Set Boundaries with a Narcissistic Parent You Are Caring For',
    'When Your Siblings Fight Over the Will Before Anyone Dies',
    'The Sandwich Generation Is Not a Metaphor',
    'How to Protect Your Marriage During Caregiving',
    'When Your Parent Becomes a Different Person',
    'The Family Dynamic That Makes Caregiving Harder',
    'How to Handle Unsolicited Advice from Family',
    'When Your Children Resent the Time You Give to Grandpa',
    'The Sibling Rivalry That Never Died',
    'How Caregiving Reveals Who Your Real Friends Are',
    'When Your Family Expects You to Do It All',
    'The Conversation About Money Nobody Wants to Start',
    'How to Handle a Parent Who Refuses to Accept Their Diagnosis',
    'When Your Spouse Gives You an Ultimatum',
    'The Family Roles That Were Assigned in Childhood',
    'How to Navigate Blended Family Caregiving',
    'When Your Parent Trusts the Aide More Than You',
    'The Guilt Trip Your Sibling Uses as a Weapon',
    'How Caregiving Changes Your Relationship with Death',
    'When Your Family Cannot Agree on a Care Plan',
    'The Parent Who Was Never There Now Needs Everything',
    'How to Handle Family Visits That Make Everything Worse',
    'When Your Sibling Questions Every Decision You Make',
    'The Family Pattern of Women Doing All the Care Work',
    'How to Talk to Your Teenager About What Is Happening',
    'When Your Parent Refuses to Leave Their Home',
    'The Inheritance Conversation That Tears Families Apart',
    'How Caregiving Affects Your Relationship with Your Own Aging',
    'When Your Family Minimizes Your Burnout',
    'The Sibling Who Shows Up Only for the Good Parts',
    'How to Handle a Parent with Undiagnosed Mental Illness',
    'When Your Spouse Becomes Your Second Patient',
    'The Family Meeting That Actually Worked',
    'How to Divide Caregiving Tasks Among Unequal Siblings',
    'When Your Parent Compares You to Your Sibling',
    'The Cost of Being the Dutiful Daughter',
    'How Caregiving Changes Your Definition of Family',
    'When Your Family Blames You for Their Decline',
    'The Sibling Who Only Calls to Check on the Money',
    'How to Handle Cultural Expectations Around Caregiving',
    'When Your Parent Refuses to Discuss End-of-Life Wishes',
    'The Family Dynamic Where Everyone Has an Opinion But Nobody Helps',
    'How to Protect Your Children from Caregiver Burnout Spillover',
    'When Your Marriage Becomes a Casualty of Caregiving',
    'The Parent Who Uses Guilt as Currency',
    'How to Handle Family Members Who Undermine Your Authority',
    'When Your Sibling Accuses You of Elder Abuse',
    'The Family Reunion Nobody Wants to Attend',
    'How Caregiving Exposes the Myth of the Perfect Family',
    'When Your Parent Gives Everything to the Child Who Does Nothing',
    'The Conversation About Driving That Ends in Tears',
    'How to Handle a Parent Who Hoards',
    'When Your Family Expects Gratitude for Minimal Help',
    'The Sibling Dynamic That Changes When a Parent Gets Sick',
    'How to Navigate Caregiving When You Are Not the Legal Guardian',
    'When Your Parent Refuses to Acknowledge Your Sacrifice',
    'The Family Pattern of Silence Around Suffering',
    'How Caregiving Changes Your Relationship with Holidays',
    'When Your Spouse Feels Neglected',
    'The Sibling Who Promises to Help and Never Does',
    'How to Handle Family Criticism of Your Care Choices',
    'When Your Parent Becomes Verbally Abusive',
    'The Family Meeting That Ended in Silence',
    'How to Navigate Caregiving Across Cultural Boundaries',
    'When Your Children Ask Why Grandma Does Not Remember Them',
    'The Cost of Being the Family Peacekeeper',
    'How Caregiving Changes Your Relationship with Trust',
    'When Your Family Treats Caregiving Like a Competition',
    'The Parent Who Never Said Thank You',
    'How to Handle the Sibling Who Only Shows Up at the Hospital',
    'When Your Family Cannot Accept the Diagnosis',
    'The Conversation About Assisted Living Nobody Wants to Have',
    'How Caregiving Reveals Your Family\'s True Values',
    'When Your Parent Plays Siblings Against Each Other',
    'The Family Dynamic Where Love and Resentment Coexist',
    'How to Handle a Parent Who Refuses All Medical Treatment',
    'When Your Spouse Becomes Jealous of Your Parent',
    'The Sibling Who Moved Away and Feels No Guilt',
    'How Caregiving Changes Your Understanding of Forgiveness',
    'When Your Family Expects You to Be Available Around the Clock',
    'The Parent Who Was Abusive and Now Needs Your Help',
    'How to Handle Family Pressure to Keep Them at Home',
    'When Your Children Start Parenting You',
    'The Family Secret That Complicates Caregiving',
    'How Caregiving Changes Your Relationship with Boundaries',
    'When Your Family Disagrees About Hospice',
    'The Cost of Being the Only Sibling Who Stayed',
  ],
  'the-sacred': [
    'Caregiving as a Contemplative Practice',
    'The Spirituality Nobody Teaches You About',
    'When Suffering Becomes Your Teacher',
    'How Caregiving Cracks You Open',
    'The Sacred Dimension of Wiping Someone\'s Face',
    'When Prayer Feels Like Talking to a Wall',
    'The Meditation That Happens Between Midnight and Dawn',
    'How Grief Becomes a Doorway',
    'The Spiritual Crisis of Watching Someone Suffer',
    'When Your Faith Cannot Hold the Weight',
    'The Contemplative Art of Waiting',
    'How Caregiving Teaches You About Impermanence',
    'The Sacred Ordinary of Daily Care',
    'When God Feels Absent in the Hospital Room',
    'The Spiritual Practice of Not Knowing',
    'How Suffering Strips Away Everything Unnecessary',
    'The Meditation of Changing Sheets at Three AM',
    'When Your Spiritual Practice Becomes Survival',
    'The Sacred Anger That Nobody Talks About',
    'How Caregiving Teaches You About Surrender',
    'The Contemplative Practice of Presence',
    'When Buddhism Meets Bedpan',
    'The Spiritual Gift Hidden in Exhaustion',
    'How Grief Opens Doors You Did Not Know Existed',
    'The Sacred Practice of Bearing Witness',
    'When Mindfulness Meets the Chaos of Caregiving',
    'The Spiritual Dimension of Physical Touch',
    'How Caregiving Teaches You About Non-Attachment',
    'The Contemplative Art of Listening',
    'When Your Meditation Cushion Gathers Dust',
    'The Sacred Space Between Breaths',
    'How Suffering Teaches You About Compassion',
    'The Spiritual Practice of Showing Up',
    'When Yoga Cannot Touch Your Pain',
    'The Contemplative Dimension of Feeding Someone',
    'How Caregiving Becomes a Path to Awakening',
    'The Sacred Ordinary of Holding Someone\'s Hand',
    'When Your Spiritual Community Does Not Understand',
    'The Meditation That Happens in the Waiting Room',
    'How Grief Teaches You About Love',
    'The Spiritual Practice of Letting Go While Holding On',
    'When Silence Becomes Your Only Prayer',
    'The Contemplative Art of Accepting Help',
    'How Caregiving Teaches You About the Body',
    'The Sacred Dimension of Nighttime Vigils',
    'When Your Mantra Becomes Please Let Them Sleep',
    'The Spiritual Gift of Being Needed',
    'How Suffering Teaches You About Presence',
    'The Contemplative Practice of Forgiveness',
    'When Faith and Fatigue Collide',
    'The Sacred Art of Doing Nothing',
    'How Caregiving Teaches You About Death',
    'The Spiritual Practice of Gratitude in Darkness',
    'When Your Church Cannot Hold Your Grief',
    'The Contemplative Dimension of Medication Rounds',
    'How Grief Becomes a Spiritual Teacher',
    'The Sacred Practice of Breathing Together',
    'When Enlightenment Looks Like Clean Laundry',
    'The Spiritual Dimension of Exhaustion',
    'How Caregiving Teaches You About Patience',
    'The Contemplative Art of Being Present to Pain',
    'When Your Spiritual Practice Is Just Getting Through the Day',
    'The Sacred Ordinary of Making Their Bed',
    'How Suffering Opens the Heart',
    'The Spiritual Practice of Radical Acceptance',
    'When Meditation Becomes Sitting with Their Fear',
    'The Contemplative Dimension of Bathing Someone',
    'How Caregiving Teaches You About Grace',
    'The Sacred Space of the Sickroom',
    'When Your Prayer Is Just Breathing',
    'The Spiritual Gift of Vulnerability',
    'How Grief Teaches You About Impermanence',
    'The Contemplative Practice of Cooking for Someone Who Cannot Taste',
    'When Your Spiritual Path Leads Through a Hospital',
    'The Sacred Dimension of Changing Dressings',
    'How Caregiving Teaches You About Interdependence',
    'The Spiritual Practice of Being with What Is',
    'When Compassion Fatigue Meets Spiritual Bypassing',
    'The Contemplative Art of Waiting for Test Results',
    'How Suffering Teaches You About Letting Go',
    'The Sacred Practice of Reading Aloud',
    'When Your Faith Is Tested by Their Pain',
    'The Spiritual Dimension of Physical Decline',
    'How Caregiving Teaches You About Humility',
    'The Contemplative Practice of Walking Slowly',
    'When Your Meditation Is Counting Their Breaths',
    'The Sacred Ordinary of Preparing Their Medication',
    'How Grief Teaches You About Connection',
    'The Spiritual Practice of Staying When You Want to Run',
    'When Enlightenment Looks Like Patience',
    'The Contemplative Dimension of Night Sounds',
    'How Caregiving Teaches You About Your Own Mortality',
    'The Sacred Art of Being Fully Present',
    'When Your Spiritual Practice Is Just Love',
    'The Contemplative Practice of Accepting What Cannot Be Changed',
    'How Suffering Becomes the Path',
    'The Sacred Dimension of the Last Conversation',
    'When Your Faith Is the Only Thing Left',
    'The Spiritual Practice of Holding Both Joy and Sorrow',
    'How Caregiving Teaches You Everything You Need to Know',
    'The Sacred Ordinary of One More Day',
  ],
};

function cleanAIWords(text) {
  const replacements = {
    'profound': 'deep', 'profoundly': 'deeply', 'transformative': 'life-changing',
    'holistic': 'whole-person', 'nuanced': 'layered', 'multifaceted': 'complex',
    'delve': 'dig', 'delving': 'digging', 'tapestry': 'web',
    'landscape': 'territory', 'paradigm': 'model', 'synergy': 'connection',
    'leverage': 'use', 'leveraging': 'using', 'robust': 'strong',
    'utilize': 'use', 'utilizing': 'using', 'facilitate': 'support',
    'facilitating': 'supporting', 'innovative': 'creative',
    'streamline': 'simplify', 'streamlining': 'simplifying',
    'optimize': 'improve', 'optimizing': 'improving',
    'pivotal': 'critical', 'realm': 'territory',
    'embark': 'start', 'embarking': 'starting',
    'foster': 'build', 'fostering': 'building',
    'moreover': 'And', 'furthermore': 'And',
    'additionally': 'Also', 'consequently': 'So', 'subsequently': 'Then',
    'unlock': 'open', 'empower': 'strengthen', 'underscore': 'highlight',
    'paramount': 'critical', 'seamlessly': 'smoothly', 'beacon': 'light',
    'elevate': 'lift', 'curate': 'choose', 'curated': 'chosen', 'bespoke': 'custom',
    'resonate': 'connect', 'harness': 'use', 'intricate': 'complex',
    'plethora': 'many', 'myriad': 'many', 'comprehensive': 'complete',
    'groundbreaking': 'new', 'cutting-edge': 'modern', 'revolutionary': 'new',
    'game-changing': 'important', 'next-level': 'better', 'world-class': 'excellent',
    'unparalleled': 'rare', 'unprecedented': 'unusual', 'remarkable': 'notable',
    'extraordinary': 'unusual', 'exceptional': 'rare',
    'stakeholders': 'people involved', 'ecosystem': 'system', 'sphere': 'area', 'domain': 'area',
    'arguably': 'perhaps', 'notably': 'especially', 'crucially': 'critically',
    'importantly': 'more to the point', 'essentially': 'really',
    'fundamentally': 'at the core', 'inherently': 'naturally', 'intrinsically': 'naturally',
    'substantively': 'meaningfully',
    'amplify': 'increase', 'catalyze': 'trigger', 'propel': 'push',
    'spearhead': 'lead', 'orchestrate': 'arrange', 'navigate': 'move through', 'traverse': 'cross',
    'thereby': 'and so', 'thusly': 'so', 'wherein': 'where', 'whereby': 'through which',
  };
  for (const [word, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, (match) =>
      match[0] === match[0].toUpperCase() ? replacement[0].toUpperCase() + replacement.slice(1) : replacement
    );
  }
  text = text.replace(/[\u2014\u2013]/g, ', ');
  text = text.replace(/this is where\b/gi, 'Here');
  text = text.replace(/lean(?:ing)? into/gi, 'moving toward');
  text = text.replace(/showing up for/gi, 'being there for');
  text = text.replace(/show up for/gi, 'be there for');
  text = text.replace(/authentic self/gi, 'real self');
  text = text.replace(/safe space/gi, 'place of trust');
  text = text.replace(/hold(?:ing)? space/gi, 'sitting with');
  text = text.replace(/sacred container/gi, 'trusted ground');
  text = text.replace(/raise your vibration/gi, 'shift your attention');
  text = text.replace(/manifest(?:ing|ation)?/gi, 'create');
  text = text.replace(/needless to say/gi, 'Obviously');
  text = text.replace(/in conclusion/gi, 'So');
  text = text.replace(/it is important to note/gi, 'Worth noting');
  text = text.replace(/it is worth noting/gi, 'Worth noting');
  return text;
}

function countWords(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).filter(w => w).length;
}

function passesGate(body) {
  const words = countWords(body);
  if (words < 1200 || words > 2500) return false;
  if (body.includes('\u2014') || body.includes('\u2013')) return false;
  const stripped = body.replace(/<[^>]+>/g, ' ').toLowerCase();
  if (AI_WORDS.some(w => new RegExp(`\\b${w}\\b`).test(stripped))) return false;
  if ((body.match(/amazon\.com\/dp\/[A-Z0-9]{10}/g) || []).length < 3) return false;
  return true;
}

async function assignLibraryImage(slug) {
  const sourceImage = LIBRARY_IMAGES[Math.floor(Math.random() * LIBRARY_IMAGES.length)];
  const dlResp = await fetch(sourceImage);
  if (!dlResp.ok) throw new Error(`Failed to download library image: ${sourceImage}`);
  const imgBuffer = Buffer.from(await dlResp.arrayBuffer());

  const heroPath = `images/hero/${slug}.webp`;
  await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${heroPath}`, {
    method: 'PUT',
    headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
    body: imgBuffer,
  });

  const ogPath = `images/og/${slug}.webp`;
  await fetch(`https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${ogPath}`, {
    method: 'PUT',
    headers: { 'AccessKey': BUNNY_STORAGE_PASSWORD, 'Content-Type': 'application/octet-stream' },
    body: imgBuffer,
  });

  return {
    heroImage: `${BUNNY_CDN_BASE}/${heroPath}`,
    ogImage: `${BUNNY_CDN_BASE}/${ogPath}`,
  };
}

async function generateOneArticle(articles, topic, category) {
  const existingCount = articles.length;
  const backlinkRand = Math.random();
  const backlinkType = backlinkRand < 0.14 ? 'kalesh' : backlinkRand < 0.47 ? 'amazon' : backlinkRand < 0.70 ? 'external' : 'internal';
  const faqRand = Math.random();
  const faqCount = faqRand < 0.10 ? 0 : faqRand < 0.40 ? 2 : faqRand < 0.70 ? 3 : faqRand < 0.90 ? 4 : 5;
  const openerType = OPENERS[Math.floor(Math.random() * OPENERS.length)];

  const selectedPhrases = [...KALESH_PHRASES].sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 3));
  const interjections = [...CONVERSATIONAL_INTERJECTIONS].sort(() => Math.random() - 0.5).slice(0, 2);
  const selectedResearchers = [...RESEARCHERS].sort(() => Math.random() - 0.5).slice(0, 1 + Math.floor(Math.random() * 2));

  const internalLinks = articles
    .filter(a => a.category !== category.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(a => ({ title: a.title, url: `/${a.category}/${a.slug}` }));

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: [
        { role: 'system', content: `You write for ${SITE_NAME}. Author: ${AUTHOR_NAME}, ${AUTHOR_TITLE}. Voice: warm, conversational, honest, cross-traditional. ZERO em-dashes. ZERO of these words: ${AI_WORDS.join(', ')}. Use contractions. Vary sentence lengths aggressively.` },
        { role: 'user', content: `Write a 1400-1800 word article titled "${topic}" for the "${category.name}" section.

REQUIREMENTS:
- Opener type: ${openerType}
- 4-6 H2 sections with UNIQUE, evocative headers
- 1 blockquote
- Include exactly 2 conversational interjections: "${interjections[0]}" and "${interjections[1]}"
- 1-2 first-person lived experience markers
- Cite: ${selectedResearchers.join(', ')}
- ${faqCount} FAQ Q&A pairs at the end (or none if 0)
- ALWAYS include exactly 3 Amazon product links naturally. Format: <a href="https://www.amazon.com/dp/ASIN?tag=${AMAZON_TAG}" rel="nofollow sponsored">Product Name</a> (paid link). Use real caregiver products.
${backlinkType === 'kalesh' ? `- Include 1 link to ${AUTHOR_URL}` : ''}
${backlinkType === 'external' ? `- Include 1 external link rel="nofollow" to one of: ${EXTERNAL_AUTHORITY_SITES.join(', ')}` : ''}
- Include 2-3 internal links: ${internalLinks.slice(0, 3).map(l => `<a href="${l.url}">${l.title}</a>`).join(', ')}
- Weave in: ${selectedPhrases.map(p => `"${p}"`).join('; ')}
- Health disclaimer at end
- Output as HTML. No div, no classes, no styles.

Return JSON: { "title": "${topic}", "excerpt": "...", "body": "...", "faqs": [["Q","A"],...] }` },
      ],
      max_tokens: 8000,
      temperature: 0.85,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  const text = data.choices[0].message.content;
  
  // Try multiple parsing strategies
  let article;
  const cleaned = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
  try {
    article = JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    article = JSON.parse(jsonMatch[0]);
  }
  article.body = cleanAIWords(article.body);

  // Verify 3 Amazon links; inject fallbacks if needed
  const amazonCount = (article.body.match(/amazon\.com/g) || []).length;
  if (amazonCount < 3) {
    const templates = ['One resource I often point people toward is', 'Something that has helped many caregivers I work with is', 'A practical starting point is'];
    const shuffled = [...FALLBACK_PRODUCTS].sort(() => Math.random() - 0.5);
    const needed = 3 - amazonCount;
    for (let i = 0; i < needed; i++) {
      const p = shuffled[i];
      const linkHtml = `<p>${templates[i % 3]} <a href="https://www.amazon.com/dp/${p.asin}?tag=${AMAZON_TAG}" rel="nofollow sponsored">${p.name}</a> (paid link).</p>`;
      if (article.body.includes('informational purposes')) {
        article.body = article.body.replace(/<p><em>This article/, linkHtml + '\n<p><em>This article');
      } else {
        article.body += '\n' + linkHtml;
      }
    }
  }

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const wordCount = countWords(article.body);

  if (!passesGate(article.body)) {
    throw new Error(`Quality gate failed for "${topic}" (${wordCount} words)`);
  }

  const { heroImage, ogImage } = await assignLibraryImage(slug);

  return {
    id: existingCount + 1,
    slug,
    title: topic,
    excerpt: article.excerpt || topic,
    category: category.slug,
    categoryName: category.name,
    dateISO: new Date().toISOString(),
    readingTime: Math.ceil(wordCount / 250),
    body: article.body,
    faqs: article.faqs || [],
    faqCount,
    openerType,
    backlinkType,
    isChallengeConclusion: Math.random() < 0.3,
    heroImage,
    ogImage,
    wordCount,
  };
}

// ═══════════════════════════════════════════════════════════════
// MAIN — Generate 500 articles
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  BULK SEED — 500 Articles via DeepSeek V4-Pro');
  console.log('═══════════════════════════════════════════════════════');

  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const existingSlugs = new Set(articles.map(a => a.slug));
  console.log(`Starting with ${articles.length} existing articles.`);

  // Build topic queue: all topics minus existing slugs
  const allTopics = [];
  for (const [catSlug, topics] of Object.entries(TOPIC_BANK)) {
    const category = CATEGORIES.find(c => c.slug === catSlug);
    for (const topic of topics) {
      const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (!existingSlugs.has(slug)) {
        allTopics.push({ topic, category, slug });
      }
    }
  }

  console.log(`${allTopics.length} new topics available (after deduplication).`);
  const target = Math.min(500, allTopics.length);
  console.log(`Generating ${target} articles...`);

  let generated = 0;
  let failed = 0;
  const SAVE_INTERVAL = 10; // Save every 10 articles

  for (let i = 0; i < target; i++) {
    const { topic, category } = allTopics[i];
    let success = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const article = await generateOneArticle(articles, topic, category);
        articles.push(article);
        generated++;
        console.log(`[${generated}/${target}] "${topic}" — ${article.wordCount} words (attempt ${attempt})`);
        success = true;
        break;
      } catch (err) {
        console.error(`[FAIL] "${topic}" attempt ${attempt}: ${err.message}`);
        if (attempt === 3) {
          failed++;
          console.error(`[SKIP] "${topic}" failed 3x, skipping.`);
        }
        await new Promise(r => setTimeout(r, 3000));
      }
    }

    // Save checkpoint every SAVE_INTERVAL articles
    if (generated > 0 && generated % SAVE_INTERVAL === 0) {
      fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
      console.log(`[CHECKPOINT] Saved ${articles.length} total articles.`);
    }

    // Rate limit: 2 seconds between articles
    await new Promise(r => setTimeout(r, 2000));
  }

  // Final save
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  BULK SEED COMPLETE`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total articles: ${articles.length}`);
  console.log('═══════════════════════════════════════════════════════');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
