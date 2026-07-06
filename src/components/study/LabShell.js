import { Link } from 'react-router-dom';

function LabShell({ title, children }) {
  return (
    <div className="study-page lab-shell">
      <Link to="/labs" className="back-link">← Back to Labs</Link>
      {children}
    </div>
  );
}

export function withLabShell(LabComponent, title) {
  return function WrappedLab() {
    return (
      <LabShell title={title}>
        <LabComponent />
      </LabShell>
    );
  };
}

export default LabShell;
