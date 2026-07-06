import { NavLink, Outlet } from 'react-router-dom';

const STUDY_LINKS = [
  { to: '/study', label: 'Overview', end: true },
  { to: '/study/all-questions', label: 'All Questions' },
  { to: '/study/strategy', label: 'Interview Strategy' },
  { to: '/study/javascript', label: 'JavaScript' },
  { to: '/study/react', label: 'React' },
  { to: '/study/typescript', label: 'TypeScript' },
  { to: '/study/state-management', label: 'State Management' },
  { to: '/study/performance', label: 'Performance & Web' },
  { to: '/study/auth-security', label: 'Auth & Security' },
  { to: '/study/system-design', label: 'System Design' },
  { to: '/study/coding', label: 'Coding Solutions' },
  { to: '/labs', label: 'Live Labs', end: true },
];

function StudyLayout() {
  return (
    <div className="study-shell">
      <aside className="study-sidebar">
        <div className="study-sidebar-brand">
          <NavLink to="/">Interview Prep Hub</NavLink>
          <p>Senior Frontend · 10 YOE · 4 React</p>
        </div>
        <nav className="study-sidebar-nav">
          {STUDY_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) =>
              isActive ? 'study-link active' : 'study-link'
            }>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="study-sidebar-practice">
          <p>Practice builds</p>
          <NavLink to="/practice/otp">OTP Input</NavLink>
          <NavLink to="/practice/todo">Todo List</NavLink>
          <NavLink to="/practice/character-occurrence">Character Count</NavLink>
        </div>
      </aside>
      <main className="study-main">
        <Outlet />
      </main>
    </div>
  );
}

export default StudyLayout;
