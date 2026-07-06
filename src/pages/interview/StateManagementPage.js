import StudySectionPage from './StudySectionPage';
import { stateManagementQuestions } from '../../data/stateManagementQuestions';

function StateManagementPage() {
  return (
    <StudySectionPage
      title="State Management"
      description="Context vs Redux vs TanStack Query — when to use what at scale."
      questions={stateManagementQuestions}
    />
  );
}

export default StateManagementPage;
