function CodeBlock({ title, children }) {
  return (
    <div className="code-block">
      {title && <div className="code-block-title">{title}</div>}
      <pre><code>{children}</code></pre>
    </div>
  );
}

export default CodeBlock;
