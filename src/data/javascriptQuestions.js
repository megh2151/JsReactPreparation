import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const javascriptQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  ['main-list', 'checklists', 'closure-deep-dive', 'basic-js-react-list', 'core-batches', 'coding-strings', 'coding-arrays', 'coding-js-advanced', 'gap-topics'].includes(q.sectionId)
);
