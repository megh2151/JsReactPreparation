import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const stateManagementQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  /redux|context api|context vs|state management|useReducer|optimistic|selector|react query|tanstack|global state|zustand/i.test(q.title + q.simpleAnswer)
);
