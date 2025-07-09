import React, { useRef, useState } from 'react'

export default function InputSample() {
    // useState - 변경되는 값을 관리
    const[inputs, setInput] = useState({
        name: '',
        nickname:''
    });

    const nameInput = useRef();
    // useRef 특정 Dom(=HTML 태그) 선택

    // 비구조화 할당을 통해 값 추출
    const {name, nickname} = inputs;
    // inputs.name inputs.nickname 대신 name, nickname 만으로도 가져올 수 있음

    const onChange = (e) => {
        // e.target에서 name과 value를 받아옴
        const {value, name} = e.target;
        setInput({
            ...inputs, // 기존 inputs 객체를 복사
            [name] : value // name 키를 가진 value로 설정
        });
    }
    const onReset = () => {
        setInput({
            name : '',
            nickname : ''
        });
        nameInput.current.focus();
    }

  return (
    <div>
        <input name='name' ref={nameInput} placeholder='이름' onChange={onChange} value={name} />
        <input name='nickname' placeholder='닉네임' onChange={onChange} value={nickname}/>
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값 : </b>
            {name}({nickname})
        </div>
    </div>
  )
}