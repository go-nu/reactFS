import React, { useRef, useState } from 'react'
import UserList from './UserList';
import CreateUser from './CreateUser';

export default function App() {
  
  const[inputs, setInputs] = useState({
    username:'',
    email:''
  });
  const {username, email} = inputs;  // 비구조화 할당(구조분해할당)

  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });

  };


  const [users, setUsers] = useState ([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    // 구현
    const user ={
      id : nextId.current,
      username,
      email
    }; // username과 email로 새로운 객체를 만들고

    setUsers([...users, user]);
// ...users 기존의 사용자에 user 추가
// setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }

  const onRemove = id => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출해 새로운 배열 생성
    // user.id가 id 인것을 제거
    setUsers(users.filter(user => user.id != id));
  }

  const onToggle = id => {
    setUsers(
      users.map(user => 
        user.id === id ? {...user, active : !user.active} : user
      )
    );
  };
  // id가 일치하는 사용자의 active 값은 반전(T<->F)

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </div>
  )
}
