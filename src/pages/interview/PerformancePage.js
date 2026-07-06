import StudySectionPage from './StudySectionPage';
import { performanceQuestions } from '../../data/performanceQuestions';

function PerformancePage() {
  return (
    <StudySectionPage
      title="Performance & Web"
      description="Browser internals, CORS, caching, SSR modes, and production monitoring."
      questions={performanceQuestions}
    />
  );
}

export default PerformancePage;
