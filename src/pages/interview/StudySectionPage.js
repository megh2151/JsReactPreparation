import { useMemo, useState } from 'react';
import QuestionCard from '../../components/study/QuestionCard';

function StudySectionPage({ title, description, questions }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => {
    const set = new Set();
    questions.forEach((q) => q.tags?.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, [questions]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return questions.filter((q) => {
      const matchesTag = activeTag === 'All' || q.tags?.includes(activeTag);
      const matchesSearch =
        !term ||
        q.title.toLowerCase().includes(term) ||
        q.definition?.toLowerCase().includes(term) ||
        q.tags?.some((t) => t.toLowerCase().includes(term));
      return matchesTag && matchesSearch;
    });
  }, [questions, search, activeTag]);

  return (
    <div className="study-page">
      <header className="study-page-header">
        <h1>{title}</h1>
        {description && <p className="study-page-desc">{description}</p>}
        <p className="study-page-desc study-hint">
          Each answer follows: Definition → How it works → Trade-off → Real example → What you&apos;d do differently now.
        </p>
      </header>

      <div className="study-filters">
        <input
          type="search"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="study-search"
        />
        <div className="tag-filters">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={activeTag === tag ? 'tag-btn active' : 'tag-btn'}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="study-count">{filtered.length} question(s)</p>

      <div className="question-list">
        {filtered.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}

export default StudySectionPage;
