// AKJEE — Prompt Templates
// All AI study material generation prompts

const PromptsModule = {
  // Track prompt usage
  history: [],

  // Generate a VIDEO prompt for a given topic
  generateVideoPrompt(subject, topic, subtopics, day, date) {
    const subtopicList = Array.isArray(subtopics) ? subtopics.join('\n   - ') : subtopics;
    const bookRef = this.getBookReference(subject);
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VIDEO GENERATION PROMPT — AKJEE
Subject: ${subject}
Topic: ${topic}
Day: ${day} | Date: ${date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are a JEE expert teacher. Create a detailed, animated teaching
video script for the following topic. The student is in Class 11
and has just completed CBSE Class 10.

TOPIC: ${topic}
SUB-TOPICS:
   - ${subtopicList}
TARGET EXAM: JEE Main + JEE Advanced Foundation
LEVEL: Beginner to Intermediate

VIDEO STRUCTURE REQUIRED:

1. HOOK (0:00–0:30): Start with a real-world application or
   interesting fact about ${topic}. Make it surprising and engaging.

2. CONCEPT INTRODUCTION (0:30–2:00):
   Define the topic clearly using simple language.
   Use analogies the student can relate to from everyday life.
   Connect to what they already know from Class 10 CBSE.

3. THEORY EXPLANATION (2:00–8:00): Explain all sub-topics:
   - ${subtopicList}
   Include all important formulas with derivations (show the math).
   Use visual diagrams in the script description.
   Reference ${bookRef}.

4. SOLVED EXAMPLES (8:00–12:00): Solve 3 problems step-by-step:
   Problem 1 (Easy): Direct formula application — 2 marks type
   Problem 2 (Medium): Multi-step — 4 marks type
   Problem 3 (Hard): JEE Main level — tricky application

5. COMMON MISTAKES (12:00–13:30):
   List 3 common errors students make in JEE on this topic.
   Show the wrong approach, then the correct approach.

6. QUICK RECAP (13:30–15:00):
   - Formula sheet (list all formulas visually)
   - Key points to remember (bullet points on screen)
   - Memory tricks or mnemonics
   - "What to expect in JEE" preview

7. OUTRO (15:00):
   "Open AKJEE app and take today's quiz on ${topic}!"
   Show the topic as completed with a checkmark animation.

TONE: Energetic, encouraging, exam-focused
LANGUAGE: Clear English (add Hindi/regional language explanations for tricky parts if needed)
ANIMATION STYLE: 2D animated whiteboard with colorful diagrams
VISUAL MARKERS: Use color coding — Physics=Blue, Chemistry=Green, Math=Orange

From the uploaded books (${bookRef}), reference specific pages,
numbered examples, and exercise problems. Make the video feel
like it's directly teaching from those books.

DURATION: 15 minutes
FORMAT: Script with [VISUAL: description] markers for each diagram/animation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  },

  // Generate an AUDIO prompt
  generateAudioPrompt(subject, topic, subtopics, day, date) {
    const subtopicList = Array.isArray(subtopics) ? subtopics.join(', ') : subtopics;
    const bookRef = this.getBookReference(subject);
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIO GENERATION PROMPT — AKJEE
Subject: ${subject} | Topic: ${topic} | Day: ${day} | Date: ${date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a 15-minute podcast-style audio lesson script for:
TOPIC: ${topic}
SUB-TOPICS: ${subtopicList}
AUDIENCE: Class 11 JEE aspirant, just completed Class 10 CBSE

AUDIO SCRIPT STRUCTURE:

[00:00] INTRO (30 sec)
"Welcome to AKJEE Daily Audio! I'm your JEE coach. Today — Day ${day} —
we're covering ${topic} from ${subject}. By the end of this audio,
you'll be able to solve JEE-level problems on this topic. Let's go!"

[00:30] STORY/HOOK (1 min)
Start with a real-life story or mind-blowing fact about ${topic}.
Make it relatable — use examples from daily life.
End with: "And THIS is exactly what we're going to master today..."

[01:30] CORE CONCEPT EXPLANATION (5 min)
Explain each sub-topic: ${subtopicList}
Rules for audio-only teaching:
- Use "Imagine..." and "Picture this..." constructions
- No diagrams (audio only) — describe shapes and positions verbally
- Spell out all formulas: e.g., "v equals u plus a times t"
- Pause and repeat key formulas twice
- Connect new concepts to what listener already knows

[06:30] FORMULA DRILL (2 min)
"Let's lock in these formulas. Repeat after me..."
State each key formula 3 times with variations.
Add memory tricks: acronyms, rhymes, stories.
"Can you recall the formula for... before I say it? 3... 2... 1..."

[08:30] SOLVED PROBLEM WALKTHROUGH (4 min)
Solve 2 JEE-style problems verbally, step-by-step.
Problem 1: "Here's our problem. Given... find..."
Walk through each step, explain why each step is taken.
Problem 2: Slightly harder. Build on Problem 1.

[12:30] COMMON EXAM TRAPS (1.5 min)
"In JEE, students lose marks on ${topic} because of these traps..."
Trap 1: [common error] → Correct approach: [fix]
Trap 2: [common error] → Correct approach: [fix]
"These traps have appeared in JEE Main multiple times!"

[14:00] RECAP RHYME/MNEMONIC (30 sec)
Create a catchy way to remember the key formula or concept.
Example: a rhyme, an acronym, a visual memory trick in words.

[14:30] OUTRO (30 sec)
"You've completed Day ${day} audio for ${subject}!
Now open your AKJEE app and take the quiz.
Every quiz you take is one step closer to JEE. You've got this! 💪"

TONE: Like a friendly, energetic mentor — NOT a boring lecture
VOICE STYLE: Conversational, confident, occasionally funny
PACING: Fast when explaining concepts, slow when stating formulas

Reference ${bookRef} for specific problem numbers and examples.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  },

  // Generate a NOTES prompt
  generateNotesPrompt(subject, topic, subtopics, day, date) {
    const subtopicList = Array.isArray(subtopics) ? subtopics.join('\n      ') : subtopics;
    const bookRef = this.getBookReference(subject);
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES GENERATION PROMPT — AKJEE
Subject: ${subject} | Topic: ${topic} | Day: ${day} | Date: ${date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate complete, JEE-focused study notes for:
TOPIC: ${topic}
SUB-TOPICS:
      ${subtopicList}
REFERENCE: ${bookRef}

NOTES FORMAT:

═══════════════════════════════════════════════════════
📘 AKJEE NOTES | ${subject} | Day ${day}
Topic: ${topic} | Date: ${date}
═══════════════════════════════════════════════════════

1. QUICK OVERVIEW (3-4 lines)
   What is ${topic}? Why is it important for JEE?
   How many questions typically appear in JEE Main from this topic?

2. KEY DEFINITIONS
   List all important terms with clear, concise definitions.
   Include the symbol used for each term where applicable.

3. IMPORTANT FORMULAS
   For EACH formula, use this box format:
   ┌──────────────────────────────────────────┐
   │ [Formula Name]                           │
   │ Formula: [write the formula clearly]     │
   │ Variables: [define each variable]        │
   │ SI Units: [units of each quantity]       │
   │ Condition: [when this formula applies]   │
   │ JEE Tip: [common trap or shortcut]       │
   └──────────────────────────────────────────┘

4. CONCEPT EXPLANATION (Sub-topic by sub-topic)
   For each sub-topic:
   - Clear explanation with bullet points
   - Diagram description (draw if generating visually)
   - Common misconception and the correct understanding
   - Reference from ${bookRef}

5. SOLVED EXAMPLES
   Example 1 (Easy — 2 marks JEE level):
   Problem: [state clearly with all given data]
   Solution: Step 1 → Step 2 → Step 3
   Answer: [boxed answer]
   Key Learning: [what concept this tests]

   Example 2 (Medium — 4 marks):
   [Same format]

   Example 3 (Hard — JEE Advanced level):
   [Same format]

6. PREVIOUS YEAR JEE QUESTIONS (3 questions)
   Find 3 actual JEE questions from the uploaded books/materials
   on this topic. Show solutions.

7. COMMON MISTAKES ⚠️
   Mistake 1: "[What students do wrong]"
   Why it's wrong: [explain]
   Correct approach: [show the right way]
   [Repeat for 2-3 mistakes]

8. MEMORY TRICKS 🧠
   Create memorable tricks for:
   - Key formulas (mnemonics, rhymes, stories)
   - Conceptual understanding (visual analogies)
   - Unit conversions (if applicable)

9. CONNECTIONS 🔗
   ← Comes after: [previous topic in this subject]
   → Leads to: [next topic in this subject]
   🔗 Cross-subject: [connections to other subjects if any]
   🌍 Real world: [practical application]

10. QUICK REVISION BOX
   ┌─────────────────────────────────────────────┐
   │ ✅ [Most important formula 1]               │
   │ ✅ [Most important formula 2]               │
   │ ✅ [Key concept 1]                          │
   │ ✅ [Key concept 2]                          │
   │ ✅ [Key concept 3]                          │
   │ ⚠️ [Most common mistake to avoid]          │
   │ 💡 [Best memory trick]                      │
   └─────────────────────────────────────────────┘

FORMAT REQUIREMENTS:
- Use tables for comparative data
- Use boxes for formulas (as shown above)
- Use bullet points for lists
- Bold important terms
- Make it printable and revision-friendly
- Keep language clear and concise
- Target reading time: 20 minutes

Reference ${bookRef} throughout — cite specific chapters and examples.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  },

  // Generate a QUIZ prompt
  generateQuizPrompt(subject, topic, subtopics, day, date) {
    const subtopicList = Array.isArray(subtopics) ? subtopics.join(', ') : subtopics;
    const bookRef = this.getBookReference(subject);
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUIZ GENERATION PROMPT — AKJEE
Subject: ${subject} | Topic: ${topic} | Day: ${day} | Date: ${date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate 15 multiple-choice questions (MCQs) for:
TOPIC: ${topic}
SUB-TOPICS: ${subtopicList}
FORMAT: JEE Main pattern (single correct answer, 4 options)

QUESTION DISTRIBUTION:
- 5 Easy questions (direct formula application, 1-step)
- 7 Medium questions (2-3 step reasoning)
- 3 Hard questions (JEE Main level, application + reasoning)

FOR EACH QUESTION USE THIS FORMAT:
─────────────────────────────────────────────
Question [N] | Difficulty: [Easy/Medium/Hard]
[Question text with all given data clearly stated]

(A) [Option A]
(B) [Option B]
(C) [Option C]
(D) [Option D]

✅ Correct Answer: ([Letter]) [Correct option text]
📝 Explanation: [Clear step-by-step explanation of why this is correct]
💡 Formula Used: [Which formula was applied]
⚠️ Common Trap: [Why wrong options look attractive / common error]
─────────────────────────────────────────────

QUESTION TYPES TO INCLUDE (mix these):
□ Direct numerical calculation
□ Conceptual/theory question (no calculation needed)
□ Graph-based (describe graph in text, ask about feature)
□ Formula identification (which formula applies here?)
□ Application-based (real-world scenario)
□ "Which of the following is CORRECT?" statement type
□ "Which of the following is INCORRECT?" (tricky — tests deep understanding)
□ Comparison question (A is greater/less than B)
□ Unit/dimension question
□ Error analysis or approximation

IMPORTANT RULES:
1. All calculations must be doable without a calculator (use nice numbers)
2. No ambiguous questions — one clearly correct answer
3. Wrong options must be "intelligent distractors" (not obviously wrong)
4. Match actual JEE Main difficulty and style
5. Cover ALL sub-topics: ${subtopicList}

Reference ${bookRef} — use their approach to problem-setting.
At the end, provide an ANSWER KEY table:
Q1:(A) | Q2:(C) | Q3:(B) | ... | Q15:(D)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  },

  // Generate a TEST prompt
  generateTestPrompt(subject, topic, dayNum, date) {
    const topicList = Array.isArray(topic) ? topic.join('\n   ') : topic;
    const weekNumber = Math.ceil((dayNum || 1) / 5);
    const bookRef = this.getBookReference(subject);
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST GENERATION PROMPT — AKJEE
Subject: ${subject} | Week ${weekNumber} | Day: ${dayNum} | Date: ${date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate a complete JEE-style test paper for:
TOPICS COVERED:
   ${topicList}

═══════════════════════════════════════════════════════
AKJEE WEEKLY TEST — Week ${weekNumber}
Subject: ${subject}
Total Questions: 25
Total Marks: 100
Time Allowed: 60 minutes
Marking Scheme: +4 for correct, −1 for incorrect, 0 for unattempted
═══════════════════════════════════════════════════════

SECTION A — Single Correct MCQ
(Questions 1–20, 4 marks each = 80 marks)

For EACH question use this format:
Q[N]. [Question text]
(A) [Option A]   (B) [Option B]
(C) [Option C]   (D) [Option D]

Generate 20 MCQs covering all topics listed above.
Distribution: 7 Easy + 9 Medium + 4 Hard

SECTION B — Numerical Answer Type
(Questions 21–25, 4 marks each = 20 marks)
Answer is a non-negative integer (0 to 9) or decimal
No negative marking in this section

Q21. [Numerical question 1]
Answer: ___

Q22. [Numerical question 2]
Answer: ___

[Continue to Q25]

═══════════════════════════════════════════════════════
ANSWER KEY
Q1: | Q2: | Q3: | Q4: | Q5:
Q6: | Q7: | Q8: | Q9: | Q10:
Q11: | Q12: | Q13: | Q14: | Q15:
Q16: | Q17: | Q18: | Q19: | Q20:
Q21: | Q22: | Q23: | Q24: | Q25:
═══════════════════════════════════════════════════════

SOLUTIONS
Provide complete step-by-step solution for ALL 25 questions.
For MCQs: Show calculation + explain why wrong options are wrong.
For Numerical: Show full working.

PERFORMANCE BENCHMARK:
90–100 marks: Excellent — JEE Advanced track 🏆
70–89 marks: Good — JEE Main track ✅
50–69 marks: Average — Revise [specific weak topics] 📈
Below 50: Revise all topics, focus on [specific weakest areas] 📚

TOPIC-WISE ANALYSIS:
Show which questions came from which topic so student can identify weak areas.

Reference ${bookRef} for authentic JEE-style question framing.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  },

  // Get relevant book reference for a subject
  getBookReference(subject) {
    const refs = {
      'Physics': 'NCERT Physics Class 11 (Part 1 & 2), HC Verma Concepts of Physics Vol.1, DC Pandey',
      'Chemistry': 'NCERT Chemistry Class 11 (Part 1 & 2), OP Tandon Physical Chemistry, MS Chauhan Organic',
      'Math': 'NCERT Mathematics Class 11, RD Sharma Class 11, SK Goyal/Arihant Algebra',
      'Mathematics': 'NCERT Mathematics Class 11, RD Sharma Class 11, SK Goyal/Arihant Algebra'
    };
    return refs[subject] || 'uploaded reference books';
  },

  // Save prompt usage to history
  saveToHistory(type, subject, topic, day) {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type,
      subject,
      topic,
      day
    };
    this.history.unshift(entry);
    // Keep only last 50 entries
    if (this.history.length > 50) this.history = this.history.slice(0, 50);

    // Save to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('akjee_prompt_history') || '[]');
      stored.unshift(entry);
      localStorage.setItem('akjee_prompt_history', JSON.stringify(stored.slice(0, 50)));
    } catch (e) {
      console.warn('Could not save prompt history:', e);
    }
  },

  // Load history from localStorage
  loadHistory() {
    try {
      return JSON.parse(localStorage.getItem('akjee_prompt_history') || '[]');
    } catch (e) {
      return [];
    }
  },

  // Get prompt type display name
  getPromptTypeName(type) {
    const names = {
      'video': '📹 Video Prompt',
      'audio': '🎧 Audio Prompt',
      'notes': '📄 Notes Prompt',
      'quiz': '❓ Quiz Prompt',
      'test': '📝 Test Prompt'
    };
    return names[type] || type;
  },

  // Count prompts generated today
  getTodayCount() {
    const today = new Date().toISOString().split('T')[0];
    const history = this.loadHistory();
    return history.filter(h => h.timestamp.startsWith(today)).length;
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.PromptsModule = PromptsModule;
}

if (typeof module !== 'undefined') {
  module.exports = PromptsModule;
}
