import React, { useState } from 'react';
import useTodos from './hooks/useTodos';
import TodoList from './components/TodoList';
import './App.css';

export default function App() {
    const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text.trim());
            setText('');
        }
    };

    return (
        <div className="app">
            <form onSubmit={handleSubmit}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="输入任务..." />
                <button type="submit">添加</button>
            </form>
            <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        </div>
    );
}
