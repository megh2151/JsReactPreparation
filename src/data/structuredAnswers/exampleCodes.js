export const EXAMPLE_CODES = {
  "type-vs-interface": `interface ApiUser {
  id: string;
  role: "admin" | "viewer";
}

type UserCardProps = {
  user: ApiUser;
  onOpen: (id: string) => void;
};

export function UserCard({ user, onOpen }: UserCardProps) {
  return <button onClick={() => onOpen(user.id)}>{user.role}</button>;
}`,
  "logout-tabs": `const LOGOUT_KEY = "app:logout";

export function logoutEverywhere() {
  localStorage.setItem(LOGOUT_KEY, String(Date.now()));
  authStore.clear();
  window.location.assign("/login");
}

window.addEventListener("storage", (event) => {
  if (event.key !== LOGOUT_KEY) return;
  authStore.clear();
  window.location.assign("/login");
});`,
  "react-hooks": `import { useEffect, useState } from "react";

export function ProfileBadge({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/users/" + userId).then((r) => r.json()).then((d) => alive && setUser(d));
    return () => { alive = false; };
  }, [userId]);

  return <span>{user ? user.name : "Loading..."}</span>;
}`,
  "react-memo-guarantee": `import { memo, useState } from "react";

const PriceCell = memo(function PriceCell({ value }) {
  console.count("PriceCell render");
  return <strong>{value}</strong>;
});

export default function GridRow() {
  const [tick, setTick] = useState(0);
  return (
    <div>
      <button onClick={() => setTick((n) => n + 1)}>Refresh parent {tick}</button>
      <PriceCell value={499} />
    </div>
  );
}`,
  "usememo-usecallback": `import { useCallback, useMemo, useState } from "react";

export default function Orders({ rows }) {
  const [min, setMin] = useState(100);
  const filtered = useMemo(() => rows.filter((r) => r.total >= min), [rows, min]);
  const exportCsv = useCallback(() => {
    const csv = filtered.map((r) => r.id + "," + r.total).join("\\n");
    download("orders.csv", csv);
  }, [filtered]);

  return <button onClick={exportCsv}>Export {filtered.length}</button>;
}`,
  "usememo-worse": `import { useMemo, useState } from "react";

export default function Welcome({ first, last }) {
  const [count, setCount] = useState(0);

  // This calc is cheap; useMemo adds complexity for little gain.
  const label = useMemo(() => first + " " + last, [first, last]);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {label} clicked {count} times
    </button>
  );
}`,
  "undo-redo-component": `import { useState } from "react";

export default function NoteEditor() {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState("");
  const [future, setFuture] = useState([]);

  const onChange = (next) => { setPast((p) => [...p, present]); setPresent(next); setFuture([]); };
  const undo = () => setPast((p) => p.length ? (setFuture((f) => [present, ...f]), setPresent(p[p.length - 1]), p.slice(0, -1)) : p);
  const redo = () => setFuture((f) => f.length ? (setPast((p) => [...p, present]), setPresent(f[0]), f.slice(1)) : f);

  return <textarea value={present} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.ctrlKey && e.key === "z" ? undo() : e.ctrlKey && e.key === "y" ? redo() : null} />;
}`,
  "undo-redo-hook": `import { useState } from "react";

export function useUndoRedo(initial) {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initial);
  const [future, setFuture] = useState([]);

  const set = (next) => { setPast((p) => [...p, present]); setPresent(next); setFuture([]); };
  const undo = () => setPast((p) => p.length ? (setFuture((f) => [present, ...f]), setPresent(p[p.length - 1]), p.slice(0, -1)) : p);
  const redo = () => setFuture((f) => f.length ? (setPast((p) => [...p, present]), setPresent(f[0]), f.slice(1)) : f);

  return { value: present, set, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 };
}`,
  "prototype": `function CartItem(name, price) {
  this.name = name;
  this.price = price;
}

CartItem.prototype.withTax = function withTax(rate) {
  return Math.round(this.price * (1 + rate));
};

const item = new CartItem("Keyboard", 2000);
console.log(item.withTax(0.18));
console.log(Object.getPrototypeOf(item) === CartItem.prototype);`,
  "setinterval-without": `import { useEffect, useRef, useState } from "react";

export function SessionCountdown() {
  const [seconds, setSeconds] = useState(300);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => { if (seconds <= 0) clearInterval(timerRef.current); }, [seconds]);
  return <p>Session expires in {seconds}s</p>;
}`,
  "micro-frontends": `// host/src/bootstrap.js
import { loadRemote } from "./moduleFederation";

async function mountCheckout() {
  const remote = await loadRemote("checkoutApp", "/checkoutRemote.js");
  const mount = remote.mountCheckout;
  mount(document.getElementById("checkout-root"), {
    tenantId: window.APP_TENANT_ID,
    onOrderPlaced: () => window.location.assign("/orders"),
  });
}

mountCheckout();`,
  "global-api-errors": `export async function api(path, options = {}) {
  const res = await fetch(path, options);

  if (res.status === 401) {
    authStore.clear();
    window.location.assign("/login");
    throw new Error("Unauthorized");
  }

  if (!res.ok) throw new Error("Request failed: " + res.status);
  return res.json();
}`,
  interceptor: `import axios from "axios";

export const client = axios.create({ baseURL: "/api" });

client.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + authStore.getAccessToken();
  config.headers["x-trace-id"] = crypto.randomUUID();
  return config;
});

client.interceptors.response.use((response) => response.data);
client.interceptors.response.use(undefined, (error) => Promise.reject(normalizeError(error)));`,
  "websocket-ordering": `const latestByRoom = new Map();

socket.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  const previous = latestByRoom.get(msg.roomId) ?? 0;

  if (msg.sequence <= previous) return; // ignore stale event

  latestByRoom.set(msg.roomId, msg.sequence);
  chatStore.applyMessage(msg.roomId, msg.payload);
});

socket.addEventListener("close", () => chatStore.requestSnapshotSync());`,
  "event-loop": `console.log("sync-1");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve()
  .then(() => console.log("promise-1"))
  .then(() => console.log("promise-2"));

console.log("sync-2");
// Output: sync-1, sync-2, promise-1, promise-2, timeout`,
  "event-loop-output": `function printOrder() {
  console.log("A");
  setTimeout(() => console.log("B"), 0);
  queueMicrotask(() => console.log("C"));
  Promise.resolve().then(() => console.log("D"));
  console.log("E");
}

printOrder();
// A, E, C, D, B
// Microtasks run before timers.`,
  hoisting: `console.log(total); // undefined (var hoisted)
var total = 10;

// console.log(name); // ReferenceError in TDZ
const name = "invoice";

sayHi(); // function declarations are hoisted
function sayHi() {
  console.log("hello");
}

console.log(total, name);`,
  closures: `function createRateLimiter(limit) {
  let count = 0;
  return function canSend() {
    if (count >= limit) return false;
    count += 1;
    return true;
  };
}

const canSendOtp = createRateLimiter(3);
console.log(canSendOtp(), canSendOtp(), canSendOtp(), canSendOtp());`,
  "react-fiber": `import { startTransition, useState } from "react";

export default function SearchPage({ products }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(products);

  function onChange(e) {
    const next = e.target.value;
    setQuery(next); // urgent update
    startTransition(() => {
      setFiltered(products.filter((p) => p.name.includes(next)));
    });
  }

  return <input value={query} onChange={onChange} placeholder={"Found " + filtered.length} />;
}`,
  "code-splitting": `import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Suspense>
  );
}`,
  "lazy-loading": `import { useEffect, useRef, useState } from "react";

export function LazyImage({ src, alt }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <img ref={ref} src={visible ? src : "/placeholder.png"} alt={alt} />;
}`,
  "tree-shaking": `// good: named import
import { formatDate } from "./utils/date";

// avoid: imports entire utility package
// import * as dateUtils from "./utils/date";

export function InvoiceRow({ invoice }) {
  return (
    <tr>
      <td>{invoice.id}</td>
      <td>{formatDate(invoice.createdAt)}</td>
    </tr>
  );
}`,
  cors: `// server (Express)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://dashboard.acme.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// browser request from another origin
fetch("https://api.acme.com/orders", { headers: { Authorization: "Bearer token" } });`,
  "ui-jank": `function heavyWork(items) {
  const start = performance.now();
  while (performance.now() - start < 40) { /* blocks frame */ }
  return items.map((i) => ({ ...i, score: i.price * 2 }));
}

export function renderSmoothly(items) {
  requestAnimationFrame(() => {
    const visible = items.slice(0, 50); // do less work per frame
    const result = heavyWork(visible);
    uiStore.setRows(result);
  });
}`,
  "stale-closure": `import { useEffect, useState } from "react";

export function SearchBox() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      fetch("/api/search?q=" + encodeURIComponent(query));
    }, 300);
    return () => clearTimeout(id);
  }, [query]); // include query to avoid stale closure

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`,
  "optimistic-ui": `import { useState } from "react";

export function TodoItem({ todo }) {
  const [done, setDone] = useState(todo.done);

  async function toggle() {
    const previous = done;
    setDone(!previous); // optimistic
    try {
      await fetch("/api/todos/" + todo.id, { method: "PATCH", body: JSON.stringify({ done: !previous }) });
    } catch {
      setDone(previous); // rollback
    }
  }

  return <input type="checkbox" checked={done} onChange={toggle} />;
}`,
  "csr-vs-ssr": `// server render route
app.get("/products/:id", async (req, res) => {
  const product = await api.getProduct(req.params.id);
  const html = renderToString(<ProductPage initialProduct={product} />);
  res.send(template({ html, data: { product } }));
});

// client hydrate
const data = window.__BOOTSTRAP_DATA__;
hydrateRoot(document.getElementById("root"), <ProductPage initialProduct={data.product} />);

// internal admin route can still be CSR only
createRoot(document.getElementById("admin-root")).render(<AdminApp />);`,
  "prototypal-inheritance": `const baseReport = {
  createdBy: "system",
  toSummary() {
    return this.title + " (" + this.status + ")";
  },
};

const weeklyReport = Object.create(baseReport);
weeklyReport.title = "Revenue";
weeklyReport.status = "ready";

console.log(weeklyReport.toSummary());
console.log(baseReport.isPrototypeOf(weeklyReport));`,
  "shallow-deep-copy": `const original = {
  user: { name: "Ava", settings: { theme: "dark" } },
  tags: ["vip"],
};

const shallow = { ...original };
shallow.user.settings.theme = "light"; // mutates original nested object

const deep = structuredClone(original);
deep.user.settings.theme = "contrast"; // isolated change

console.log(original.user.settings.theme); // light
console.log(deep.user.settings.theme);`,
  "memory-leaks-react": `import { useEffect, useState } from "react";

export function LiveOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://example.com/orders");
    ws.addEventListener("message", (e) => setOrders(JSON.parse(e.data)));
    return () => ws.close(); // cleanup prevents leak
  }, []);

  return <pre>{JSON.stringify(orders.slice(0, 3), null, 2)}</pre>;
}`,
  "repaint-reflow": `const card = document.querySelector(".product-card");

// expensive: layout read after write can force reflow
card.style.width = "320px";
const h = card.offsetHeight;
console.log("height", h);

// better for animation: transform avoids layout
card.style.transform = "translateY(8px)";
card.style.opacity = "0.95";

requestAnimationFrame(() => {
  card.style.transform = "translateY(0)";
});`,
  "react-batching": `import { useState } from "react";

export function CartBadge() {
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);

  function addToCart() {
    setCount((c) => c + 1);
    setFlash(true); // batched with count update
  }

  return <button onClick={addToCart}>{count} items {flash ? "!" : ""}</button>;
}`,
  "debounce-throttle": `function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

const onSearch = debounce((q) => api.search(q), 300);
input.addEventListener("input", (e) => onSearch(e.target.value));

window.addEventListener("scroll", throttle(() => metrics.trackScroll(), 200));`,
  "browser-rendering": `// 1) Parse HTML -> DOM
// 2) Parse CSS -> CSSOM
// 3) Build render tree
// 4) Layout + paint + composite

const link = document.createElement("link");
link.rel = "preload";
link.as = "style";
link.href = "/critical.css";
document.head.appendChild(link);

requestIdleCallback(() => {
  import("./nonCriticalWidgets");
});`,
  "bundle-size": `// vite.config.js
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [visualizer({ open: true })],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },
});

// Use report to remove large unused dependencies.`,
  "avoid-rerenders": `import { memo, useMemo } from "react";

const Row = memo(function Row({ row }) {
  return <li>{row.name}</li>;
});

export function UserList({ users, filter }) {
  const rows = useMemo(() => users.filter((u) => u.name.includes(filter)), [users, filter]);
  return <ul>{rows.map((r) => <Row key={r.id} row={r} />)}</ul>;
}

// Stable props + memoized list avoid extra work.`,
  "controlled-uncontrolled": `import { useRef, useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const noteRef = useRef(null); // uncontrolled field

  function submit(e) {
    e.preventDefault();
    api.submit({ email, note: noteRef.current.value });
  }

  return <form onSubmit={submit}><input value={email} onChange={(e) => setEmail(e.target.value)} /><textarea ref={noteRef} /><button>Save</button></form>;
}`,
  "local-vs-session": `const THEME_KEY = "theme";
const DRAFT_KEY = "checkout-draft";

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme); // shared across tabs
}

export function saveDraft(draft) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); // per-tab
}

export function loadDraft() {
  return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}");
}`,
  "auth-vs-authz": `app.post("/login", async (req, res) => {
  const user = await authService.verifyPassword(req.body.email, req.body.password); // auth
  res.json({ token: issueToken(user) });
});

app.delete("/users/:id", requireAuth, (req, res) => {
  if (!req.user.permissions.includes("users:delete")) { // authz
    return res.status(403).json({ message: "Forbidden" });
  }
  userService.delete(req.params.id);
  res.sendStatus(204);
});`,
  "refresh-tokens": `async function requestWithRefresh(url, options) {
  let accessToken = tokenStore.getAccessToken();
  let res = await fetch(url, withAuth(options, accessToken));

  if (res.status !== 401) return res;

  const refreshRes = await fetch("/auth/refresh", { method: "POST", credentials: "include" });
  if (!refreshRes.ok) throw new Error("Session expired");

  const tokens = await refreshRes.json();
  tokenStore.setAccessToken(tokens.accessToken);
  return fetch(url, withAuth(options, tokens.accessToken));
}`,
  "secure-tokens": `// server sets secure cookie for refresh token
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/auth/refresh",
});

// client sends credentials but cannot read cookie directly
await fetch("/auth/refresh", {
  method: "POST",
  credentials: "include",
});`,
  "race-conditions": `let activeRequestId = 0;

export async function searchProducts(query) {
  const requestId = ++activeRequestId;
  const res = await fetch("/api/products?q=" + encodeURIComponent(query));
  const data = await res.json();

  if (requestId !== activeRequestId) return; // stale response

  productStore.setResults(data.items);
}

// latest request wins`,
  "cancel-api": `let controller;

export async function fetchUsers(filter) {
  if (controller) controller.abort();
  controller = new AbortController();

  const res = await fetch("/api/users?filter=" + filter, {
    signal: controller.signal,
  });

  return res.json();
}`,
  "hydration-mismatch": `import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date().toLocaleTimeString());
  }, []);

  return <span>{now ?? "Loading time..."}</span>;
}

// render deterministic fallback on server, real time on client`,
  reconciliation: `function ProductRows({ products }) {
  return (
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.price}</td>
        </tr>
      ))}
    </tbody>
  );
}
// stable key preserves row identity across updates`,
  "browser-caching": `// static asset response headers
res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

// API response headers
res.setHeader("Cache-Control", "private, max-age=30");
res.setHeader("ETag", etag(body));

if (req.headers["if-none-match"] === etag(body)) {
  return res.status(304).end();
}

res.send(body);`,
  "debug-perf": `import { Profiler } from "react";

function onRender(id, phase, actualDuration) {
  if (actualDuration > 16) {
    console.log("Slow render:", id, phase, actualDuration);
  }
}

export function TracedPanel() {
  return <Profiler id="OrderPanel" onRender={onRender}><OrderPanel /></Profiler>;
}

// Pair this with Chrome Performance trace.`,
  "optimize-slow-react": `import { FixedSizeList } from "react-window";

export function VirtualTable({ rows }) {
  return (
    <FixedSizeList height={520} itemSize={44} itemCount={rows.length} width={900}>
      {({ index, style }) => (
        <div style={style}>{rows[index].id} - {rows[index].status}</div>
      )}
    </FixedSizeList>
  );
}

// virtualized rows render only visible items`,
  "sync-vs-async": `function validateSync(form) {
  if (!form.email.includes("@")) throw new Error("Email invalid");
  if (form.password.length < 8) throw new Error("Password too short");
}

async function submitAsync(form) {
  validateSync(form);
  const res = await fetch("/api/signup", { method: "POST", body: JSON.stringify(form) });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

submitAsync({ email: "a@b.com", password: "12345678" });`,
  "api-retries": `async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(url);
      if (!res.ok && res.status >= 500) throw new Error("Server error");
      return await res.json();
    } catch (error) {
      if (attempt === retries) throw error;
      const backoff = 200 * 2 ** attempt + Math.floor(Math.random() * 100);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
}`,
  "jwt-flow": `app.post("/auth/login", async (req, res) => {
  const user = await users.verify(req.body.email, req.body.password);
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
  res.json({ accessToken, refreshToken });
});

app.get("/orders", requireJwt, (req, res) => {
  res.json(orderService.listForUser(req.user.sub));
});

function requireJwt(req, res, next) { /* verify bearer token then next() */ }`,
  "service-workers": `// sw.js
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("app-v1").then((cache) => cache.addAll(["/", "/index.css", "/app.js"])));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener("activate", () => console.log("service worker active"));`,
  "state-large-apps": `import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/api";
import uiReducer from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);`,
  accessibility: `export function SearchField() {
  return (
    <div>
      <label htmlFor="search">Search products</label>
      <input id="search" name="search" aria-describedby="search-help" />
      <p id="search-help">Type at least 2 characters</p>
      <button aria-label="Clear search">Clear</button>
    </div>
  );
}

// keyboard and screen reader friendly`,
  "ssr-csr-ssg-isr": `// next.config-like conceptual setup
export async function getStaticProps() {
  return { props: { marketing: await cms.getHome() }, revalidate: 300 }; // ISR
}

export async function getServerSideProps(ctx) {
  return { props: { product: await api.getProduct(ctx.params.id) } }; // SSR
}

// pure client page
export default function AdminPage() {
  return <AdminApp />; // CSR after JS loads
}`,
  "infinite-scroll": `import { useEffect, useRef } from "react";

export function useInfiniteLoader(loadMore) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore());
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return sentinelRef;
}`,
  "url-to-browser": `async function openWebsite(url) {
  const dnsIp = await dns.resolve(url.hostname);
  const socket = await tcp.connect(dnsIp, 443);
  await tls.handshake(socket);

  socket.write("GET / HTTP/1.1\\r\\nHost: " + url.hostname + "\\r\\n\\r\\n");
  const html = await socket.read();

  const dom = browser.parseHtml(html);
  browser.render(dom);
}`,
  "frontend-security": `import DOMPurify from "dompurify";

export function CommentPreview({ html }) {
  const safeHtml = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export function safeRedirect(path) {
  if (!path.startsWith("/")) return "/";
  return path;
}

// sanitize user HTML + restrict redirects`,
  "monitor-production": `import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,
  environment: process.env.NODE_ENV,
});

window.addEventListener("unhandledrejection", (event) => {
  Sentry.captureException(event.reason);
});

export const reportRoute = (route) => Sentry.addBreadcrumb({ category: "route", message: route });`,
  "ecommerce-listing": `import { useSearchParams } from "react-router-dom";

export function useListingFilters() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const sort = params.get("sort") || "popular";
  const page = Number(params.get("page") || 1);

  function update(next) {
    setParams({ q: next.q ?? q, sort: next.sort ?? sort, page: String(next.page ?? 1) });
  }

  return { q, sort, page, update };
}`,
  "difficult-bug": `async function debugSearchRace() {
  const logs = [];
  let requestId = 0;

  async function search(query) {
    const id = ++requestId;
    logs.push({ id, query, at: Date.now(), type: "start" });
    const data = await api.search(query);
    logs.push({ id, query, at: Date.now(), type: "end" });
    if (id === requestId) uiStore.setResults(data.items);
  }

  return { search, logs };
}`,
  "scalable-frontend": `// feature-based folder contract
// features/orders/
//   api.ts
//   OrdersPage.tsx
//   components/OrderRow.tsx
//   state/ordersSlice.ts

export const featureManifest = {
  orders: { owner: "commerce-team", route: "/orders" },
  users: { owner: "platform-team", route: "/users" },
  reports: { owner: "analytics-team", route: "/reports" },
};

// clear boundaries help multi-team scale`,
  "react-rendering-process": `import { useEffect, useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  console.log("render phase", count);

  useEffect(() => {
    console.log("commit phase effect", count);
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Count {count}</button>;
}

// update -> render -> reconcile -> commit`,
  "useRef-vs-useState": `import { useRef, useState } from "react";

export function OtpTimer() {
  const [seconds, setSeconds] = useState(30); // affects UI
  const intervalRef = useRef(null); // internal mutable value

  function start() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSeconds((s) => s - 1), 1000);
  }

  return <button onClick={start}>Resend in {seconds}s</button>;
}`,
  "custom-hooks": `import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  return isOnline;
}`,
  "useEffect-deps": `import { useEffect, useMemo } from "react";

export function ReportPage({ startDate, endDate }) {
  const params = useMemo(() => ({ startDate, endDate }), [startDate, endDate]);

  useEffect(() => {
    fetch("/api/reports?start=" + params.startDate + "&end=" + params.endDate);
  }, [params]);

  return <div>Report: {startDate} to {endDate}</div>;
}

// memoized params keep dependency explicit`,
  "prop-drilling": `function App() {
  const user = { id: "u1", role: "admin" };
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserMenu role={user.role} />;
}

function UserMenu({ role }) { return <span>{role}</span>; }`,
  "event-delegation": `const list = document.getElementById("todo-list");

list.addEventListener("click", (event) => {
  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn) return;

  const itemId = actionBtn.closest("li").dataset.id;
  const action = actionBtn.dataset.action;

  if (action === "delete") todoStore.remove(itemId);
  if (action === "complete") todoStore.complete(itemId);
});

// one listener handles all list item buttons`,
  "promises-vs-async": `function fetchUserWithPromises(id) {
  return fetch("/api/users/" + id)
    .then((res) => res.json())
    .then((user) => ({ id: user.id, name: user.name }));
}

async function fetchUserWithAsync(id) {
  const res = await fetch("/api/users/" + id);
  const user = await res.json();
  return { id: user.id, name: user.name };
}

// same behavior, async/await is easier to read`,
  "debounce-throttle-diff": `function throttle(fn, wait) {
  let locked = false;
  return (...args) => {
    if (locked) return;
    locked = true;
    fn(...args);
    setTimeout(() => { locked = false; }, wait);
  };
}

const saveDraft = debounce(() => api.saveForm(), 500);   // after typing stops
const trackScroll = throttle(() => metrics.scroll(), 200); // periodic updates`,
  "context-vs-redux": `import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const ThemeContext = createContext("light");

export function Header() {
  const theme = useContext(ThemeContext); // small global value
  const cartCount = useSelector((s) => s.cart.count); // complex app state

  return <header data-theme={theme}>Cart: {cartCount}</header>;
}

// context for simple static-ish values, redux for shared dynamic workflows`,
  "virtual-dom": `import { useState } from "react";

export function CounterList() {
  const [items, setItems] = useState([{ id: 1, n: 0 }, { id: 2, n: 0 }]);

  function bump(id) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, n: i.n + 1 } : i));
  }

  return <ul>{items.map((i) => <li key={i.id} onClick={() => bump(i.id)}>{i.n}</li>)}</ul>;
}

// React diffs virtual tree and updates only changed node`,
  "error-boundaries": `import React from "react";

export class WidgetBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error) { logError(error); }

  render() {
    if (this.state.hasError) return <div>Widget unavailable</div>;
    return this.props.children;
  }
}`,
  "redux-toolkit": `import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) { state.items.push(action.payload); },
    removeItem(state, action) { state.items = state.items.filter((i) => i.id !== action.payload); },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;`,
  "tanstack-query": `import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodos() {
  return useQuery({ queryKey: ["todos"], queryFn: () => fetch("/api/todos").then((r) => r.json()) });
}

export function useAddTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => fetch("/api/todos", { method: "POST", body: JSON.stringify(payload) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
}`,
  "parent-to-child": `function Parent() {
  const plan = { name: "Pro", price: 29 };
  return <PlanCard plan={plan} currency="USD" />;
}

function PlanCard({ plan, currency }) {
  return (
    <article>
      <h3>{plan.name}</h3>
      <p>{currency} {plan.price}</p>
    </article>
  );
}

export default Parent;`,
  "child-to-parent": `function Parent() {
  const [sort, setSort] = useState("popular");
  return <SortSelect value={sort} onChange={setSort} />;
}

function SortSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="popular">Popular</option>
      <option value="price-asc">Price low to high</option>
    </select>
  );
}

export default Parent;`,
  "access-dom": `import { useEffect, useRef } from "react";

export function SearchModal({ open }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  return (
    <dialog open={open}>
      <input ref={inputRef} placeholder="Search orders" />
    </dialog>
  );
}`,
  "use-fetch": `import { useEffect, useState } from "react";

export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    fetch(url).then((r) => r.json()).then((data) => alive && setState({ data, loading: false, error: null })).catch((error) => alive && setState({ data: null, loading: false, error }));
    return () => { alive = false; };
  }, [url]);

  return state;
}`,
  pagination: `export async function fetchPage(page, limit = 20) {
  const res = await fetch("/api/orders?page=" + page + "&limit=" + limit);
  const data = await res.json();
  return {
    items: data.items,
    page: data.page,
    totalPages: data.totalPages,
  };
}

// UI keeps page in URL for shareable state
setSearchParams({ page: String(currentPage) });`,
  "valid-parentheses": `export function isValidParentheses(input) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const ch of input) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }

  return stack.length === 0;
}`,
  "implement-debounce": `export function debounce(fn, wait) {
  let timer = null;

  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  }

  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

// const save = debounce(() => api.saveDraft(form), 400);`,
  "deep-clone": `export function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);

  const clone = {};
  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key]);
  }

  return clone;
}

// for plain objects/arrays used in interview rounds`,
  "promise-all": `async function loadDashboard() {
  const [profile, permissions, notifications] = await Promise.all([
    fetch("/api/profile").then((r) => r.json()),
    fetch("/api/permissions").then((r) => r.json()),
    fetch("/api/notifications").then((r) => r.json()),
  ]);

  return {
    profile,
    permissions,
    notifications,
  };
}`,
  "reverse-string": `export function reverseString(text) {
  let left = 0;
  let right = text.length - 1;
  const chars = text.split("");

  while (left < right) {
    const tmp = chars[left];
    chars[left] = chars[right];
    chars[right] = tmp;
    left += 1;
    right -= 1;
  }

  return chars.join("");
}`,
  "two-sum": `export function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    const needed = target - nums[i];
    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }
    seen.set(nums[i], i);
  }

  return [];
}`,
  flexbox: `.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
}

.toolbar .actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}`,
  "css-position": `.cart-summary {
  position: sticky;
  top: 16px;
}

.help-tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 20;
}

.global-toast {
  position: fixed;
  right: 16px;
  bottom: 16px;
}`,
  "arrow-functions": `const team = {
  name: "Ops",
  members: ["A", "B"],
  print() {
    this.members.forEach((m) => console.log(this.name, m));
  },
};

const log = () => console.log(this); // inherits outer this (undefined in module)`,
  "this-keyword": `const user = { name: "Sudha" };

function greet(greeting) {
  return greeting + " " + this.name;
}

greet.call(user, "Hi");       // Hi Sudha
greet.apply(user, ["Hello"]); // Hello Sudha
const bound = greet.bind(user, "Hey");
bound(); // Hey Sudha`,
  "event-bubbling": `document.querySelector("#list").addEventListener("click", (e) => {
  const row = e.target.closest("[data-id]");
  if (!row) return;
  console.log("Bubble phase — clicked", row.dataset.id);
});`,
  "event-capturing": `document.addEventListener(
  "click",
  () => console.log("Capture — document first"),
  true
);

button.addEventListener("click", () => console.log("Target — button"));`,
  "map-filter-reduce-foreach": `const orders = [{ id: 1, status: "paid", total: 100 }, { id: 2, status: "pending", total: 50 }];

const paidLabels = orders
  .filter((o) => o.status === "paid")
  .map((o) => \`Order #\${o.id}\`);

const revenue = orders.reduce((sum, o) => sum + o.total, 0);

orders.forEach((o) => console.log(o.id));`,
  "call-apply-bind-polyfill": `Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx ?? globalThis;
  const key = Symbol("fn");
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...later) {
    return fn.apply(ctx, [...preset, ...later]);
  };
};`,
  "multi-select-dropdown": `const [open, setOpen] = useState(false);
const [selected, setSelected] = useState([]);

const toggle = (id) => {
  setSelected((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  );
};`,
  stopwatch: `useEffect(() => {
  if (!running) return undefined;
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(id);
}, [running]);`,
};
