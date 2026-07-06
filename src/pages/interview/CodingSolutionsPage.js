import StudySectionPage from './StudySectionPage';
import { codingSolutions } from '../../data/codingSolutions';

function CodingSolutionsPage() {
  return (
    <StudySectionPage
      title="Coding Solutions"
      description="41 coding problems with full 5-part answers and complete solutions. Practice blind, then compare. Links to Live Labs where available."
      questions={codingSolutions}
    />
  );
}

export default CodingSolutionsPage;
