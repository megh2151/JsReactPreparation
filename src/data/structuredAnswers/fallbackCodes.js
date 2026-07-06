/** Fallback code snippets when no bank entry exists — matched by title keywords */
const FALLBACKS = [
  {
    test: /debounce|throttle/i,
    code: `const debouncedSearch = useMemo(
  () => debounce((q) => fetch(\`/api?q=\${q}\`), 300),
  []
);`,
  },
  {
    test: /fetch|api|hook/i,
    code: `const { data, loading, error } = useFetch('/api/users');
if (loading) return <Spinner />;
if (error) return <Error msg={error} />;`,
  },
  {
    test: /pagination/i,
    code: `const start = (page - 1) * PAGE_SIZE;
const rows = allRows.slice(start, start + PAGE_SIZE);`,
  },
  {
    test: /reverse|string|palindrome/i,
    code: `const reversed = str.split('').reverse().join('');
const isPalindrome = str === reversed;`,
  },
  {
    test: /array|duplicate|two sum|flatten|merge/i,
    code: `const unique = [...new Set(arr)];
const merged = [...arr1, ...arr2];`,
  },
  {
    test: /parent|child|props/i,
    code: `// Parent
<Child user={user} onSave={handleSave} />

// Child
function Child({ user, onSave }) {
  return <button onClick={() => onSave(user.id)}>Save</button>;
}`,
  },
  {
    test: /context|redux|state/i,
    code: `const user = useSelector((s) => s.auth.user);
const dispatch = useDispatch();
dispatch(loginSuccess(data));`,
  },
  {
    test: /memo|re-render|optimiz/i,
    code: `const Row = React.memo(({ item, onEdit }) => (
  <tr><td>{item.name}</td></tr>
));`,
  },
  {
    test: /useEffect|lifecycle|mount/i,
    code: `useEffect(() => {
  fetchData();
  return () => controller.abort();
}, [userId]);`,
  },
  {
    test: /css|flex|grid|position/i,
    code: `.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
  },
];

const GENERIC = `// Example from a React feature module
function FeatureCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)}>
      <h3>{item.title}</h3>
      {open && <p>{item.details}</p>}
    </div>
  );
}`;

export function getFallbackExampleCode(title = '') {
  const match = FALLBACKS.find((f) => f.test.test(title));
  return match?.code || GENERIC;
}
