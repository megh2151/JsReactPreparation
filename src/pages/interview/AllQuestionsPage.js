import { useMemo, useState } from 'react';
import { ALL_SECTIONS, ALL_QUESTIONS_FLAT } from '../../data/allQuestions';
import QuestionCard from '../../components/study/QuestionCard';

function AllQuestionsPage() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('All');

  const sectionNames = useMemo(
    () => ['All', ...ALL_SECTIONS.map((s) => s.title)],
    []
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ALL_QUESTIONS_FLAT.filter((q) => {
      const matchSection = activeSection === 'All' || q.section === activeSection;
      const matchSearch =
        !term ||
        q.title.toLowerCase().includes(term) ||
        q.simpleAnswer?.toLowerCase().includes(term);
      return matchSection && matchSearch;
    });
  }, [search, activeSection]);

  return (
    <div className="study-page">
      <header className="study-page-header">
        <h1>All Interview Questions</h1>
        <p className="study-page-desc">
          Complete list from your LinkedIn notes ({ALL_QUESTIONS_FLAT.length} questions).
          Every answer uses the 5-part interview pattern — practice reading each section aloud.
        </p>
      </header>

      <div className="study-filters">
        <input
          type="search"
          placeholder="Search all questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="study-search"
        />
        <div className="tag-filters section-filter">
          {sectionNames.map((name) => (
            <button
              key={name}
              type="button"
              className={activeSection === name ? 'tag-btn active' : 'tag-btn'}
              onClick={() => setActiveSection(name)}
            >
              {name === 'All' ? name : name.length > 28 ? `${name.slice(0, 28)}…` : name}
            </button>
          ))}
        </div>
      </div>

      <p className="study-count">{filtered.length} question(s)</p>

      {activeSection === 'All' && !search && (
        <div className="section-toc">
          <h2>Jump to section</h2>
          {ALL_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="toc-btn"
              onClick={() => setActiveSection(s.title)}
            >
              {s.title} ({s.questions.length})
            </button>
          ))}
        </div>
      )}

      <div className="question-list">
        {filtered.map((q, i) => (
          <QuestionCard key={`${q.id}-${i}`} question={q} showSection />
        ))}
      </div>
    </div>
  );
}

export default AllQuestionsPage;
