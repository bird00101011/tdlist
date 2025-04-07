import { useState, useEffect } from 'react';

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => setTodos([...todos, { id: Date.now(), text, done: false }]);
  const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const removeTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  return { todos, addTodo, toggleTodo, removeTodo };
}
