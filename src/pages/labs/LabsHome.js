import { Link } from 'react-router-dom';

const LABS = [
  { to: '/labs/debounce', title: 'Debounce Search', desc: 'Live debounce vs raw input' },
  { to: '/labs/stopwatch', title: 'Stopwatch', desc: 'Start, stop, reset timer' },
  { to: '/labs/multi-select', title: 'Multi-Select Dropdown', desc: 'Tags + select/deselect' },
  { to: '/labs/call-apply-bind', title: 'call / apply / bind', desc: 'Native + polyfill demo' },
  { to: '/labs/undo-redo', title: 'Undo / Redo', desc: 'Custom useUndoRedo hook' },
  { to: '/labs/use-fetch', title: 'useFetch Hook', desc: 'API loading & error states' },
  { to: '/labs/pagination', title: 'Pagination', desc: 'Client-side page controls' },
  { to: '/labs/event-loop', title: 'Event Loop', desc: 'Run classic output demo' },
  { to: '/labs/polyfills', title: 'Polyfills', desc: 'map, Promise.all demos' },
];

function LabsHome() {
  return (
    <div className="study-page">
      <header className="study-page-header">
        <h1>Live Labs</h1>
        <p className="study-page-desc">
          Runnable implementations for machine-coding rounds. Study the code, then rebuild blind.
        </p>
      </header>
      <div className="section-grid">
        {LABS.map((lab) => (
          <Link key={lab.to} to={lab.to} className="section-card">
            <h3>{lab.title}</h3>
            <p>{lab.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LabsHome;
