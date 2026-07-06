import { useFetch } from '../../hooks/useFetch';
import CodeBlock from '../../components/study/CodeBlock';

function UseFetchLab() {
  const { data, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users?_limit=5'
  );

  return (
    <div className="lab-page">
      <h2>useFetch Hook Lab</h2>
      <p>Custom hook pattern — loading, error, data, refetch.</p>
      <button type="button" onClick={refetch} disabled={loading}>
        {loading ? 'Loading...' : 'Refetch'}
      </button>
      {error && <p className="lab-error">Error: {error}</p>}
      {data && (
        <ul className="lab-list">
          {data.map((user) => (
            <li key={user.id}>{user.name} — {user.email}</li>
          ))}
        </ul>
      )}
      <CodeBlock>{`const { data, loading, error, refetch } = useFetch(url);
// useEffect + AbortController on url change`}</CodeBlock>
    </div>
  );
}

export default UseFetchLab;
