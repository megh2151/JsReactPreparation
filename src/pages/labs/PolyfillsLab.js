import { useState } from 'react';
import CodeBlock from '../../components/study/CodeBlock';

function promiseAll(polyfills) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (polyfills.length === 0) resolve([]);
    polyfills.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => {
          results[i] = val;
          if (++done === polyfills.length) resolve(results);
        },
        reject
      );
    });
  });
}

function PolyfillsLab() {
  const [mapResult, setMapResult] = useState(null);
  const [allResult, setAllResult] = useState(null);

  const runMap = () => {
    const doubled = [1, 2, 3].myMap((x) => x * 2);
    setMapResult(doubled.join(', '));
  };

  const runAll = async () => {
    const result = await promiseAll([
      Promise.resolve('A'),
      new Promise((r) => setTimeout(() => r('B'), 100)),
      Promise.resolve('C'),
    ]);
    setAllResult(result.join(', '));
  };

  return (
    <div className="lab-page">
      <h2>Polyfills Lab</h2>
      <div className="lab-actions">
        <button type="button" onClick={runMap}>Run Array.myMap</button>
        <button type="button" onClick={runAll}>Run Promise.all polyfill</button>
      </div>
      {mapResult && <p>myMap result: [{mapResult}]</p>}
      {allResult && <p>Promise.all result: [{allResult}]</p>}
      <CodeBlock>{`Array.prototype.myMap = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = cb(this[i], i, this);
  }
  return result;
};`}</CodeBlock>
    </div>
  );
}

// Attach polyfill once for demo (intentional for interview practice)
// eslint-disable-next-line no-extend-native
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (cb, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) result[i] = cb.call(thisArg, this[i], i, this);
    }
    return result;
  };
}

export default PolyfillsLab;
