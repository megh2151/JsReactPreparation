import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const performanceQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  /performance|bundle|cache|reflow|repaint|jank|optimize|lazy|code split|csr|ssr|ssg|isr|cors|service worker|monitor|critical rendering|http\/|infinite scroll|tree shak|memo|re-render|virtual dom|fiber|hydration|browser render/i.test(q.title)
);
