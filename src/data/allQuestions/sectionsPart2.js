import { Q } from '../helpers';

export const sectionSeniorReact = {
  id: 'senior-react-list',
  title: 'Senior React & TypeScript List',
  questions: [
    Q('react-rendering-process', 'React rendering: state update to UI update', 'react-rendering-process'),
    Q('controlled-uncontrolled-2', 'Difference between controlled and uncontrolled components', 'controlled-uncontrolled'),
    Q('react-memo-hurt', 'React.memo — when can it hurt performance?', 'react-memo-guarantee'),
    Q('useref-depth', 'useRef in depth — different from useState?', 'useRef-vs-useState'),
    Q('custom-hooks-when', 'Custom hooks — when to create one?', 'custom-hooks'),
    Q('useeffect-deps-mistakes', 'useEffect dependencies — common mistakes', 'useEffect-deps'),
    Q('prop-drilling-2', 'Prop drilling — how to avoid?', 'prop-drilling'),
    Q('hoc-render-hooks', 'HOC vs Render Props vs Hooks — why Hooks?', 'custom-hooks'),
    Q('closures-react', 'Closures in JavaScript and React hooks', 'closures'),
    Q('execution-context', 'Execution context, lexical scope, and hoisting', 'hoisting'),
    Q('equality-operators', '== vs ===, null vs undefined, let vs const vs var', 'hoisting'),
    Q('debounce-throttle-where', 'Debouncing vs throttling — where to use?', 'debounce-throttle-diff'),
    Q('typescript-types-enums', 'TypeScript interfaces, types, enums — when to use', 'type-vs-interface'),
    Q('mapped-types', 'mapped types, keyof, conditional types', 'type-vs-interface'),
    Q('scalable-structure', 'Structure scalable React project for multiple teams', 'scalable-frontend'),
  ],
};

export const sectionMachineCoding = {
  id: 'machine-coding',
  title: 'Machine Coding & Architecture',
  questions: [
    Q('dashboard-design', 'Design real-time analytics dashboard (multiple APIs)', 'dashboardDesign'),
    Q('dashboard-architecture-topics', 'Dashboard: folder structure, React Query vs Redux', 'state-large-apps'),
    Q('round1-js-web', 'Round 1: JavaScript & Web Performance topics', 'event-loop'),
    Q('round2-video-player', 'Round 2: Design scalable Video Player', 'scalable-frontend'),
    Q('round3-machine-coding', 'Round 3: Build UI component in React', 'custom-hooks'),
  ],
};

export const sectionCoreBatches = {
  id: 'core-batches',
  title: 'Core JavaScript / React / State / System Design',
  questions: [
    Q('event-delegation', 'Event delegation — why efficient?', 'event-delegation'),
    Q('let-const-var-tdz', 'let, const, var — hoisting and TDZ', 'hoisting'),
    Q('event-loop-detail', 'Event loop: Call Stack, Web APIs, queues', 'event-loop'),
    Q('type-coercion', '=== vs == and type coercion', 'event-loop-output'),
    Q('closure-use-case', 'Closure — real-world use case', 'closures'),
    Q('async-await-eventloop', 'async/await vs Promises — event loop', 'promises-vs-async'),
    Q('nullish-coalescing', '?? vs ||', 'hoisting'),
    Q('weakmap-weakset', 'WeakMap and WeakSet', 'closures'),
    Q('chat-dom-updates', 'Real-time chat — DOM updates without blocking', 'ui-jank'),
    Q('useeffect-vs-layout', 'useEffect vs useLayoutEffect', 'useEffect-deps'),
    Q('fiber-performance', 'React Fiber — performance', 'react-fiber'),
    Q('circular-useeffect', 'Circular dependencies in useEffect', 'useEffect-deps'),
    Q('protected-routes', 'Protected routes with Context or Redux', 'jwt-flow'),
    Q('nextjs-code-split', 'Next.js code splitting and SSR', 'code-splitting'),
    Q('nextjs-env', 'Next.js environment variables', 'frontend-security'),
    Q('create-root', 'ReactDOM.render vs createRoot', 'react-fiber'),
    Q('dashboard-hooks', 'Dashboard: charts, notifications, fetches independently', 'custom-hooks'),
    Q('usestate-vs-usereducer', 'useState vs useReducer', 'redux-toolkit'),
    Q('react-manage-rerenders', 'React manage re-renders with memo/useMemo/useCallback', 'usememo-usecallback'),
    Q('optimistic-pessimistic', 'Optimistic vs pessimistic updates', 'optimistic-ui'),
    Q('lifecycle-vs-hooks', 'Class lifecycle vs Hooks lifecycle', 'useEffect-deps'),
    Q('ecommerce-cart-query', 'E-commerce cart with React Query optimistic updates', 'optimistic-ui'),
    Q('collab-editor', 'Design collaborative text editor', 'websocket-ordering'),
    Q('rate-limiter', 'Design rate limiter for API in SPA', 'api-retries'),
    Q('pagination-system', 'Design dynamic pagination / infinite scroll', 'pagination'),
    Q('redux-like-design', 'Design client state like Redux Toolkit', 'redux-toolkit'),
    Q('oauth-jwt-flow', 'Auth flow with social login OAuth + JWT', 'jwt-flow'),
  ],
};
