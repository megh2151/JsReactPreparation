import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const authQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  /auth|token|jwt|login|logout|secure|xss|csrf|protected|oauth|rbac|interceptor|refresh/i.test(q.title)
);
