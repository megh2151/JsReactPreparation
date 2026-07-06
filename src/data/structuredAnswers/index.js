const A = (
  definition,
  howItWorks,
  tradeoffs,
  realExample,
  seniorGrowth,
  extra = {}
) => ({ definition, howItWorks, tradeoffs, realExample, seniorGrowth, ...extra });

export const STRUCTURED_ANSWERS = {
  "type-vs-interface": A(
    "Type and interface both describe object shapes in TypeScript.",
    "Interface is great for object contracts and can be extended many times. Type is more flexible because it can represent unions, primitives, and mapped types. In daily React code, both work for props and API models.",
    "Do not overthink this choice in every file. Mixing both styles without team rules can confuse juniors.",
    "In a dashboard project, we used interface for component props and type for API union responses. That made code reviews cleaner because intent was obvious. New joiners understood the pattern quickly.",
    "Now I define a team rule: interface for public object contracts, type for composition and unions. Consistency matters more than theory."
  ),
  "logout-tabs": A(
    "Logout across tabs means signing out the user in every open tab at the same time.",
    "When one tab logs out, we write a marker in localStorage. Other tabs listen to the storage event and clear auth state. We then redirect to login in each tab.",
    "Do not rely only on in-memory state because other tabs will stay logged in. Storage events do not fire in the same tab, so local cleanup is still needed.",
    "In an admin panel, support agents opened many tabs. Without cross-tab logout, one tab stayed active after token revoke. We fixed it with a storage event and shared auth utility.",
    "Now I also invalidate server sessions and handle 401 globally so logout is reliable even if one tab misses the event."
  ),
  "react-hooks": A(
    "React hooks are functions that let functional components use state and lifecycle features.",
    "useState stores local data and triggers re-render on update. useEffect runs side effects after render with dependency control. Custom hooks let us reuse stateful logic across components.",
    "Hooks must follow rules, so calling them conditionally breaks behavior. Too much logic inside one hook can make debugging hard.",
    "In a forms-heavy app, we moved validation and submit logic to custom hooks. Components became small and easier to read. Team velocity improved during feature releases.",
    "Now I design hooks around one responsibility and add clear return names so usage is self-explanatory."
  ),
  "react-memo-guarantee": A(
    "React.memo is a performance hint, not a hard guarantee that re-render will never happen.",
    "It shallowly compares props and skips rendering when props are equal. If context changes or parent forces different props references, render still happens. Dev mode behavior can also make render counts look higher.",
    "Do not wrap every component with memo. The comparison itself has cost and can hurt simple components.",
    "On an e-commerce listing page, we memoized product cards and stabilized handlers. Scroll became smoother because only changed cards re-rendered. We skipped memo for tiny static badges.",
    "Now I profile first and memo only where render cost is measurable."
  ),
  "usememo-usecallback": A(
    "useMemo memoizes a computed value, while useCallback memoizes a function reference.",
    "useMemo runs a calculation only when dependencies change. useCallback returns the same function identity until dependencies change. Both help when child components rely on stable references.",
    "Using them everywhere adds complexity and can hide stale dependency bugs. Wrong dependency arrays create hard-to-debug behavior.",
    "In a dashboard with heavy filters, we used useMemo for derived table rows and useCallback for row actions. That reduced unnecessary child renders. Interaction felt faster on low-end laptops.",
    "Now I only add them after checking React DevTools profiler and documenting why they exist."
  ),
  "usememo-worse": A(
    "useMemo can make performance worse when used for cheap calculations.",
    "React must track dependencies and keep memoized values in memory. For tiny operations, memo overhead can be more than recomputing. Frequent dependency changes also invalidate memo often.",
    "Do not memoize simple string concatenation or tiny maps. Extra complexity hurts readability and onboarding.",
    "In an admin panel, we memoized almost every derived value and saw no gain. Removing unnecessary useMemo reduced code noise and made bugs easier to spot. Only expensive transforms stayed memoized.",
    "Now I treat useMemo like a targeted optimization, not a default pattern."
  ),
  "undo-redo-component": A(
    "Undo redo in a component means storing past and future states to move backward or forward.",
    "We keep three buckets: past, present, and future. On each change, present moves to past and future clears. Undo pops from past, redo pops from future.",
    "History can grow large and use memory quickly. Complex nested state needs careful cloning to avoid mutation bugs.",
    "In a report builder, users edited widgets and text blocks. Undo redo reduced frustration during layout changes. We also added history limits to keep memory stable.",
    "Now I include action metadata so telemetry shows which operations users undo most often."
  ),
  "undo-redo-hook": A(
    "An undo redo hook packages history logic into reusable React state management.",
    "The hook exposes present value, set, undo, redo, and canUndo/canRedo flags. Internally it tracks past and future arrays. Components stay focused on UI while hook handles state transitions.",
    "If the hook API is too generic, teams misuse it for huge objects. History snapshots can become expensive without limits.",
    "In a campaign form builder, we reused one undo hook across text, targeting rules, and scheduling steps. It gave consistent keyboard shortcuts everywhere. QA found fewer state regression bugs.",
    "Now I support optional history size caps and custom equality checks for better scalability."
  ),
  prototype: A(
    "A prototype is the object that JavaScript uses for property lookup inheritance.",
    "If a property is not on the object, JavaScript checks its prototype chain. Functions have a prototype used when creating instances with new. Shared methods on prototypes save memory.",
    "Deep prototype chains make debugging harder. Directly mutating built-in prototypes is risky and can break libraries.",
    "In a legacy module, we moved repeated methods from each instance into class prototypes. Memory use dropped for large grids. Startup time improved slightly on old devices.",
    "Now I prefer clear class or factory patterns and avoid clever prototype tricks."
  ),
  "setinterval-without": A(
    "Using setInterval safely means always cleaning it up and avoiding stale closures.",
    "setInterval schedules repeated callbacks at fixed delay. In React, create it inside useEffect and return clearInterval in cleanup. Use refs or functional updates so callback reads latest state.",
    "Intervals keep running after unmount if not cleared, causing leaks. Heavy callbacks can drift and overlap if work is slow.",
    "In a live dashboard, we polled metrics every 15 seconds. Missing cleanup caused duplicate requests when users switched tabs quickly. We fixed it with effect cleanup and visibility checks.",
    "Now I prefer server push or React Query refetch strategies over raw intervals when possible."
  ),
  "micro-frontends": A(
    "Micro-frontends split a large frontend into smaller independently deployable parts.",
    "Each team owns a slice like checkout or analytics. A shell app composes those slices at runtime or build time. Shared contracts and design system keep user experience consistent.",
    "Over-splitting creates duplicate dependencies and slower load times. Governance and versioning become critical to avoid integration chaos.",
    "In an enterprise admin suite, billing and user-management teams released separately using module federation. Team autonomy improved and release conflicts dropped. We enforced shared UI tokens for consistency.",
    "Now I use micro-frontends only when org scale and release independence clearly justify complexity."
  ),
  "global-api-errors": A(
    "Global API error handling means centralizing common failure behavior in one place.",
    "Requests pass through a shared client layer. On 401 we trigger logout flow, on 5xx we show a fallback toast, and we log details. Components only handle screen-specific edge cases.",
    "Too much global handling can hide business-specific errors from components. Generic messages may hurt user clarity.",
    "In an e-commerce app, scattered error handling created inconsistent messages. We moved common logic into API helpers and interceptors. Support tickets dropped because users saw clearer actions.",
    "Now I pair global handling with typed error objects so screens can still react intelligently."
  ),
  interceptor: A(
    "An interceptor is middleware around HTTP requests and responses.",
    "Request interceptors attach auth headers and tracing ids. Response interceptors normalize success data and catch errors centrally. They run before the call reaches feature code.",
    "Interceptor chains can become hard to reason about if too many rules exist. Hidden side effects make debugging slower.",
    "In a multi-tenant dashboard, we added tenant id and token via request interceptor. Response interceptor handled token refresh and retry once. Feature teams wrote less repeated boilerplate.",
    "Now I keep interceptors minimal and document exact behavior with unit tests."
  ),
  "websocket-ordering": A(
    "WebSocket ordering means ensuring real-time messages are applied in the correct sequence.",
    "Messages can arrive out of order due to reconnects or backend fanout paths. We include sequence numbers or timestamps and ignore older events. Client state reducers apply only monotonic updates.",
    "Strict ordering checks can drop valid late events if clocks or sequence logic are wrong. Reconciliation with server snapshots is still needed.",
    "In a trading-style dashboard, price updates occasionally arrived late after reconnect. We added server sequence ids and replay logic. UI stopped showing backward jumps.",
    "Now I combine stream updates with periodic snapshot sync for correctness."
  ),
  "event-loop": A(
    "The event loop is how JavaScript handles async work on a single thread.",
    "Synchronous code runs first on call stack. Then microtasks like Promise callbacks run before macrotasks like setTimeout. This ordering explains many timing surprises in UI code.",
    "Long synchronous tasks block the loop and freeze the UI. Misunderstanding microtask order causes race bugs.",
    "In a form workflow, validation and API calls seemed out of order. Mapping them to microtask and macrotask queues explained the behavior. We fixed user-facing timing glitches.",
    "Now I teach this model in onboarding so async bugs are diagnosed faster."
  ),
  "event-loop-output": A(
    "Event loop output questions test whether you know callback execution order.",
    "Read code top to bottom and mark sync logs first. Next run Promise then/catch callbacks, then timers and I/O callbacks. This mental model predicts console output reliably.",
    "Complex nested async code can still be tricky without careful tracing. Different environments may vary for some edge APIs.",
    "In interviews and real debugging, I sketch stack and queues on paper. This quickly reveals why a timeout logs after promise handlers. It helped juniors debug flaky tests too.",
    "Now I encourage writing small reproducible snippets before fixing production async issues."
  ),
  hoisting: A(
    "Hoisting is JavaScript moving declarations to the top of scope during compilation.",
    "Function declarations are fully hoisted and callable before definition. var is hoisted but initialized as undefined. let and const are hoisted too but stay in temporal dead zone until declaration line.",
    "Relying on hoisting hurts readability and introduces undefined bugs. Temporal dead zone errors can crash code paths unexpectedly.",
    "In a legacy file, var-based logic caused accidental undefined access. We refactored to const/let and ordered declarations clearly. Production errors dropped in that module.",
    "Now I enforce eslint rules that discourage unsafe hoisting patterns."
  ),
  closures: A(
    "A closure is when a function remembers variables from its outer scope.",
    "Inner functions keep access to outer variables even after outer function returns. This enables private state and callback patterns. React hooks also rely heavily on closure behavior.",
    "Closures can capture stale values in async callbacks. Retained references can increase memory if not managed.",
    "In a search page, delayed handlers used old query values due to stale closure. Switching to refs and functional updates fixed wrong results. Users got accurate suggestions.",
    "Now I review async callbacks specifically for closure freshness in code reviews."
  ),
  "react-fiber": A(
    "React Fiber is React's rendering engine that breaks work into units for better scheduling.",
    "Fiber can pause, resume, and prioritize updates to keep UI responsive. High-priority updates like typing can render before low-priority work. Commit phase still applies final DOM changes safely.",
    "Understanding Fiber internals is useful but over-focusing on it can distract from practical profiling. Some behavior differs between development and production builds.",
    "In a dashboard with heavy charts, we used transitions to mark non-urgent updates. Typing in filters stayed smooth while charts updated after. Users noticed better responsiveness.",
    "Now I focus on user-perceived latency and use Fiber features like transitions where they matter."
  ),
  "code-splitting": A(
    "Code splitting means breaking bundle into smaller chunks loaded when needed.",
    "Bundler creates separate files per route or feature. Browser downloads only required chunks first, then lazy-loads the rest. This reduces initial load time.",
    "Too many tiny chunks can increase network overhead. Poor split points can cause loading spinners at awkward moments.",
    "In an admin panel, we split heavy analytics and settings modules by route. Initial dashboard load improved significantly on 3G simulation. We preloaded likely next routes for smoother navigation.",
    "Now I plan split strategy with real user flows, not just file size."
  ),
  "lazy-loading": A(
    "Lazy loading delays loading components or data until they are needed.",
    "React.lazy loads component code on demand with Suspense fallback. Data can also be fetched when section becomes visible. This keeps first paint faster.",
    "Lazy loading above-the-fold content hurts perceived performance. Excessive lazy boundaries can show too many placeholders.",
    "In e-commerce, reviews and recommendation widgets loaded after main product details. Product page became interactive faster. Conversion improved slightly on mobile.",
    "Now I pair lazy loading with prefetching based on user intent like hover or viewport."
  ),
  "tree-shaking": A(
    "Tree shaking removes unused exports from final JavaScript bundles.",
    "Bundlers analyze ES module imports and drop dead code paths. Named imports help tools detect what is actually used. Production mode and sideEffects settings affect results.",
    "CommonJS and side-effectful files reduce tree-shaking effectiveness. Wrong configuration may remove needed side effects.",
    "In a dashboard app, importing a full utility library increased bundle size. We switched to modular imports and verified output. Main chunk dropped by meaningful KB.",
    "Now I review dependency imports in PRs and track bundle changes in CI."
  ),
  cors: A(
    "CORS is a browser security rule that controls cross-origin HTTP requests.",
    "Browser sends preflight for some requests to check allowed methods and headers. Server responds with Access-Control headers to permit specific origins. Without valid headers, browser blocks response access.",
    "Wildcards with credentials are unsafe and often invalid. Misconfigured CORS can expose private APIs.",
    "In an API integration project, staging frontend could not call auth service due to missing headers. We fixed allowed origins and methods per environment. Integration became stable without disabling security.",
    "Now I treat CORS as server policy and document exact origin matrix early."
  ),
  "ui-jank": A(
    "UI jank is visible stutter or lag during interactions and animations.",
    "It often comes from long JavaScript tasks, forced layouts, or heavy re-renders. Frame budget is about 16ms for 60fps. Exceeding that budget causes dropped frames.",
    "Ignoring jank damages user trust even if features are correct. Premature micro-optimizations can waste effort if root cause is unknown.",
    "In a metrics dashboard, scrolling froze when many cards re-rendered. We virtualized lists and memoized expensive cells. Interaction became smooth on average machines.",
    "Now I start with performance traces and optimize the slowest user path first."
  ),
  "stale-closure": A(
    "A stale closure bug happens when a callback uses old state or props values.",
    "Callbacks capture values from the render they were created in. If dependencies are missing, effect handlers keep outdated data. Using refs or functional setState can avoid this.",
    "Fixing stale closures with wrong dependencies can create infinite loops. Overusing refs can hide data flow issues.",
    "In an OTP timer screen, resend countdown used old seconds and skipped updates. We moved logic to functional updates and complete dependencies. Timer became consistent across re-renders.",
    "Now I lint hook deps strictly and review async callbacks for captured values."
  ),
  "optimistic-ui": A(
    "Optimistic UI updates the screen immediately before server confirmation.",
    "Client assumes success and updates local state first. If request fails, it rolls back and shows an error. This makes apps feel fast for common success paths.",
    "Wrong rollback logic can leave inconsistent state. Not ideal for irreversible actions without careful safeguards.",
    "In an admin table, status toggle updated instantly while API call ran. On failure we reverted and showed inline message. Users felt the interface was much snappier.",
    "Now I add operation ids and conflict handling so retries do not duplicate actions."
  ),
  "csr-vs-ssr": A(
    "CSR renders mostly in browser, while SSR renders HTML on server before sending to client.",
    "CSR gives rich app behavior after JS loads, but first meaningful paint can be slower. SSR improves first paint and SEO by sending ready HTML. Hydration then attaches interactivity in browser.",
    "SSR adds server complexity and hydration edge cases. CSR can hurt SEO and slower devices if bundle is heavy.",
    "For a content-heavy catalog, we used SSR for listing pages and CSR for internal tools. Public pages indexed better and loaded faster. Internal dashboard stayed simple with CSR.",
    "Now I pick per route based on SEO, latency, and infra budget instead of one global choice."
  ),
  "prototypal-inheritance": A(
    "Prototypal inheritance means objects inherit behavior directly from other objects.",
    "JavaScript links objects via prototype chain. Child objects can use parent methods without copying them. Classes are syntax sugar over this model.",
    "Deep inheritance chains become hard to reason about. Composition is often clearer for frontend components.",
    "In a utility library, we replaced repeated method copies with shared prototype methods. Bundle shrank slightly and behavior stayed consistent. Team moved to composition for new modules.",
    "Now I keep inheritance shallow and prefer composition for business logic."
  ),
  "shallow-deep-copy": A(
    "Shallow copy duplicates first level only, deep copy duplicates nested objects too.",
    "Spread operator and Object.assign create shallow copies. Nested objects still share references in shallow copy. Deep copy needs structuredClone or custom recursion for complex cases.",
    "Deep copy can be expensive and may break class instances or functions. Shallow copy can cause hidden mutation bugs on nested state.",
    "In a form builder, shallow copying nested schema caused edits to leak between drafts. We switched to immutable updates and selective deep cloning. Data corruption bugs stopped.",
    "Now I normalize state and update only changed branches to avoid full deep clones."
  ),
  "memory-leaks-react": A(
    "Memory leaks in React happen when resources stay alive after component unmount.",
    "Common causes are uncleared timers, subscriptions, and event listeners. Async calls updating unmounted components also retain references. Effect cleanup prevents most leaks.",
    "Leaks are hard to notice in short sessions but hurt long-running dashboards. Blindly adding cleanup without ownership clarity can hide logic issues.",
    "In an operations dashboard, tab switching increased memory over time. We tracked it to lingering WebSocket listeners in effects. Proper cleanup stabilized memory usage.",
    "Now I add teardown checks in PR reviews for every new effect with side effects."
  ),
  "repaint-reflow": A(
    "Reflow recalculates layout, repaint redraws pixels; reflow is usually more expensive.",
    "Changing geometry like width or font can trigger reflow and repaint. Changing color may only repaint. Frequent layout reads and writes can cause layout thrashing.",
    "Too many forced reflows make animations janky. Premature CSS optimization without profiling can waste time.",
    "In a sortable table, measuring row height inside loops caused repeated reflow. We batched reads and writes and used transforms for animation. Dragging became smoother.",
    "Now I monitor layout shift and avoid sync layout reads in hot interaction paths."
  ),
  "react-batching": A(
    "React batching groups multiple state updates into a single render.",
    "In modern React, updates in many async contexts are batched automatically. This reduces extra renders and improves performance. React applies final state in one commit when possible.",
    "Assuming immediate state change after setState can cause logic bugs. Batching behavior can differ in tests if setup is outdated.",
    "In a checkout flow, multiple validation updates triggered unnecessary renders. After refactor to batched patterns, interaction became smoother. Component logic was also easier to reason about.",
    "Now I use updater functions and avoid relying on immediate synchronous reads after state sets."
  ),
  "debounce-throttle": A(
    "Debounce delays execution until events stop, throttle limits execution rate during events.",
    "Debounce is ideal for search input to avoid request on every key press. Throttle is good for scroll and resize to run at fixed intervals. Both protect UI and APIs from overload.",
    "Too much delay can make UI feel unresponsive. Wrong choice between debounce and throttle can miss important updates.",
    "In a product search page, debounce reduced API calls dramatically. In analytics scroll tracking, throttle gave steady updates without flooding events. Backend load and UI lag both improved.",
    "Now I tune wait values per interaction and test on slow devices."
  ),
  "browser-rendering": A(
    "Browser rendering turns HTML, CSS, and JS into pixels on screen.",
    "Browser parses HTML to DOM and CSS to CSSOM, then builds render tree. Layout calculates element positions, paint draws pixels, and compositing combines layers. JavaScript can trigger these steps again.",
    "Heavy script during rendering blocks first paint. Frequent layout invalidation causes visible lag.",
    "In a dashboard revamp, understanding rendering pipeline helped us defer non-critical scripts. First content appeared faster and interactions felt stable. Metrics improved in Lighthouse and real users.",
    "Now I treat rendering steps as part of design decisions, not just frontend internals."
  ),
  "bundle-size": A(
    "Bundle size is the total JavaScript and assets users download for your app.",
    "Large bundles slow first load and parse time, especially on mobile. We reduce size using code splitting, tree shaking, and lighter dependencies. Compression and caching also help.",
    "Chasing tiny KB wins is not useful if runtime work is still slow. Removing libraries blindly can increase maintenance cost.",
    "In an admin portal, a date library import pattern inflated main chunk. We replaced it with targeted imports and split heavy pages. Initial load improved for remote users.",
    "Now I set bundle budgets and fail CI when regressions exceed threshold."
  ),
  "avoid-rerenders": A(
    "Avoiding unnecessary re-renders means updating only components that need new data.",
    "Use stable props, memoized children, and localized state. Split large components into smaller focused pieces. Avoid creating new object literals in hot render paths.",
    "Over-optimizing render counts can make code harder to maintain. Sometimes re-render cost is trivial and not worth complexity.",
    "In a large filter panel, every keystroke re-rendered full page. We moved state closer to inputs and memoized result list. Typing became smooth and CPU usage dropped.",
    "Now I profile first and optimize only components with measurable render cost."
  ),
  "controlled-uncontrolled": A(
    "Controlled inputs use React state as source of truth, uncontrolled inputs rely on DOM state.",
    "Controlled fields update state on every change and are easier to validate live. Uncontrolled fields use refs and are simpler for basic forms. Both can coexist based on need.",
    "Controlled forms can re-render heavily if not optimized. Uncontrolled forms make complex validation and dynamic UI harder.",
    "In a long onboarding form, key fields were controlled for validation and progress rules. Optional comment boxes were uncontrolled for simplicity. This balanced performance and maintainability.",
    "Now I pick controlled by default and choose uncontrolled only for low-risk simple fields."
  ),
  "local-vs-session": A(
    "localStorage persists until cleared, sessionStorage lasts only for current tab session.",
    "Both store string key-values in browser and are synchronous APIs. localStorage is shared across tabs of same origin. sessionStorage is isolated per tab and cleared when tab closes.",
    "Do not store sensitive tokens in plain storage due to XSS risk. Large data in storage can slow startup and complicate migrations.",
    "In a dashboard, we kept theme preference in localStorage for long-term persistence. Temporary wizard progress stayed in sessionStorage per tab. Users got expected behavior across refreshes and tabs.",
    "Now I keep storage minimal and version keys to support safe data migrations."
  ),
  "auth-vs-authz": A(
    "Authentication verifies who user is, authorization decides what user can do.",
    "Login with password or SSO handles authentication. Role and permission checks handle authorization in API and UI. Both must be enforced on server, not only frontend.",
    "Frontend-only checks are not security controls. Complex permission matrices can become difficult to maintain without clear policy.",
    "In an admin app, viewers could open edit screen due to only UI hiding controls. Server permission checks were added and frontend mirrored them for UX. Access issues were resolved safely.",
    "Now I define permission contracts early with backend and centralize policy mapping."
  ),
  "refresh-tokens": A(
    "Refresh tokens allow getting new access tokens without forcing frequent user login.",
    "Access token is short-lived for API calls. When it expires, client sends refresh token to auth endpoint and receives new access token. Rotation and revocation improve security.",
    "If refresh token is stolen, attacker can maintain access longer. Bad retry logic can cause token refresh loops.",
    "In an e-commerce admin, users worked for hours and sessions expired often. We added silent refresh with retry guard and logout fallback. User interruptions reduced a lot.",
    "Now I prefer rotating refresh tokens with device-aware session management."
  ),
  "secure-tokens": A(
    "Securing tokens means reducing theft risk and limiting impact if compromised.",
    "Use short-lived access tokens and secure transport over HTTPS. Prefer HttpOnly secure cookies for sensitive session tokens when architecture allows. Add CSRF and strict content security measures.",
    "Storing tokens in localStorage is vulnerable to XSS token theft. Overly complex token setup can hurt developer productivity if not documented.",
    "In a B2B portal, we moved from localStorage token storage to secure cookie sessions. Combined with CSP and SameSite policies, security posture improved. Incident review requirements were easier to meet.",
    "Now I design auth with defense in depth, not just one storage decision."
  ),
  "race-conditions": A(
    "Race condition is when outcome depends on timing of async operations.",
    "Two API calls can finish in unexpected order and overwrite state. We track request id or use cancellation to keep latest result. Deterministic reducers also reduce timing bugs.",
    "Ignoring race conditions causes flicker and wrong data shown to users. Overly complex synchronization can slow development.",
    "In a search page, fast typing triggered overlapping requests and stale results appeared. We canceled previous calls and accepted only latest response id. Accuracy improved immediately.",
    "Now I treat concurrent requests as default and design state updates to be order-safe."
  ),
  "cancel-api": A(
    "Canceling API requests stops obsolete network calls to avoid stale updates.",
    "AbortController can cancel fetch when component unmounts or query changes. Client libraries often support cancellation tokens or signal forwarding. Canceled requests should not update UI state.",
    "Not all backends stop processing even if client cancels. Missing cancellation handling can still leave race bugs.",
    "In infinite search filters, changing filters quickly queued many old requests. We added AbortController per request cycle. Network usage dropped and UI stopped jumping.",
    "Now I combine cancellation with request dedupe and cache to reduce wasted work."
  ),
  "hydration-mismatch": A(
    "Hydration mismatch happens when server-rendered HTML differs from client-rendered output.",
    "During hydration, React expects same markup from server and first client render. Non-deterministic values like random numbers or time can cause mismatch warnings. Use consistent initial data and client-only effects for dynamic parts.",
    "Frequent mismatches can break interactivity and hurt trust in SSR setup. Silencing warnings without fixing root cause is risky.",
    "In an SSR storefront, locale formatting differed between server and client runtime. Price text mismatched and caused warnings. We unified locale config and deferred dynamic pieces to client effect.",
    "Now I add hydration checks in staging and avoid non-deterministic render logic."
  ),
  reconciliation: A(
    "Reconciliation is React comparing old and new virtual DOM trees to update DOM efficiently.",
    "React uses element type and keys to decide what to keep, move, or recreate. Stable keys help preserve component state in lists. Only changed parts are committed to real DOM.",
    "Bad keys like array index can cause state bugs on reorder. Assuming reconciliation is free can hide expensive component logic.",
    "In a reorderable admin list, index keys caused wrong row edit state after sort. Using stable ids fixed state carryover. User complaints about random field values stopped.",
    "Now I treat key design as data modeling, not a minor implementation detail."
  ),
  "browser-caching": A(
    "Browser caching stores responses locally to speed up repeat visits.",
    "Cache-Control and ETag headers define freshness and revalidation behavior. Static hashed assets can be cached long term safely. API data usually needs shorter cache or validation rules.",
    "Stale cache can show outdated content if invalidation strategy is weak. Overly short cache misses performance gains.",
    "In a dashboard rollout, we added hashed JS filenames and long cache headers. Repeat load became much faster for returning users. API responses used short max-age with revalidation.",
    "Now I align cache policy with data volatility and release frequency."
  ),
  "debug-perf": A(
    "Performance debugging means finding the real bottleneck before optimizing.",
    "Use browser performance panel for long tasks and layout cost. Use React profiler to inspect slow component renders. Measure before and after to confirm impact.",
    "Guess-based optimization wastes time and can add complexity. Synthetic benchmarks alone may not reflect real user devices.",
    "In a slow admin page, team blamed network first. Profiling showed heavy client-side sorting on every render. Memoized sorting and pagination solved most lag.",
    "Now I require measurable evidence for performance fixes in code reviews."
  ),
  "optimize-slow-react": A(
    "Optimizing slow React starts with reducing unnecessary renders and expensive work.",
    "Split components, memoize heavy calculations, and virtualize long lists. Move expensive derived data outside hot render paths. Defer non-urgent updates when possible.",
    "Applying every optimization blindly makes code hard to maintain. Some slowness comes from backend latency, not React rendering.",
    "In a large report screen, rendering thousands of rows froze interactions. We added virtualization and memoized row cells. Page became usable even on older laptops.",
    "Now I create a performance checklist per feature and validate with profiler snapshots."
  ),
  "sync-vs-async": A(
    "Synchronous code blocks until done, asynchronous code lets other tasks continue.",
    "Sync steps run immediately in order on call stack. Async operations return quickly and finish later through callbacks or promises. JavaScript event loop coordinates completion handling.",
    "Too much sync work blocks UI. Poor async error handling can hide failures and cause inconsistent state.",
    "In a form submit flow, sync validation ran first and async API followed. Clear separation improved readability and error messaging. Users got faster feedback before network calls.",
    "Now I design flows with explicit async boundaries and cancellation paths."
  ),
  "api-retries": A(
    "API retries repeat failed requests for temporary errors.",
    "Client retries on transient failures like network drops or 503 responses. Exponential backoff with jitter prevents request storms. Retry count should be limited with final fallback.",
    "Retrying non-idempotent operations can create duplicate side effects. Too aggressive retries can overload already struggling services.",
    "In a mobile-heavy app, flaky connections caused frequent fetch failures. We added backoff retries for safe GET endpoints only. Success rate improved without extra backend strain.",
    "Now I add retry policy per endpoint based on idempotency and business impact."
  ),
  "jwt-flow": A(
    "JWT flow uses signed tokens to authenticate API requests.",
    "User logs in and receives access token, often plus refresh token. Client sends access token with each API request, server verifies signature and claims. On expiry, refresh flow gets new access token.",
    "Large JWT payload leaks unnecessary data and increases overhead. Revocation is harder than server session unless extra mechanisms exist.",
    "In a partner dashboard, JWT enabled stateless auth across services. We kept payload minimal and used short expiry with refresh rotation. Security audits passed with clear token policy.",
    "Now I prefer minimal claims and centralized token verification middleware."
  ),
  "service-workers": A(
    "Service workers are background scripts that can intercept network requests and enable offline behavior.",
    "They run separately from web page and can cache assets or API responses. On repeat visits, cached resources load faster. They also support background sync and push notifications.",
    "Wrong caching logic can serve stale or broken content. Service worker updates can be tricky without clear version strategy.",
    "In an e-commerce PWA, service worker cached core shell and key images. Returning users saw much faster startup and basic offline browsing. We used network-first for dynamic price data.",
    "Now I keep cache strategy explicit per resource type and test upgrade paths carefully."
  ),
  "state-large-apps": A(
    "State management in large apps needs clear boundaries between local, shared, and server state.",
    "Keep UI-local state close to components. Use global store for cross-feature client state, and query libraries for server state and caching. Consistent patterns reduce bugs and team confusion.",
    "One global store for everything becomes hard to scale. Too many state tools without rules increases mental load.",
    "In a multi-team admin suite, we used Redux Toolkit for app state and Query for server data. Feature teams shipped independently with predictable patterns. Debugging became faster with shared conventions.",
    "Now I define state ownership docs early and review architecture every quarter."
  ),
  accessibility: A(
    "Accessibility means building UI usable by people with different abilities and assistive tools.",
    "Use semantic HTML, keyboard navigation, proper labels, and focus management. Ensure color contrast and meaningful ARIA only when needed. Screen reader testing catches many real issues.",
    "Ignoring accessibility excludes users and creates legal risk. Late fixes are expensive compared to building it from start.",
    "In a forms platform, we added label associations, error announcements, and keyboard-friendly modals. Completion rates improved for all users, not only assistive users. Support complaints dropped.",
    "Now I include accessibility checks in definition of done and CI audits."
  ),
  "ssr-csr-ssg-isr": A(
    "SSR, CSR, SSG, and ISR are rendering strategies with different performance and freshness tradeoffs.",
    "SSR renders per request, CSR renders in browser, SSG builds pages at deploy time, and ISR regenerates static pages periodically. Choose based on content freshness and SEO needs. Many apps mix strategies by route.",
    "Using one strategy everywhere is rarely optimal. Wrong choice can increase infra cost or stale content issues.",
    "In an e-commerce project, product detail used SSR, marketing pages used SSG, and category pages used ISR. Internal admin remained CSR. This balanced SEO, speed, and freshness.",
    "Now I decide rendering mode from business requirements, not framework defaults."
  ),
  "infinite-scroll": A(
    "Infinite scroll loads more data as user approaches end of list.",
    "IntersectionObserver watches a sentinel element near list bottom. When visible, next page request starts and results append. Caching and dedupe prevent duplicates on fast scrolling.",
    "It can hurt discoverability of footer content and deep-linking. Poor implementation causes duplicate requests or scroll jumps.",
    "In a catalog page, infinite scroll improved engagement on mobile. We combined it with URL state and skeleton rows for smooth loading. Performance stayed stable with virtualized rendering.",
    "Now I provide optional pagination fallback for accessibility and better control."
  ),
  "url-to-browser": A(
    "URL to browser flow describes how a web page is fetched and shown after entering an address.",
    "Browser checks cache, resolves DNS, opens TCP/TLS connection, and sends HTTP request. Server responds with HTML, browser parses resources, executes JS, and renders page. Additional API calls then populate dynamic data.",
    "Network and render steps can each become bottlenecks. Oversized assets and blocking scripts slow user-perceived load.",
    "In interviews and architecture reviews, this flow helped explain where our app was slow. We identified DNS and render-blocking script delays. Targeted fixes improved first load metrics.",
    "Now I use this end-to-end model to debug performance beyond just React code."
  ),
  "frontend-security": A(
    "Frontend security means reducing client-side attack surface and protecting user data flows.",
    "Key areas are XSS prevention, CSRF protection, secure token handling, and dependency hygiene. Validate and encode user-generated content before rendering. Use CSP and secure headers with backend support.",
    "Frontend cannot enforce security alone, so server controls are still required. Security shortcuts for speed often create long-term risk.",
    "In an admin panel, we blocked unsafe HTML rendering and tightened CSP rules. We also audited third-party scripts and removed unused ones. Security review findings dropped significantly.",
    "Now I treat security as continuous practice with threat modeling in feature planning."
  ),
  "monitor-production": A(
    "Production monitoring tracks frontend health, performance, and errors in real usage.",
    "Capture JS errors, API failure rates, and core web vitals. Add dashboards and alerts for spikes and regressions. Correlate releases with incidents to speed diagnosis.",
    "Too many noisy alerts lead to alert fatigue. Monitoring without ownership does not improve reliability.",
    "In a customer dashboard, we added error tracking and performance dashboards by route. After a release, alerting caught a memory leak within minutes. Rollback and fix were fast.",
    "Now I define SLO-style frontend metrics and on-call playbooks for faster response."
  ),
  "ecommerce-listing": A(
    "E-commerce listing is a product grid page focused on search, filters, and conversion.",
    "It needs fast initial load, responsive filtering, sorting, and pagination or infinite scroll. URL should reflect filter state for sharing and SEO. Image optimization and lazy loading are critical.",
    "Too many client-side filters on huge data can freeze UI. Ignoring URL state hurts shareability and analytics clarity.",
    "In a retail project, we built server-side filtering with cached query results and URL-synced filters. Product cards used lazy images and skeletons. Bounce rate dropped on mobile listings.",
    "Now I prioritize perceived speed and stable filter behavior over flashy interactions."
  ),
  "difficult-bug": A(
    "A difficult bug is one that appears intermittently and crosses multiple layers.",
    "Best approach is reproduction first, then timeline logging, then narrowing hypotheses. Add temporary instrumentation around state transitions and network events. Fix root cause and add regression test.",
    "Quick patch without understanding cause often reopens later. Over-logging in production can create noise and privacy risk.",
    "In a dashboard, users saw occasional wrong row updates after fast filter changes. We reproduced with throttled network and found race condition between requests. Abort logic and request ids solved it permanently.",
    "Now I invest early in reproducible test cases before touching production logic."
  ),
  "scalable-frontend": A(
    "Scalable frontend is an architecture that supports feature growth, team growth, and reliable releases.",
    "Use clear module boundaries, shared design system, and consistent state/data patterns. Enforce lint, tests, and CI quality gates. Observability and performance budgets keep scale healthy.",
    "Over-engineering too early adds drag. Under-structured codebases become expensive as teams grow.",
    "In a growing admin suite, we moved to feature-based folders and shared UI primitives. Build reviews became faster and onboarding improved. Release confidence increased with stronger CI checks.",
    "Now I design for maintainability first and optimize complexity only when needed."
  ),
  "react-rendering-process": A(
    "React rendering process is how state changes produce updated UI.",
    "State or props change triggers render phase to compute next virtual UI. React then reconciles differences and commits changes to real DOM. Effects run after commit based on dependencies.",
    "Heavy computation in render slows every update. Misplaced side effects during render cause unpredictable behavior.",
    "In a forms app, expensive derived calculations in render caused typing lag. We memoized heavy parts and moved side effects to useEffect. Input responsiveness improved a lot.",
    "Now I separate pure rendering from side effects very strictly in team reviews."
  ),
  "useRef-vs-useState": A(
    "useState triggers re-render on update, useRef stores mutable value without re-render.",
    "Use state for data that must appear in UI. Use ref for instance values like timers, DOM nodes, or previous values. Ref updates persist across renders but do not repaint UI directly.",
    "Using ref for UI data can desync screen from actual value. Overusing state for non-visual values causes extra renders.",
    "In an OTP page, interval id and latest callback lived in refs while countdown lived in state. This avoided stale callbacks and unnecessary renders. Logic became cleaner.",
    "Now I ask one question: does this value need to render UI? That decides state vs ref."
  ),
  "custom-hooks": A(
    "Custom hooks are reusable functions that encapsulate React stateful logic.",
    "They can combine built-in hooks and expose a clean API. Components consume hook outputs without repeating internal logic. This improves reuse and testability.",
    "Badly designed hooks can become mini frameworks with unclear contracts. Hidden side effects inside hooks make debugging hard.",
    "In an admin panel, we built useFetchWithRetry and useTableFilters hooks. Feature teams reused them across pages with consistent behavior. Duplicate logic reduced significantly.",
    "Now I document hook contracts and keep each hook focused on one concern."
  ),
  "useEffect-deps": A(
    "useEffect dependencies decide when an effect runs again.",
    "React compares dependency values between renders. If any dependency changes, effect reruns after commit. Empty array runs once on mount, no array runs every render.",
    "Missing dependencies causes stale data bugs. Extra unstable dependencies can trigger loops and repeated network calls.",
    "In a reporting page, missing dependency caused stale date range in API requests. Adding correct deps plus memoized callbacks fixed it. Data matched selected filters consistently.",
    "Now I rely on exhaustive-deps lint and refactor code instead of suppressing warnings."
  ),
  "prop-drilling": A(
    "Prop drilling is passing data through many component levels just to reach deep child.",
    "It is fine for shallow trees, but becomes noisy in deep hierarchies. Context or state libraries can provide shared data directly to consumers. Component composition can also reduce passing depth.",
    "Jumping to global state too early adds complexity. Context overuse can trigger broad re-renders if not split.",
    "In a settings area, theme and permissions were drilled through five layers. We moved them into scoped contexts and simplified intermediate components. Maintenance became easier.",
    "Now I start simple and introduce shared state only when drilling pain is real."
  ),
  "event-delegation": A(
    "Event delegation attaches one event listener to a parent instead of many children.",
    "Events bubble from child to parent, so parent handler can inspect target and act. This reduces number of listeners for dynamic lists. It works well for repeated interactive items.",
    "Not all events bubble the same way. Complex target matching can make handlers harder to read.",
    "In a large table with action buttons, individual click listeners hurt performance during rerenders. Parent-level delegation handled actions by data attributes. Event management became lighter.",
    "Now I use delegation for dynamic collections and keep selector logic explicit."
  ),
  "promises-vs-async": A(
    "Promises are objects for future results, async/await is cleaner syntax built on promises.",
    "Promise chains use then/catch callbacks. async functions let us write asynchronous flow in near-synchronous style with await. Error handling is usually clearer with try/catch around await.",
    "Mixing styles inconsistently can confuse teams. Sequential awaits can accidentally slow independent operations.",
    "In API orchestration code, nested then chains were hard to maintain. We migrated to async/await and used Promise.all for parallel calls. Readability and response time both improved.",
    "Now I default to async/await and intentionally parallelize independent work."
  ),
  "debounce-throttle-diff": A(
    "Debounce waits for silence, throttle guarantees periodic execution while events continue.",
    "Debounce resets timer on each event and fires once after pause. Throttle runs at most once per interval during continuous events. Choose based on whether final value or steady updates matter.",
    "Wrong timing values can feel laggy or noisy. Leading and trailing options need careful UX decisions.",
    "In a dashboard, search input used debounce and scroll analytics used throttle. This reduced API noise while keeping interaction tracking useful. Performance stayed stable under heavy activity.",
    "Now I write utility wrappers with clear defaults and per-use overrides."
  ),
  "context-vs-redux": A(
    "Context shares values in component tree, Redux is a structured global state container.",
    "Context is lightweight for theme, auth, or small shared state. Redux provides predictable updates, devtools, and middleware for complex app-wide flows. Redux Toolkit reduces boilerplate significantly.",
    "Using Context for high-frequency global updates can cause rerender issues. Using Redux for tiny apps may add unnecessary setup.",
    "In a medium dashboard, Context handled theme and user session while Redux handled complex workflow state. This split kept architecture simple and scalable. Debugging improved with Redux devtools.",
    "Now I choose based on state complexity, update frequency, and team familiarity."
  ),
  "virtual-dom": A(
    "Virtual DOM is an in-memory representation of UI used to compute minimal real DOM changes.",
    "React creates virtual elements for each render. It compares new and old trees and updates only changed real DOM nodes. This abstraction simplifies declarative UI development.",
    "Virtual DOM is not free; expensive component logic can still be bottleneck. Direct DOM work can be faster for tiny isolated cases.",
    "In a complex admin table, declarative updates with React were easier to maintain than manual DOM manipulation. With memoization and keys, performance stayed acceptable. Team productivity improved.",
    "Now I focus on render cost and data flow, not virtual DOM myths."
  ),
  "error-boundaries": A(
    "Error boundaries catch JavaScript errors in React component tree and show fallback UI.",
    "They catch errors during render, lifecycle, and constructors of child components. On error, boundary can render fallback and log details. They do not catch event handler or async errors directly.",
    "Without granular placement, one error may blank large app sections. Relying only on boundaries ignores root cause fixes.",
    "In a dashboard, one widget crash used to break whole page. We wrapped widgets with local boundaries and fallback cards. Users could continue working while issue was logged.",
    "Now I place boundaries around risky zones and connect them to monitoring."
  ),
  "redux-toolkit": A(
    "Redux Toolkit is the recommended modern way to write Redux logic with less boilerplate.",
    "It provides configureStore, createSlice, and built-in Immer for immutable updates. Async flows are handled cleanly with createAsyncThunk or RTK Query. Defaults include good middleware and devtools support.",
    "Global Redux for every tiny state can overcomplicate code. Misusing large slices can still create coupling.",
    "In an enterprise admin app, migrating legacy Redux to Toolkit cut reducer boilerplate heavily. New features shipped faster with predictable patterns. Onboarding got easier for new devs.",
    "Now I keep slices feature-focused and favor RTK Query for server state."
  ),
  "tanstack-query": A(
    "TanStack Query manages server state, caching, and async status in frontend apps.",
    "Queries fetch and cache data by keys, with stale and refetch controls. Mutations update server and can invalidate related queries. It handles loading, error, retries, and background refresh.",
    "Poor query key design causes stale or duplicated cache entries. Not ideal for pure client-only state.",
    "In a dashboard with many API widgets, moving to Query removed lots of manual loading and cache code. Data stayed fresh with focused invalidations. Team spent less time on request plumbing.",
    "Now I standardize query key factories and mutation invalidation rules."
  ),
  "parent-to-child": A(
    "Parent to child communication in React usually happens through props.",
    "Parent owns data and passes values or callbacks down. Child reads props and renders UI from them. This keeps data flow predictable and one-directional.",
    "Deep prop passing can become noisy in large trees. Frequent object recreation may trigger extra child renders.",
    "In a pricing page, parent filter state was passed to product list and summary components. Prop contracts kept components easy to test. Bugs were easier to isolate.",
    "Now I keep prop shapes small and stable, and elevate state only when needed."
  ),
  "child-to-parent": A(
    "Child to parent communication happens by calling callback functions passed from parent.",
    "Parent passes a handler prop to child. Child invokes it with payload when user acts. Parent updates state and rerenders affected UI.",
    "Too many callback props can make interfaces hard to follow. Unstable callback references may trigger unnecessary renders.",
    "In a reusable filter chip component, child sent selected values to parent via onChange callback. Parent coordinated API query updates cleanly. This pattern kept components reusable.",
    "Now I use clear event-style names like onSelect and keep payload formats consistent."
  ),
  "access-dom": A(
    "Accessing DOM in React should be done with refs, not direct query selectors when possible.",
    "useRef gives direct reference to element after render. We use it for focus, text selection, or measuring size. Imperative DOM work should stay minimal and isolated.",
    "Too much direct DOM manipulation can conflict with React rendering model. Measuring layout in wrong phase can cause jank.",
    "In a modal flow, we used refs to return focus to trigger button after close. Keyboard users had smoother navigation. Accessibility scores improved.",
    "Now I prefer declarative UI first and use refs only for necessary imperative tasks."
  ),
  "use-fetch": A(
    "A useFetch hook centralizes request, loading, error, and data handling.",
    "Hook starts request in effect and updates state through lifecycle. It can expose refetch and cancellation support. Components consume simple API instead of rewriting request logic.",
    "Generic fetch hooks can become too broad and hard to maintain. Without caching strategy, repeated calls waste network.",
    "In an admin panel, multiple pages copied fetch boilerplate with inconsistent errors. A shared useFetch hook standardized behavior and retries. QA saw fewer edge-case failures.",
    "Now I prefer query libraries for complex apps and keep custom fetch hooks lean."
  ),
  pagination: A(
    "Pagination splits large datasets into smaller pages for performance and usability.",
    "Client requests data with page and limit parameters. UI shows controls to navigate pages and often total count. This reduces payload size and render cost per view.",
    "Too many page jumps can frustrate users for exploratory browsing. Offset pagination can degrade for huge datasets.",
    "In an audit log screen, pagination kept response size stable and render fast. We added page size options and persisted user preference. Analysts navigated data more efficiently.",
    "Now I prefer cursor pagination for very large or frequently changing datasets."
  ),
  "valid-parentheses": A(
    "Valid parentheses checks whether opening and closing brackets are balanced and correctly ordered.",
    "Use a stack to push opening symbols. On closing symbol, pop and verify matching pair. String is valid if stack is empty at end and no mismatch occurred.",
    "A naive counter approach fails for mixed bracket types and order. Large inputs still need linear scan but that is usually fine.",
    "In interview prep sessions, this problem taught stack fundamentals clearly. I used it to explain validation logic in parser-like tasks. It improved confidence for coding rounds.",
    "Now I also discuss edge cases and time-space complexity in a concise way."
  ),
  "implement-debounce": A(
    "Implement debounce by delaying function execution until calls stop for a wait time.",
    "Each call clears previous timer and sets a new timeout. After inactivity, original function runs with latest arguments. Optional immediate mode can run on leading edge.",
    "Wrong this binding can break method calls. Forgetting cleanup in React components can trigger updates after unmount.",
    "In a search suggestion input, custom debounce cut API calls during fast typing. Backend traffic reduced and UX stayed responsive. We wrapped it as shared utility.",
    "Now I include cancel and flush helpers for better control in complex flows."
  ),
  "deep-clone": A(
    "Deep clone creates a full copy of nested objects without shared references.",
    "structuredClone works for many plain data structures. For custom needs, recursion can clone arrays and objects carefully. Special types like functions or class instances need explicit handling.",
    "Deep cloning large objects is expensive and can hurt performance. Blind cloning may lose non-serializable values.",
    "In a configuration editor, shallow copies caused hidden mutation across tabs. We used targeted deep clone for editable snapshots only. Data isolation bugs disappeared.",
    "Now I favor normalized immutable updates over frequent full deep clones."
  ),
  "promise-all": A(
    "Promise.all runs multiple promises in parallel and resolves when all succeed.",
    "It returns results in original order, not completion order. If any promise rejects, whole Promise.all rejects immediately. This is useful for independent requests needed together.",
    "One failure can cancel overall flow even if other results are useful. Running too many heavy calls in parallel can overload backend.",
    "In a dashboard load, profile, permissions, and preferences were fetched together using Promise.all. Initial render became faster than sequential fetches. We added fallback handling for partial failures where needed.",
    "Now I combine Promise.all with sensible batching and error boundaries."
  ),
  "reverse-string": A(
    "Reverse string means returning characters in opposite order.",
    "Simple way is split, reverse, and join for basic ASCII input. Two-pointer approach works in place for arrays of chars. Unicode handling may need careful grapheme logic.",
    "Naive methods can break emoji and combined characters. Over-optimizing this simple problem is unnecessary in most apps.",
    "In interviews, I used this to discuss edge cases and language string behavior. It helped show problem-solving style beyond syntax. Good warm-up for harder questions.",
    "Now I mention Unicode caveats early to show practical engineering awareness."
  ),
  "two-sum": A(
    "Two sum finds two numbers in array that add up to a target value.",
    "Use a hash map to store seen numbers and their indices. For each value, check if target minus value already exists. This gives linear time complexity.",
    "Map solution uses extra memory. Duplicate value handling needs careful index logic.",
    "In coding rounds, this problem is a quick way to show time-space tradeoff awareness. I explain brute force first then optimize with map. Interviewers usually value that progression.",
    "Now I also call out input assumptions like sortedness and duplicate guarantees."
  ),
  flexbox: A(
    "Flexbox is a CSS layout system for arranging items in one dimension, row or column.",
    "Parent becomes flex container and children become flex items. Properties like justify-content and align-items control spacing and alignment. flex-grow and flex-shrink manage item sizing behavior.",
    "Complex two-dimensional layouts are often easier with CSS Grid. Overusing nested flex containers can make styles hard to debug.",
    "In admin dashboards, flexbox handled toolbars, card headers, and responsive form rows cleanly. It reduced custom float hacks and alignment bugs. UI stayed consistent across screen sizes.",
    "Now I choose flex for linear layouts and grid for page-level structure."
  ),
  "css-position": A(
    "CSS position controls how an element is placed in document flow or viewport.",
    "static is default flow, relative offsets from normal place, absolute positions against nearest positioned ancestor. fixed sticks to viewport, sticky toggles between relative and fixed based on scroll. z-index controls stacking with positioned elements.",
    "Wrong positioned ancestor can place elements unexpectedly. Excessive z-index layering creates maintenance pain.",
    "In an e-commerce page, sticky filters improved browsing while fixed cart summary stayed visible. We carefully set containing blocks to avoid overlap bugs. Mobile behavior remained predictable.",
    "Now I design positioning with clear stacking context rules to avoid future CSS conflicts."
  ),
  "arrow-functions": A(
    "Arrow functions are a shorter way to write functions in JavaScript using the => syntax.",
    "They do not have their own this — they inherit this from the surrounding scope. They also have no arguments object and cannot be used as constructors with new. They are ideal for callbacks, array methods, and React event handlers in functional components.",
    "Do not use arrow functions as object methods when you need dynamic this. Do not use them where you need the arguments object or generator behavior.",
    "In a React admin form, we replaced class methods with arrow handlers to avoid bind boilerplate. Callbacks inside map and filter became cleaner. We kept regular functions only where this binding was required in legacy code.",
    "Now I default to arrow functions for React handlers and use regular functions only when this or constructor behavior is needed."
  ),
  "this-keyword": A(
    "this refers to the execution context object — who is calling the function.",
    "In a normal function, this depends on how the function is called — object method, call/apply/bind, or alone (undefined in strict mode). Arrow functions ignore their own this and use the outer scope's this. In React class components, this pointed to the instance; in hooks we rarely need this.",
    "Confusing this causes bugs in callbacks and event handlers. Blindly using bind everywhere adds noise. Arrow functions in wrong places hide this bugs until runtime.",
    "In a legacy class-based React module, submit handlers lost this and state was undefined. We fixed it with arrow class fields or bind in constructor. After migrating to functional components, the problem disappeared entirely.",
    "Now I use functional components and avoid this in new code; when reviewing legacy code I check binding on every callback."
  ),
  "event-bubbling": A(
    "Event bubbling means an event travels from the target element up to its parents.",
    "Click on a button inside a div — the button fires first, then the div, then ancestors up to document. Most events bubble by default. Parent listeners can handle events from children without attaching to every child.",
    "Bubbling can trigger parent handlers when you only wanted the child. Use stopPropagation carefully — it can break delegated patterns or modal close logic.",
    "In a nested card list, one listener on the list container handled delete clicks via event.target.closest. We avoided attaching handlers to hundreds of cards. Performance and memory improved on a large dashboard.",
    "Now I use delegation with bubbling for dynamic lists and stop propagation only with a clear reason documented in code."
  ),
  "event-capturing": A(
    "Event capturing is the opposite phase — the event travels from document down to the target.",
    "Capture phase runs before target and bubble phases. Add listener with third argument true or { capture: true }. Useful when you need to intercept events before children handle them.",
    "Most code uses bubble phase only — capture listeners confuse teams if overused. blur and focus do not bubble — need capture or focusin/focusout.",
    "In a modal overlay, we used capture on document to detect outside clicks before inner buttons consumed the event. Dropdown menus used capture to close when clicking elsewhere. Fewer z-index and pointer-event hacks were needed.",
    "Now I reach for capture only for global outside-click or focus traps, not as default pattern."
  ),
  "map-filter-reduce-foreach": A(
    "map, filter, reduce, and forEach are array methods for transforming and iterating data.",
    "map returns a new array with each item transformed. filter returns items that pass a test. reduce accumulates to one value. forEach loops with side effects and returns undefined.",
    "Chaining many maps and filters creates extra arrays — for huge data consider one reduce or a for loop. forEach cannot be broken with break — use for...of instead.",
    "In an orders table, we replaced manual loops with filter for status, map for display rows, and reduce for totals. Code was shorter and easier to test. Junior devs understood the pipeline without nested for loops.",
    "Now I pick the method by intent: transform → map, subset → filter, aggregate → reduce, side effect only → forEach."
  ),
  "call-apply-bind-polyfill": A(
    "call, apply, and bind control which object is this when a function runs.",
    "call invokes immediately with comma-separated args. apply invokes with an args array. bind returns a new function with fixed this (and optional partial args). Polyfills implement this by setting fn context on a temporary object or using Symbol.",
    "Overusing bind in React class era hurt readability. Polyfills are interview exercises — production uses native methods. Wrong this still happens if you forget arrow vs normal rules.",
    "In code review we had repeated .bind(this) in every handler. Polyfill exercise helped juniors understand what bind actually does under the hood. Migrating to hooks removed the need entirely.",
    "Now I teach call/apply/bind for interviews and legacy code, but new React code uses arrows and hooks instead."
  ),
  "multi-select-dropdown": A(
    "A multi-select dropdown lets users pick several options and see them as tags or chips.",
    "Keep selected ids in state array. Toggle id on option click. Show chips with remove button. Close panel on outside click. Filter options already selected if needed.",
    "Accessibility needs keyboard support and aria labels. Very long option lists need search inside dropdown. Do not store only labels — use stable ids.",
    "In a filters panel for an analytics dashboard, users picked multiple regions and products. Tags showed selections clearly and API query used joined ids. Support tickets about wrong filter exports dropped.",
    "Now I extract a reusable MultiSelect component with search, a11y, and max selection limits."
  ),
  stopwatch: A(
    "A stopwatch tracks elapsed time with start, stop, and reset controls.",
    "Use setInterval to tick every second when running. Store start time or elapsed seconds in state. Clear interval on stop and unmount. Reset sets count to zero and clears timer.",
    "setInterval drifts — for precision use Date.now() difference. Always cleanup in useEffect return to avoid memory leaks.",
    "In a QA tool embedded in our admin app, a simple stopwatch timed manual test steps. Cleanup on unmount prevented duplicate intervals when navigating away. Interviewers often ask this to test useEffect and state together.",
    "Now I use refs for interval id and functional updates to avoid stale closure on elapsed time."
  ),
};
