import CodeBlock from './CodeBlock';

const SECTIONS = [
  { key: 'definition', label: '1. Definition' },
  { key: 'howItWorks', label: '2. How it works' },
  { key: 'tradeoffs', label: '3. Trade-off (when NOT to use)' },
  { key: 'realExample', label: '4. Real example (from your 4 React years)' },
  { key: 'seniorGrowth', label: '5. What you\'d do differently now' },
];

function QuestionCard({ question, showSection }) {
  const {
    title,
    section,
    tags = [],
    definition,
    howItWorks,
    tradeoffs,
    realExample,
    exampleCode,
    seniorGrowth,
    code,
    output,
    tips,
  } = question;

  const hasStructured = definition || howItWorks || tradeoffs || realExample || seniorGrowth;

  const fields = {
    definition,
    howItWorks,
    tradeoffs,
    realExample,
    seniorGrowth,
  };

  return (
    <article className="question-card" id={question.id}>
      <header className="question-card-header">
        <h3>{title}</h3>
        {showSection && section && (
          <span className="question-section-badge">{section}</span>
        )}
        {tags.length > 0 && (
          <div className="question-tags">
            {tags.map((tag) => (
              <span key={tag} className="question-tag">{tag}</span>
            ))}
          </div>
        )}
      </header>

      {hasStructured && (
        <div className="structured-answer">
          {SECTIONS.map(({ key, label }) =>
            fields[key] ? (
              <section key={key} className={`answer-part answer-${key}`}>
                <h4>{label}</h4>
                <p>{fields[key]}</p>
                {key === 'realExample' && exampleCode && (
                  <CodeBlock title="Code example from project">
                    {exampleCode}
                  </CodeBlock>
                )}
              </section>
            ) : null
          )}
        </div>
      )}

      {code && !exampleCode && <CodeBlock title="Full solution">{code}</CodeBlock>}
      {code && exampleCode && code !== exampleCode && (
        <CodeBlock title="Full solution">{code}</CodeBlock>
      )}
      {output && (
        <section>
          <h4>Output</h4>
          <p className="output-text">{output}</p>
        </section>
      )}

      {tips && (
        <section>
          <h4>Quick tip</h4>
          <p className="interview-tip">{tips}</p>
        </section>
      )}
    </article>
  );
}

export default QuestionCard;
