import StudySectionPage from './StudySectionPage';
import { reactQuestions } from '../../data/reactQuestions';

function ReactStudyPage() {
  return (
    <StudySectionPage
      title="React"
      description="Rendering, hooks, performance, and machine-coding topics for senior roles."
      questions={reactQuestions}
    />
  );
}

export default ReactStudyPage;
