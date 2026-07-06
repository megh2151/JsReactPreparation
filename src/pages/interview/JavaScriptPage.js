import StudySectionPage from './StudySectionPage';
import { javascriptQuestions } from '../../data/javascriptQuestions';

function JavaScriptPage() {
  return (
    <StudySectionPage
      title="JavaScript"
      description="Core JS for every round — closures, event loop, async, and scenario questions."
      questions={javascriptQuestions}
    />
  );
}

export default JavaScriptPage;
