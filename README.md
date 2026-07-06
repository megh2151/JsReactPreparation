# JsReactPreparation

React interview prep hub — study questions, coding solutions, live labs, and practice builds for JavaScript and React frontend interviews.

## Features

- **Study sections** — JavaScript, React, TypeScript, system design, performance, auth, and more
- **Structured answers** — 5-part format: Definition → How it works → Trade-off → Real example → Senior growth
- **Coding solutions** — 41 problems with full answers and complete code
- **Live labs** — Debounce, throttle, fetch, pagination, polyfills, event loop, undo/redo, and more
- **Practice builds** — OTP input, Todo list, character occurrence counter

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

- `npm test` — run tests
- `npm run build` — production build

## Project structure

```
src/
  components/study/   # QuestionCard, StudyLayout, CodeBlock
  data/               # Questions, structured answers, coding solutions
  pages/interview/    # Study section pages
  pages/labs/         # Interactive lab demos
  pages/              # Practice builds (OTP, Todo, etc.)
  hooks/              # useFetch, useUndoRedo, etc.
```

Built with [Create React App](https://github.com/facebook/create-react-app).
