import { useState } from 'react';
import CodeBlock from '../../components/study/CodeBlock';

function EventLoopLab() {
  const [output, setOutput] = useState([]);

  const runDemo = () => {
    const logs = [];
    const log = (n) => logs.push(String(n));

    log(1);
    setTimeout(() => log(2));
    Promise.resolve().then(() => log(3));
    queueMicrotask(() => log(4));
    log(5);

    setTimeout(() => setOutput(logs), 0);
  };

  return (
    <div className="lab-page">
      <h2>Event Loop Lab</h2>
      <p>Classic output: 1 → 5 → 3 → 4 → 2</p>
      <button type="button" onClick={runDemo}>Run demo</button>
      {output.length > 0 && (
        <p className="lab-output">Output: {output.join(' → ')}</p>
      )}
      <CodeBlock>{`console.log(1);
setTimeout(() => console.log(2));      // macrotask
Promise.resolve().then(() => console.log(3)); // microtask
queueMicrotask(() => console.log(4));
console.log(5);`}</CodeBlock>
    </div>
  );
}

export default EventLoopLab;
