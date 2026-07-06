import { useMemo, useState } from 'react';
import CodeBlock from '../../components/study/CodeBlock';

const ITEMS = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`);
const PAGE_SIZE = 8;

function PaginationLab() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ITEMS.length / PAGE_SIZE);
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ITEMS.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <div className="lab-page">
      <h2>Pagination Lab</h2>
      <ul className="lab-list">
        {pageItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="lab-actions">
        <button type="button" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button type="button" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <CodeBlock>{`const start = (page - 1) * pageSize;
const items = allItems.slice(start, start + pageSize);
// Server: pass cursor/page to API`}</CodeBlock>
    </div>
  );
}

export default PaginationLab;
