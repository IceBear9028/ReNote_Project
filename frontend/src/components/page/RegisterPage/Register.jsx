import React, {useState} from 'react';
import {registerUser} from "../../../redux/_actions/user_action";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {Button, TextField} from "@mui/material";
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

    const onBackLoginHandler = (event) => {
        navigate('/login');
    }

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

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    navigate('/login');
                } else {
                    alert(response.payload.text);
                }
            })

    }
    return(
        <>
            <div className='login'>
                <h1 className = "loginTitle">회원가입</h1>
                <form id='loginForm' onSubmit={onSubmitHandler}>
                    <TextField id = "inputName" type = "text" label = "이름" onChange={onNameHandler} size = "small" margin = "dense"/>
                    <TextField id = "inputId" type = "email" label = "사용자 email" onChange={onEmailHandler} size = "small" margin = "dense"/>
                    <TextField id = "inputPwd" type = "password" label = "비밀번호 입력" onChange={onPasswordHandler} size = "small" margin = "dense"/>
                    <TextField id = "inputPwdCon" type = "password" label = "비밀번호 입력" onChange={onPasswordConHandler} size = "small" margin = "dense"/>
                </form>
                <Button id = "inputSubmit" variant="contained" type = "submit"  form = "loginForm"  disableElevation>회원가입</Button>
                <Button id = "backToLoginButton" onClick={onBackLoginHandler}>로그인화면으로 이동</Button>
            </div>
        </>
    )
}

export {Register}