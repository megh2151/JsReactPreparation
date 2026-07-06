import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const reactQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  ['senior-react-list', 'react-fundamentals', 'react-scenarios', 'react-levels', 'machine-coding'].includes(q.sectionId)
);
