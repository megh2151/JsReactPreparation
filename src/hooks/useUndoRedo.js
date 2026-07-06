import { useCallback, useState } from 'react';

export function useUndoRedo(initialValue) {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialValue);
  const [future, setFuture] = useState([]);

  const set = useCallback((value) => {
    setPast((p) => [...p, present]);
    setPresent(value);
    setFuture([]);
  }, [present]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [present, ...f]);
    setPresent(previous);
  }, [past, present]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, present]);
    setPresent(next);
  }, [future, present]);

  return {
    value: present,
    set,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
