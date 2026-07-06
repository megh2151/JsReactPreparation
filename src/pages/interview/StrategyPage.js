import { strategySections } from '../../data/interviewStrategy';

function StrategyPage() {
  return (
    <div className="study-page">
      <header className="study-page-header">
        <h1>Interview Strategy</h1>
        <p className="study-page-desc">
          How to present yourself as Senior Frontend (10 YOE, 4 React) and structure every answer.
        </p>
      </header>

      <div className="strategy-list">
        {strategySections.map((section) => (
          <article key={section.id} className="strategy-card" id={section.id}>
            <h2>{section.title}</h2>
            <pre className="strategy-content">{section.content}</pre>
          </article>
        ))}
      </div>

      <article className="strategy-card highlight">
        <h2>Answer template (copy for practice)</h2>
        <pre className="strategy-content">{`Question: _______________________

1. Definition: One sentence.

2. How it works: 2-3 sentences on mechanics.

3. Trade-off: When NOT to use it / risks.

4. Real example: "On [project], I [action] because [reason]. Result: [metric]."

5. Senior close: "Today I'd also consider [alternative] if [condition]."`}</pre>
      </article>
    </div>
  );
}

export default StrategyPage;
