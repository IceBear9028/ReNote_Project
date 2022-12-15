import React, {useState} from 'react';
import {loginUser} from "../../../redux/_actions/user_action";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {Button, Input, Tab, TextField} from "@mui/material";



import './Login.css';

// 도움받은 사이트
// https://yangbari.tistory.com/28


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {setEmail(event.currentTarget.value);};
    const onPasswordHandler = (event) => {setPassword(event.currentTarget.value);};

    const onRegisterHandler = (event) => {
        // 회원가입페이지로 이동
        navigate('/register');
    }
    const onSubmitHandler = (event) => {
        //preventDefault() 를 하지 않으면, 버튼을 누르면 새로고침되면서 State에 저장한 데이터들도 증발함
        event.preventDefault();

        let body = {
            email : email,
            password : password,
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    navigate('/main');
                } else {
                    if(response.payload.message){
                        alert(response.payload.message);
                    }
                }
            })

    }
    return(
        <>
            <div className='login'>
                <h1 className = "loginTitle">로그인화면</h1>
                <form id='loginForm' onSubmit={onSubmitHandler}>
                    <TextField id = "inputId" type = "email" label = "email" onChange={onEmailHandler} size = "normal" margin = "dense"/>
                    <TextField id = "inputPwd" type = "password" label = "password" onChange={onPasswordHandler} size = "normal" margin = "dense"/>
                </form>
                <Button className = "loginSubmit" variant="contained" type = "submit" form = "loginForm" disableElevation >Login</Button>
                <Button className = "registerbtn" onClick={onRegisterHandler} margin = "dense" >회원가입</Button>
            </div>
        </>
    )
}

export {Login}