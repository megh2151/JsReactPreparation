import StudySectionPage from './StudySectionPage';
import { systemDesignQuestions } from '../../data/systemDesignQuestions';

function SystemDesignPage() {
  return (
    <StudySectionPage
      title="System Design"
      description="Frontend architecture scenarios — speak aloud using requirements → diagram → trade-offs."
      questions={systemDesignQuestions}
    />
  );
}

export default SystemDesignPage;
