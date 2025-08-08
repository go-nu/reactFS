import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // 전체 조회
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('목록 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 추가
  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post('http://localhost:5000/todos', { text });
      setText('');
      fetchTodos();
    } catch (err) {
      console.error('추가 실패:', err);
    }
  };

  // 완료 토글
  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !completed,
      });
      fetchTodos();
    } catch (err) {
      console.error('토글 실패:', err);
    }
  };

  // 삭제
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📋 TODO LIST</h1>

      {/* 입력 영역 */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo} style={{ marginLeft: '0.5rem' }}>
          추가
        </button>
      </div>

      {/* 리스트 영역 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '0.5rem' }}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginRight: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
