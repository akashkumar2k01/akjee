/* ═══════════════════════════════════════════════════════════════
   AKJEE — JEE Foundation Coach
   Main Application Script v1.0
   Complete SPA logic: Storage, Schedule, Progress, Gamification,
   Quiz, Tests, Prompts, UI, Navigation, Onboarding
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── CONSTANTS ───────────────────────────────────────────────────
const TOTAL_STUDY_DAYS = 60;
const START_DATE = '2026-04-01';
const CIRCUMFERENCE = 2 * Math.PI * 32; // SVG ring r=32

const MOTIVATIONAL_QUOTES = [
  "Every JEE topper started exactly where you are. Let's GO!",
  "Hard work beats talent when talent doesn't work hard.",
  "The pain of studying is temporary. The pride of achievement is forever.",
  "Success in JEE is not about being smart — it's about being consistent.",
  "One topic at a time. One day at a time. You'll get there.",
  "Believe you can and you're halfway there.",
  "Don't wish for it. Work for it.",
  "The secret of getting ahead is getting started.",
  "Excellence is not a destination but a continuous journey.",
  "Push yourself because no one else is going to do it for you.",
  "Your only limit is your mind.",
  "Small daily improvements lead to stunning long-term results.",
  "Success is the sum of small efforts repeated day in, day out.",
  "Focus on progress, not perfection.",
  "The expert in anything was once a beginner.",
  "Dream big. Study hard. Stay focused.",
  "Every formula you memorise is one step closer to IIT.",
  "JEE is not about studying more — it's about studying smart.",
  "Discipline is the bridge between goals and achievement.",
  "What you do today determines what you achieve tomorrow.",
  "Physics, Chemistry, Math — master these three and unlock the world.",
  "IIT toppers didn't have more time than you — they used it better.",
  "A bad test is just a map showing where to improve.",
  "Struggle builds strength. Every hard question is your trainer.",
  "One percent better every day. That's all it takes.",
  "The comeback is always stronger than the setback.",
  "You are closer to your goal than you were yesterday.",
  "Make today so productive that yesterday gets jealous.",
  "Don't stop when you're tired. Stop when you're done.",
  "JEE is a marathon — pace yourself and stay consistent."
];

const LEVEL_THRESHOLDS = [0, 500, 1500, 3500, 6500];
const LEVEL_NAMES = ['Starter', 'Beginner', 'Serious Student', 'JEE Warrior', 'JEE Ready'];

const PHASE_INFO = [
  { phase: 1, name: 'Foundation Basics', days: '1-15', color: 'var(--blue-primary)' },
  { phase: 2, name: 'Core Concepts', days: '16-30', color: 'var(--green)' },
  { phase: 3, name: 'Problem Solving', days: '31-45', color: 'var(--orange)' },
  { phase: 4, name: 'Revision + Tests', days: '46-60', color: 'var(--gold)' }
];

// ── STORAGE MODULE ───────────────────────────────────────────────
const Storage = {
  KEYS: {
    STUDENT: 'akjee_student',
    PROGRESS: 'akjee_progress',
    GAMIFICATION: 'akjee_gamification',
    QUIZ_SCORES: 'akjee_quiz_scores',
    TEST_SCORES: 'akjee_test_scores',
    RESCHEDULED: 'akjee_rescheduled',
    SETTINGS: 'akjee_settings',
    ACHIEVEMENTS: 'akjee_achievements',
    PROMPT_HISTORY: 'akjee_prompt_history',
  },
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      if (typeof FirebaseSync !== 'undefined' && FirebaseSync.initialized) {
        FirebaseSync.scheduleSave();
      }
    }
    catch (e) { console.warn('Storage save failed:', e); }
  },
  load(key, def = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : def;
    } catch (e) { return def; }
  },
  remove(key) { try { localStorage.removeItem(key); } catch (e) {} },
  clearAll() {
    Object.values(this.KEYS).forEach(k => this.remove(k));
  },
  exportAll() {
    const data = {};
    Object.entries(this.KEYS).forEach(([k, v]) => {
      data[k] = this.load(v);
    });
    return JSON.stringify(data, null, 2);
  },
  importAll(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      Object.entries(this.KEYS).forEach(([k, v]) => {
        if (data[k] !== undefined) this.save(v, data[k]);
      });
      return true;
    } catch (e) { return false; }
  }
};

// ── SCHEDULE MODULE ──────────────────────────────────────────────
const Schedule = {
  data: null,

  async load() {
    if (this.data) return this.data;
    try {
      const res = await fetch('./schedule.json');
      this.data = await res.json();
      return this.data;
    } catch (e) {
      console.warn('Could not load schedule.json, using embedded fallback');
      this.data = this._getFallbackSchedule();
      return this.data;
    }
  },

  // Get all calendar entries (including rest days)
  getAllEntries() {
    return this.data ? this.data.days || [] : [];
  },

  // Get all study days (non-rest)
  getStudyDays() {
    return this.getAllEntries().filter(d => !d.isRestDay);
  },

  getDayData(dayNum) {
    return this.getStudyDays().find(d => d.day === dayNum) || null;
  },

  getDayByDate(dateStr) {
    return this.getAllEntries().find(d => d.date === dateStr) || null;
  },

  getCurrentStudyDay() {
    const today = this._todayStr();
    const entry = this.getDayByDate(today);
    if (!entry || entry.isRestDay) {
      // Find closest study day
      const all = this.getStudyDays();
      const past = all.filter(d => d.date <= today);
      return past.length ? past[past.length - 1] : all[0];
    }
    return entry;
  },

  isRestDay(dateStr) {
    const entry = this.getDayByDate(dateStr);
    if (entry) return entry.isRestDay;
    const d = new Date(dateStr);
    return d.getDay() === 0 || d.getDay() === 6; // sun/sat
  },

  getPhaseForDay(dayNum) {
    if (dayNum <= 15) return 1;
    if (dayNum <= 30) return 2;
    if (dayNum <= 45) return 3;
    return 4;
  },

  getDaysSinceStart() {
    const start = new Date(START_DATE);
    const today = new Date(this._todayStr());
    const diff = Math.floor((today - start) / 86400000);
    return Math.max(0, diff);
  },

  getStudyDayNumber() {
    // How many study days have elapsed including today
    const today = this._todayStr();
    const studyDays = this.getStudyDays();
    const idx = studyDays.findIndex(d => d.date === today);
    if (idx >= 0) return idx + 1;
    const past = studyDays.filter(d => d.date < today);
    return past.length;
  },

  getTodayStudyDay() {
    const today = this._todayStr();
    return this.getStudyDays().find(d => d.date === today) || null;
  },

  getWeekDays(fromDate) {
    // Get Mon-Sun of the week containing fromDate
    const d = new Date(fromDate);
    const day = d.getDay(); // 0=Sun
    const monday = new Date(d);
    monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dd = new Date(monday);
      dd.setDate(monday.getDate() + i);
      days.push(dd.toISOString().split('T')[0]);
    }
    return days;
  },

  getNextStudyDays(count = 3) {
    const today = this._todayStr();
    return this.getStudyDays()
      .filter(d => d.date > today)
      .slice(0, count);
  },

  _todayStr() {
    return new Date().toISOString().split('T')[0];
  },

  // Minimal fallback if schedule.json fails to load
  _getFallbackSchedule() {
    const days = [];
    const start = new Date(START_DATE);
    let studyDay = 0;
    const topicsP = [
      'Units & Measurements','Vectors','Kinematics 1D','Kinematics 2D','Projectile Motion',
      'Relative Motion','Circular Motion','Newton\'s Laws I','Newton\'s Laws II','Friction',
      'Work & Energy','Power','Centre of Mass','Momentum & Collisions','Conservation Laws',
      'Rotational Motion','Torque & MOI','Angular Momentum','Rolling Motion','Gravitation',
      'Satellites','Escape Velocity','Fluid Mechanics','Bernoulli\'s Theorem','SHM Intro',
      'SHM Equations','Waves & Sound','Doppler Effect','Thermal Properties','Heat Transfer',
      'Thermodynamics I','Thermodynamics II','Kinetic Theory','Elasticity','Surface Tension',
      'Capillarity','Wave Optics','Ray Optics','Electrostatics','Electric Field',
      'Revision: Units-Kinematics','Revision: NLM-Energy','Revision: Rotation-Gravitation','Revision: SHM-Waves','Revision: Thermo',
      'PYQ: Mechanics','PYQ: Rotation','PYQ: Waves','PYQ: Thermo','PYQ: Electrostatics',
      'Mock: Physics I','Mock: Physics II','Mock: Physics III','Final Rev: Formulas I','Final Rev: Formulas II',
      'Final Rev: Formulas III','Final Sprint I','Final Sprint II','Final Sprint III','Day 60 Review'
    ];
    const topicsC = [
      'Mole Concept','Atomic Structure I','Atomic Structure II','Periodic Table','Chemical Bonding',
      'VSEPR & Hybridization','MOT','Gas Laws','Ideal Gas Equation','Kinetic Theory Gas',
      'Real Gases','Chemical Thermodynamics','Entropy & Gibbs','Chemical Equilibrium','Le Chatelier',
      'Ionic Equilibrium','pH Calculations','Acids & Bases','Redox Reactions','Electrochemistry',
      'Hydrogen & Water','s-block Elements','p-block Elements','Organic Intro','IUPAC Naming',
      'Hydrocarbons: Alkanes','Hydrocarbons: Alkenes','Alkynes','Aromatic Chemistry','Organic Reactions',
      'Haloalkanes','Haloarenes','Alcohols & Phenols','Aldehydes & Ketones','Carboxylic Acids',
      'Amines','Biomolecules','Polymers','Environmental Chemistry','Analytical Chemistry',
      'Revision: Atomic-Bonding','Revision: States-Thermo','Revision: Equilibrium','Revision: Organic I','Revision: Organic II',
      'PYQ: Physical Chem','PYQ: Organic','PYQ: Inorganic','PYQ: Mixed','PYQ: Hard',
      'Mock: Chem I','Mock: Chem II','Mock: Chem III','Final Rev: Formulas','Final Sprint I',
      'Final Sprint II','Final Sprint III','Final Sprint IV','Final Sprint V','Day 60 Review'
    ];
    const topicsM = [
      'Sets','Relations & Functions','Trigonometry Basics','Trig Identities','Trig Equations',
      'Inverse Trigonometry','Complex Numbers I','Complex Numbers II','Quadratic Equations','Nature of Roots',
      'Sequences AP','Sequences GP','Straight Lines I','Straight Lines II','Distance & Section',
      'Circles','Parabola','Ellipse','Hyperbola','Limits',
      'Standard Limits','Derivatives I','Derivatives II','Chain Rule','Applications of Derivatives',
      'Maxima & Minima','Integration Basics','Integration by Substitution','Integration by Parts','Definite Integrals',
      'Permutations','Combinations','Binomial Theorem','Mathematical Induction','Statistics',
      'Standard Deviation','Probability I','Probability II','Conditional Probability','Matrices',
      'Determinants','Cramer\'s Rule','Vector Algebra','3D Geometry','Lines in 3D',
      'Revision: Algebra','Revision: Calculus','Revision: Trig-Coord','Revision: Stats-Prob','Revision: Matrices',
      'PYQ: Algebra','PYQ: Calculus','PYQ: Coordinate','PYQ: Vectors','PYQ: Mixed',
      'Mock: Math I','Mock: Math II','Mock: Math III','Final Rev: Formulas','Final Sprint',
      'Final Sprint II','Final Sprint III','Final Sprint IV','Final Sprint V','Day 60 Review'
    ];

    for (let i = 0; i < 62; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const wd = d.getDay();
      const isRest = wd === 0 || wd === 6;
      const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

      if (isRest) {
        days.push({ day: null, date: dateStr, weekday: weekdays[wd], isRestDay: true,
          message: 'Rest Day 🛌 — Rest is part of learning. Recharge today!' });
      } else {
        const idx = studyDay;
        days.push({
          day: idx + 1,
          date: dateStr,
          weekday: weekdays[wd],
          isRestDay: false,
          phase: idx < 15 ? 1 : idx < 30 ? 2 : idx < 45 ? 3 : 4,
          physics: { topic: topicsP[idx] || 'Physics Revision', subtopics: ['Core concepts', 'Formula practice', 'Problem solving'], ncertChapter: 'Reference', difficulty: 'medium', estimatedTime: '60 min', keyFormulas: [] },
          chemistry: { topic: topicsC[idx] || 'Chemistry Revision', subtopics: ['Core concepts', 'Formula practice', 'Problem solving'], ncertChapter: 'Reference', difficulty: 'medium', estimatedTime: '60 min', keyFormulas: [] },
          math: { topic: topicsM[idx] || 'Math Revision', subtopics: ['Core concepts', 'Formula practice', 'Problem solving'], ncertChapter: 'Reference', difficulty: 'medium', estimatedTime: '60 min', keyFormulas: [] },
          quiz: { questionCount: 10, timeMinutes: 10, topics: [topicsP[idx], topicsC[idx], topicsM[idx]] },
          test: { questionCount: 10, timeMinutes: 15, topics: ['Day ' + (idx + 1) + ' topics'] }
        });
        studyDay++;
        if (studyDay >= 60) break;
      }
    }
    return { appName: 'AKJEE', version: '1.0', totalDays: 60, startDate: START_DATE, endDate: '2026-06-01', phases: PHASE_INFO, days };
  }
};

// ── PROGRESS MODULE ──────────────────────────────────────────────
const Progress = {
  data: null,

  _load() {
    if (!this.data) {
      this.data = Storage.load(Storage.KEYS.PROGRESS, {
        dayProgress: {},    // { "1": { physics: 'done'|'pending', chemistry: ..., math: ..., dayComplete: false } }
        completedDays: [],  // [1, 2, 3, ...]
        rescheduled: []
      });
    }
    return this.data;
  },

  _save() { Storage.save(Storage.KEYS.PROGRESS, this.data); },

  getDayProgress(dayNum) {
    const d = this._load();
    return d.dayProgress[dayNum] || { physics: 'pending', chemistry: 'pending', math: 'pending', dayComplete: false };
  },

  getTopicStatus(dayNum, subject) {
    return this.getDayProgress(dayNum)[subject.toLowerCase()] || 'pending';
  },

  markTopicComplete(dayNum, subject) {
    const d = this._load();
    if (!d.dayProgress[dayNum]) d.dayProgress[dayNum] = { physics: 'pending', chemistry: 'pending', math: 'pending', dayComplete: false };
    d.dayProgress[dayNum][subject.toLowerCase()] = 'done';
    // Check if all 3 done
    const dp = d.dayProgress[dayNum];
    if (dp.physics === 'done' && dp.chemistry === 'done' && dp.math === 'done') {
      dp.dayComplete = true;
      if (!d.completedDays.includes(dayNum)) d.completedDays.push(dayNum);
    }
    this._save();
    return dp.dayComplete;
  },

  markTopicIncomplete(dayNum, subject) {
    const d = this._load();
    if (!d.dayProgress[dayNum]) return;
    d.dayProgress[dayNum][subject.toLowerCase()] = 'pending';
    d.dayProgress[dayNum].dayComplete = false;
    const idx = d.completedDays.indexOf(dayNum);
    if (idx >= 0) d.completedDays.splice(idx, 1);
    this._save();
  },

  markDayComplete(dayNum) {
    const d = this._load();
    if (!d.dayProgress[dayNum]) d.dayProgress[dayNum] = {};
    d.dayProgress[dayNum].physics = 'done';
    d.dayProgress[dayNum].chemistry = 'done';
    d.dayProgress[dayNum].math = 'done';
    d.dayProgress[dayNum].dayComplete = true;
    if (!d.completedDays.includes(dayNum)) d.completedDays.push(dayNum);
    this._save();
  },

  reschedule(dayNum, subject, newDate, reason) {
    const d = this._load();
    d.rescheduled.push({ originalDay: dayNum, subject, newDate, reason, timestamp: Date.now() });
    d.dayProgress[dayNum] = d.dayProgress[dayNum] || {};
    d.dayProgress[dayNum][subject.toLowerCase()] = 'rescheduled';
    this._save();
  },

  getOverallProgress() {
    const d = this._load();
    const total = (Schedule.getStudyDays && Schedule.getStudyDays().length) || TOTAL_STUDY_DAYS;
    const done = d.completedDays.length;
    return { done, total, percent: Math.round((done / total) * 100) };
  },

  getSubjectProgress(subject) {
    const d = this._load();
    const s = subject.toLowerCase();
    let done = 0, total = 0;
    Object.values(d.dayProgress).forEach(dp => {
      total++;
      if (dp[s] === 'done') done++;
    });
    // Also count from schedule total days
    const scheduleDays = Schedule.getStudyDays ? Schedule.getStudyDays().length : TOTAL_STUDY_DAYS;
    return { done, total: scheduleDays, percent: Math.round((done / scheduleDays) * 100) };
  },

  getCompletedCount() { return this._load().completedDays.length; },

  getTopicsCompletedCount() {
    const d = this._load();
    let count = 0;
    Object.values(d.dayProgress).forEach(dp => {
      if (dp.physics === 'done') count++;
      if (dp.chemistry === 'done') count++;
      if (dp.math === 'done') count++;
    });
    return count;
  },

  isTopicCompleted(dayNum, subject) {
    return this.getTopicStatus(dayNum, subject) === 'done';
  },

  isDayCompleted(dayNum) {
    return this._load().completedDays.includes(dayNum);
  },

  getRescheduled() { return this._load().rescheduled; },

  getCompletedTopicsList() {
    const d = this._load();
    const list = [];
    const studyDays = Schedule.getStudyDays ? Schedule.getStudyDays() : [];
    studyDays.forEach(day => {
      const dp = d.dayProgress[day.day];
      if (!dp) return;
      ['physics', 'chemistry', 'math'].forEach(s => {
        if (dp[s] === 'done') {
          const subjectData = day[s];
          list.push({
            day: day.day,
            date: day.date,
            subject: s,
            topic: subjectData ? subjectData.topic : s + ' Day ' + day.day
          });
        }
      });
    });
    return list.sort((a, b) => b.day - a.day);
  }
};

// ── GAMIFICATION MODULE ──────────────────────────────────────────
const Gamification = {
  data: null,

  POINTS: {
    topicComplete: 10,
    dayBonus: 20,
    quizComplete: 5,
    testComplete: 15,
    quizBonus90: 10,
    testBonus90: 25,
    weeklyPerfect: 50,
    phaseComplete: 100,
    streak: 20
  },

  _load() {
    if (!this.data) {
      this.data = Storage.load(Storage.KEYS.GAMIFICATION, {
        totalPoints: 0,
        currentLevel: 1,
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        streakDates: []
      });
    }
    return this.data;
  },

  _save() { Storage.save(Storage.KEYS.GAMIFICATION, this.data); },

  addPoints(amount, reason) {
    const d = this._load();
    d.totalPoints += amount;
    const newLevel = this._calcLevel(d.totalPoints);
    const leveledUp = newLevel > d.currentLevel;
    d.currentLevel = newLevel;
    this._save();
    if (leveledUp) {
      setTimeout(() => AKJEE.modal.showLevelUp(newLevel), 500);
    }
    AKJEE.ui.updateHeaderStats();
    return { points: d.totalPoints, level: d.currentLevel, leveledUp };
  },

  _calcLevel(points) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (points >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
  },

  getLevelName(level) {
    return LEVEL_NAMES[level - 1] || 'JEE Ready';
  },

  getLevelProgress() {
    const d = this._load();
    const lvl = d.currentLevel - 1;
    const curr = LEVEL_THRESHOLDS[lvl] || 0;
    const next = LEVEL_THRESHOLDS[lvl + 1] || curr + 1000;
    const pct = Math.round(((d.totalPoints - curr) / (next - curr)) * 100);
    return { points: d.totalPoints, level: d.currentLevel, name: this.getLevelName(d.currentLevel), nextAt: next, percent: Math.min(100, pct) };
  },

  updateStreak(dateStr) {
    const d = this._load();
    if (!dateStr) dateStr = new Date().toISOString().split('T')[0];
    if (d.lastStudyDate === dateStr) return; // already updated today

    const last = d.lastStudyDate;
    if (last) {
      const lastD = new Date(last);
      const todayD = new Date(dateStr);
      const diff = Math.round((todayD - lastD) / 86400000);

      if (diff === 1) {
        d.currentStreak++;
      } else if (diff === 2) {
        // Check if the gap was a rest day
        const gapDate = new Date(lastD);
        gapDate.setDate(lastD.getDate() + 1);
        const gapStr = gapDate.toISOString().split('T')[0];
        if (Schedule.isRestDay(gapStr)) {
          d.currentStreak++;
        } else {
          d.currentStreak = 1;
        }
      } else {
        d.currentStreak = 1;
      }
    } else {
      d.currentStreak = 1;
    }

    d.lastStudyDate = dateStr;
    d.longestStreak = Math.max(d.longestStreak, d.currentStreak);
    if (!d.streakDates) d.streakDates = [];
    d.streakDates.push(dateStr);
    this._save();
    this.addPoints(this.POINTS.streak, 'streak');
    this.checkStreakBadges(d.currentStreak);
  },

  checkStreakBadges(streak) {
    const milestones = { 3: 'streak_3', 7: 'streak_7', 14: 'streak_14', 30: 'streak_30', 45: 'streak_45', 60: 'streak_60' };
    if (milestones[streak]) Achievements.unlock(milestones[streak]);
  },

  getStreak() { return this._load().currentStreak; },
  getLongestStreak() { return this._load().longestStreak; },
  getPoints() { return this._load().totalPoints; },
  getLevel() { return this._load().currentLevel; }
};

// ── ACHIEVEMENTS MODULE ──────────────────────────────────────────
const Achievements = {
  BADGES: [
    { id: 'first_step', icon: '🎯', name: 'First Step', desc: 'Complete Day 1 (any topic)', check: () => Progress.getTopicsCompletedCount() >= 1 },
    { id: 'bookworm', icon: '📚', name: 'Bookworm', desc: 'Complete all topics in any 5 days', check: () => Progress.getCompletedCount() >= 5 },
    { id: 'physics_starter', icon: '⚡', name: 'Physics Starter', desc: 'Complete 5 Physics topics', check: () => Progress.getSubjectProgress('physics').done >= 5 },
    { id: 'chemistry_fan', icon: '🧪', name: 'Chemistry Fan', desc: 'Complete 5 Chemistry topics', check: () => Progress.getSubjectProgress('chemistry').done >= 5 },
    { id: 'math_lover', icon: '📐', name: 'Math Lover', desc: 'Complete 5 Math topics', check: () => Progress.getSubjectProgress('math').done >= 5 },
    { id: 'streak_3', icon: '🔥', name: '3-Day Streak', desc: '3 consecutive study days', check: () => Gamification.getStreak() >= 3 },
    { id: 'week1_done', icon: '🗓️', name: 'Week 1 Done', desc: 'Complete all of Week 1', check: () => Progress.getCompletedCount() >= 5 },
    { id: 'streak_7', icon: '🔥🔥', name: 'Week Warrior', desc: '7-day streak', check: () => Gamification.getStreak() >= 7 },
    { id: 'speed_runner', icon: '🏃', name: 'Speed Runner', desc: 'Finish a quiz in under 5 minutes', check: () => false }, // unlocked manually
    { id: 'perfect_score', icon: '🎓', name: 'Perfect Score', desc: 'Score 100% on any quiz', check: () => false }, // unlocked manually
    { id: 'half_way', icon: '📊', name: 'Halfway There', desc: 'Complete Day 30', check: () => Progress.getCompletedCount() >= 30 },
    { id: 'streak_14', icon: '🔥🔥🔥', name: 'Fortnight Champion', desc: '14-day streak', check: () => Gamification.getStreak() >= 14 },
    { id: 'physics_hero', icon: '⚡', name: 'Physics Hero', desc: 'Complete all Physics topics', check: () => { const p = Progress.getSubjectProgress('physics'); return p.done >= p.total; } },
    { id: 'chemistry_master', icon: '🧪', name: 'Chemistry Master', desc: 'Complete all Chemistry topics', check: () => { const p = Progress.getSubjectProgress('chemistry'); return p.done >= p.total; } },
    { id: 'math_genius', icon: '📐', name: 'Math Genius', desc: 'Complete all Math topics', check: () => { const p = Progress.getSubjectProgress('math'); return p.done >= p.total; } },
    { id: 'streak_30', icon: '🔥🔥🔥🔥', name: 'Month on Fire', desc: '30-day streak', check: () => Gamification.getStreak() >= 30 },
    { id: 'streak_45', icon: '🔥🔥🔥🔥🔥', name: 'Unstoppable!', desc: '45-day streak', check: () => Gamification.getStreak() >= 45 },
    { id: 'jee_foundation', icon: '🏆', name: 'JEE Foundation Done', desc: 'Complete all study days', check: () => { const o = Progress.getOverallProgress(); return o.done >= o.total && o.total > 0; } },
    { id: 'streak_60', icon: '👑', name: 'JEE Legend', desc: '60-day streak & all days complete', check: () => Gamification.getStreak() >= 60 },
    { id: 'test_master', icon: '💯', name: 'Test Master', desc: 'Score 90%+ on 5 tests in a row', check: () => false },
    { id: 'comeback_kid', icon: '🔄', name: 'Comeback Kid', desc: 'Complete a rescheduled topic', check: () => false },
    { id: 'never_give_up', icon: '💪', name: 'Never Give Up', desc: 'Continue studying after missing 3 days', check: () => false },
    { id: 'note_taker', icon: '📝', name: 'Note Taker', desc: 'Generate 20 notes prompts', check: () => false },
    { id: 'audio_learner', icon: '🎧', name: 'Audio Learner', desc: 'Generate 20 audio prompts', check: () => false },
  ],

  _load() {
    return Storage.load(Storage.KEYS.ACHIEVEMENTS, { earned: {} });
  },

  _save(data) { Storage.save(Storage.KEYS.ACHIEVEMENTS, data); },

  unlock(badgeId) {
    const data = this._load();
    if (data.earned[badgeId]) return false;
    data.earned[badgeId] = new Date().toISOString();
    this._save(data);
    const badge = this.BADGES.find(b => b.id === badgeId);
    if (badge) {
      setTimeout(() => AKJEE.modal.showAchievement(badge), 300);
    }
    return true;
  },

  isEarned(badgeId) {
    return !!this._load().earned[badgeId];
  },

  getEarnedDate(badgeId) {
    return this._load().earned[badgeId] || null;
  },

  checkAll() {
    this.BADGES.forEach(b => {
      if (!this.isEarned(b.id) && b.check()) {
        this.unlock(b.id);
      }
    });
  }
};

// ── QUIZ MODULE ──────────────────────────────────────────────────
const QuizModule = {
  currentQuiz: null,
  answers: [],
  currentQ: 0,
  timer: null,
  timeLeft: 0,
  startTime: null,

  start(mode) {
    if (typeof quizBank === 'undefined' || !quizBank.length) {
      AKJEE.toast('Quiz bank not loaded yet. Please wait.', 'warning');
      return;
    }
    let questions = this._selectQuestions(mode);
    if (!questions.length) {
      AKJEE.toast('No questions available for this mode. Try another quiz type.', 'info');
      return;
    }

    const timeMap = { daily: 5*60, topic: 10*60, subject: 20*60, mixed: 15*60, weak: 10*60 };
    this.currentQuiz = { mode, questions, total: questions.length };
    this.answers = new Array(questions.length).fill(null);
    this.currentQ = 0;
    this.timeLeft = timeMap[mode] || 10*60;
    this.startTime = Date.now();

    document.getElementById('quiz-landing').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-interface').classList.remove('hidden');

    this._renderQuestion();
    this._startTimer();
  },

  _selectQuestions(mode) {
    const bank = typeof quizBank !== 'undefined' ? quizBank : [];
    if (!bank.length) return [];

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const today = Schedule.getTodayStudyDay();

    if (mode === 'daily') {
      if (today) {
        const todayTopics = [today.physics?.topic, today.chemistry?.topic, today.math?.topic].filter(Boolean);
        const relevant = bank.filter(q => todayTopics.some(t => q.topic && t && q.topic.toLowerCase().includes(t.toLowerCase().split(' ')[0])));
        if (relevant.length >= 5) return shuffle(relevant).slice(0, 5);
      }
      return shuffle(bank).slice(0, 5);
    }
    if (mode === 'topic') return shuffle(bank).slice(0, 10);
    if (mode === 'subject') return shuffle(bank).slice(0, 20);
    if (mode === 'mixed') {
      const bySubject = {};
      bank.forEach(q => { (bySubject[q.subject] = bySubject[q.subject] || []).push(q); });
      const subjects = Object.keys(bySubject);
      const result = [];
      subjects.forEach(s => result.push(...shuffle(bySubject[s]).slice(0, 5)));
      return shuffle(result).slice(0, 15);
    }
    if (mode === 'weak') {
      // Use questions from topics with low scores
      return shuffle(bank).slice(0, 10);
    }
    return shuffle(bank).slice(0, 10);
  },

  _renderQuestion() {
    const q = this.currentQuiz.questions[this.currentQ];
    const total = this.currentQuiz.total;

    document.getElementById('quiz-q-count').textContent = `Q${this.currentQ + 1} of ${total}`;
    document.getElementById('quiz-q-progress').style.width = `${((this.currentQ + 1) / total) * 100}%`;
    document.getElementById('quiz-question-text').textContent = q.question;

    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.onclick = () => this.selectAnswer(i);
      optContainer.appendChild(btn);
    });

    // Restore selection if navigated back
    if (this.answers[this.currentQ] !== null) {
      const opts = optContainer.querySelectorAll('.option-btn');
      opts[this.answers[this.currentQ]]?.classList.add('selected');
    }

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.textContent = this.currentQ === total - 1 ? 'Finish Quiz ✓' : 'Next →';
    nextBtn.disabled = this.answers[this.currentQ] === null;
  },

  selectAnswer(idx) {
    this.answers[this.currentQ] = idx;
    document.querySelectorAll('.option-btn').forEach((b, i) => {
      b.classList.toggle('selected', i === idx);
    });
    document.getElementById('quiz-next-btn').disabled = false;
  },

  nextQuestion() {
    if (this.answers[this.currentQ] === null && this.currentQ < this.currentQuiz.total - 1) {
      this.answers[this.currentQ] = -1; // skipped
    }
    if (this.currentQ < this.currentQuiz.total - 1) {
      this.currentQ++;
      this._renderQuestion();
    } else {
      this.finish();
    }
  },

  skip() {
    this.answers[this.currentQ] = -1;
    this.nextQuestion();
  },

  bookmark() {
    AKJEE.toast('Question bookmarked! ⭐', 'info');
  },

  _startTimer() {
    clearInterval(this.timer);
    const el = document.getElementById('quiz-timer');
    this.timer = setInterval(() => {
      this.timeLeft--;
      const m = Math.floor(this.timeLeft / 60);
      const s = this.timeLeft % 60;
      el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
      el.className = 'quiz-timer' + (this.timeLeft < 60 ? ' danger' : this.timeLeft < 120 ? ' warning' : '');
      if (this.timeLeft <= 0) this.finish();
    }, 1000);
  },

  finish() {
    clearInterval(this.timer);
    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    const qs = this.currentQuiz.questions;
    let correct = 0, wrong = 0, skipped = 0;
    this.answers.forEach((ans, i) => {
      if (ans === null || ans === -1) skipped++;
      else if (ans === qs[i].correct) correct++;
      else wrong++;
    });
    const percent = Math.round((correct / qs.length) * 100);

    // Check speed badge
    if (elapsed < 300) Achievements.unlock('speed_runner');
    if (percent === 100) Achievements.unlock('perfect_score');

    // Award points
    let pts = Gamification.POINTS.quizComplete;
    if (percent >= 90) pts += Gamification.POINTS.quizBonus90;
    Gamification.addPoints(pts, 'quiz');

    // Save score
    const scores = Storage.load(Storage.KEYS.QUIZ_SCORES, []);
    scores.push({ date: new Date().toISOString(), mode: this.currentQuiz.mode, score: percent, correct, wrong, skipped, total: qs.length, pts });
    Storage.save(Storage.KEYS.QUIZ_SCORES, scores);

    // Show results
    document.getElementById('quiz-interface').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');

    const scoreEl = document.getElementById('result-score');
    scoreEl.textContent = correct;
    scoreEl.className = 'result-score ' + (percent >= 90 ? 'excellent' : percent >= 70 ? 'good' : percent >= 50 ? 'average' : 'poor');

    document.getElementById('result-percent').textContent = `${correct} / ${qs.length} (${percent}%)`;
    const badgeEl = document.getElementById('result-badge');
    if (percent >= 90) { badgeEl.textContent = '🏆 Excellent! JEE Ready!'; badgeEl.className = 'result-badge excellent'; }
    else if (percent >= 70) { badgeEl.textContent = '✅ Good! Keep Practicing!'; badgeEl.className = 'result-badge good'; }
    else if (percent >= 50) { badgeEl.textContent = '📈 Average — More Practice Needed'; badgeEl.className = 'result-badge average'; }
    else { badgeEl.textContent = '📚 Review the Topic Again'; badgeEl.className = 'result-badge poor'; }

    document.getElementById('result-correct').textContent = correct;
    document.getElementById('result-wrong').textContent = wrong;
    document.getElementById('result-skipped').textContent = skipped;
    document.getElementById('result-points-earned').textContent = `+${pts} points earned ⭐`;

    if (percent >= 90) AKJEE.confetti();
    AKJEE.toast(`Quiz done! ${correct}/${qs.length} correct (+${pts} pts)`, 'success');
    Achievements.checkAll();
  },

  reviewAnswers() {
    const qs = this.currentQuiz.questions;
    const reviewList = document.getElementById('quiz-review-list');
    reviewList.innerHTML = '<div class="section-heading mt-2">📋 Answer Review</div>';
    qs.forEach((q, i) => {
      const ans = this.answers[i];
      const isCorrect = ans === q.correct;
      const isSkipped = ans === null || ans === -1;
      const letters = ['A','B','C','D'];
      const cls = isSkipped ? 'skipped-ans' : isCorrect ? 'correct-ans' : 'wrong-ans';
      const div = document.createElement('div');
      div.className = `review-item ${cls}`;
      div.innerHTML = `
        <div class="review-q-text">${i+1}. ${q.question}</div>
        <div style="font-size:0.8rem; margin:0.4rem 0; color:${isCorrect?'var(--green)':isSkipped?'var(--text-muted)':'var(--red)'}">
          ${isSkipped ? '⏭️ Skipped' : isCorrect ? '✅ Correct: ' + letters[q.correct] : `❌ Your answer: ${letters[ans]} | Correct: ${letters[q.correct]}`}
        </div>
        <div class="review-explanation">💡 ${q.explanation || 'Answer: ' + q.options[q.correct]}</div>
      `;
      reviewList.appendChild(div);
    });
  },

  backToLanding() {
    clearInterval(this.timer);
    document.getElementById('quiz-interface').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-review-list').innerHTML = '';
    document.getElementById('quiz-landing').classList.remove('hidden');
    this._renderHistory();
  },

  exitQuiz() {
    if (confirm('Exit quiz? Your progress will be lost.')) this.backToLanding();
  },

  _renderHistory() {
    const scores = Storage.load(Storage.KEYS.QUIZ_SCORES, []);
    const el = document.getElementById('quiz-history-list');
    if (!scores.length) {
      el.innerHTML = '<div class="empty-state"><span class="empty-state-icon">🧪</span><div class="empty-state-title">No quizzes taken yet</div><div class="empty-state-desc">Start a quiz above!</div></div>';
      return;
    }
    const recent = [...scores].reverse().slice(0, 10);
    el.innerHTML = recent.map(s => {
      const d = new Date(s.date);
      const cls = s.score >= 70 ? 'green' : s.score >= 50 ? 'gold' : 'red';
      return `<div class="card mb-1" style="display:flex;align-items:center;gap:1rem;padding:0.75rem;">
        <span style="font-size:1.5rem; font-weight:900; color:var(--${cls})">${s.score}%</span>
        <div style="flex:1">
          <div class="text-sm fw-700">${s.mode.charAt(0).toUpperCase()+s.mode.slice(1)} Quiz</div>
          <div class="text-xs text-muted">${d.toLocaleDateString()} · ${s.correct}/${s.total} correct · +${s.pts} pts</div>
        </div>
      </div>`;
    }).join('');
  }
};

// ── TEST MODULE ──────────────────────────────────────────────────
const TestModule = {
  currentTest: null,
  answers: [],
  markedReview: [],
  currentQ: 0,
  timer: null,
  timeLeft: 0,

  start(type) {
    const bank = typeof quizBank !== 'undefined' ? quizBank : [];
    if (!bank.length) { AKJEE.toast('Quiz bank loading...', 'info'); return; }
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

    const configs = {
      daily:  { label:'Daily Mini Test', count:10, time:15*60, pts:15 },
      weekly: { label:'Weekly Test', count:30, time:45*60, pts:30 },
      phase:  { label:'Phase Test', count:45, time:60*60, pts:50 },
      mock:   { label:'JEE Mock Test', count:75, time:180*60, pts:100 }
    };
    const cfg = configs[type];
    const questions = shuffle(bank).slice(0, cfg.count);

    this.currentTest = { type, ...cfg, questions };
    this.answers = new Array(questions.length).fill(null);
    this.markedReview = new Array(questions.length).fill(false);
    this.currentQ = 0;
    this.timeLeft = cfg.time;

    document.getElementById('test-landing').classList.add('hidden');
    document.getElementById('test-results').classList.add('hidden');
    document.getElementById('test-interface').classList.remove('hidden');

    this._renderQ();
    this._buildPalette();
    this._startTimer();
  },

  _renderQ() {
    const q = this.currentTest.questions[this.currentQ];
    const total = this.currentTest.count;
    document.getElementById('test-q-count').textContent = `Q${this.currentQ+1} of ${total}`;
    document.getElementById('test-q-progress').style.width = `${((this.currentQ+1)/total)*100}%`;
    document.getElementById('test-question-text').textContent = q.question;
    const opts = document.getElementById('test-options');
    opts.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.options.forEach((o, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn' + (this.answers[this.currentQ] === i ? ' selected' : '');
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${o}</span>`;
      btn.onclick = () => this._selectAnswer(i);
      opts.appendChild(btn);
    });
  },

  _selectAnswer(idx) {
    this.answers[this.currentQ] = idx;
    document.querySelectorAll('#test-options .option-btn').forEach((b, i) => b.classList.toggle('selected', i===idx));
    this._updatePalette();
  },

  _buildPalette() {
    const palette = document.getElementById('test-palette');
    palette.innerHTML = '';
    this.currentTest.questions.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.textContent = i+1;
      btn.id = `pal-${i}`;
      btn.onclick = () => { this.currentQ = i; this._renderQ(); this._updatePalette(); };
      palette.appendChild(btn);
    });
  },

  _updatePalette() {
    this.currentTest.questions.forEach((_, i) => {
      const btn = document.getElementById(`pal-${i}`);
      if (!btn) return;
      btn.className = 'palette-btn' +
        (this.answers[i] !== null ? ' answered' : '') +
        (this.markedReview[i] ? ' review' : '') +
        (i === this.currentQ ? ' active' : '');
    });
  },

  nextQ() {
    if (this.currentQ < this.currentTest.count - 1) { this.currentQ++; this._renderQ(); this._updatePalette(); }
  },

  prevQ() {
    if (this.currentQ > 0) { this.currentQ--; this._renderQ(); this._updatePalette(); }
  },

  markReview() { this.markedReview[this.currentQ] = !this.markedReview[this.currentQ]; this._updatePalette(); },
  clearResponse() { this.answers[this.currentQ] = null; document.querySelectorAll('#test-options .option-btn').forEach(b => b.classList.remove('selected')); this._updatePalette(); },

  _startTimer() {
    clearInterval(this.timer);
    const el = document.getElementById('test-timer');
    this.timer = setInterval(() => {
      this.timeLeft--;
      const m = Math.floor(this.timeLeft/60), s = this.timeLeft%60;
      el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
      el.className = 'quiz-timer' + (this.timeLeft<300?' danger':this.timeLeft<600?' warning':'');
      if (this.timeLeft<=0) this.submit();
    }, 1000);
  },

  confirmSubmit() {
    const ans = this.answers.filter(a => a!==null).length;
    AKJEE.modal.confirm(
      'Submit Test?',
      `You've answered ${ans} of ${this.currentTest.count} questions. Submit now?`,
      () => this.submit()
    );
  },

  submit() {
    clearInterval(this.timer);
    const qs = this.currentTest.questions;
    let correct = 0, wrong = 0, skipped = 0;
    this.answers.forEach((ans, i) => {
      if (ans === null) skipped++;
      else if (ans === qs[i].correct) correct++;
      else wrong++;
    });
    const total = qs.length;
    const score = correct * 4 - wrong; // JEE marking
    const percent = Math.round((correct/total)*100);
    const pts = this.currentTest.pts + (percent >= 90 ? Gamification.POINTS.testBonus90 : 0);

    Gamification.addPoints(pts, 'test');
    const tests = Storage.load(Storage.KEYS.TEST_SCORES, []);
    tests.push({ date: new Date().toISOString(), type: this.currentTest.type, label: this.currentTest.label, correct, wrong, skipped, total, score, percent, pts });
    Storage.save(Storage.KEYS.TEST_SCORES, tests);

    document.getElementById('test-interface').classList.add('hidden');
    document.getElementById('test-results').classList.remove('hidden');

    const scoreEl = document.getElementById('test-result-score');
    scoreEl.textContent = score;
    scoreEl.className = 'result-score ' + (percent>=90?'excellent':percent>=70?'good':percent>=50?'average':'poor');
    document.getElementById('test-result-label').textContent = `${correct} correct, ${wrong} wrong / ${total} questions`;
    const badge = document.getElementById('test-result-badge');
    if (percent>=90){badge.textContent='🏆 Excellent!';badge.className='result-badge excellent';}
    else if(percent>=70){badge.textContent='✅ Good!';badge.className='result-badge good';}
    else if(percent>=50){badge.textContent='📈 Average';badge.className='result-badge average';}
    else{badge.textContent='📚 Need Revision';badge.className='result-badge poor';}
    document.getElementById('test-result-correct').textContent = correct;
    document.getElementById('test-result-wrong').textContent = wrong;
    document.getElementById('test-result-skipped').textContent = skipped;
    document.getElementById('test-result-points').textContent = `+${pts} points earned ⭐`;

    if (percent >= 90) { AKJEE.confetti(); Achievements.unlock('test_master'); }
    AKJEE.toast(`Test submitted! ${percent}% correct (+${pts} pts)`, 'success');
    Achievements.checkAll();
    this._renderHistory();
  },

  backToLanding() {
    clearInterval(this.timer);
    document.getElementById('test-interface').classList.add('hidden');
    document.getElementById('test-results').classList.add('hidden');
    document.getElementById('test-landing').classList.remove('hidden');
  },

  _renderHistory() {
    const tests = Storage.load(Storage.KEYS.TEST_SCORES, []);
    const el = document.getElementById('test-history-container');
    if (!tests.length) {
      el.innerHTML = '<div class="empty-state"><span class="empty-state-icon">📝</span><div class="empty-state-title">No tests taken yet</div></div>';
      return;
    }
    const recent = [...tests].reverse().slice(0, 15);
    el.innerHTML = `<table class="test-history-table"><thead><tr>
      <th>Date</th><th>Test</th><th>Score</th><th>Result</th><th>Points</th>
    </tr></thead><tbody>${recent.map(t => {
      const d = new Date(t.date).toLocaleDateString();
      const cls = t.percent>=70?'green':t.percent>=50?'gold':'red';
      return `<tr><td>${d}</td><td>${t.label}</td><td>${t.correct}/${t.total}</td>
        <td><span style="color:var(--${cls}); font-weight:700">${t.percent}%</span></td>
        <td>+${t.pts}</td></tr>`;
    }).join('')}</tbody></table>`;
  }
};

// ── UI MODULE ────────────────────────────────────────────────────
const UI = {
  updateHeaderStats() {
    const streak = Gamification.getStreak();
    const points = Gamification.getPoints();
    const name = AKJEE.getStudentName();

    document.getElementById('header-streak').textContent = streak;
    document.getElementById('header-points').textContent = points;
    document.getElementById('sidebar-streak').textContent = `🔥 ${streak}`;
    document.getElementById('header-avatar').textContent = name.charAt(0).toUpperCase() || 'A';

    const today = Schedule.getTodayStudyDay();
    if (today) {
      document.getElementById('header-date').textContent = this._formatDate(today.date);
      const totalStudyDays = Schedule.getStudyDays ? Schedule.getStudyDays().length : TOTAL_STUDY_DAYS;
      document.getElementById('header-day-count').textContent = `Day ${today.day} of ${totalStudyDays}`;
    }
  },

  setProgressRing(id, percent) {
    const circle = document.getElementById(id);
    if (!circle) return;
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    circle.style.strokeDashoffset = offset;
  },

  _formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  },

  _formatShortDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },

  getDifficultyStars(diff) {
    const map = { easy: 1, medium: 3, hard: 5 };
    const n = map[diff] || 2;
    return '⭐'.repeat(n) + '☆'.repeat(5 - n);
  }
};

// ── ONBOARDING ───────────────────────────────────────────────────
const Onboarding = {
  currentStep: 1,

  isComplete() {
    const student = Storage.load(Storage.KEYS.STUDENT);
    return student && student.onboardingComplete;
  },

  show() {
    document.getElementById('onboarding-overlay').classList.remove('hidden');
    this.goTo(1);

    document.getElementById('ob-step1-next').onclick = () => this.goTo(2);
    document.getElementById('ob-step2-next').onclick = () => this.validateStep2();
    document.getElementById('ob-step3-next').onclick = () => { this.step3done(true); };
    document.getElementById('ob-step3-skip').onclick = () => { this.step3done(false); };
    document.getElementById('ob-finish').onclick = () => this.finish();

    // Set default date
    const dateInput = document.getElementById('ob-start-date');
    if (dateInput) dateInput.value = START_DATE;
  },

  goTo(step) {
    document.querySelectorAll('.onboarding-step').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === step);
    });
    document.querySelectorAll('.ob-progress-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i + 1 === step);
      dot.classList.toggle('done', i + 1 < step);
    });
    this.currentStep = step;
  },

  back() { if (this.currentStep > 1) this.goTo(this.currentStep - 1); },

  validateStep2() {
    const name = document.getElementById('ob-name').value.trim();
    if (!name) {
      AKJEE.toast('Please enter your name!', 'error');
      return;
    }
    document.getElementById('ob-welcome-name').textContent = name;
    this.goTo(3);
  },

  step3done(uploaded) {
    const booksChecked = uploaded;
    const name = document.getElementById('ob-name').value.trim();
    document.getElementById('ob-welcome-name').textContent = name;
    Storage.save(Storage.KEYS.STUDENT + '_books', booksChecked);
    this.goTo(4);
  },

  finish() {
    const name = document.getElementById('ob-name').value.trim() || 'Student';
    const startDate = document.getElementById('ob-start-date').value || START_DATE;
    const hours = parseInt(document.getElementById('ob-hours').value) || 4;
    const restDays = document.getElementById('ob-rest-days').value || 'sat-sun';

    const studentData = {
      studentName: name,
      startDate,
      dailyHours: hours,
      restDays,
      onboardingComplete: true,
      joinDate: new Date().toISOString()
    };

    Storage.save(Storage.KEYS.STUDENT, studentData);
    Storage.save(Storage.KEYS.GAMIFICATION, {
      totalPoints: 0, currentLevel: 1,
      currentStreak: 0, longestStreak: 0,
      lastStudyDate: null, streakDates: []
    });
    Storage.save(Storage.KEYS.ACHIEVEMENTS, { earned: {} });

    document.getElementById('onboarding-overlay').classList.add('hidden');
    AKJEE.launch();
    AKJEE.toast(`Welcome to AKJEE, ${name}! Let's start your JEE journey! 🚀`, 'success');
    AKJEE.confetti();
  }
};

// ── TODAY PAGE ───────────────────────────────────────────────────
const TodayPage = {
  currentDate: null,

  init() {
    const today = Schedule.getTodayStudyDay();
    this.currentDate = today ? today.date : Schedule._todayStr();
    this.render();
  },

  prevDay() {
    const entries = Schedule.getAllEntries();
    const idx = entries.findIndex(e => e.date === this.currentDate);
    for (let i = idx - 1; i >= 0; i--) {
      if (!entries[i].isRestDay) { this.currentDate = entries[i].date; this.render(); return; }
    }
  },

  nextDay() {
    const entries = Schedule.getAllEntries();
    const idx = entries.findIndex(e => e.date === this.currentDate);
    for (let i = idx + 1; i < entries.length; i++) {
      if (!entries[i].isRestDay) { this.currentDate = entries[i].date; this.render(); return; }
    }
  },

  render() {
    const entry = Schedule.getDayByDate(this.currentDate);
    const today = Schedule._todayStr();
    const isToday = this.currentDate === today;
    const isPast = this.currentDate < today;

    // Update date selector
    const dateEl = document.getElementById('today-date-main');
    const subEl = document.getElementById('today-date-sub');
    const statusEl = document.getElementById('today-date-status');
    const prevBtn = document.getElementById('today-prev-btn');
    const nextBtn = document.getElementById('today-next-btn');

    if (entry) {
      const d = new Date(this.currentDate + 'T12:00:00');
      const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
      dateEl.textContent = d.toLocaleDateString('en-US', options);
      if (!entry.isRestDay) {
        const totalSD = Schedule.getStudyDays ? Schedule.getStudyDays().length : TOTAL_STUDY_DAYS;
        subEl.textContent = `Day ${entry.day} of ${totalSD} — Phase ${entry.phase}: ${PHASE_INFO[entry.phase-1]?.name}`;
      }
    }

    const statusMap = { today: ['Today','date-status-today'], past: ['Past','date-status-past'], future: ['Future','date-status-future'], rest: ['Rest Day 😌','date-status-rest'], missed: ['Missed ❌','date-status-missed'] };
    let statusKey = isToday ? 'today' : isPast ? 'past' : 'future';
    if (entry?.isRestDay) statusKey = 'rest';
    statusEl.textContent = statusMap[statusKey][0];
    statusEl.className = `date-status-pill ${statusMap[statusKey][1]}`;

    // Disable prev/next at boundaries
    const allStudy = Schedule.getStudyDays();
    const firstDate = allStudy[0]?.date;
    const lastDate = allStudy[allStudy.length - 1]?.date;
    prevBtn.disabled = this.currentDate <= firstDate;
    nextBtn.disabled = this.currentDate >= lastDate;

    // Render content
    const contentEl = document.getElementById('today-content');
    if (!entry) { contentEl.innerHTML = '<div class="empty-state"><span class="empty-state-icon">📅</span><div class="empty-state-title">No data for this date</div></div>'; return; }
    if (entry.isRestDay) {
      contentEl.innerHTML = `<div class="rest-day-card"><span class="rest-day-icon">🛌</span><div class="rest-day-title">Rest Day!</div><div class="rest-day-message">${entry.message || 'Take a break. Rest is part of learning. Come back stronger tomorrow!'}</div></div>`;
      return;
    }

    const dayNum = entry.day;
    const subjects = [
      { key: 'physics', label: 'Physics', icon: '⚡', cls: 'physics', data: entry.physics },
      { key: 'chemistry', label: 'Chemistry', icon: '🧪', cls: 'chemistry', data: entry.chemistry },
      { key: 'math', label: 'Mathematics', icon: '📐', cls: 'math', data: entry.math }
    ];

    let html = '';

    // Topic cards
    subjects.forEach(sub => {
      if (!sub.data) return;
      const status = Progress.getTopicStatus(dayNum, sub.key);
      const isDone = status === 'done';
      const isRescheduled = status === 'rescheduled';
      const subtopicsHTML = (sub.data.subtopics || []).map(s => `<li>${s}</li>`).join('');
      const formulasHTML = (sub.data.keyFormulas || []).map(f => `<span class="formula-pill">${f}</span>`).join('');

      html += `
      <div class="topic-card ${sub.cls}${isDone?' completed':''}" id="topic-card-${sub.key}">
        <div class="topic-header">
          <div>
            <div class="topic-subject-label">${sub.icon} ${sub.label}</div>
            <div class="topic-name">${sub.data.topic}</div>
          </div>
          <div class="text-xs text-muted">Day ${dayNum}</div>
        </div>

        <div class="topic-meta">
          <span class="topic-time">⏱️ ${sub.data.estimatedTime || '60 min'}</span>
          <span style="font-size:0.75rem;">${UI.getDifficultyStars(sub.data.difficulty)}</span>
          <span style="font-size:0.7rem; color:var(--text-muted);">📖 ${sub.data.ncertChapter || 'NCERT'}</span>
        </div>

        <div class="topic-subtopics">
          <div class="topic-subtopics-title">Sub-topics</div>
          <ul>${subtopicsHTML}</ul>
        </div>

        ${formulasHTML ? `<div class="topic-formulas">${formulasHTML}</div>` : ''}

        <div class="topic-prompt-buttons">
          <button class="prompt-btn" onclick="AKJEE.promptsPage.quickPrompt('${sub.key}', 'video', ${dayNum})">📹 Video</button>
          <button class="prompt-btn" onclick="AKJEE.promptsPage.quickPrompt('${sub.key}', 'audio', ${dayNum})">🎧 Audio</button>
          <button class="prompt-btn" onclick="AKJEE.promptsPage.quickPrompt('${sub.key}', 'notes', ${dayNum})">📄 Notes</button>
          <button class="prompt-btn" onclick="AKJEE.promptsPage.quickPrompt('${sub.key}', 'quiz', ${dayNum})">❓ Quiz</button>
          <button class="prompt-btn" onclick="AKJEE.promptsPage.quickPrompt('${sub.key}', 'test', ${dayNum})">📝 Test</button>
        </div>

        <div class="topic-actions">
          ${isDone
            ? `<button class="btn btn-ghost btn-sm" onclick="AKJEE.todayPage.undoTopic(${dayNum},'${sub.key}')">↩️ Undo</button>`
            : isRescheduled
              ? `<button class="btn btn-secondary btn-sm" onclick="AKJEE.todayPage.markDone(${dayNum},'${sub.key}')">✅ Mark Complete</button>`
              : `<button class="btn btn-success btn-sm" onclick="AKJEE.todayPage.markDone(${dayNum},'${sub.key}')">✅ Mark Complete</button>
                 <button class="btn btn-ghost btn-sm" onclick="AKJEE.modal.showReschedule(${dayNum},'${sub.key}','${sub.data.topic.replace(/'/g,"\\'")}')">↩️ Reschedule</button>`
          }
        </div>
      </div>`;
    });

    // Timetable
    const startHour = 9;
    const timetable = [
      [formatTime(startHour, 0), formatTime(startHour + 1, 0), '⚡ Physics', false],
      [formatTime(startHour + 1, 0), formatTime(startHour + 1, 10), '☕ Short Break', true],
      [formatTime(startHour + 1, 10), formatTime(startHour + 2, 10), '🧪 Chemistry', false],
      [formatTime(startHour + 2, 10), formatTime(startHour + 2, 20), '☕ Short Break', true],
      [formatTime(startHour + 2, 20), formatTime(startHour + 3, 20), '📐 Mathematics', false],
      [formatTime(startHour + 3, 20), formatTime(startHour + 3, 50), '🍽️ Lunch Break', true],
      [formatTime(startHour + 3, 50), formatTime(startHour + 4, 20), '✍️ Quiz Time', false],
      [formatTime(startHour + 4, 20), formatTime(startHour + 4, 50), '📝 Daily Test', false],
      [formatTime(startHour + 4, 50), formatTime(startHour + 5, 0), '🎯 Review & Complete', false],
    ];

    html += `
    <div class="card mb-3">
      <div class="card-header"><span class="card-title">🕐 Suggested Timetable</span></div>
      <div class="timetable">
        ${timetable.map(([s,e,subj,brk]) => `
          <div class="timetable-item${brk?' break':''}">
            <span class="timetable-time">${s} – ${e}</span>
            <span class="timetable-subject">${subj}</span>
          </div>`).join('')}
      </div>
    </div>`;

    // Day completion
    const phyDone = Progress.isTopicCompleted(dayNum, 'physics');
    const chemDone = Progress.isTopicCompleted(dayNum, 'chemistry');
    const mathDone = Progress.isTopicCompleted(dayNum, 'math');
    const allDone = phyDone && chemDone && mathDone;

    html += `
    <div class="day-completion-card">
      <div class="card-title mb-2">📋 Day ${dayNum} Completion</div>
      <div class="completion-checklist">
        <div class="checklist-item${phyDone?' done':''}">
          <div class="check-icon">${phyDone ? '✓' : ''}</div>
          <span>⚡ Physics — ${entry.physics?.topic || '—'}</span>
        </div>
        <div class="checklist-item${chemDone?' done':''}">
          <div class="check-icon">${chemDone ? '✓' : ''}</div>
          <span>🧪 Chemistry — ${entry.chemistry?.topic || '—'}</span>
        </div>
        <div class="checklist-item${mathDone?' done':''}">
          <div class="check-icon">${mathDone ? '✓' : ''}</div>
          <span>📐 Mathematics — ${entry.math?.topic || '—'}</span>
        </div>
      </div>
      ${allDone
        ? `<div style="text-align:center; padding:1rem; color:var(--green); font-weight:700;">🎉 Day ${dayNum} Complete! Amazing work!</div>`
        : `<button class="btn btn-${allDone?'success':'primary'} btn-full" onclick="AKJEE.todayPage.completeDay(${dayNum})" ${allDone?'disabled':''}>
             ✅ Mark All Topics Complete
           </button>`
      }
    </div>`;

    contentEl.innerHTML = html;
  },

  markDone(dayNum, subject) {
    const allDone = Progress.markTopicComplete(dayNum, subject);
    Gamification.addPoints(Gamification.POINTS.topicComplete, subject + ' topic');
    if (allDone) {
      Gamification.addPoints(Gamification.POINTS.dayBonus, 'day complete bonus');
      AKJEE.confetti();
      AKJEE.toast(`Day ${dayNum} complete! +${Gamification.POINTS.dayBonus + Gamification.POINTS.topicComplete} pts 🎉`, 'success');
      Gamification.updateStreak(this.currentDate);
    } else {
      AKJEE.toast(`${subject} topic completed! +${Gamification.POINTS.topicComplete} pts ⭐`, 'success');
    }
    Achievements.checkAll();
    this.render();
    HomeDashboard.refresh();
  },

  undoTopic(dayNum, subject) {
    Progress.markTopicIncomplete(dayNum, subject);
    this.render();
    HomeDashboard.refresh();
  },

  completeDay(dayNum) {
    Progress.markDayComplete(dayNum);
    const pts = Gamification.POINTS.dayBonus + Gamification.POINTS.topicComplete * 3;
    Gamification.addPoints(pts, 'full day');
    Gamification.updateStreak(this.currentDate);
    AKJEE.confetti();
    AKJEE.toast(`All topics done! Day ${dayNum} complete! +${pts} pts 🎉`, 'success');
    Achievements.checkAll();
    this.render();
    HomeDashboard.refresh();
  }
};

function formatTime(h, m) {
  const hour = h > 12 ? h - 12 : h;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${hour.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')} ${ampm}`;
}

// ── HOME DASHBOARD ───────────────────────────────────────────────
const HomeDashboard = {
  refresh() {
    const overall = Progress.getOverallProgress();
    const streak = Gamification.getStreak();
    const points = Gamification.getPoints();
    const level = Gamification.getLevelProgress();

    // Stats
    UI.setProgressRing('overall-ring', overall.percent);
    document.getElementById('overall-percent').textContent = overall.percent + '%';
    document.getElementById('home-days-done').textContent = `${overall.done} / ${overall.total} days`;
    document.getElementById('home-streak').textContent = streak;
    document.getElementById('home-points').textContent = points;
    document.getElementById('home-level').textContent = `Level ${level.level} — ${level.name}`;

    // Journey bar
    document.getElementById('journey-progress-bar').style.width = overall.percent + '%';
    document.getElementById('journey-percent-label').textContent = overall.percent + '%';
    document.getElementById('journey-day-label').textContent = `${overall.done} / ${overall.total} study days`;

    // Subject rings
    ['physics','chemistry','math'].forEach(s => {
      const prog = Progress.getSubjectProgress(s);
      UI.setProgressRing(s + '-ring', prog.percent);
      document.getElementById(s + '-percent').textContent = prog.percent + '%';
      document.getElementById(s + '-stats').textContent = `${prog.done} / ${prog.total} topics`;
    });

    // Greeting
    const hr = new Date().getHours();
    const greeting = hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';
    const name = AKJEE.getStudentName();
    document.getElementById('hero-greeting').textContent = `${greeting}, ${name}! 👋`;

    // Quote
    const dayOfYear = Schedule.getDaysSinceStart();
    document.getElementById('hero-quote').textContent = `"${MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length]}"`;

    // Today's day info
    const today = Schedule.getTodayStudyDay();
    if (today) {
      const totalSD2 = Schedule.getStudyDays ? Schedule.getStudyDays().length : TOTAL_STUDY_DAYS;
      document.getElementById('hero-date').textContent = `${UI._formatDate(today.date)} — Day ${today.day} of ${totalSD2}`;
    }

    // Today's quick topics
    this.renderTodayTopics(today);

    // Weekly calendar
    this.renderWeeklyCalendar();

    // Motivation
    this.renderMotivation(overall.done);

    // Upcoming
    this.renderUpcoming();
  },

  renderTodayTopics(today) {
    const el = document.getElementById('home-today-topics');
    if (!today) {
      el.innerHTML = '<div class="text-muted text-sm text-center">No study scheduled today</div>';
      return;
    }
    const subjects = [
      { key: 'physics', label: 'Physics', icon: '⚡', cls: 'badge-physics', data: today.physics },
      { key: 'chemistry', label: 'Chemistry', icon: '🧪', cls: 'badge-chemistry', data: today.chemistry },
      { key: 'math', label: 'Math', icon: '📐', cls: 'badge-math', data: today.math }
    ];
    el.innerHTML = subjects.filter(s => s.data).map(s => {
      const status = Progress.getTopicStatus(today.day, s.key);
      const statusBadge = status === 'done'
        ? '<span class="status-badge status-done">✅ Done</span>'
        : '<span class="status-badge status-pending">🔄 Pending</span>';
      return `<div class="today-topic-item">
        <span class="subject-badge ${s.cls}">${s.icon} ${s.label}</span>
        <span class="text-sm">${s.data.topic}</span>
        ${statusBadge}
      </div>`;
    }).join('');
  },

  renderWeeklyCalendar() {
    const el = document.getElementById('weekly-calendar');
    const today = Schedule._todayStr();
    const weekDates = Schedule.getWeekDays(today);
    const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    el.innerHTML = weekDates.map((date, i) => {
      const entry = Schedule.getDayByDate(date);
      const isToday = date === today;
      const isPast = date < today;
      let dotClass = 'future';

      if (!entry || entry.isRestDay) {
        dotClass = 'rest-day';
      } else if (isToday) {
        dotClass = 'today';
      } else if (isPast) {
        const dp = Progress.getDayProgress(entry.day);
        const done = (dp.physics === 'done' ? 1 : 0) + (dp.chemistry === 'done' ? 1 : 0) + (dp.math === 'done' ? 1 : 0);
        dotClass = done === 3 ? 'completed' : done > 0 ? 'partial' : 'missed';
      }

      const dayNum = entry && !entry.isRestDay ? entry.day : '';
      return `<div class="cal-day" title="${date}">
        <div class="cal-day-name">${dayNames[i]}</div>
        <div class="cal-day-num ${dotClass}">${dotClass==='rest-day'?'—':dayNum||new Date(date+'T12:00:00').getDate()}</div>
      </div>`;
    }).join('');
  },

  renderMotivation(daysDone) {
    const phase = daysDone < 15 ? 1 : daysDone < 30 ? 2 : daysDone < 45 ? 3 : 4;
    const msgs = {
      1: "Building the Foundation! Every great structure starts here. 🧱",
      2: "Core Concepts unlocked! You're getting stronger every day. 💪",
      3: "Problem Solver Mode ON! JEE is within reach. 🎯",
      4: "FINAL STRETCH! You've come this far — FINISH IT! 🏆"
    };
    document.getElementById('motivation-text').textContent = msgs[phase];
    document.getElementById('motivation-phase').textContent = `Phase ${phase} — ${PHASE_INFO[phase-1]?.name}`;
  },

  renderUpcoming() {
    const upcoming = Schedule.getNextStudyDays(3);
    const el = document.getElementById('upcoming-days');
    if (!upcoming.length) { el.innerHTML = ''; return; }

    el.innerHTML = upcoming.map(day => `
      <div class="upcoming-day-card" style="cursor:pointer;" onclick="AKJEE.todayPage.currentDate='${day.date}'; AKJEE.navigate('today');">
        <div class="upcoming-day-num">Day ${day.day} · ${UI._formatShortDate(day.date)}</div>
        <div class="upcoming-day-topics">
          <div class="upcoming-topic-chip"><span>⚡</span> ${day.physics?.topic || '—'}</div>
          <div class="upcoming-topic-chip"><span>🧪</span> ${day.chemistry?.topic || '—'}</div>
          <div class="upcoming-topic-chip"><span>📐</span> ${day.math?.topic || '—'}</div>
        </div>
      </div>`).join('');
  }
};

// ── PROGRESS PAGE ────────────────────────────────────────────────
const ProgressPage = {
  currentFilter: 'all',

  refresh() {
    const overall = Progress.getOverallProgress();
    const streak = Gamification.getStreak();
    const points = Gamification.getPoints();
    const level = Gamification.getLevelProgress();

    // Stats strip
    document.getElementById('prog-days-done').textContent = overall.done;
    document.getElementById('prog-topics').textContent = Progress.getTopicsCompletedCount();
    const scores = Storage.load(Storage.KEYS.QUIZ_SCORES, []);
    const avgScore = scores.length ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length) + '%' : '—';
    document.getElementById('prog-avg-score').textContent = avgScore;
    document.getElementById('prog-level').textContent = `Lv.${level.level}`;

    // Phase progress — use current schedule day for Active detection
    const currentStudyDay = Schedule.getStudyDayNumber();
    this.renderPhaseCards(overall.done, currentStudyDay);

    // Subject
    this.renderSubjectCards();

    // Heatmap
    this.renderHeatmap();

    // Bar chart
    this.renderPerfChart();

    // Topics list
    this.renderTopicsList();
  },

  renderPhaseCards(daysDone, currentStudyDay) {
    const el = document.getElementById('phase-progress-cards');
    const todayDay = currentStudyDay || Schedule.getStudyDayNumber();
    el.innerHTML = PHASE_INFO.map(p => {
      const [start, end] = p.days.split('-').map(Number);
      const total = end - start + 1;
      const done = Math.max(0, Math.min(daysDone - start + 1, total));
      const pct = Math.round((done / total) * 100);
      const isActive = todayDay >= start && todayDay <= end;
      const isComplete = todayDay > end;
      const badge = isComplete ? '<span class="phase-badge completed">Complete ✅</span>'
        : isActive ? '<span class="phase-badge active">Active 🔵</span>'
        : '<span class="phase-badge locked">Locked 🔒</span>';
      return `<div class="phase-card">
        <div class="phase-header">
          <div>
            <div class="phase-name">Phase ${p.phase}: ${p.name}</div>
            <div class="phase-days text-xs">Days ${p.days}</div>
          </div>
          ${badge}
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%; background:${p.color};"></div>
        </div>
        <div class="text-xs text-muted mt-1">${done} / ${total} days completed</div>
      </div>`;
    }).join('');
  },

  renderSubjectCards() {
    const el = document.getElementById('prog-subject-grid');
    const subjects = [
      { key: 'physics', label: 'Physics', icon: '⚡', cls: 'physics', ringId: 'prog-phy-ring', color: 'blue' },
      { key: 'chemistry', label: 'Chemistry', icon: '🧪', cls: 'chemistry', ringId: 'prog-chem-ring', color: 'green' },
      { key: 'math', label: 'Math', icon: '📐', cls: 'math', ringId: 'prog-math-ring', color: 'orange' }
    ];
    el.innerHTML = subjects.map(s => {
      const prog = Progress.getSubjectProgress(s.key);
      return `<div class="subject-progress-card ${s.cls}">
        <div class="subject-progress-name">${s.icon} ${s.label}</div>
        <div style="display:flex;justify-content:center;">
          <div class="progress-ring-wrap">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle class="progress-ring-bg" cx="40" cy="40" r="32"/>
              <circle class="progress-ring-fill ${s.color}" id="${s.ringId}"
                cx="40" cy="40" r="32" stroke-dasharray="201.06"
                stroke-dashoffset="${201.06 - (prog.percent/100)*201.06}"/>
            </svg>
            <div class="progress-ring-text"><span class="ring-percent">${prog.percent}%</span></div>
          </div>
        </div>
        <div class="subject-progress-stats">${prog.done} / ${prog.total} topics</div>
      </div>`;
    }).join('');
  },

  renderHeatmap() {
    const el = document.getElementById('heatmap-grid');
    const studyDays = Schedule.getStudyDays();
    const today = Schedule._todayStr();

    el.innerHTML = studyDays.slice(0, 60).map(day => {
      const dp = Progress.getDayProgress(day.day);
      const done = (dp.physics==='done'?1:0)+(dp.chemistry==='done'?1:0)+(dp.math==='done'?1:0);
      let cls = day.date > today ? 'hm-future' : done === 3 ? 'hm-full' : done >= 2 ? 'hm-partial' : done >= 1 ? 'hm-started' : 'hm-missed';
      if (day.date === today) cls += ' hm-today';
      return `<div class="heatmap-cell ${cls}" title="Day ${day.day} — ${day.date}${done?` — ${done}/3 done`:''}"></div>`;
    }).join('');
  },

  renderPerfChart() {
    const scores = Storage.load(Storage.KEYS.QUIZ_SCORES, []);
    const el = document.getElementById('perf-chart');
    if (!scores.length) {
      el.innerHTML = '<div class="text-muted text-sm text-center w-full" style="align-self:center">No quiz data yet</div>';
      return;
    }
    const weeks = [];
    for (let i = 0; i < 8; i++) weeks.push({ label: `W${i+1}`, scores: [] });
    scores.forEach(s => {
      const d = new Date(s.date);
      const start = new Date(START_DATE);
      const weekIdx = Math.floor((d - start) / (7 * 86400000));
      if (weekIdx >= 0 && weekIdx < 8) weeks[weekIdx].scores.push(s.score);
    });

    el.innerHTML = weeks.map(w => {
      const avg = w.scores.length ? Math.round(w.scores.reduce((a,b)=>a+b,0)/w.scores.length) : 0;
      return `<div class="bar-chart-item">
        <div class="bar-value">${avg ? avg+'%' : ''}</div>
        <div class="bar-fill" style="height:${avg}%;"></div>
        <div class="bar-label">${w.label}</div>
      </div>`;
    }).join('');
  },

  renderTopicsList() {
    const completed = Progress.getCompletedTopicsList();
    const el = document.getElementById('completed-topics-list');
    const filtered = this.currentFilter === 'all' ? completed : completed.filter(t => t.subject === this.currentFilter);

    if (!filtered.length) {
      el.innerHTML = '<div class="empty-state"><span class="empty-state-icon">📚</span><div class="empty-state-title">No topics completed yet</div></div>';
      return;
    }

    const icons = { physics: '⚡', chemistry: '🧪', math: '📐' };
    const colors = { physics: 'var(--blue-primary)', chemistry: 'var(--green)', math: 'var(--orange)' };
    el.innerHTML = filtered.slice(0, 30).map(t => `
      <div style="display:flex; align-items:center; gap:0.75rem; padding:0.6rem 0; border-bottom:1px solid var(--border-color);">
        <span style="font-size:1.2rem;">${icons[t.subject]}</span>
        <div style="flex:1;">
          <div class="text-sm fw-700">${t.topic}</div>
          <div class="text-xs text-muted">Day ${t.day} · ${UI._formatShortDate(t.date)}</div>
        </div>
        <span style="font-size:0.7rem; font-weight:700; color:${colors[t.subject]}; text-transform:uppercase;">${t.subject}</span>
      </div>`).join('');
  },

  filterTopics(filter, btn) {
    this.currentFilter = filter;
    document.querySelectorAll('#prog-filter-pills .filter-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    this.renderTopicsList();
  }
};

// ── PROMPTS PAGE ─────────────────────────────────────────────────
const PromptsPage = {
  currentTab: 'video',
  currentPrompt: '',

  init() {
    this.populateDayDropdown();
    this.updateTopicDropdown();
    document.getElementById('today-prompt-count').textContent = window.PromptsModule ? window.PromptsModule.getTodayCount() : 0;
    this.renderHistory();
  },

  populateDayDropdown() {
    const sel = document.getElementById('prompt-day-select');
    if (!sel) return;
    sel.innerHTML = '';
    const studyDays = Schedule.getStudyDays();
    studyDays.forEach(day => {
      const opt = document.createElement('option');
      opt.value = day.day;
      opt.textContent = `Day ${day.day} — ${UI._formatShortDate(day.date)}`;
      sel.appendChild(opt);
    });
    // Default to today
    const today = Schedule.getTodayStudyDay();
    if (today) sel.value = today.day;
  },

  updateTopicDropdown() {
    const subject = document.getElementById('prompt-subject-select')?.value;
    const sel = document.getElementById('prompt-topic-select');
    if (!sel) return;

    const dayNum = parseInt(document.getElementById('prompt-day-select')?.value);
    const entry = Schedule.getDayData(dayNum);
    sel.innerHTML = '';

    if (entry) {
      const subKey = subject.toLowerCase() === 'mathematics' ? 'math' : subject.toLowerCase();
      const data = entry[subKey];
      if (data) {
        const opt = document.createElement('option');
        opt.value = data.topic;
        opt.textContent = data.topic;
        sel.appendChild(opt);
      }
    }

    // Also add other topics from quiz bank
    if (typeof quizBank !== 'undefined') {
      const subFilter = subject === 'Math' ? 'Math' : subject;
      const topics = [...new Set(quizBank.filter(q => q.subject === subFilter).map(q => q.topic))];
      topics.forEach(t => {
        if (![...sel.options].some(o => o.value === t)) {
          const opt = document.createElement('option');
          opt.value = t; opt.textContent = t;
          sel.appendChild(opt);
        }
      });
    }
  },

  onDayChange() {
    this.updateTopicDropdown();
  },

  useToday() {
    const today = Schedule.getTodayStudyDay();
    if (!today) { AKJEE.toast('No study scheduled today', 'info'); return; }
    const daySel = document.getElementById('prompt-day-select');
    if (daySel) { daySel.value = today.day; this.updateTopicDropdown(); }
  },

  switchTab(tab, btn) {
    this.currentTab = tab;
    document.querySelectorAll('.prompt-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('prompt-output-box').textContent = 'Click "Generate Prompt" to generate a ' + tab + ' prompt.';
  },

  generate() {
    const subject = document.getElementById('prompt-subject-select')?.value;
    const topic = document.getElementById('prompt-topic-select')?.value;
    const dayNum = parseInt(document.getElementById('prompt-day-select')?.value);

    if (!topic) { AKJEE.toast('Please select a topic first', 'warning'); return; }

    const entry = Schedule.getDayData(dayNum);
    const subKey = subject?.toLowerCase() === 'mathematics' ? 'math' : subject?.toLowerCase();
    const subData = entry?.[subKey] || {};
    const subtopics = subData.subtopics || ['Core concepts', 'Problem solving', 'Practice'];
    const date = entry ? UI._formatDate(entry.date) : UI._formatDate(Schedule._todayStr());

    const pm = window.PromptsModule;
    if (!pm) { AKJEE.toast('Prompts module not loaded', 'error'); return; }

    const displaySubject = subject === 'Math' ? 'Mathematics' : subject;

    let prompt = '';
    if (this.currentTab === 'video') prompt = pm.generateVideoPrompt(displaySubject, topic, subtopics, dayNum, date);
    else if (this.currentTab === 'audio') prompt = pm.generateAudioPrompt(displaySubject, topic, subtopics, dayNum, date);
    else if (this.currentTab === 'notes') prompt = pm.generateNotesPrompt(displaySubject, topic, subtopics, dayNum, date);
    else if (this.currentTab === 'quiz') prompt = pm.generateQuizPrompt(displaySubject, topic, subtopics, dayNum, date);
    else if (this.currentTab === 'test') prompt = pm.generateTestPrompt(displaySubject, topic, dayNum, date);

    this.currentPrompt = prompt;
    document.getElementById('prompt-output-box').textContent = prompt;
    pm.saveToHistory(this.currentTab, subject, topic, dayNum);
    document.getElementById('today-prompt-count').textContent = pm.getTodayCount();
    this.renderHistory();
    AKJEE.toast('Prompt generated! Click Copy to use it.', 'success');
  },

  copy() {
    if (!this.currentPrompt) { AKJEE.toast('Generate a prompt first!', 'warning'); return; }
    navigator.clipboard.writeText(this.currentPrompt).then(() => {
      const btn = document.getElementById('copy-prompt-btn');
      const ok = document.getElementById('copy-success');
      btn.textContent = '✅ Copied!';
      ok.classList.add('show');
      setTimeout(() => { btn.textContent = '📋 Copy to Clipboard'; ok.classList.remove('show'); }, 2000);
      AKJEE.toast('Prompt copied to clipboard! Paste in AI tool.', 'success');
    }).catch(() => {
      // Fallback
      const el = document.createElement('textarea');
      el.value = this.currentPrompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      AKJEE.toast('Copied!', 'success');
    });
  },

  quickPrompt(subjectKey, type, dayNum) {
    const entry = Schedule.getDayData(dayNum);
    if (!entry) return;
    const subData = entry[subjectKey];
    if (!subData) return;

    const subjectMap = { physics: 'Physics', chemistry: 'Chemistry', math: 'Mathematics' };
    const subject = subjectMap[subjectKey];
    const topic = subData.topic;
    const subtopics = subData.subtopics || [];
    const date = UI._formatDate(entry.date);
    const pm = window.PromptsModule;
    if (!pm) return;

    let prompt = '';
    if (type === 'video') prompt = pm.generateVideoPrompt(subject, topic, subtopics, dayNum, date);
    else if (type === 'audio') prompt = pm.generateAudioPrompt(subject, topic, subtopics, dayNum, date);
    else if (type === 'notes') prompt = pm.generateNotesPrompt(subject, topic, subtopics, dayNum, date);
    else if (type === 'quiz') prompt = pm.generateQuizPrompt(subject, topic, subtopics, dayNum, date);
    else if (type === 'test') prompt = pm.generateTestPrompt(subject, topic, dayNum, date);

    // Copy immediately
    navigator.clipboard.writeText(prompt).then(() => {
      AKJEE.toast(`${type} prompt copied for ${topic}! Paste in AI tool. 📋`, 'success');
    }).catch(() => {
      // Navigate to prompts page and show
      AKJEE.navigate('prompts');
    });
    pm.saveToHistory(type, subject, topic, dayNum);
  },

  renderHistory() {
    const pm = window.PromptsModule;
    const history = pm ? pm.loadHistory() : [];
    const el = document.getElementById('prompt-history-list');
    if (!el) return;
    if (!history.length) {
      el.innerHTML = '<div class="empty-state"><span class="empty-state-icon">💬</span><div class="empty-state-title">No prompts generated yet</div></div>';
      return;
    }
    el.innerHTML = history.slice(0, 10).map(h => {
      const d = new Date(h.timestamp).toLocaleDateString();
      return `<div class="card mb-1" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;">
        <span style="font-size:1.25rem;">${{video:'📹',audio:'🎧',notes:'📄',quiz:'❓',test:'📝'}[h.type]||'💬'}</span>
        <div style="flex:1;">
          <div class="text-sm fw-700">${h.type.charAt(0).toUpperCase()+h.type.slice(1)} Prompt · ${h.subject}</div>
          <div class="text-xs text-muted">${h.topic} · Day ${h.day} · ${d}</div>
        </div>
      </div>`;
    }).join('');
  }
};

// ── ACHIEVEMENTS PAGE ────────────────────────────────────────────
const AchievementsPage = {
  refresh() {
    const lp = Gamification.getLevelProgress();

    document.getElementById('ach-level-num').textContent = lp.level;
    document.getElementById('ach-level-name').textContent = lp.name;
    document.getElementById('ach-level-pts').textContent = `${lp.points} pts — Next level at ${lp.nextAt} pts`;
    document.getElementById('level-progress-bar').style.width = lp.percent + '%';

    // Personal records
    const quizScores = Storage.load(Storage.KEYS.QUIZ_SCORES, []);
    const testScores = Storage.load(Storage.KEYS.TEST_SCORES, []);
    const bestQuiz = quizScores.length ? Math.max(...quizScores.map(s => s.score)) : 0;
    const bestTest = testScores.length ? Math.max(...testScores.map(s => s.percent)) : 0;

    document.getElementById('personal-records').innerHTML = [
      { val: `${bestQuiz}%`, label: 'Best Quiz Score' },
      { val: `${bestTest}%`, label: 'Best Test Score' },
      { val: Gamification.getLongestStreak() + ' days', label: 'Longest Streak' },
      { val: Progress.getTopicsCompletedCount(), label: 'Topics Mastered' },
      { val: Progress.getCompletedCount(), label: 'Days Completed' },
      { val: lp.points, label: 'Total Points' },
    ].map(r => `<div class="record-card"><div class="record-value">${r.val}</div><div class="record-label">${r.label}</div></div>`).join('');

    // Badges
    const grid = document.getElementById('badges-grid');
    grid.innerHTML = Achievements.BADGES.map(badge => {
      const earned = Achievements.isEarned(badge.id);
      const earnedDate = Achievements.getEarnedDate(badge.id);
      return `<div class="badge-card ${earned ? 'earned' : 'locked'}" title="${badge.desc}">
        <span class="badge-icon">${badge.icon}</span>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${earned ? badge.desc : '🔒 Locked'}</div>
        ${earned && earnedDate ? `<div class="badge-date">${new Date(earnedDate).toLocaleDateString()}</div>` : ''}
      </div>`;
    }).join('');
  }
};

// ── SETTINGS PAGE ────────────────────────────────────────────────
const SettingsPage = {
  init() {
    const student = Storage.load(Storage.KEYS.STUDENT, {});
    document.getElementById('settings-name-display').textContent = student.studentName || 'Not set';
    document.getElementById('settings-start-date').textContent = student.startDate ? UI._formatDate(student.startDate) : '—';
    document.getElementById('settings-hours').value = student.dailyHours || 4;
    document.getElementById('settings-rest-days').value = student.restDays || 'sat-sun';

    const totalDays = (Schedule.getStudyDays && Schedule.getStudyDays().length) || TOTAL_STUDY_DAYS;
    const remaining = totalDays - Progress.getCompletedCount();
    document.getElementById('settings-days-remaining').textContent = `${remaining} study days remaining`;

    const settings = Storage.load(Storage.KEYS.SETTINGS, {});
    document.getElementById('settings-dark-mode').checked = settings.darkMode !== false;
    document.getElementById('settings-animations').checked = settings.animations !== false;
    document.getElementById('settings-font-size').value = settings.fontSize || 'normal';
  },

  editName() {
    const name = prompt('Enter your name:', AKJEE.getStudentName());
    if (name && name.trim()) {
      const student = Storage.load(Storage.KEYS.STUDENT, {});
      student.studentName = name.trim();
      Storage.save(Storage.KEYS.STUDENT, student);
      document.getElementById('settings-name-display').textContent = name.trim();
      UI.updateHeaderStats();
      AKJEE.toast('Name updated!', 'success');
    }
  },

  saveHours(val) {
    const student = Storage.load(Storage.KEYS.STUDENT, {});
    student.dailyHours = parseInt(val);
    Storage.save(Storage.KEYS.STUDENT, student);
    AKJEE.toast('Study hours saved', 'success');
  },

  saveRestDays(val) {
    const student = Storage.load(Storage.KEYS.STUDENT, {});
    student.restDays = val;
    Storage.save(Storage.KEYS.STUDENT, student);
    AKJEE.toast('Rest days updated', 'success');
  },

  toggleTheme(isDark) {
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
    const s = Storage.load(Storage.KEYS.SETTINGS, {});
    s.darkMode = isDark;
    Storage.save(Storage.KEYS.SETTINGS, s);
  },

  toggleAnimations(on) {
    document.body.style.setProperty('--transition', on ? '0.3s ease' : '0s');
    const s = Storage.load(Storage.KEYS.SETTINGS, {});
    s.animations = on;
    Storage.save(Storage.KEYS.SETTINGS, s);
  },

  changeFontSize(size) {
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    if (size !== 'normal') document.body.classList.add('font-' + size);
    const s = Storage.load(Storage.KEYS.SETTINGS, {});
    s.fontSize = size;
    Storage.save(Storage.KEYS.SETTINGS, s);
  },

  showSyncCode() {
    const code = typeof FirebaseSync !== 'undefined' ? FirebaseSync.getOrCreateCode() : '—';
    const el = document.getElementById('sync-code-display');
    if (el) el.textContent = code;
    if (typeof FirebaseSync !== 'undefined' && FirebaseSync.initialized) {
      FirebaseSync._setStatus('synced');
    } else {
      const st = document.getElementById('cloud-sync-status');
      if (st) st.textContent = '⚠️ Cloud sync unavailable (offline?)';
    }
  },

  copySyncCode() {
    const code = typeof FirebaseSync !== 'undefined' ? FirebaseSync.getOrCreateCode() : null;
    if (!code) { AKJEE.toast('No sync code yet', 'warning'); return; }
    navigator.clipboard.writeText(code).then(() => {
      AKJEE.toast(`Sync code ${code} copied! Use it on any device.`, 'success');
    }).catch(() => {
      AKJEE.toast(`Your sync code: ${code}`, 'info');
    });
  },

  async restoreFromCloud() {
    const input = document.getElementById('sync-code-input');
    const code = input?.value?.trim().toUpperCase();
    if (!code || code.length < 4) { AKJEE.toast('Enter a valid sync code', 'warning'); return; }
    if (typeof FirebaseSync === 'undefined') { AKJEE.toast('Cloud sync not available', 'error'); return; }
    AKJEE.toast('Restoring from cloud...', 'info');
    const result = await FirebaseSync.pullFromCloud(code);
    if (result.ok) {
      AKJEE.toast('✅ Data restored! Reloading...', 'success');
      setTimeout(() => location.reload(), 1500);
    } else {
      AKJEE.toast(`❌ ${result.msg}`, 'error');
    }
  },

  exportData() {
    const json = Storage.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `akjee-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    AKJEE.toast('Data exported successfully!', 'success');
  },

  importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      if (Storage.importAll(e.target.result)) {
        AKJEE.toast('Data imported! Reloading...', 'success');
        setTimeout(() => location.reload(), 1500);
      } else {
        AKJEE.toast('Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
  },

  confirmReset() {
    AKJEE.modal.confirm(
      '⚠️ Reset All Data',
      'This will delete ALL your progress, points, and settings. This cannot be undone! Are you absolutely sure?',
      () => {
        Storage.clearAll();
        AKJEE.toast('All data cleared. Reloading...', 'info');
        setTimeout(() => location.reload(), 1500);
      }
    );
  }
};

// ── MODAL SYSTEM ─────────────────────────────────────────────────
const Modal = {
  _active: null,
  _rescheduleData: null,
  _confirmCallback: null,

  show(modalId) {
    const overlay = document.getElementById('modal-overlay');
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
    overlay.classList.add('open');
    this._active = modalId;
  },

  close() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    this._active = null;
    this._confirmCallback = null;
  },

  showReschedule(dayNum, subject, topicName) {
    this._rescheduleData = { dayNum, subject };
    document.getElementById('reschedule-topic-name').innerHTML = `Rescheduling: <strong>${topicName}</strong>`;
    // Set min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('reschedule-date').min = tomorrow.toISOString().split('T')[0];
    document.getElementById('reschedule-date').value = tomorrow.toISOString().split('T')[0];
    this.show('reschedule-modal');
  },

  confirmReschedule() {
    if (!this._rescheduleData) return;
    const newDate = document.getElementById('reschedule-date').value;
    const reason = document.getElementById('reschedule-reason').value;
    if (!newDate) { AKJEE.toast('Please select a date', 'warning'); return; }
    Progress.reschedule(this._rescheduleData.dayNum, this._rescheduleData.subject, newDate, reason);
    Achievements.unlock('comeback_kid');
    AKJEE.toast(`Topic rescheduled to ${UI._formatShortDate(newDate)}`, 'info');
    this.close();
    AKJEE.todayPage.render();
  },

  showLevelUp(level) {
    document.getElementById('level-up-num').textContent = level;
    document.getElementById('level-up-name').textContent = Gamification.getLevelName(level);
    this.show('level-up-modal');
    AKJEE.confetti();
  },

  showAchievement(badge) {
    document.getElementById('ach-modal-icon').textContent = badge.icon;
    document.getElementById('ach-modal-name').textContent = badge.name + ' Unlocked!';
    document.getElementById('ach-modal-desc').textContent = badge.desc;
    this.show('achievement-modal');
  },

  confirm(title, message, callback) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    this._confirmCallback = callback;
    document.getElementById('confirm-action-btn').onclick = () => {
      this.close();
      if (callback) callback();
    };
    this.show('confirm-modal');
  }
};

// ── MAIN AKJEE APP ───────────────────────────────────────────────
const AKJEE = {
  // Module references
  storage: Storage,
  schedule: Schedule,
  progress: Progress,
  gamification: Gamification,
  achievements: Achievements,
  quizModule: QuizModule,
  testModule: TestModule,
  ui: UI,
  onboarding: Onboarding,
  todayPage: TodayPage,
  progressPage: ProgressPage,
  promptsPage: PromptsPage,
  achievementsPage: AchievementsPage,
  settingsPage: SettingsPage,
  modal: Modal,
  homeDashboard: HomeDashboard,

  currentPage: 'home',

  async init() {
    // Show loading screen
    const loadingEl = document.getElementById('loading-screen');

    try {
      // Init Firebase cloud sync
      if (typeof FirebaseSync !== 'undefined') {
        FirebaseSync.init();
        await FirebaseSync.autoLoad();
      }

      // Load schedule
      await Schedule.load();

      // Apply saved settings
      const settings = Storage.load(Storage.KEYS.SETTINGS, {});
      if (settings.darkMode === false) document.body.className = 'light-theme';
      if (settings.fontSize && settings.fontSize !== 'normal') document.body.classList.add('font-' + settings.fontSize);

      // Hide loading
      setTimeout(() => {
        loadingEl.classList.add('fade-out');
        setTimeout(() => { loadingEl.style.display = 'none'; }, 500);
      }, 800);

      // Check onboarding
      if (!Onboarding.isComplete()) {
        Onboarding.show();
      } else {
        this.launch();
      }
    } catch (e) {
      console.error('Init error:', e);
      loadingEl.style.display = 'none';
      if (!Onboarding.isComplete()) {
        Onboarding.show();
      } else {
        this.launch();
      }
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(e => console.warn('SW:', e));
    }

    // Close modal on overlay click
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal-overlay')) Modal.close();
    });
  },

  launch() {
    document.getElementById('app-wrapper').classList.remove('hidden');
    UI.updateHeaderStats();
    TodayPage.init();
    HomeDashboard.refresh();
    this.navigate('home');
    QuizModule._renderHistory();
    TestModule._renderHistory();

    // Check for achievements on load
    setTimeout(() => Achievements.checkAll(), 1000);
  },

  navigate(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target page
    const el = document.getElementById(`page-${page}`);
    if (el) el.classList.add('active');

    // Update nav active states
    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    this.currentPage = page;

    // Page-specific refresh
    if (page === 'home') HomeDashboard.refresh();
    else if (page === 'today') TodayPage.render();
    else if (page === 'progress') ProgressPage.refresh();
    else if (page === 'prompts') PromptsPage.init();
    else if (page === 'achievements') AchievementsPage.refresh();
    else if (page === 'settings') { SettingsPage.init(); SettingsPage.showSyncCode(); }

    // Scroll to top
    document.getElementById('main-content').scrollTop = 0;
    window.scrollTo(0, 0);
  },

  getStudentName() {
    const student = Storage.load(Storage.KEYS.STUDENT, {});
    return student.studentName || 'Student';
  },

  toast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-msg">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  confetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#3b82f6','#f59e0b','#10b981','#ef4444','#8b5cf6','#f97316'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left: ${Math.random() * 100}vw;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation-duration: ${1.5 + Math.random() * 2}s;
        animation-delay: ${Math.random() * 0.5}s;
        width: ${6 + Math.random() * 6}px;
        height: ${6 + Math.random() * 6}px;
        transform: rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }
};

// ── BOOT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  AKJEE.init();
});
