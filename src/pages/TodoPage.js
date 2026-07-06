import { useState } from 'react';

function TodoPage() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([...todos, input.trim()]);
    setInput('');
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    // const newTodos = [...todos];
    // newTodos.splice(index, 1);
    // setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Todo List</h2>

        <div className="todo-form">
          <input
            type="text"
            value={input}
            placeholder="Add a task..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="button" onClick={handleAdd}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              <span>{todo}</span>
              <button type="button" onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default TodoPage;
