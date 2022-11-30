import React, {useState} from 'react';
import {registerUser} from "../../../redux/_actions/user_action";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [passwordCon, setPasswordCon] = useState("");

    const onEmailHandler = (event) => {setEmail(event.currentTarget.value);};
    const onPasswordHandler = (event) => {setPassword(event.currentTarget.value);};
    const onPasswordConHandler = (event) => {setPasswordCon(event.currentTarget.value);};
    const onNameHandler = (event) => {setName(event.currentTarget.value);};


    const onSubmitHandler = (event) => {
        //preventDefault() 를 하지 않으면, 버튼을 누르면 새로고침되면서 State에 저장한 데이터들도 증발함
        event.preventDefault();

        // 비밀번호 확인 코드
        if(password !== passwordCon){
            return alert('바말번호와 비밀번호 확인이 다릅니다. 다시 설정하세요');
        }

        let body = {
            email : email,
            password : password,
            name : name,
        }

        console.log(body);

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.sucess){
                    navigate('/login');
                } else {
                    alert('Error');
                }
            })

    }
    return(
        <>
            <div className='login'>
                <h1 className = "loginTitle">회원가입화면</h1>
                <h1>안녕하세요</h1>
                <form className='loginForm' onSubmit={onSubmitHandler}>
                    이름 : <input className = "inputName" type = "text" onChange={onNameHandler}/>
                    아이디 : <input className = "inputId" type = "email" onChange={onEmailHandler}/>
                    비밀번호 : <input className = "inputPwd" type = "password" onChange={onPasswordHandler}/>
                    비밀번호 확인 : <input className = "inputPwdCon" type = "password" onChange={onPasswordConHandler}/>
                    <input className = "inputSubmit" type = "submit" value = "회원가입"/>
                </form>
            </div>
        </>
    )
}

export {Register}