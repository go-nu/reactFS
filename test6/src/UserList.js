import React from 'react'

function User({user, onRemove, onToggle
}){
    return(
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
                >{user.username}
            </b> <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );

}


export default function UserList({users, onRemove, onToggle}) {
  
    return (
    <div>

      {users.map(user => (
       <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
       ))}
    </div>
    // user 하나의 정보 출력
    // 삭제 버튼을 통해 onRemove() 실행
    // user.id를 element로 전달해서 어떤 user를 삭제할지 부모에게 알려줌
  )
}
