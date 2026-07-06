import { useUndoRedo } from '../../hooks/useUndoRedo';
import CodeBlock from '../../components/study/CodeBlock';

function UndoRedoLab() {
  const { value, set, undo, redo, canUndo, canRedo } = useUndoRedo('');

  return (
    <div className="lab-page">
      <h2>Undo / Redo Lab</h2>
      <p>Text editor with history stacks — common machine-coding question.</p>
      <textarea
        className="lab-textarea"
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder="Type something..."
        rows={5}
      />
      <div className="lab-actions">
        <button type="button" onClick={undo} disabled={!canUndo}>Undo</button>
        <button type="button" onClick={redo} disabled={!canRedo}>Redo</button>
      </div>
      <CodeBlock>{`const { value, set, undo, redo, canUndo, canRedo } = useUndoRedo('');
// past[] present future[]`}</CodeBlock>
    </div>
  );
}

export default UndoRedoLab;
