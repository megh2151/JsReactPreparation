import { useEffect, useRef, useState } from 'react';
import CodeBlock from '../../components/study/CodeBlock';

const OPTIONS = [
  { id: 'react', label: 'React' },
  { id: 'js', label: 'JavaScript' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'node', label: 'Node.js' },
  { id: 'css', label: 'CSS' },
  { id: 'html', label: 'HTML' },
];

function MultiSelectLab() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const removeTag = (id) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const selectedLabels = OPTIONS.filter((o) => selected.includes(o.id));

  return (
    <div className="lab-page">
      <h2>Multi-Select Dropdown Lab</h2>
      <p>Select skills — tags appear below. Click outside to close.</p>

      <div className="multi-select" ref={wrapperRef}>
        <button
          type="button"
          className="multi-select-trigger"
          onClick={() => setOpen((o) => !o)}
        >
          {selected.length ? `${selected.length} selected` : 'Select skills...'}
        </button>

        {open && (
          <ul className="multi-select-menu">
            {OPTIONS.map((opt) => (
              <li key={opt.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.id)}
                    onChange={() => toggle(opt.id)}
                  />
                  {opt.label}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tag-row">
        {selectedLabels.map((opt) => (
          <span key={opt.id} className="tag-chip">
            {opt.label}
            <button type="button" onClick={() => removeTag(opt.id)} aria-label="Remove">×</button>
          </span>
        ))}
      </div>

      <CodeBlock>{`const toggle = (id) => {
  setSelected(prev =>
    prev.includes(id)
      ? prev.filter(x => x !== id)
      : [...prev, id]
  );
};`}</CodeBlock>
    </div>
  );
}

export default MultiSelectLab;
