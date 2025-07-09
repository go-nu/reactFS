import { useState } from "react"
import TodoItem from "./TodoItem"
import "./TodoList.css"

export default function TodoList({todo, onUpdate, onDelete}) {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }
  const getSearchResult = () => {
    // 빈 문자열이 들어오면 전체 검색(todo), 아니면 일치하는 아이템만 필터링
    return search === '' ? todo : todo.filter((it) => 
      it.content.toLowerCase().includes(search.toLowerCase())) // 대소문자 구분 x
  }

  return (
    <div className='TodoList'>
        <h4>Todo List 🌱</h4>
        <input 
        className='searchbar'
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요' />
        <div className="list_wrapper">
        {getSearchResult().map((it)=>(
            <TodoItem {...it} key={it.id}
            onUpdate={onUpdate}
            onDelete={onDelete}
            />
        ))}
        </div>
    </div>
  )
}
