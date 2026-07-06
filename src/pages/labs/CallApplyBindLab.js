import { useState } from 'react';
import CodeBlock from '../../components/study/CodeBlock';

const user = { name: 'Sudha', role: 'developer' };

function greet(greeting, punct) {
  return `${greeting} ${this.name}${punct}`;
}

function myCall(fn, ctx, ...args) {
  const context = ctx ?? (typeof window !== 'undefined' ? window : {});
  const key = Symbol('fn');
  Object.assign(context, { [key]: fn });
  const result = context[key](...args);
  delete context[key];
  return result;
}

function myApply(fn, ctx, args) {
  return myCall(fn, ctx, ...args);
}

function myBind(fn, ctx, ...preset) {
  return function bound(...later) {
    return myApply(fn, ctx, [...preset, ...later]);
  };
}

function CallApplyBindLab() {
  const [output, setOutput] = useState([]);

  const runDemo = () => {
    const lines = [];
    lines.push(`call:  ${greet.call(user, 'Hi', '!')}`);
    lines.push(`apply: ${greet.apply(user, ['Hello', '.'])}`);
    lines.push(`bind:  ${greet.bind(user, 'Hey')('?')}`);
    lines.push(`myCall:  ${myCall(greet, user, 'Poly', '!')}`);
    lines.push(`myApply: ${myApply(greet, user, ['PolyApply', '.'])}`);
    lines.push(`myBind:  ${myBind(greet, user, 'PolyBind')('~')}`);
    setOutput(lines);
  };

  return (
    <div className="lab-page">
      <h2>call / apply / bind Polyfill Lab</h2>
      <p>Run native vs polyfill — common interview coding question.</p>
      <button type="button" onClick={runDemo}>Run demo</button>
      {output.length > 0 && (
        <ul className="lab-list">
          {output.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      <CodeBlock>{`Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx ?? globalThis;
  const key = Symbol('fn');
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...later) {
    return fn.myCall(ctx, ...preset, ...later);
  };
};`}</CodeBlock>
    </div>
  );
}

export default CallApplyBindLab;
