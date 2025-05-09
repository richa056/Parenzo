const localResponses: Record<string, string> = {
  // Feeding & Nutrition
  "at what age baby should start eating solids": "Most babies are ready for solids around 6 months. Look for signs like sitting up with support, showing interest in food, and being able to hold their head steady.",
  "how often should i feed my newborn": "Newborns typically feed every 2-3 hours, or 8-12 times in 24 hours. Watch for hunger cues and feed on demand.",
  "how do i know if my baby is getting enough milk": "Signs your baby is getting enough milk: 6+ wet diapers/day, steady weight gain, content after feeds, and regular bowel movements.",
  "what are signs of a good latch breastfeeding": "A good latch means baby's mouth covers most of the areola, lips are flanged out, and you feel a gentle tug, not pain.",
  "how to increase breast milk supply": "Nurse frequently, ensure proper latch, stay hydrated, eat well, and try skin-to-skin contact. Consult a lactation consultant if needed.",
  "can i mix breast milk and formula": "Yes, you can combine breast milk and formula in a bottle if needed. Always follow safe preparation guidelines.",
  "what foods to avoid for babies": "Avoid honey (under 1 year), whole nuts, unpasteurized dairy, added salt/sugar, and choking hazards like grapes and popcorn.",
  "how to introduce allergens": "Introduce common allergens (peanut, egg, dairy, etc.) one at a time, starting around 6 months, and watch for reactions.",
  "my baby is a picky eater": "Offer a variety of foods, avoid pressure, keep mealtimes positive, and model healthy eating. It can take many tries for a child to accept new foods.",
  "how much water should my baby drink": "Babies under 6 months don't need water. After 6 months, small sips are okay with meals. Breast milk/formula is primary until 1 year.",
  "what are signs of food allergy": "Watch for hives, swelling, vomiting, diarrhea, or trouble breathing after eating. Seek medical help for severe reactions.",
  "how to handle baby constipation": "Offer extra fluids, pureed prunes/pears, and tummy massage. If your baby is in pain or constipated for days, consult your doctor.",
  "what to do if baby has diarrhea": "Keep baby hydrated, continue feeding, and watch for signs of dehydration. Contact your doctor if diarrhea is severe or lasts more than a day or two.",
  "can i give my baby juice": "It's best to avoid juice for babies under 1 year. After 1, limit to 4 oz/day of 100% fruit juice, served with meals.",
  "how to wean from breastfeeding": "Gradually replace nursing sessions with bottle or cup feeds, offer comfort, and go at your baby's pace. Weaning is a process.",
  "what are good first foods for baby": "Start with single-ingredient purees like rice cereal, sweet potato, avocado, banana, or apple. Introduce one food at a time and wait 3-5 days before trying another.",
  "how to make baby food at home": "Steam or boil vegetables/fruits until soft, puree with breast milk/formula, and freeze in small portions. Always use clean utensils and store properly.",
  "when can my baby eat eggs": "You can introduce eggs (including the yolk) around 6 months. Start with well-cooked eggs and watch for any allergic reactions.",
  "how to handle baby spit up": "Spit up is normal in babies. Keep baby upright after feeds, burp frequently, and avoid overfeeding. If excessive or forceful, consult your doctor.",
  "what are signs of overfeeding": "Watch for frequent spit up, fussiness after feeds, and rapid weight gain. Follow your baby's hunger cues and consult your pediatrician if concerned.",
  
  // Sleep
  "how many hours baby should sleep": "Newborns sleep 14-17 hours a day, often in short stretches. By 3-6 months, babies typically sleep 12-15 hours total, including naps. By 1 year, most babies sleep 11-14 hours total.",
  "how to help my baby sleep through the night": "Establish a consistent bedtime routine, keep nighttime interactions calm, and put baby down drowsy but awake.",
  "is it normal for my baby to wake up at night": "Yes, frequent night waking is normal for infants. Babies gradually learn to sleep longer stretches.",
  "safe sleep practices for babies": "Always place baby on their back to sleep, use a firm mattress, and keep the crib free of loose bedding and toys.",
  "how to transition from swaddle": "Transition gradually by leaving one arm out, then both. Stop swaddling when baby shows signs of rolling over.",
  "what is sleep regression": "Sleep regression is a temporary disruption in sleep, often around 4, 8, or 12 months. Stick to routines and offer comfort.",
  "how to handle night terrors": "Night terrors are rare in infants but can occur in toddlers. Keep routines consistent and avoid overtiredness.",
  "should i let my baby cry it out": "There are various sleep training methods. Choose what feels right for your family and consult your pediatrician if unsure.",
  "how to create a bedtime routine": "A bedtime routine can include a bath, story, lullaby, and dim lights. Consistency helps signal sleep time.",
  "how to handle short naps": "Short naps are common in young babies. Try adjusting wake windows, keep routines consistent, and ensure a dark, quiet sleep environment.",
  "why does my baby fight sleep": "Overtiredness, overstimulation, or hunger can cause sleep resistance. Watch for sleepy cues and keep routines calm.",
  "is co-sleeping safe": "Room-sharing is recommended, but bed-sharing increases SIDS risk. Always follow safe sleep guidelines.",
  "how to stop night feedings": "Gradually reduce the amount or frequency, offer comfort, and ensure your baby is getting enough calories during the day.",
  "when will my baby sleep through the night": "Most babies sleep longer stretches by 6 months, but every child is different.",
  "how to help my baby nap longer": "Darken the room, use white noise, and keep nap routines consistent.",
  "should i wake my baby to feed at night": "For newborns, yes—until they regain birth weight. After that, let them sleep unless advised otherwise by your doctor.",
  
  // Health & Safety
  "what vaccines does my baby need": "Follow the recommended immunization schedule from your pediatrician or health authority.",
  "how to treat a fever in a baby": "Monitor temperature, keep baby comfortable, and offer fluids. Contact your doctor for high or persistent fevers.",
  "when to call the doctor": "Call the doctor for high fever, trouble breathing, persistent vomiting, dehydration, or if you are concerned.",
  "how to babyproof my home": "Install safety gates, cover outlets, secure furniture, and keep small objects and chemicals out of reach.",
  "what to do if my baby is choking": "Call emergency services. For infants, give 5 back blows and 5 chest thrusts. Learn infant CPR for emergencies.",
  "how to treat diaper rash": "Keep the area clean and dry, use barrier creams, and allow diaper-free time. See a doctor if rash persists.",
  "how to handle teething": "Offer teething rings, cold washcloths, and gentle gum massage. Comfort your baby and consult your doctor for severe symptoms.",
  "what are signs of dehydration": "Fewer wet diapers, dry mouth, no tears when crying, and lethargy. Offer fluids and contact your doctor if concerned.",
  "how to care for the umbilical cord": "Keep it clean and dry, fold diaper below the stump, and let it fall off naturally. See a doctor if there is redness or discharge.",
  "symptoms of loose motion": "Watch for frequent watery stools, dehydration signs (fewer wet diapers, dry mouth), fever, vomiting, and changes in behavior. Keep baby hydrated and contact your doctor if symptoms persist or worsen.",
  "how to handle baby cold": "Use saline drops, a humidifier, keep baby hydrated, and offer plenty of rest. Contact your doctor if symptoms worsen or if your baby is under 3 months.",
  "what are symptoms of ear infection": "Watch for pulling at ears, fussiness, fever, difficulty sleeping, and changes in feeding patterns. Ear infections often follow colds and may require antibiotics.",
  "how to prevent SIDS": "Always place baby on their back to sleep, use a firm mattress, keep the crib empty, avoid overheating, and don't smoke around your baby.",
  "how to handle baby eczema": "Keep skin moisturized, use gentle soaps, avoid triggers, and dress baby in soft, breathable fabrics. See a doctor if rash is severe or infected.",
  "what to do if baby has a rash": "Keep the area clean and dry, avoid scratching, and use gentle products. See a doctor if rash is severe, spreading, or accompanied by fever.",
  
  // Development & Milestones
  "when will my baby smile": "Most babies start smiling socially around 6-8 weeks old.",
  "when will my baby roll over": "Babies usually roll over between 4-6 months.",
  "when will my baby sit up": "Sitting up without support typically happens around 6-8 months.",
  "when will my baby crawl": "Crawling often begins between 6-10 months, but some babies skip crawling.",
  "when will my baby walk": "Most babies take their first steps between 9-15 months.",
  "how to encourage tummy time": "Start with short sessions, use toys, and get down on the floor with your baby. Gradually increase tummy time each day.",
  "what are signs of developmental delay": "If your baby isn't meeting milestones, doesn't respond to sounds, or has poor muscle tone, consult your pediatrician.",
  "how to support language development": "Talk, sing, and read to your baby daily. Respond to their sounds and encourage babbling.",
  "is it normal for my baby to not crawl": "Some babies skip crawling and go straight to walking. As long as other milestones are met, it's usually not a concern.",
  "what are one month baby milestones": "At one month, babies typically: lift head briefly, follow objects with eyes, respond to sounds, make cooing sounds, and show social smiles.",
  "what are two month baby milestones": "At two months, babies usually: hold head up better, track objects, smile socially, make more sounds, and show more interest in faces.",
  "what are three month baby milestones": "At three months, babies typically: hold head steady, reach for objects, laugh, roll from tummy to back, and show more social interaction.",
  "what are four month baby milestones": "At four months, babies usually: roll over, hold head steady, reach for objects, laugh out loud, and show more interest in toys.",
  "what are five month baby milestones": "At five months, babies typically: sit with support, roll both ways, reach for objects, show more social interaction, and may start to show stranger anxiety.",
  "what are six month baby milestones": "At six months, babies usually: sit without support, roll both ways, reach for objects, show more social interaction, and may start to show stranger anxiety.",
  "how to track baby development": "Keep a milestone journal, take photos/videos, and discuss progress with your pediatrician. Remember that every baby develops at their own pace.",
  "how to encourage baby development": "Provide tummy time, talk and sing to your baby, offer age-appropriate toys, and create a stimulating environment. Follow your baby's lead and interests.",
  "what are normal baby growth patterns": "Babies typically double their birth weight by 5-6 months and triple it by 1 year. Growth spurts are common and may affect feeding and sleeping patterns.",
  
  // Behavior & Emotions
  "why does my baby cry so much": "Crying is a baby's way of communicating. Check for hunger, discomfort, tiredness, or need for comfort.",
  "how to soothe a fussy baby": "Try rocking, swaddling, white noise, or a pacifier. Sometimes a change of scenery helps.",
  "what is colic": "Colic is excessive crying in an otherwise healthy baby, often in the evenings. It usually resolves by 3-4 months.",
  "how to handle separation anxiety": "Practice short separations, keep goodbyes brief, and reassure your baby. Separation anxiety is a normal stage.",
  "how to help my baby with stranger anxiety": "Give your baby time to warm up to new people. Stay close and offer comfort.",
  "how to encourage independent play": "Set up a safe space with toys, and let your baby explore while you supervise nearby.",
  "how to set boundaries for toddlers": "Be consistent, use simple language, and offer choices. Praise positive behavior.",
  "how to handle tantrums": "Stay calm, ensure safety, and let the tantrum pass. Talk about feelings once your child is calm.",
  "how to handle baby biting": "Stay calm, say 'no' firmly, and redirect to appropriate behavior. If breastfeeding, end the session briefly. Be consistent with boundaries.",
  "how to handle baby hitting": "Stay calm, say 'no' firmly, and redirect to appropriate behavior. Model gentle touch and be consistent with boundaries.",
  "how to handle baby screaming": "Check for needs (hunger, discomfort), offer comfort, and model appropriate volume. If persistent, consult your pediatrician.",
  "how to handle baby whining": "Stay calm, acknowledge feelings, and help your child express needs appropriately. Be consistent with boundaries and offer positive attention.",
  
  // Routines & Schedules
  "how to create a daily routine for my baby": "Include regular times for feeding, naps, play, and bedtime. Routines help babies feel secure.",
  "how many naps does my baby need": "Newborns nap frequently. By 6 months, most babies take 2-3 naps a day. Adjust as your baby grows.",
  "when to drop a nap": "If your baby resists naps and sleeps well at night, it may be time to drop a nap. Transition gradually.",
  "how to handle time changes": "Adjust your baby's schedule by 10-15 minutes each day leading up to the time change.",
  "how to establish a feeding schedule": "Start with feeding on demand, then gradually establish regular times. Be flexible and watch for hunger cues.",
  "how to handle travel with baby": "Plan ahead, bring familiar items, maintain routines when possible, and be prepared for changes in sleep patterns.",
  "how to handle daylight savings": "Adjust your baby's schedule by 10-15 minutes each day leading up to the time change.",
  "how to handle holidays with baby": "Maintain routines when possible, bring familiar items, and be prepared for changes in sleep patterns.",
  
  // Play & Learning
  "what all toys i should buy for my baby": "Choose age-appropriate toys that are safe, colorful, and encourage exploration. For 0-6 months: rattles, soft toys, and mobiles. For 6-12 months: stacking cups, balls, and push toys. For 12+ months: shape sorters, simple puzzles, and ride-on toys.",
  "how to encourage learning through play": "Follow your baby's interests, offer a variety of toys, and join in play to model new skills.",
  "how much screen time is okay": "Avoid screen time for babies under 18 months, except for video calls. For older children, limit and supervise use.",
  "what are sensory activities for babies": "Try water play, textured toys, music, and safe household items. Sensory play supports development.",
  "how to encourage reading with baby": "Read daily, use board books, point to pictures, and make reading interactive. Start early and make it fun.",
  "how to encourage music with baby": "Sing songs, play instruments, dance together, and expose your baby to different types of music.",
  "how to encourage art with baby": "Offer safe art materials, focus on process over product, and join in the fun. Start with simple activities like finger painting.",
  "how to encourage outdoor play": "Take daily walks, visit parks, and let your baby explore nature. Dress appropriately for the weather and use sun protection.",
  
  // Postpartum & Parental Wellbeing
  "how to cope up with postpartum depression": "Practice self-care, talk to loved ones, join support groups, and consider therapy. Remember that seeking help is a sign of strength. If you're experiencing persistent sadness, loss of interest, or thoughts of harming yourself, contact your healthcare provider immediately.",
  "what are signs of postpartum depression": "Persistent sadness, loss of interest, trouble bonding, and changes in sleep or appetite. Seek professional help if you notice these signs.",
  "how to take care of myself as a new mom": "Prioritize rest, eat well, accept help, and make time for self-care, even if brief.",
  "how to balance parenting and work": "Plan ahead, communicate with your employer, and ask for support from family or childcare providers.",
  "how to deal with mom guilt": "Remember you're doing your best, practice self-compassion, and focus on quality time rather than quantity. Talk to other moms about your feelings.",
  "how to ask for help as a new mom": "Reach out to family, friends, or support groups. People often want to help but may not know how.",
  "how to manage visitors after birth": "Set boundaries, limit visits, and prioritize your recovery and bonding time.",
  "how to handle unsolicited advice": "Thank them for caring, but trust your instincts and do what feels right for your family.",
  "how to find local mom groups": "Check community centers, social media, or your pediatrician's office for recommendations.",
  "how to balance self-care with baby care": "Schedule small breaks, accept help, and remember that caring for yourself benefits your baby too.",
  "how to handle mom burnout": "Take regular breaks, ask for help, prioritize self-care, and set boundaries. Remember that taking care of yourself helps you take better care of your baby.",
  "how to maintain relationships after baby": "Schedule date nights, communicate openly with your partner, and make time for friends. Remember that relationships need attention to thrive.",
  "how to handle mom comparison": "Focus on your baby's unique journey, limit social media, and remember that every family is different. Celebrate your own parenting wins.",
  "how to manage mom stress": "Practice mindfulness, exercise regularly, get enough sleep, and use stress-reduction techniques. Consider therapy if stress becomes overwhelming.",
  "how to handle mom isolation": "Join mom groups, attend baby classes, and reach out to other parents. Remember that many moms feel isolated and are looking for connection.",
  "how to maintain mom identity": "Keep up with hobbies, stay connected to friends, and remember that being a mom is part of who you are, not all of who you are.",
  "how to handle mom expectations": "Set realistic goals, be flexible, and remember that perfect parenting doesn't exist. Focus on what works for your family.",
  
  // Default response
  "default": "I'm here to help with your parenting questions. Please ask me anything about feeding, sleep, potty, development, or any new mom concern!"
};

export function getLocalResponse(message: string): string {
  // Convert message to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase().trim();
  
  console.log('Searching for response to:', lowerMessage);
  
  // Try to find an exact match
  if (localResponses[lowerMessage]) {
    console.log('Found exact match');
    return localResponses[lowerMessage];
  }
  
  // Split message into words and filter out common words
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'like', 'through', 'over', 'before', 'between', 'after', 'since', 'without', 'under', 'within', 'along', 'following', 'across', 'behind', 'beyond', 'plus', 'except', 'but', 'up', 'out', 'around', 'down', 'off', 'above', 'near'];
  const messageWords = lowerMessage.split(/\s+/).filter(word => !commonWords.includes(word));
  
  // Find the best match based on number of matching words
  let bestMatch = {
    key: '',
    value: localResponses.default,
    matchCount: 0
  };
  
  for (const [key, value] of Object.entries(localResponses)) {
    if (key === 'default') continue;
    
    const lowerKey = key.toLowerCase();
    const keyWords = lowerKey.split(/\s+/).filter(word => !commonWords.includes(word));
    
    // Count matching words
    const matchCount = keyWords.filter(word => 
      messageWords.some(msgWord => 
        msgWord.includes(word) || word.includes(msgWord)
      )
    ).length;
    
    // Only consider matches with at least 2 matching words
    if (matchCount >= 2 && matchCount > bestMatch.matchCount) {
      bestMatch = { key, value, matchCount };
    }
  }
  
  if (bestMatch.matchCount >= 2) {
    console.log('Found best match:', bestMatch.key, 'with', bestMatch.matchCount, 'matching words');
    return bestMatch.value;
  }
  
  console.log('No good match found, returning default');
  return localResponses.default;
} 