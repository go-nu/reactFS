import React, { useRef, useState } from 'react'
import "./App.css"
import Header from './component/Header'
import TodoEditor from './component/TodoEditor'
import TodoList from './component/TodoList'

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

export default function App() {
  const [todo, setTodo] = useState(mockTodo);

  const idRef = useRef(3);
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  }

  // 토글할 할일의 id를 targetId라는 매개변수로 받음
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) => // todo 배열을 돌면서
        it.id === targetId ? {...it, isDone : !it.isDone} : it
        // targetId와 같은 것의 isDone을 반전 T <-> F
      )
    );
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <div className='App'>
      <Header/>
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />

    </div>
  )
}
