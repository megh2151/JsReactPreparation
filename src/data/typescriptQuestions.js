import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const typescriptQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  /typescript|type vs interface|interface.*type|mapped type|keyof/i.test(q.title)
);
