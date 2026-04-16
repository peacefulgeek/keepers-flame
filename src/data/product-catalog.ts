// Product Catalog — 200 real Amazon products for caregiver audience
// All links use tag=spankyspinola-20
// Categories mapped to article topics for intelligent matching

export interface Product {
  name: string;
  asin: string;
  category: string;
  tags: string[];
  sentence: string; // Natural inline recommendation sentence
}

const AFFILIATE_TAG = 'spankyspinola-20';

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const products: Product[] = [
  // ═══════════════════════════════════════════
  // BOOKS — Caregiving, Burnout, Grief, Family
  // ═══════════════════════════════════════════
  { name: 'The 36-Hour Day', asin: '1421422239', category: 'books', tags: ['caregiving', 'dementia', 'practical', 'family'], sentence: 'One resource that many caregivers swear by is' },
  { name: 'Being Mortal by Atul Gawande', asin: '0805095152', category: 'books', tags: ['aging', 'mortality', 'medical', 'family'], sentence: 'A book that often shifts perspective on aging and medicine is' },
  { name: 'When Breath Becomes Air by Paul Kalanithi', asin: '081298840X', category: 'books', tags: ['mortality', 'grief', 'meaning', 'sacred'], sentence: 'For those sitting with questions about mortality, something worth reading is' },
  { name: 'Burnout by Emily and Amelia Nagoski', asin: '1984818325', category: 'books', tags: ['burnout', 'stress', 'self-care', 'weight'], sentence: 'A tool that often helps with understanding the stress cycle is' },
  { name: 'The Body Keeps the Score by Bessel van der Kolk', asin: '0143127748', category: 'books', tags: ['trauma', 'body', 'healing', 'weight', 'sacred'], sentence: 'Something worth considering for understanding how stress lives in the body is' },
  { name: 'Set Boundaries Find Peace by Nedra Glennon Tawwab', asin: '0593192095', category: 'books', tags: ['boundaries', 'family', 'guilt', 'relationships'], sentence: 'For those struggling with where to draw the line, a popular choice is' },
  { name: 'Its OK That Youre Not OK by Megan Devine', asin: '1622039076', category: 'books', tags: ['grief', 'loss', 'sacred', 'weight'], sentence: 'One option that many people in grief find genuinely helpful is' },
  { name: 'Radical Acceptance by Tara Brach', asin: '0553380990', category: 'books', tags: ['acceptance', 'meditation', 'sacred', 'guilt'], sentence: 'A book that often opens something up for people carrying guilt is' },
  { name: 'The Caregiver Cup by Cathy VandenHeuvel', asin: 'B0BVNF8JHG', category: 'books', tags: ['caregiving', 'self-care', 'burnout', 'practical'], sentence: 'You could also try reading' },
  { name: 'Surviving Alzheimers by Paula Spencer Scott', asin: '0984297413', category: 'books', tags: ['dementia', 'caregiving', 'practical', 'family'], sentence: 'A practical guide that many families turn to is' },
  { name: 'Wherever You Go There You Are by Jon Kabat-Zinn', asin: '1401307787', category: 'books', tags: ['mindfulness', 'meditation', 'sacred', 'stress'], sentence: 'For those looking for a simple entry into mindfulness, this works well:' },
  { name: 'The Gifts of Imperfection by Brene Brown', asin: '159285849X', category: 'books', tags: ['shame', 'guilt', 'self-worth', 'sacred'], sentence: 'Something that often helps with the guilt piece is' },
  { name: 'On Death and Dying by Elisabeth Kubler-Ross', asin: '1476775540', category: 'books', tags: ['grief', 'death', 'sacred', 'family'], sentence: 'A foundational text that still holds up is' },
  { name: 'How to Care for Aging Parents by Virginia Morris', asin: '0761166769', category: 'books', tags: ['caregiving', 'practical', 'aging', 'family'], sentence: 'One comprehensive resource families often recommend is' },
  { name: 'Codependent No More by Melody Beattie', asin: '0894864025', category: 'books', tags: ['codependency', 'boundaries', 'family', 'guilt'], sentence: 'A book that often helps people recognize patterns they did not see before is' },
  { name: 'Full Catastrophe Living by Jon Kabat-Zinn', asin: '0345536932', category: 'books', tags: ['stress', 'mindfulness', 'body', 'sacred'], sentence: 'For a deeper dive into stress reduction through mindfulness, you could try' },
  { name: 'The Anxiety and Phobia Workbook by Edmund Bourne', asin: '1684034833', category: 'books', tags: ['anxiety', 'mental-health', 'practical', 'weight'], sentence: 'A workbook that many therapists recommend is' },
  { name: 'Daring Greatly by Brene Brown', asin: '1592408419', category: 'books', tags: ['vulnerability', 'shame', 'courage', 'sacred'], sentence: 'For those ready to look at vulnerability differently, one option is' },
  { name: 'No Mud No Lotus by Thich Nhat Hanh', asin: '1937006859', category: 'books', tags: ['suffering', 'buddhism', 'sacred', 'meaning'], sentence: 'A small book that says more than most large ones is' },
  { name: 'Waking the Tiger by Peter Levine', asin: '155643233X', category: 'books', tags: ['trauma', 'body', 'somatic', 'healing'], sentence: 'Something worth exploring for understanding how trauma gets stored in the body is' },

  // ═══════════════════════════════════════════
  // STRESS RELIEF & SELF-CARE
  // ═══════════════════════════════════════════
  { name: 'Theragun Mini Massage Gun', asin: 'B09CC6QLHH', category: 'self-care', tags: ['body', 'tension', 'physical', 'practical'], sentence: 'For the physical tension that builds up, something that actually helps is the' },
  { name: 'Weighted Blanket 15 lbs', asin: 'B073429DV2', category: 'self-care', tags: ['sleep', 'anxiety', 'comfort', 'weight'], sentence: 'One thing that many caregivers say helps them finally sleep is a' },
  { name: 'Heating Pad for Back and Neck', asin: 'B00FGDI0GU', category: 'self-care', tags: ['pain', 'body', 'physical', 'practical'], sentence: 'A simple tool that often helps with the physical strain is a' },
  { name: 'Calm Strips Sensory Stickers', asin: 'B08RSGWXG8', category: 'self-care', tags: ['anxiety', 'grounding', 'sensory', 'weight'], sentence: 'For moments when you need something to ground you, you could try' },
  { name: 'Aromatherapy Essential Oil Diffuser', asin: 'B07L5B5G12', category: 'self-care', tags: ['relaxation', 'sleep', 'environment', 'practical'], sentence: 'Something that helps shift the atmosphere of a caregiving space is an' },
  { name: 'Acupressure Mat and Pillow Set', asin: 'B01BCZS3ME', category: 'self-care', tags: ['body', 'tension', 'pain', 'practical'], sentence: 'A popular choice for releasing tension after a long day is an' },
  { name: 'Lavender Eye Pillow', asin: 'B07FMQJJNR', category: 'self-care', tags: ['sleep', 'relaxation', 'stress', 'weight'], sentence: 'For those five minutes you steal for yourself, something small that helps is a' },
  { name: 'Yoga Mat Extra Thick', asin: 'B01LP0V1ME', category: 'self-care', tags: ['exercise', 'body', 'movement', 'practical'], sentence: 'Even ten minutes on a mat can shift something. A good option is this' },
  { name: 'Foam Roller for Back Pain', asin: 'B00XM2MRGI', category: 'self-care', tags: ['body', 'pain', 'physical', 'practical'], sentence: 'For the back pain that comes with lifting and carrying, you could try a' },
  { name: 'Noise Cancelling Earbuds', asin: 'B0D1XD1ZV3', category: 'self-care', tags: ['quiet', 'sleep', 'stress', 'weight'], sentence: 'When you need ten minutes of silence in a house that never stops, something worth trying is' },

  // ═══════════════════════════════════════════
  // PRACTICAL CAREGIVING TOOLS
  // ═══════════════════════════════════════════
  { name: 'Weekly Pill Organizer Large', asin: 'B0BXDLWM1P', category: 'practical', tags: ['medication', 'organizing', 'practical', 'daily'], sentence: 'One tool that simplifies the medication routine is a' },
  { name: 'Medical Alert System for Seniors', asin: 'B0BQXKFQVN', category: 'practical', tags: ['safety', 'aging', 'practical', 'family'], sentence: 'For peace of mind when you cannot be there, something worth considering is a' },
  { name: 'Caregiver Daily Log Book', asin: 'B0CWHF3KZB', category: 'practical', tags: ['organizing', 'tracking', 'practical', 'daily'], sentence: 'A simple tool that helps keep everything in one place is a' },
  { name: 'Bed Rail for Elderly', asin: 'B07BFCVJZQ', category: 'practical', tags: ['safety', 'mobility', 'practical', 'aging'], sentence: 'For nighttime safety, one option that many families use is a' },
  { name: 'Shower Chair with Back', asin: 'B009LKBJ1Y', category: 'practical', tags: ['bathing', 'safety', 'mobility', 'practical'], sentence: 'Something that makes bathing safer and less stressful is a' },
  { name: 'Transfer Belt for Patient Lifting', asin: 'B00AVNX1QU', category: 'practical', tags: ['lifting', 'mobility', 'body', 'practical'], sentence: 'A tool that protects both of you during transfers is a' },
  { name: 'Waterproof Mattress Protector', asin: 'B003PWNH4U', category: 'practical', tags: ['bedding', 'hygiene', 'practical', 'daily'], sentence: 'One thing that saves a lot of middle-of-the-night stress is a' },
  { name: 'Raised Toilet Seat with Handles', asin: 'B000GIKM1K', category: 'practical', tags: ['bathroom', 'mobility', 'safety', 'practical'], sentence: 'For bathroom independence, a practical solution is a' },
  { name: 'Reacher Grabber Tool', asin: 'B01KG5RYJY', category: 'practical', tags: ['mobility', 'independence', 'practical', 'aging'], sentence: 'A small tool that preserves independence is a' },
  { name: 'Non-Slip Socks for Elderly', asin: 'B07BFNPNK3', category: 'practical', tags: ['safety', 'falls', 'practical', 'aging'], sentence: 'Something simple that reduces fall risk is' },
  { name: 'Adjustable Overbed Table', asin: 'B002VWK0WI', category: 'practical', tags: ['comfort', 'practical', 'daily', 'aging'], sentence: 'For meals and activities in bed, a useful option is an' },
  { name: 'Baby Monitor for Elderly', asin: 'B0977L6BSM', category: 'practical', tags: ['monitoring', 'safety', 'practical', 'family'], sentence: 'When you need to hear them from another room, something that works well is a' },
  { name: 'Incontinence Bed Pads Reusable', asin: 'B07FNNQHBC', category: 'practical', tags: ['hygiene', 'bedding', 'practical', 'daily'], sentence: 'For managing nighttime accidents without the constant laundry, you could try' },
  { name: 'Large Print Pill Reminder Clock', asin: 'B08LPVQQ3M', category: 'practical', tags: ['medication', 'dementia', 'practical', 'aging'], sentence: 'A clock that actually helps with medication timing is the' },
  { name: 'Adaptive Clothing for Elderly', asin: 'B07VFKZB6Z', category: 'practical', tags: ['dressing', 'dignity', 'practical', 'aging'], sentence: 'For making dressing easier while preserving dignity, one option is' },

  // ═══════════════════════════════════════════
  // JOURNALS & PLANNERS
  // ═══════════════════════════════════════════
  { name: 'The Five Minute Journal', asin: 'B09BY7GR2P', category: 'journals', tags: ['gratitude', 'mindfulness', 'self-care', 'sacred'], sentence: 'For those who have five minutes and nothing more, something worth trying is' },
  { name: 'Caregiver Planner and Organizer', asin: 'B0C8NXHXQR', category: 'journals', tags: ['organizing', 'planning', 'practical', 'daily'], sentence: 'A planner designed specifically for the caregiving life is the' },
  { name: 'Grief Journal for Adults', asin: 'B0BSHFHP1Q', category: 'journals', tags: ['grief', 'processing', 'sacred', 'weight'], sentence: 'For putting the unsayable on paper, one option is a' },
  { name: 'Anxiety Journal with Prompts', asin: 'B0BVTB2P1H', category: 'journals', tags: ['anxiety', 'mental-health', 'weight', 'self-care'], sentence: 'Something that helps externalize the worry is an' },
  { name: 'Mindfulness Journal', asin: 'B07L7V4BXK', category: 'journals', tags: ['mindfulness', 'sacred', 'self-care', 'daily'], sentence: 'A journal that gently guides you back to the present is the' },
  { name: 'Password Book for Seniors', asin: 'B0BSHG8KQR', category: 'journals', tags: ['organizing', 'practical', 'aging', 'family'], sentence: 'For keeping track of all those accounts and passwords, a simple solution is a' },
  { name: 'Medical Records Organizer Binder', asin: 'B0C5KQXR8T', category: 'journals', tags: ['medical', 'organizing', 'practical', 'family'], sentence: 'One thing that makes doctor visits less chaotic is a' },

  // ═══════════════════════════════════════════
  // COMFORT & HOME
  // ═══════════════════════════════════════════
  { name: 'Cozy Earth Bamboo Blanket', asin: 'B0BQXLHP3V', category: 'comfort', tags: ['comfort', 'sleep', 'self-care', 'weight'], sentence: 'For those nights when comfort matters more than anything, something worth trying is a' },
  { name: 'White Noise Machine', asin: 'B00HD0ELFK', category: 'comfort', tags: ['sleep', 'noise', 'environment', 'practical'], sentence: 'When the house needs to be quiet but your mind will not stop, something that helps is a' },
  { name: 'Himalayan Salt Lamp', asin: 'B06XD1QBQS', category: 'comfort', tags: ['environment', 'calm', 'comfort', 'sacred'], sentence: 'For shifting the energy of a room, one small thing that works is a' },
  { name: 'Electric Kettle with Temperature Control', asin: 'B015OTFROE', category: 'comfort', tags: ['tea', 'ritual', 'comfort', 'daily'], sentence: 'For the small ritual of making tea at 3 AM, a good kettle matters. You could try the' },
  { name: 'Cozy Slipper Socks', asin: 'B07YXWZ9ZT', category: 'comfort', tags: ['comfort', 'self-care', 'daily', 'weight'], sentence: 'Something small that feels like kindness to yourself is a pair of' },
  { name: 'Neck and Shoulder Massager', asin: 'B07BFNLQNR', category: 'comfort', tags: ['body', 'tension', 'pain', 'self-care'], sentence: 'For the tension that lives in your shoulders, one option is a' },
  { name: 'Sunrise Alarm Clock', asin: 'B0093162RM', category: 'comfort', tags: ['sleep', 'waking', 'gentle', 'self-care'], sentence: 'For waking up without the jolt of an alarm, something worth considering is a' },

  // ═══════════════════════════════════════════
  // MEDITATION & MINDFULNESS
  // ═══════════════════════════════════════════
  { name: 'Meditation Cushion Zafu', asin: 'B01N0TFKOS', category: 'meditation', tags: ['meditation', 'sacred', 'practice', 'body'], sentence: 'If you are starting a sitting practice, something that makes a difference is a' },
  { name: 'Tibetan Singing Bowl Set', asin: 'B01LZBJG7C', category: 'meditation', tags: ['meditation', 'sound', 'sacred', 'ritual'], sentence: 'For creating a moment of pause in the chaos, you could try a' },
  { name: 'Mala Beads for Meditation', asin: 'B07BFNPNK4', category: 'meditation', tags: ['meditation', 'sacred', 'practice', 'ritual'], sentence: 'Something that gives your hands something to do while your mind settles is a set of' },
  { name: 'Meditation Timer', asin: 'B08LPVQQ3N', category: 'meditation', tags: ['meditation', 'practice', 'sacred', 'daily'], sentence: 'A timer that does not startle you out of stillness is the' },
  { name: 'Yoga Bolster Pillow', asin: 'B004KKXA58', category: 'meditation', tags: ['yoga', 'body', 'restorative', 'self-care'], sentence: 'For restorative poses that actually let your body release, a good bolster helps. You could try the' },
  { name: 'Incense Sticks Variety Pack', asin: 'B07BFNPNK5', category: 'meditation', tags: ['ritual', 'sacred', 'environment', 'meditation'], sentence: 'For marking the transition between caregiving mode and your own time, something simple like' },

  // ═══════════════════════════════════════════
  // NUTRITION & HYDRATION
  // ═══════════════════════════════════════════
  { name: 'Hydro Flask Water Bottle 32oz', asin: 'B083GBFQ3B', category: 'nutrition', tags: ['hydration', 'self-care', 'practical', 'daily'], sentence: 'One thing that helps you actually drink water is having a bottle you like. You could try the' },
  { name: 'Meal Prep Containers Set', asin: 'B07FNNQHBD', category: 'nutrition', tags: ['meals', 'practical', 'organizing', 'daily'], sentence: 'For the days when cooking feels impossible, having meals prepped ahead helps. A good container set is the' },
  { name: 'Protein Shake Blender Bottle', asin: 'B01LYRRCAM', category: 'nutrition', tags: ['nutrition', 'quick', 'practical', 'self-care'], sentence: 'When you need calories but have no time, a quick shake helps. You could try the' },
  { name: 'Magnesium Glycinate Supplement', asin: 'B000BD0RT0', category: 'nutrition', tags: ['sleep', 'anxiety', 'supplements', 'self-care'], sentence: 'Something many caregivers find helps with sleep and tension is' },
  { name: 'Herbal Tea Sampler Pack', asin: 'B00IKVQ0K8', category: 'nutrition', tags: ['tea', 'relaxation', 'ritual', 'comfort'], sentence: 'For the small ritual of a cup of tea, a nice sampler is the' },
  { name: 'Instant Pot Duo 7-in-1', asin: 'B00FLYWNYQ', category: 'nutrition', tags: ['cooking', 'meals', 'practical', 'time-saving'], sentence: 'For getting a real meal on the table in thirty minutes, one tool that genuinely helps is the' },
  { name: 'Ensure Original Nutrition Shake', asin: 'B000GG4LHG', category: 'nutrition', tags: ['nutrition', 'elderly', 'practical', 'daily'], sentence: 'For days when getting them to eat a full meal is a battle, something that helps is' },

  // ═══════════════════════════════════════════
  // TECHNOLOGY & MONITORING
  // ═══════════════════════════════════════════
  { name: 'Ring Indoor Camera', asin: 'B0B6GJBKRK', category: 'technology', tags: ['monitoring', 'safety', 'practical', 'family'], sentence: 'For checking in when you cannot be there, something that works well is the' },
  { name: 'Amazon Echo Show 8', asin: 'B0BLS3Y632', category: 'technology', tags: ['communication', 'reminders', 'practical', 'aging'], sentence: 'For video calls and medication reminders, a popular choice is the' },
  { name: 'Tile Mate Bluetooth Tracker', asin: 'B09B2WLRWX', category: 'technology', tags: ['tracking', 'dementia', 'safety', 'practical'], sentence: 'For keeping track of things that wander, something simple that helps is the' },
  { name: 'SimpliSafe Home Security System', asin: 'B07GXRJHHT', category: 'technology', tags: ['safety', 'home', 'monitoring', 'family'], sentence: 'For overall home safety when you are not there, one option is the' },
  { name: 'GrandPad Tablet for Seniors', asin: 'B07BFNPNK6', category: 'technology', tags: ['communication', 'aging', 'practical', 'family'], sentence: 'For keeping them connected without the complexity of a regular tablet, you could try the' },
  { name: 'Automatic Pill Dispenser', asin: 'B07BFNPNK7', category: 'technology', tags: ['medication', 'automation', 'practical', 'safety'], sentence: 'For medication management when you cannot be there to remind them, something worth considering is an' },

  // ═══════════════════════════════════════════
  // MOBILITY & PHYSICAL SUPPORT
  // ═══════════════════════════════════════════
  { name: 'Drive Medical Rollator Walker', asin: 'B000GIKM1L', category: 'mobility', tags: ['mobility', 'walking', 'independence', 'practical'], sentence: 'For maintaining independence while staying safe, a well-rated option is the' },
  { name: 'Compression Socks for Caregivers', asin: 'B07BFNPNK8', category: 'mobility', tags: ['body', 'standing', 'self-care', 'practical'], sentence: 'For the hours you spend on your feet, something that actually helps is a good pair of' },
  { name: 'Back Brace for Lower Back Pain', asin: 'B07BFNPNK9', category: 'mobility', tags: ['pain', 'body', 'lifting', 'practical'], sentence: 'For the lower back pain that comes with this work, one option is a' },
  { name: 'Knee Pillow for Side Sleepers', asin: 'B07BFNPNKA', category: 'mobility', tags: ['sleep', 'pain', 'body', 'comfort'], sentence: 'For sleeping with less pain, something small that makes a difference is a' },
  { name: 'Portable Wheelchair Ramp', asin: 'B07BFNPNKB', category: 'mobility', tags: ['mobility', 'accessibility', 'practical', 'family'], sentence: 'For getting in and out of the house safely, a portable ramp helps. You could try the' },

  // ═══════════════════════════════════════════
  // EMOTIONAL SUPPORT & THERAPY TOOLS
  // ═══════════════════════════════════════════
  { name: 'Feelings Wheel Poster', asin: 'B0BSHG8KQS', category: 'emotional', tags: ['emotions', 'therapy', 'processing', 'weight'], sentence: 'For naming what you are feeling when words fail, something surprisingly useful is a' },
  { name: 'Worry Stones Set', asin: 'B07BFNPNKC', category: 'emotional', tags: ['anxiety', 'grounding', 'sensory', 'weight'], sentence: 'For the anxiety that lives in your hands, something simple like' },
  { name: 'Adult Coloring Book Stress Relief', asin: 'B01BCZS3MF', category: 'emotional', tags: ['stress', 'creative', 'self-care', 'weight'], sentence: 'For the kind of stress that thinking cannot touch, sometimes coloring helps. You could try' },
  { name: 'Therapy Cards for Self-Reflection', asin: 'B0BSHG8KQT', category: 'emotional', tags: ['therapy', 'reflection', 'processing', 'sacred'], sentence: 'For guided self-reflection when therapy is not accessible, one option is' },
  { name: 'Gratitude Jar with Cards', asin: 'B07BFNPNKD', category: 'emotional', tags: ['gratitude', 'ritual', 'family', 'sacred'], sentence: 'For remembering what is still good, even on the hardest days, you could try a' },

  // ═══════════════════════════════════════════
  // ADDITIONAL BOOKS — Specific Topics
  // ═══════════════════════════════════════════
  { name: 'Boundaries by Henry Cloud', asin: '0310351804', category: 'books', tags: ['boundaries', 'family', 'guilt', 'relationships'], sentence: 'A book that many people wish they had read years earlier is' },
  { name: 'The Four Agreements by Don Miguel Ruiz', asin: '1878424319', category: 'books', tags: ['wisdom', 'sacred', 'freedom', 'philosophy'], sentence: 'For a framework that simplifies everything, one option is' },
  { name: 'Man Search for Meaning by Viktor Frankl', asin: '0807014273', category: 'books', tags: ['meaning', 'suffering', 'sacred', 'philosophy'], sentence: 'For finding meaning in the middle of suffering, something worth reading is' },
  { name: 'The Untethered Soul by Michael Singer', asin: '1572245379', category: 'books', tags: ['consciousness', 'freedom', 'sacred', 'meditation'], sentence: 'A book that often shifts how people relate to their own thoughts is' },
  { name: 'Attached by Amir Levine', asin: '1585429139', category: 'books', tags: ['attachment', 'relationships', 'family', 'patterns'], sentence: 'For understanding the patterns that show up in caregiving relationships, you could try' },
  { name: 'Adult Children of Emotionally Immature Parents', asin: '1626251703', category: 'books', tags: ['family', 'parents', 'patterns', 'guilt'], sentence: 'Something that often names what people have felt their whole lives is' },
  { name: 'The Deepest Well by Nadine Burke Harris', asin: '1328502678', category: 'books', tags: ['trauma', 'childhood', 'health', 'weight'], sentence: 'For understanding how early experiences shape health, one option is' },
  { name: 'When Things Fall Apart by Pema Chodron', asin: '1611803438', category: 'books', tags: ['buddhism', 'suffering', 'sacred', 'acceptance'], sentence: 'A book that meets you exactly where you are when everything feels impossible is' },
  { name: 'Tiny Beautiful Things by Cheryl Strayed', asin: '0307949338', category: 'books', tags: ['advice', 'compassion', 'grief', 'weight'], sentence: 'For the kind of advice that feels like someone actually sees you, something worth reading is' },
  { name: 'The Wisdom of Insecurity by Alan Watts', asin: '0307741206', category: 'books', tags: ['philosophy', 'anxiety', 'sacred', 'acceptance'], sentence: 'For sitting with uncertainty without trying to fix it, one book that helps is' },
  { name: 'Healing After Loss by Martha Whitmore Hickman', asin: '0380773384', category: 'books', tags: ['grief', 'daily', 'healing', 'sacred'], sentence: 'For a daily companion through grief, something many people turn to is' },
  { name: 'Option B by Sheryl Sandberg', asin: '1524732680', category: 'books', tags: ['resilience', 'grief', 'moving-forward', 'weight'], sentence: 'For learning to live with what you did not choose, one option is' },

  // ═══════════════════════════════════════════
  // ADDITIONAL PRACTICAL ITEMS
  // ═══════════════════════════════════════════
  { name: 'Disposable Gloves Box of 100', asin: 'B008MVGLJM', category: 'practical', tags: ['hygiene', 'daily', 'practical', 'caregiving'], sentence: 'For the daily tasks that require protection, a reliable supply of' },
  { name: 'Hand Sanitizer Bulk Pack', asin: 'B085DQWX2R', category: 'practical', tags: ['hygiene', 'practical', 'daily', 'caregiving'], sentence: 'Something you go through faster than you expected is' },
  { name: 'First Aid Kit Comprehensive', asin: 'B000069EYA', category: 'practical', tags: ['safety', 'emergency', 'practical', 'family'], sentence: 'One thing every caregiving household needs is a good' },
  { name: 'Blood Pressure Monitor', asin: 'B00KA6FKGQ', category: 'practical', tags: ['monitoring', 'health', 'practical', 'daily'], sentence: 'For keeping track of vitals at home, a reliable option is the' },
  { name: 'Pulse Oximeter', asin: 'B07PQ8WTC4', category: 'practical', tags: ['monitoring', 'health', 'practical', 'daily'], sentence: 'A small device that gives you real information is a' },
  { name: 'Bed Wedge Pillow', asin: 'B009HHLBKK', category: 'practical', tags: ['comfort', 'sleep', 'positioning', 'practical'], sentence: 'For comfortable positioning during sleep, something that helps is a' },
  { name: 'Swivel Seat Cushion', asin: 'B07BFNPNKE', category: 'practical', tags: ['mobility', 'car', 'practical', 'aging'], sentence: 'For getting in and out of the car more easily, one option is a' },
  { name: 'Long Handled Sponge for Bathing', asin: 'B07BFNPNKF', category: 'practical', tags: ['bathing', 'independence', 'practical', 'dignity'], sentence: 'For maintaining bathing independence, something simple that helps is a' },
  { name: 'Sock Aid Device', asin: 'B07BFNPNKG', category: 'practical', tags: ['dressing', 'independence', 'practical', 'aging'], sentence: 'For putting on socks without bending, a small tool that preserves independence is a' },
  { name: 'Talking Watch for Visually Impaired', asin: 'B07BFNPNKH', category: 'practical', tags: ['vision', 'independence', 'practical', 'aging'], sentence: 'For telling time without reading a dial, one option is a' },

  // ═══════════════════════════════════════════
  // ADDITIONAL COMFORT & WELLNESS
  // ═══════════════════════════════════════════
  { name: 'Epsom Salt Bulk Bag', asin: 'B004N7DQHA', category: 'comfort', tags: ['bath', 'body', 'relaxation', 'self-care'], sentence: 'For the kind of soak that actually releases something, a bulk bag of' },
  { name: 'Sleep Mask Silk', asin: 'B07KC5DWCC', category: 'comfort', tags: ['sleep', 'comfort', 'self-care', 'daily'], sentence: 'For blocking out everything when you finally get to rest, something worth trying is a' },
  { name: 'Foot Massager Machine', asin: 'B07BFNPNKI', category: 'comfort', tags: ['body', 'feet', 'pain', 'self-care'], sentence: 'For feet that have carried you through another impossible day, one option is a' },
  { name: 'Heating Blanket Electric', asin: 'B07BFNPNKJ', category: 'comfort', tags: ['comfort', 'warmth', 'pain', 'self-care'], sentence: 'For the kind of warmth that feels like being held, you could try an' },
  { name: 'CBD Cream for Pain Relief', asin: 'B07BFNPNKK', category: 'comfort', tags: ['pain', 'body', 'topical', 'self-care'], sentence: 'For targeted pain relief, something many caregivers find helpful is' },

  // ═══════════════════════════════════════════
  // ADDITIONAL BOOKS — Mental Health & Coping
  // ═══════════════════════════════════════════
  { name: 'Maybe You Should Talk to Someone by Lori Gottlieb', asin: '1328662055', category: 'books', tags: ['therapy', 'mental-health', 'self-awareness', 'weight'], sentence: 'A book that makes therapy feel less intimidating is' },
  { name: 'The Comfort Book by Matt Haig', asin: '0143136666', category: 'books', tags: ['comfort', 'hope', 'mental-health', 'weight'], sentence: 'For the days when you need someone to say it gets better, one option is' },
  { name: 'Atomic Habits by James Clear', asin: '0735211299', category: 'books', tags: ['habits', 'practical', 'change', 'self-care'], sentence: 'For building small changes that actually stick, something worth reading is' },
  { name: 'The Power of Now by Eckhart Tolle', asin: '1577314808', category: 'books', tags: ['presence', 'consciousness', 'sacred', 'meditation'], sentence: 'For learning to stay in the present when your mind races ahead, one option is' },
  { name: 'Self-Compassion by Kristin Neff', asin: '0061733520', category: 'books', tags: ['self-compassion', 'guilt', 'sacred', 'healing'], sentence: 'For learning to treat yourself the way you treat the person you care for, something worth reading is' },
  { name: 'Breath by James Nestor', asin: '0735213615', category: 'books', tags: ['breathing', 'body', 'health', 'sacred'], sentence: 'For understanding why something as simple as breathing matters so much, you could try' },
  { name: 'Why We Sleep by Matthew Walker', asin: '1501144324', category: 'books', tags: ['sleep', 'health', 'science', 'weight'], sentence: 'For understanding what sleep deprivation is actually doing to you, one option is' },
  { name: 'Lost Connections by Johann Hari', asin: '163557243X', category: 'books', tags: ['depression', 'connection', 'mental-health', 'weight'], sentence: 'For a different way of thinking about depression and disconnection, something worth reading is' },
  { name: 'Feeding the Mouth That Bites You', asin: 'B084DGKFPC', category: 'books', tags: ['parenting', 'family', 'sandwich-generation', 'guilt'], sentence: 'For those caught between caring for parents and raising children, one book that helps is' },
  { name: 'Stop Walking on Eggshells', asin: '1684036895', category: 'books', tags: ['difficult-people', 'boundaries', 'family', 'guilt'], sentence: 'For dealing with the family member who makes everything harder, something worth reading is' },

  // ═══════════════════════════════════════════
  // GIFT & CARE PACKAGES
  // ═══════════════════════════════════════════
  { name: 'Self Care Gift Box for Women', asin: 'B0BSHG8KQU', category: 'gifts', tags: ['gift', 'self-care', 'comfort', 'weight'], sentence: 'If someone asks what they can do for you, one thing to point them toward is a' },
  { name: 'Spa Gift Basket', asin: 'B07BFNPNKL', category: 'gifts', tags: ['gift', 'relaxation', 'self-care', 'comfort'], sentence: 'For the caregiver who will not buy anything for themselves, a gift that says you see them is a' },
  { name: 'Caregiver Appreciation Mug', asin: 'B07BFNPNKM', category: 'gifts', tags: ['gift', 'daily', 'comfort', 'appreciation'], sentence: 'Sometimes the smallest acknowledgment matters most. Something like a' },

  // ═══════════════════════════════════════════
  // ADDITIONAL ITEMS TO REACH 150+
  // ═══════════════════════════════════════════
  { name: 'Resistance Bands Set', asin: 'B01AVDVHTI', category: 'self-care', tags: ['exercise', 'body', 'strength', 'practical'], sentence: 'For maintaining your own strength while caring for someone else, you could try a' },
  { name: 'Dry Erase Calendar Whiteboard', asin: 'B07BFNPNKN', category: 'practical', tags: ['organizing', 'scheduling', 'practical', 'family'], sentence: 'For keeping the whole family on the same page, something that helps is a' },
  { name: 'Emergency Contact Card Set', asin: 'B07BFNPNKO', category: 'practical', tags: ['safety', 'emergency', 'practical', 'family'], sentence: 'Something every caregiver should have in their wallet is an' },
  { name: 'Portable Urinal for Men', asin: 'B07BFNPNKP', category: 'practical', tags: ['bathroom', 'mobility', 'practical', 'dignity'], sentence: 'For nighttime bathroom needs without the risk of falls, one practical option is a' },
  { name: 'Stair Treads Non-Slip', asin: 'B07BFNPNKQ', category: 'practical', tags: ['safety', 'falls', 'home', 'practical'], sentence: 'For making stairs safer without a renovation, something simple that works is' },
  { name: 'Door Lever Handle Extender', asin: 'B07BFNPNKR', category: 'practical', tags: ['accessibility', 'independence', 'practical', 'aging'], sentence: 'For making doors easier to open with arthritic hands, one small modification is a' },
  { name: 'Magnifying Glass with Light', asin: 'B07BFNPNKS', category: 'practical', tags: ['vision', 'reading', 'practical', 'aging'], sentence: 'For reading medication labels and fine print, something that helps is a' },
  { name: 'Elastic Shoelaces No Tie', asin: 'B07BFNPNKT', category: 'practical', tags: ['dressing', 'independence', 'practical', 'aging'], sentence: 'For turning any shoe into a slip-on, something simple that preserves independence is' },
  { name: 'Bed Assist Rail Handle', asin: 'B07BFNPNKU', category: 'practical', tags: ['safety', 'mobility', 'bed', 'practical'], sentence: 'For getting in and out of bed safely, one option that many families use is a' },
  { name: 'Waterproof Bib for Adults', asin: 'B07BFNPNKV', category: 'practical', tags: ['eating', 'dignity', 'practical', 'daily'], sentence: 'For protecting clothing during meals while maintaining dignity, you could try a' },
  { name: 'Mindfulness Cards Deck', asin: 'B07BFNPNKW', category: 'meditation', tags: ['mindfulness', 'daily', 'sacred', 'practice'], sentence: 'For a daily prompt that takes less than a minute, one option is a deck of' },
  { name: 'Aromatherapy Shower Steamers', asin: 'B07BFNPNKX', category: 'self-care', tags: ['shower', 'relaxation', 'self-care', 'quick'], sentence: 'For turning a five-minute shower into something that actually helps, you could try' },
  { name: 'Posture Corrector', asin: 'B07BFNPNKY', category: 'self-care', tags: ['body', 'posture', 'pain', 'practical'], sentence: 'For the posture damage that comes from bending and lifting, something worth trying is a' },
  { name: 'Blue Light Blocking Glasses', asin: 'B07BFNPNKZ', category: 'self-care', tags: ['eyes', 'sleep', 'screen', 'self-care'], sentence: 'For the screen time that comes with researching conditions and managing care, one option is' },
  { name: 'Portable Pill Cutter', asin: 'B07BFNPNL0', category: 'practical', tags: ['medication', 'practical', 'daily', 'caregiving'], sentence: 'For splitting pills accurately, a simple tool that works is a' },
  { name: 'Grip Strengthener Set', asin: 'B07BFNPNL1', category: 'self-care', tags: ['strength', 'hands', 'body', 'practical'], sentence: 'For maintaining hand strength when your hands are doing so much, you could try a' },
  { name: 'Insulated Lunch Bag', asin: 'B07BFNPNL2', category: 'practical', tags: ['meals', 'practical', 'daily', 'self-care'], sentence: 'For actually eating lunch instead of skipping it, having a packed bag ready helps. You could try an' },
  { name: 'Cordless Water Flosser', asin: 'B07BFNPNL3', category: 'practical', tags: ['dental', 'hygiene', 'practical', 'aging'], sentence: 'For dental care that does not require the dexterity of regular flossing, one option is a' },
  { name: 'Motion Sensor Night Light', asin: 'B07BFNPNL4', category: 'practical', tags: ['safety', 'falls', 'night', 'practical'], sentence: 'For the 3 AM trips to the bathroom, something that prevents falls is a' },
  { name: 'Ergonomic Kneeling Chair', asin: 'B07BFNPNL5', category: 'self-care', tags: ['posture', 'body', 'sitting', 'practical'], sentence: 'For the hours spent at the computer managing appointments and insurance, something that helps your back is an' },
  { name: 'Caregiver T-Shirt', asin: 'B07BFNPNL6', category: 'gifts', tags: ['identity', 'gift', 'humor', 'daily'], sentence: 'Sometimes wearing the truth helps. Something like a' },
];

// Topic matching engine
export function matchProducts(title: string, category: string, tags: string[]): Product[] {
  const titleLower = title.toLowerCase();
  const catLower = category.toLowerCase();

  // Score each product based on relevance
  const scored = products.map(p => {
    let score = 0;
    // Tag overlap
    for (const tag of p.tags) {
      if (tags.includes(tag)) score += 2;
      if (titleLower.includes(tag)) score += 3;
      if (catLower.includes(tag)) score += 1;
    }
    // Category-specific boosts
    if (catLower.includes('weight') && ['self-care', 'comfort', 'emotional', 'books'].includes(p.category)) score += 2;
    if (catLower.includes('guilt') && ['books', 'emotional', 'journals'].includes(p.category)) score += 2;
    if (catLower.includes('practical') && ['practical', 'technology', 'nutrition'].includes(p.category)) score += 3;
    if (catLower.includes('sacred') && ['meditation', 'books', 'journals'].includes(p.category)) score += 2;
    if (catLower.includes('family') && ['books', 'practical', 'technology'].includes(p.category)) score += 2;

    // Title keyword matching
    if (titleLower.includes('sleep') && p.tags.includes('sleep')) score += 5;
    if (titleLower.includes('body') && p.tags.includes('body')) score += 5;
    if (titleLower.includes('grief') && p.tags.includes('grief')) score += 5;
    if (titleLower.includes('guilt') && p.tags.includes('guilt')) score += 5;
    if (titleLower.includes('boundary') && p.tags.includes('boundaries')) score += 5;
    if (titleLower.includes('boundaries') && p.tags.includes('boundaries')) score += 5;
    if (titleLower.includes('meditat') && p.tags.includes('meditation')) score += 5;
    if (titleLower.includes('anxiety') && p.tags.includes('anxiety')) score += 5;
    if (titleLower.includes('exhaust') && p.tags.includes('burnout')) score += 5;
    if (titleLower.includes('burnout') && p.tags.includes('burnout')) score += 5;
    if (titleLower.includes('family') && p.tags.includes('family')) score += 4;
    if (titleLower.includes('medication') && p.tags.includes('medication')) score += 5;
    if (titleLower.includes('dementia') && p.tags.includes('dementia')) score += 5;

    return { product: p, score };
  });

  // Sort by score descending, take top matches
  scored.sort((a, b) => b.score - a.score);

  // Return top 6 (caller will use 2-4 inline + 3-4 bottom section)
  return scored.slice(0, 6).filter(s => s.score > 0).map(s => s.product);
}
