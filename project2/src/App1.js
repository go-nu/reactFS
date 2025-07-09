import { useReducer, useRef } from "react";
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

// 상태 변화 로직
// state - 현재 할일 list
// action - dispatch에서 전달된 액션 객체
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
}

function App1() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  // todo - 현재 할일 리스트 상태
  // dispatch - 상태를 바꾸고 싶을 때
  // reducer - 상태변경 로직을 정의하는 함수
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    dispatch({ type: "UPDATE", targetId });
  };

  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App1;