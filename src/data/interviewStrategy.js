export const strategySections = [
  {
    id: 'profile',
    title: 'Your positioning (10 YOE · 4 React)',
    content: `Interview as a Senior Frontend Engineer, not a junior React developer.

Opening line:
"I have 10 years in software delivery; the last 4 years I have owned React-based products end-to-end — from API integration and state architecture to performance tuning and production debugging."

Lead with: ownership, trade-offs, scale, and production impact.`,
  },
  {
    id: 'resume',
    title: 'Resume tailoring',
    content: `• Lead with React + JavaScript + ONE primary state tool (Redux Toolkit OR TanStack Query).
• Mention both only if you have real production experience with both.
• Use impact bullets: latency reduced, bundle size cut, incidents prevented — not task lists.
• Target Senior / Lead titles with 10 YOE.`,
  },
  {
    id: 'apply',
    title: 'Application strategy (this month)',
    content: `• Apply to 15–20 roles per week; referrals outperform cold apply ~3:1.
• Service companies: expect hooks + live coding + project discussion.
• Product companies: add system design + performance + behavioral depth.
• Apply in parallel with prep — do not wait until you feel 100% ready.`,
  },
  {
    id: 'answer-framework',
    title: 'Technical answer framework (use on every question)',
    content: `Use this exact 5-part structure in interviews:

1. Definition — one clear sentence
2. How it works — brief mechanics (2–4 sentences)
3. Trade-off — when NOT to use it
4. Real example — from your 4 React years (be specific: project type + problem + result)
5. What you'd do differently now — shows senior growth

Every question in this app follows this pattern.
Practice: read all 5 parts aloud, then close and explain in your own words in 60 seconds.`,
  },
  {
    id: 'star',
    title: 'Behavioral: difficult bug / challenging task',
    content: `STAR for production incidents:

• Situation — what broke, user/business impact
• Task — your ownership (not "we", say "I")
• Action — what you measured (logs, Profiler, network, Sentry)
• Result — root cause, fix, prevention (tests, monitoring, alerts)

Prepare 3 stories: hard bug, performance win, technical decision you drove.`,
  },
  {
    id: 'daily-routine',
    title: 'Daily 2.5–3 hour routine',
    content: `• 40 min — 1 senior topic + write trade-offs in your own words
• 50 min — 1 timed coding problem OR 1 machine-coding build
• 30 min — system design out loud (product roles) OR STAR story polish
• 30 min — applications + LinkedIn outreach`,
  },
  {
    id: 'self-check',
    title: 'Pre-interview self-check',
    content: `Can you, without notes:
☐ Explain JWT refresh flow end-to-end
☐ Design a dashboard with 5 APIs without waterfall
☐ Debug unnecessary re-renders with a concrete approach
☐ Tell one prod incident in under 3 minutes
☐ Implement debounce + useFetch hook blind
☐ Compare CSR vs SSR vs SSG with when you'd pick each`,
  },
];

export const studyPlan = [
  { week: 1, focus: 'JavaScript + output puzzles', tasks: 'Event loop, closures, debounce, throttle, Promise.all, deep clone' },
  { week: 2, focus: 'React depth', tasks: 'Rendering, useEffect, memoization, custom hooks, API patterns' },
  { week: 3, focus: 'Machine coding + system design', tasks: 'Undo/redo, pagination, infinite scroll, auth flow, dashboard design' },
  { week: 4, focus: 'Mocks + applications', tasks: '2 full mocks, 3 STAR stories, aggressive apply' },
];
