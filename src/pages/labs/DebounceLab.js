import { useEffect, useMemo, useState } from 'react';
import { debounce } from '../../utils/debounce';
import CodeBlock from '../../components/study/CodeBlock';

function DebounceLab() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [apiCalls, setApiCalls] = useState(0);

  const debouncedSet = useMemo(
    () => debounce((value) => {
      setDebouncedQuery(value);
      setApiCalls((c) => c + 1);
    }, 400),
    []
  );

  useEffect(() => {
    debouncedSet(query);
  }, [query, debouncedSet]);

  return (
    <div className="lab-page">
      <h2>Debounce Search Lab</h2>
      <p>Type fast — API call count stays low until you pause 400ms.</p>
      <input
        className="lab-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <div className="lab-stats">
        <p>Live input: <strong>{query || '(empty)'}</strong></p>
        <p>Debounced value: <strong>{debouncedQuery || '(waiting...)'}</strong></p>
        <p>Simulated API calls: <strong>{apiCalls}</strong></p>
      </div>
      <CodeBlock>{`const debouncedSearch = useMemo(
  () => debounce((q) => fetch(\`/api?q=\${q}\`), 400),
  []
);`}</CodeBlock>
    </div>
  );
}

export default DebounceLab;
