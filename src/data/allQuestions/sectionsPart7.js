import { Q } from '../helpers';

export const sectionGapTopics = {
  id: 'gap-topics',
  title: 'Added Topics — JS, DOM & State',
  questions: [
    Q('arrow-functions-deep', 'Arrow functions — rules and differences', 'arrow-functions'),
    Q('this-keyword-deep', 'What is this in JavaScript?', 'this-keyword'),
    Q('event-bubbling-deep', 'Event bubbling — how it works', 'event-bubbling'),
    Q('event-capturing-deep', 'Event capturing — how it works', 'event-capturing'),
    Q('map-filter-reduce-foreach', 'map vs filter vs reduce vs forEach', 'map-filter-reduce-foreach'),
    Q('context-vs-redux-deep', 'Context API vs Redux — when to use which?', 'context-vs-redux'),
    Q('call-apply-bind-polyfill', 'call, apply, bind — difference + polyfill implementation', 'call-apply-bind-polyfill'),
    Q('multi-select-topic', 'Build a multi-select dropdown with tags', 'multi-select-dropdown'),
    Q('stopwatch-topic', 'Stopwatch — start, stop, reset (React)', 'stopwatch'),
  ],
};
