import { useEffect, useRef, useState } from 'react';
import CodeBlock from '../../components/study/CodeBlock';

function StopwatchLab() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return undefined;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="lab-page">
      <h2>Stopwatch Lab</h2>
      <p>Classic machine-coding question — timer with start, stop, reset + cleanup.</p>
      <p className="lab-timer">{mm}:{ss}</p>
      <div className="lab-actions">
        <button type="button" onClick={handleStart} disabled={running}>Start</button>
        <button type="button" onClick={handleStop} disabled={!running}>Stop</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
      <CodeBlock>{`useEffect(() => {
  if (!running) return;
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);
}, [running]);`}</CodeBlock>
    </div>
  );
}

export default StopwatchLab;
