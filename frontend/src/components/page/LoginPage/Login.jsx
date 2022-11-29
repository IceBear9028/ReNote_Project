import React, {useState} from 'react';
import {loginUser} from "../../../redux/_actions/user_action";
import {useDispatch} from "react-redux";
import './Login.css';

// 도움받은 사이트
// https://yangbari.tistory.com/28


const Login = (history) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {setEmail(event.currentTarget.value);};
    const onPasswordHandler = (event) => {setPassword(event.currentTarget.value);};

    const onSubmitHandler = (event) => {
        //preventDefault() 를 하지 않으면, 버튼을 누르면 새로고침되면서 State에 저장한 데이터들도 증발함
        event.preventDefault();

        let body = {
            email : email,
            password : password,
        }

        console.log(body);

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSucess){
                    history.push('/')
                } else {
                    alert('Error');
                }
            })

    }
    return(
        <>
            <div className='login'>
                <h1 className = "loginTitle">로그인화면</h1>
                <h1>안녕하세요</h1>
                <form className='loginForm' onSubmit={onSubmitHandler}>
                    아이디 : <input className = "inputId" type = "email" onChange={onEmailHandler}/>
                    비밀번호 : <input className = "inputPwd" type = "password" onChange={onPasswordHandler}/>
                    <input className = "inputSubmit" type = "submit" value = "로그인"/>
                </form>      
            </div>
        </>
    )
}

const LoginFail = () => {
    return(
        <>
            <div className = "loginFail">
                <div>
                    <h1>입력하신정보를 찾을 수 없습니다.</h1> 
                    <form>
                        <input className = "backTpLogin" type = "submit"></input> 
                    </form>
                </div>
            </div>
        </>
    )
}


const LoginPageLayout = () => {
    return(
        <>
            <div className = "LoginContainer">             
            </div> 
        </>
    )
}

export {LoginPageLayout, Login, LoginFail}