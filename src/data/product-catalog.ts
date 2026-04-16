// Product Catalog — All ASINs verified from actual Amazon product page URLs
// All links use tag=spankyspinola-20
// Categories mapped to article topics for intelligent matching

export interface Product {
  name: string;
  asin: string;
  category: string;
  tags: string[];
  sentence: string;
}

const AFFILIATE_TAG = 'spankyspinola-20';

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const products: Product[] = [
  // ═══════════════════════════════════════════
  // BOOKS — All ISBNs verified from Amazon search results
  // ═══════════════════════════════════════════
  { name: 'The 36-Hour Day by Nancy Mace', asin: '1421422239', category: 'books', tags: ['caregiving', 'dementia', 'practical', 'family'], sentence: 'One resource that many caregivers swear by is' },
  { name: 'Being Mortal by Atul Gawande', asin: '0805095152', category: 'books', tags: ['aging', 'mortality', 'medical', 'family'], sentence: 'A book that often shifts perspective on aging and medicine is' },
  { name: 'Burnout by Emily and Amelia Nagoski', asin: '1984818325', category: 'books', tags: ['burnout', 'stress', 'self-care', 'weight'], sentence: 'A tool that often helps with understanding the stress cycle is' },
  { name: 'The Body Keeps the Score by Bessel van der Kolk', asin: '0143127748', category: 'books', tags: ['trauma', 'body', 'healing', 'weight', 'sacred'], sentence: 'Something worth considering for understanding how stress lives in the body is' },
  { name: 'Set Boundaries Find Peace by Nedra Glennon Tawwab', asin: '0593192095', category: 'books', tags: ['boundaries', 'family', 'guilt', 'relationships'], sentence: 'For those struggling with where to draw the line, a popular choice is' },
  { name: 'Radical Acceptance by Tara Brach', asin: '0553380990', category: 'books', tags: ['acceptance', 'meditation', 'sacred', 'guilt'], sentence: 'A book that often opens something up for people carrying guilt is' },
  { name: 'Wherever You Go There You Are by Jon Kabat-Zinn', asin: '1401307787', category: 'books', tags: ['mindfulness', 'meditation', 'sacred', 'stress'], sentence: 'For those looking for a simple entry into mindfulness, this works well:' },
  { name: 'The Gifts of Imperfection by Brene Brown', asin: '159285849X', category: 'books', tags: ['shame', 'guilt', 'self-worth', 'sacred'], sentence: 'Something that often helps with the guilt piece is' },
  { name: 'When Things Fall Apart by Pema Chodron', asin: '0061661201', category: 'books', tags: ['suffering', 'buddhism', 'sacred', 'grief'], sentence: 'A book that sits with you in the hard parts without trying to fix anything is' },
  { name: 'The Art of Happiness by Dalai Lama', asin: '0061733520', category: 'books', tags: ['happiness', 'buddhism', 'sacred', 'meaning'], sentence: 'For a different way of thinking about what happiness actually means, you could try' },
  { name: 'When the Body Says No by Gabor Mate', asin: '0470923350', category: 'books', tags: ['stress', 'body', 'illness', 'weight'], sentence: 'For understanding how chronic stress shows up in the body, one book that matters is' },
  { name: 'Ambiguous Loss by Pauline Boss', asin: '0674003810', category: 'books', tags: ['grief', 'dementia', 'loss', 'family'], sentence: 'For the grief that has no name, the book that finally gave it one is' },
  { name: 'Surviving Alzheimers by Paula Spencer Scott', asin: '0692348018', category: 'books', tags: ['dementia', 'caregiving', 'practical', 'family'], sentence: 'A practical guide that many families turn to is' },
  { name: 'Mans Search for Meaning by Viktor Frankl', asin: '0807014273', category: 'books', tags: ['meaning', 'suffering', 'sacred', 'purpose'], sentence: 'A book about finding purpose in suffering that hits different when you are a caregiver is' },
  { name: 'Loving Someone Who Has Dementia by Pauline Boss', asin: '1118002296', category: 'books', tags: ['dementia', 'love', 'family', 'grief'], sentence: 'For those loving someone who is still here but also gone, one book that helps is' },
  { name: 'Option B by Sheryl Sandberg', asin: '1524732680', category: 'books', tags: ['resilience', 'grief', 'recovery', 'weight'], sentence: 'For building resilience when plan A is no longer available, something worth reading is' },
  { name: 'Cant We Talk About Something More Pleasant by Roz Chast', asin: '1608198065', category: 'books', tags: ['aging', 'humor', 'family', 'caregiving'], sentence: 'For a book that makes you laugh and cry about aging parents at the same time, try' },
  { name: 'Feeling Good by David Burns', asin: '0380810336', category: 'books', tags: ['depression', 'cbt', 'mental-health', 'weight'], sentence: 'A classic that still helps people understand their own thought patterns is' },
  { name: 'A Bittersweet Season by Jane Gross', asin: '0307472183', category: 'books', tags: ['aging', 'caregiving', 'family', 'practical'], sentence: 'For understanding the full arc of caring for aging parents, one honest account is' },
  { name: 'A Caregivers Well-Being by Jennifer Olsen', asin: '1632999315', category: 'books', tags: ['caregiving', 'self-care', 'burnout', 'practical'], sentence: 'A guide focused specifically on the caregiver thriving, not just surviving, is' },
  { name: 'Caregiving Taking Care of Yourself by Debbie Barr', asin: '1496483510', category: 'books', tags: ['caregiving', 'self-care', 'practical', 'burnout'], sentence: 'A practical self-help guide for preventing caregiver burnout is' },
  { name: 'Caregiver Recovery Beyond the Bedside', asin: '1778021980', category: 'books', tags: ['caregiving', 'recovery', 'burnout', 'healing'], sentence: 'For life after the caregiving chapter closes, one book that helps is' },
  { name: 'Moleskine Classic Notebook', asin: '8883701127', category: 'books', tags: ['journal', 'writing', 'self-care', 'daily'], sentence: 'Sometimes all you need is a good notebook and five minutes. A reliable choice is the' },

  // ═══════════════════════════════════════════
  // SELF-CARE & STRESS RELIEF — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'YnM Weighted Blanket 15lbs', asin: 'B073429DV2', category: 'self-care', tags: ['sleep', 'anxiety', 'comfort', 'weight'], sentence: 'One thing that many caregivers say helps them finally sleep is a' },
  { name: 'Dr Teals Lavender Epsom Salt Soak', asin: 'B07NF79DKC', category: 'self-care', tags: ['bath', 'relaxation', 'stress', 'self-care'], sentence: 'For turning a bath into something close to therapy, something worth trying is' },
  { name: 'Gaiam Yoga Mat Premium 6mm', asin: 'B07NHSFZSB', category: 'self-care', tags: ['exercise', 'body', 'movement', 'practical'], sentence: 'Even ten minutes on a mat can shift something. A good option is the' },
  { name: 'TriggerPoint Foam Roller', asin: 'B0040EGNIU', category: 'self-care', tags: ['body', 'tension', 'physical', 'practical'], sentence: 'For the physical tension that builds up in the back and shoulders, something that helps is the' },
  { name: 'URPOWER Essential Oil Diffuser', asin: 'B00Y2CQRZY', category: 'self-care', tags: ['relaxation', 'sleep', 'environment', 'practical'], sentence: 'Something that helps shift the atmosphere of a caregiving space is an' },
  { name: 'Natural Vitality Calm Magnesium', asin: 'B000OQ2DL4', category: 'self-care', tags: ['sleep', 'anxiety', 'supplement', 'weight'], sentence: 'For the nights when your body will not settle, something many people find helpful is' },
  { name: 'LectroFan White Noise Machine', asin: 'B00MY8V86Q', category: 'self-care', tags: ['sleep', 'noise', 'environment', 'practical'], sentence: 'When the house needs to be quiet but your mind will not stop, something that helps is a' },
  { name: 'MZOO Sleep Eye Mask', asin: 'B07KC5DWCC', category: 'self-care', tags: ['sleep', 'rest', 'self-care', 'weight'], sentence: 'For blocking out the world when you finally get to rest, a small thing that helps is an' },
  { name: 'Calm App Gift Card', asin: 'B08LQJXHZK', category: 'self-care', tags: ['meditation', 'sleep', 'anxiety', 'sacred'], sentence: 'For guided meditation without the learning curve, something worth trying is a' },
  { name: 'UTK Cordless Heating Pad', asin: 'B0F98J3TS7', category: 'self-care', tags: ['pain', 'body', 'physical', 'practical'], sentence: 'A simple tool that often helps with the physical strain is a' },
  { name: 'Shiatsu Neck and Back Massager', asin: 'B0FK4D5N61', category: 'self-care', tags: ['body', 'tension', 'pain', 'practical'], sentence: 'For the neck and shoulder tension that never fully goes away, something worth trying is a' },
  { name: 'Neck Massager with Heat', asin: 'B0D25G43TV', category: 'self-care', tags: ['body', 'pain', 'tension', 'self-care'], sentence: 'For targeted relief in the neck and shoulders, one option is a' },
  { name: 'Acupressure Mat and Pillow Set', asin: 'B0D17Y3XBK', category: 'self-care', tags: ['body', 'tension', 'pain', 'practical'], sentence: 'A popular choice for releasing tension after a long day is an' },
  { name: 'HIQILI Lavender Essential Oil', asin: 'B08YDFJLCM', category: 'self-care', tags: ['relaxation', 'sleep', 'aromatherapy', 'self-care'], sentence: 'For the calming scent that helps signal your brain it is time to rest, try' },
  { name: 'Cliganic Organic Essential Oils Trio', asin: 'B0GNKP2S8S', category: 'self-care', tags: ['aromatherapy', 'relaxation', 'self-care', 'practical'], sentence: 'For a starter set of essential oils that actually work, one option is the' },
  { name: 'YOTTOY Extra Thick Yoga Mat', asin: 'B0D3XD5C3P', category: 'self-care', tags: ['exercise', 'body', 'comfort', 'practical'], sentence: 'For the stretching your body has been asking for, a comfortable option is the' },

  // ═══════════════════════════════════════════
  // PRACTICAL CAREGIVING TOOLS — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'Instant Pot Duo', asin: 'B00FLYWNYQ', category: 'practical', tags: ['cooking', 'meal-prep', 'practical', 'daily'], sentence: 'For making meals when you have no time or energy to cook, something that actually helps is an' },
  { name: 'HOMLAND Shower Chair', asin: 'B0DSN2LHNK', category: 'practical', tags: ['bathing', 'safety', 'mobility', 'practical'], sentence: 'Something that makes bathing safer and less stressful is a' },
  { name: 'Shower Seat for Inside Shower', asin: 'B0CWL3RMNL', category: 'practical', tags: ['bathing', 'safety', 'practical', 'aging'], sentence: 'For bathroom safety that preserves dignity, a practical solution is a' },
  { name: 'Foldable Shower Stool', asin: 'B0DM65RS9J', category: 'practical', tags: ['bathing', 'safety', 'portable', 'practical'], sentence: 'A portable option for shower safety is a' },
  { name: 'Waterproof Bed Pads with Handles', asin: 'B0D4KH3KF7', category: 'practical', tags: ['bedding', 'hygiene', 'practical', 'daily'], sentence: 'One thing that saves a lot of middle-of-the-night stress is' },
  { name: 'Caregiver Gait Belt with Handles', asin: 'B0F53TCX7Q', category: 'practical', tags: ['lifting', 'mobility', 'body', 'practical'], sentence: 'A tool that protects both of you during transfers is a' },
  { name: 'Portable Bedside Commode', asin: 'B0GF2QQGBV', category: 'practical', tags: ['bathroom', 'mobility', 'safety', 'practical'], sentence: 'For nighttime bathroom needs, a practical option is a' },
  { name: 'Omron Bronze Blood Pressure Monitor', asin: 'B07S2H3XB9', category: 'practical', tags: ['monitoring', 'health', 'practical', 'daily'], sentence: 'For keeping track of blood pressure at home, a reliable choice is the' },
  { name: 'Ring Indoor Cam 1080p HD', asin: 'B0B6GJBKRK', category: 'practical', tags: ['monitoring', 'safety', 'technology', 'family'], sentence: 'When you need to check in without driving across town, something that helps is a' },
  { name: 'Wyze Cam v3 Security Camera', asin: 'B09LYVPXDF', category: 'practical', tags: ['monitoring', 'safety', 'technology', 'practical'], sentence: 'For affordable home monitoring that actually works, one option is the' },
  { name: 'Wyze Video Doorbell', asin: 'B09NMVZFHR', category: 'practical', tags: ['safety', 'monitoring', 'technology', 'practical'], sentence: 'For knowing who is at the door when you cannot always be there, try the' },
  { name: 'Echo Show 8 Smart Display', asin: 'B084DC4LW6', category: 'practical', tags: ['communication', 'technology', 'family', 'practical'], sentence: 'For video calls with a loved one who cannot manage a phone, something that works well is the' },
  { name: 'Amazon Fire Tablet', asin: 'B0BHZT5S12', category: 'practical', tags: ['communication', 'entertainment', 'technology', 'practical'], sentence: 'For giving a loved one something simple for video calls and entertainment, try the' },
  { name: 'UGREEN Bluetooth Tracker Tags', asin: 'B0FBW976L9', category: 'practical', tags: ['safety', 'tracking', 'dementia', 'practical'], sentence: 'For keeping track of keys, wallets, or a loved one who wanders, something worth trying is' },
  { name: 'AUVON Lumbar Support Pillow', asin: 'B0D3PM3GQ9', category: 'practical', tags: ['comfort', 'body', 'sitting', 'practical'], sentence: 'For the back pain that comes from sitting in hospital chairs all day, one option is the' },
  { name: 'FORTEM Seat Cushion and Lumbar Support', asin: 'B0C836V5Y8', category: 'practical', tags: ['comfort', 'body', 'sitting', 'practical'], sentence: 'For making any chair more bearable during long hospital visits, try the' },

  // ═══════════════════════════════════════════
  // JOURNALS & PLANNERS — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'The Five Minute Journal', asin: '0991846206', category: 'journals', tags: ['gratitude', 'mindfulness', 'self-care', 'sacred'], sentence: 'For those who have five minutes and nothing more, something worth trying is' },
  { name: 'Leuchtturm1917 Dotted Notebook', asin: 'B002TSIMW4', category: 'journals', tags: ['journal', 'writing', 'self-care', 'daily'], sentence: 'For putting thoughts on paper when they will not stay in your head, a reliable choice is the' },
  { name: '5-Minute Guided Gratitude Journal', asin: 'B0GML5LLKD', category: 'journals', tags: ['gratitude', 'mindfulness', 'self-care', 'daily'], sentence: 'For a structured way to start or end the day with gratitude, one option is the' },
  { name: 'Daily Habits Journal', asin: 'B0CV4PP9NL', category: 'journals', tags: ['habits', 'growth', 'self-care', 'daily'], sentence: 'For building small daily habits that add up over time, something worth trying is the' },

  // ═══════════════════════════════════════════
  // COMFORT & HOME — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'Bedsure Fleece Blanket', asin: 'B0DYV4CN78', category: 'comfort', tags: ['comfort', 'warmth', 'self-care', 'weight'], sentence: 'For those nights when comfort matters more than anything, something worth trying is a' },
  { name: 'Bedsure 3D Fleece Bubble Blanket', asin: 'B0G6CZF8P7', category: 'comfort', tags: ['comfort', 'cozy', 'self-care', 'weight'], sentence: 'A cozy blanket that feels like a hug when you need one is the' },
  { name: 'Himalayan Salt Lamp', asin: 'B0CJ59BC43', category: 'comfort', tags: ['environment', 'calm', 'comfort', 'sacred'], sentence: 'For shifting the energy of a room, one small thing that works is a' },
  { name: 'Stanley Quencher H2.0 Tumbler 40oz', asin: 'B0DCDS4D5L', category: 'comfort', tags: ['hydration', 'daily', 'self-care', 'practical'], sentence: 'For staying hydrated when you forget to drink water all day, something that helps is the' },
  { name: 'Sony WF-1000XM5 Noise Cancelling Earbuds', asin: 'B0C33XXS56', category: 'comfort', tags: ['quiet', 'sleep', 'stress', 'weight'], sentence: 'When you need ten minutes of silence in a house that never stops, something worth trying is' },
  { name: '3D Contoured Sleep Eye Mask', asin: 'B09HBJBTLN', category: 'comfort', tags: ['sleep', 'rest', 'comfort', 'self-care'], sentence: 'For blocking out the world when you finally get to rest, try a' },

  // ═══════════════════════════════════════════
  // MEDITATION & SPIRITUAL — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'MONAHITO Meditation Cushion', asin: 'B0BMFY81DF', category: 'meditation', tags: ['meditation', 'sacred', 'mindfulness', 'self-care'], sentence: 'For the five minutes of stillness that matter more than you think, a good cushion is the' },
  { name: 'MONAHITO Meditation Floor Cushion', asin: 'B0BMFWVJ47', category: 'meditation', tags: ['meditation', 'sacred', 'comfort', 'self-care'], sentence: 'For creating a small space dedicated to sitting with yourself, one option is the' },
  { name: 'MONAHITO Tibetan Singing Bowl Set', asin: 'B0BNQ1KDFF', category: 'meditation', tags: ['meditation', 'sacred', 'sound', 'ritual'], sentence: 'For adding a grounding ritual to your practice, something worth trying is a' },

  // ═══════════════════════════════════════════
  // NUTRITION & WELLNESS — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'Liquid IV Hydration Multiplier', asin: 'B0FQFJBXH3', category: 'nutrition', tags: ['hydration', 'energy', 'practical', 'daily'], sentence: 'For the dehydration that makes everything worse, something that helps quickly is' },
  { name: 'Clean Protein Bars Variety Pack', asin: 'B0G31J1TWJ', category: 'nutrition', tags: ['nutrition', 'energy', 'practical', 'daily'], sentence: 'For something to eat when you forgot to eat again, a decent option is' },
  { name: 'CHARMKING Compression Socks 3 Pairs', asin: 'B0C4999Y58', category: 'nutrition', tags: ['circulation', 'body', 'practical', 'daily'], sentence: 'For the swollen feet and legs that come from standing all day, something that helps is' },
  { name: 'Compression Socks 20-30mmHg', asin: 'B0DY75FHX7', category: 'nutrition', tags: ['circulation', 'body', 'practical', 'daily'], sentence: 'For leg support during long caregiving days, a practical choice is' },

  // ═══════════════════════════════════════════
  // CREATIVE & RELAXATION — All ASINs verified
  // ═══════════════════════════════════════════
  { name: 'Adult Coloring Book for Stress Relief', asin: 'B0CZ3WGMMS', category: 'creative', tags: ['relaxation', 'creative', 'stress', 'self-care'], sentence: 'For something that occupies your hands while your mind rests, one option is an' },
  { name: 'Nature and Floral Escapes Coloring Book', asin: 'B0GDTX8PN2', category: 'creative', tags: ['relaxation', 'creative', 'nature', 'self-care'], sentence: 'For a creative escape that requires nothing but colored pencils, try the' },
];
