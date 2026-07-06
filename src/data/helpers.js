import { STRUCTURED_ANSWERS } from './structuredAnswers';
import { EXAMPLE_CODES } from './structuredAnswers/exampleCodes';
import { getFallbackExampleCode } from './structuredAnswers/fallbackCodes';

/** Map question id → structured answer bank key when they differ */
const ANSWER_ALIASES = {
  'controlled-uncontrolled-2': 'controlled-uncontrolled',
  'useref-depth': 'useRef-vs-useState',
  'custom-hooks-when': 'custom-hooks',
  'useeffect-deps-mistakes': 'useEffect-deps',
  'prop-drilling-2': 'prop-drilling',
  'debounce-throttle-where': 'debounce-throttle-diff',
  'debounce-throttle-diff': 'debounce-throttle',
  'context-vs-redux-2': 'context-vs-redux',
  'virtual-dom-recon': 'virtual-dom',
  'virtual-dom-internal': 'virtual-dom',
  'what-causes-rerender': 'avoid-rerenders',
  'memo-usememo-usecallback': 'usememo-usecallback',
  'fetch-api-component': 'use-fetch',
  'custom-hook-fetch-q': 'use-fetch',
  'pagination-create': 'pagination',
  'pagination-component': 'pagination',
  'debouncing-react': 'implement-debounce',
  'parent-to-child': 'parent-to-child',
  'display-dynamic-html': 'parent-to-child',
  'child-to-parent': 'child-to-parent',
  'access-dom': 'access-dom',
  'c-q1': 'closures',
  'c-q9': 'stale-closure',
  'promises-vs-async': 'promises-vs-async',
  'dashboard-design': 'state-large-apps',
  'dashboardDesign': 'state-large-apps',
  'state-management-large': 'state-large-apps',
  'optimize-slow-react': 'optimize-slow-react',
  'debug-performance': 'debug-perf',
  'cancel-api-requests': 'cancel-api',
  'implement-debounce': 'implement-debounce',
  'deep-clone': 'deep-clone',
  'promise-all': 'promise-all',
  'valid-parentheses': 'valid-parentheses',
  'reverse-string': 'reverse-string',
  'two-sum': 'two-sum',
  'flexbox': 'flexbox',
  'css-positioning': 'css-position',
  'arrow-functions-deep': 'arrow-functions',
  'this-keyword-deep': 'this-keyword',
  'event-bubbling-deep': 'event-bubbling',
  'event-capturing-deep': 'event-capturing',
  'multi-select-topic': 'multi-select-dropdown',
  'stopwatch-topic': 'stopwatch',
  'context-vs-redux-deep': 'context-vs-redux',
};

/**
 * Build a question with 5-part interview answer.
 * Pass answer as object { definition, howItWorks, tradeoffs, realExample, seniorGrowth }
 * or pass answerKey string to lookup from STRUCTURED_ANSWERS.
 */
export function buildQuestion(id, title, answer, extra = {}) {
  if (typeof answer === 'string') {
    const key = STRUCTURED_ANSWERS[answer] ? answer : id;
    if (STRUCTURED_ANSWERS[key]) {
      return { id, title, answerKey: key, ...STRUCTURED_ANSWERS[key], ...extra };
    }
    return { id, title, simpleAnswer: answer, ...extra };
  }
  if (typeof answer === 'object' && answer !== null) {
    return { id, title, ...answer, ...extra };
  }
  return { id, title, answerKey: id, ...extra };
}

export function enrichQuestion(q) {
  const key = q.answerKey || ANSWER_ALIASES[q.id] || q.id;
  const bank = STRUCTURED_ANSWERS[key];

  if (bank) {
    return {
      ...q,
      answerKey: key,
      definition: q.definition || bank.definition,
      howItWorks: q.howItWorks || bank.howItWorks,
      tradeoffs: q.tradeoffs || bank.tradeoffs,
      realExample: q.realExample || bank.realExample,
      seniorGrowth: q.seniorGrowth || bank.seniorGrowth,
      exampleCode: q.exampleCode || bank.exampleCode || EXAMPLE_CODES[key],
      code: q.code || bank.code,
      output: q.output || bank.output,
      tips: q.tips || bank.tips,
    };
  }

  if (q.definition && q.howItWorks) {
    return {
      ...q,
      exampleCode: q.exampleCode || EXAMPLE_CODES[key] || getFallbackExampleCode(q.title),
    };
  }

  if (q.simpleAnswer) {
    const structured = structureFromSimple(q.simpleAnswer, q.title);
    return {
      ...q,
      ...structured,
      exampleCode: q.exampleCode || structured.exampleCode || getFallbackExampleCode(q.title),
    };
  }

  return {
    ...q,
    ...structureFromSimple('', q.title),
    exampleCode: q.exampleCode || getFallbackExampleCode(q.title),
  };
}

function structureFromSimple(text, title) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || (text ? [text] : []);
  const first = sentences[0]?.trim() || `${title} is a common frontend interview topic.`;
  const rest = sentences.slice(1).join(' ').trim();
  const isCoding = /implement|write|count|reverse|find|merge|flatten|polyfill|check|remove|print/i.test(title);

  return {
    definition: first.endsWith('.') ? first : `${first}.`,
    howItWorks: rest || (isCoding
      ? 'Break the problem into small steps. Handle edge cases like empty input. Explain time and space complexity if asked.'
      : 'Explain the main steps clearly, then mention how it fits in a real React app with API, state, and UI.'),
    tradeoffs: isCoding
      ? 'In production you may use a built-in method or library, but in interviews show manual logic to prove fundamentals.'
      : `Do not use "${title}" as a default everywhere — apply it only when you see a real problem in metrics, UX, or maintainability.`,
    realExample: isCoding
      ? 'In interview prep and on one React project, I solved similar problems to handle list filtering, validation, and data cleanup before API calls.'
      : 'In a React project (dashboard/e-commerce/admin), I used this when users faced slow screens or confusing errors. We measured first, fixed root cause, and verified after deploy.',
    seniorGrowth: 'Today I would measure first, pick the simplest fix, document the trade-off for the team, and add monitoring or tests so the issue does not return.',
  };
}

export function flattenSections(sections) {
  return sections.flatMap((section) =>
    section.questions.map((q) =>
      enrichQuestion({
        ...q,
        section: section.title,
        sectionId: section.id,
      })
    )
  );
}

/** Shorthand for sections — answerKey references STRUCTURED_ANSWERS */
export function Q(id, title, answerKey, extra = {}) {
  return buildQuestion(id, title, answerKey, extra);
}
