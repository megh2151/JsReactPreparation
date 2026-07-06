import { ALL_QUESTIONS_FLAT } from './allQuestions';

export const systemDesignQuestions = ALL_QUESTIONS_FLAT.filter((q) =>
  /design|architect|scalable|micro.?front|dashboard|video player|collaborative|rate limit|pagination system|notifications|millions|enterprise|multi.?team|module federation/i.test(q.title)
);
