import StudySectionPage from './StudySectionPage';
import { authQuestions } from '../../data/authQuestions';

function AuthSecurityPage() {
  return (
    <StudySectionPage
      title="Auth & Security"
      description="JWT flows, token storage, protected routes, and global API error handling."
      questions={authQuestions}
    />
  );
}

export default AuthSecurityPage;
