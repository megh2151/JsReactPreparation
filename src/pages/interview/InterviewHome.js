import { Link } from 'react-router-dom';
import { studyPlan } from '../../data/interviewStrategy';
import { ALL_QUESTIONS_FLAT } from '../../data/allQuestions';

const SECTIONS = [
  { to: '/study/all-questions', title: 'All Questions', desc: 'Complete LinkedIn list — simple English answers', count: `${ALL_QUESTIONS_FLAT.length} questions` },
  { to: '/study/strategy', title: 'Interview Strategy', desc: 'Resume, apply tips, STAR, answer framework', count: '7 topics' },
  { to: '/study/javascript', title: 'JavaScript', desc: 'Closures, event loop, async, polyfills', count: 'filtered view' },
  { to: '/study/react', title: 'React', desc: 'Rendering, hooks, performance, patterns', count: '22 questions' },
  { to: '/study/typescript', title: 'TypeScript', desc: 'type vs interface, generics basics', count: '5 questions' },
  { to: '/study/state-management', title: 'State Management', desc: 'Context, Redux, React Query', count: '7 questions' },
  { to: '/study/performance', title: 'Performance & Web', desc: 'CORS, SSR, caching, browser rendering', count: '12 questions' },
  { to: '/study/auth-security', title: 'Auth & Security', desc: 'JWT, interceptors, protected routes', count: '9 questions' },
  { to: '/study/system-design', title: 'System Design', desc: 'Dashboard, auth flow, rate limiter', count: '10 scenarios' },
  { to: '/study/coding', title: 'Coding Solutions', desc: '41 problems — full answers + complete code', count: '41 solutions' },
  { to: '/study/all-questions', title: 'Added Topics', desc: 'Arrow fn, this, bubbling, map/filter, Context vs Redux', count: 'filter: Added Topics' },
  { to: '/labs', title: 'Live Labs', desc: 'Stopwatch, multi-select, call/apply/bind + more', count: '9 labs' },
];

function InterviewHome() {
  return (
    <div className="study-page home-page">
      <header className="study-page-header hero">
        <h1>Frontend Interview Prep Hub</h1>
        <p className="study-page-desc">
          Your single study project for service + product companies.
          Profile: <strong>10 years total experience</strong>, <strong>4 years React</strong>.
          Every answer follows: Definition → How it works → Trade-off → Real example → What you&apos;d do differently now.
        </p>
      </header>

      <section className="home-plan">
        <h2>4-week plan (July)</h2>
        <div className="plan-grid">
          {studyPlan.map((week) => (
            <div key={week.week} className="plan-card">
              <span className="plan-week">Week {week.week}</span>
              <h3>{week.focus}</h3>
              <p>{week.tasks}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-targets">
        <h2>Target by company type</h2>
        <div className="targets-grid">
          <div className="target-card">
            <h3>Service companies</h3>
            <ul>
              <li>React hooks + lifecycle depth</li>
              <li>Live coding: todo, debounce, API fetch</li>
              <li>JavaScript output puzzles</li>
              <li>Project walkthrough</li>
            </ul>
          </div>
          <div className="target-card">
            <h3>Product companies</h3>
            <ul>
              <li>System design (dashboard, auth, scale)</li>
              <li>Performance + SSR/hydration</li>
              <li>STAR behavioral stories</li>
              <li>Machine coding under time pressure</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home-sections">
        <h2>Study sections</h2>
        <div className="section-grid">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="section-card">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="section-count">{s.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default InterviewHome;
