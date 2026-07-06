import StudySectionPage from './StudySectionPage';
import { typescriptQuestions } from '../../data/typescriptQuestions';

function TypeScriptPage() {
  return (
    <StudySectionPage
      title="TypeScript"
      description="Essential TS for frontend interviews — skip deep compiler types unless JD requires."
      questions={typescriptQuestions}
    />
  );
}

export default TypeScriptPage;
