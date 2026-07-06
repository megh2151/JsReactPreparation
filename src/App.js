import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudyLayout from './components/study/StudyLayout';
import InterviewHome from './pages/interview/InterviewHome';
import StrategyPage from './pages/interview/StrategyPage';
import JavaScriptPage from './pages/interview/JavaScriptPage';
import ReactStudyPage from './pages/interview/ReactStudyPage';
import TypeScriptPage from './pages/interview/TypeScriptPage';
import StateManagementPage from './pages/interview/StateManagementPage';
import PerformancePage from './pages/interview/PerformancePage';
import AuthSecurityPage from './pages/interview/AuthSecurityPage';
import SystemDesignPage from './pages/interview/SystemDesignPage';
import CodingSolutionsPage from './pages/interview/CodingSolutionsPage';
import AllQuestionsPage from './pages/interview/AllQuestionsPage';
import LabsHome from './pages/labs/LabsHome';
import DebounceLab from './pages/labs/DebounceLab';
import UndoRedoLab from './pages/labs/UndoRedoLab';
import UseFetchLab from './pages/labs/UseFetchLab';
import PaginationLab from './pages/labs/PaginationLab';
import EventLoopLab from './pages/labs/EventLoopLab';
import PolyfillsLab from './pages/labs/PolyfillsLab';
import StopwatchLab from './pages/labs/StopwatchLab';
import MultiSelectLab from './pages/labs/MultiSelectLab';
import CallApplyBindLab from './pages/labs/CallApplyBindLab';
import OtpPage from './pages/OtpPage';
import TodoPage from './pages/TodoPage';
import CharacterOccurance from './pages/CharacterOccurance';
import LabShell from './components/study/LabShell';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyLayout />}>
          <Route index element={<Navigate to="/study" replace />} />
          <Route path="study" element={<InterviewHome />} />
          <Route path="study/all-questions" element={<AllQuestionsPage />} />
          <Route path="study/strategy" element={<StrategyPage />} />
          <Route path="study/javascript" element={<JavaScriptPage />} />
          <Route path="study/react" element={<ReactStudyPage />} />
          <Route path="study/typescript" element={<TypeScriptPage />} />
          <Route path="study/state-management" element={<StateManagementPage />} />
          <Route path="study/performance" element={<PerformancePage />} />
          <Route path="study/auth-security" element={<AuthSecurityPage />} />
          <Route path="study/system-design" element={<SystemDesignPage />} />
          <Route path="study/coding" element={<CodingSolutionsPage />} />
          <Route path="labs" element={<LabsHome />} />
          <Route path="labs/debounce" element={<LabShell><DebounceLab /></LabShell>} />
          <Route path="labs/undo-redo" element={<LabShell><UndoRedoLab /></LabShell>} />
          <Route path="labs/use-fetch" element={<LabShell><UseFetchLab /></LabShell>} />
          <Route path="labs/pagination" element={<LabShell><PaginationLab /></LabShell>} />
          <Route path="labs/event-loop" element={<LabShell><EventLoopLab /></LabShell>} />
          <Route path="labs/polyfills" element={<LabShell><PolyfillsLab /></LabShell>} />
          <Route path="labs/stopwatch" element={<LabShell><StopwatchLab /></LabShell>} />
          <Route path="labs/multi-select" element={<LabShell><MultiSelectLab /></LabShell>} />
          <Route path="labs/call-apply-bind" element={<LabShell><CallApplyBindLab /></LabShell>} />
          <Route path="practice/otp" element={<OtpPage />} />
          <Route path="practice/todo" element={<TodoPage />} />
          <Route path="practice/character-occurrence" element={<CharacterOccurance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
