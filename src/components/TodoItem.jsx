import React from 'react';

export default function TodoItem({ todo, toggle, remove }) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
      <span className={`todo-text ${todo.done ? 'done' : ''}`}>{todo.text}</span>
      <button className="delete-btn" onClick={() => remove(todo.id)}>🗑</button>
    </li>
  );
}
