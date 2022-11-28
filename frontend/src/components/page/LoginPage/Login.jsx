import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import styled from "styled-components";
import './Login.css';

// 도움받은 사이트
// https://yangbari.tistory.com/28

const Login = () => {
    return(
        <>
            <div className='login'>
                <h1 className = "loginTitle">로그인화면</h1>
                <h1>안녕하세요</h1>
                <form>
                    아이디 : <input className = "inputId" type = "text"/>
                    비밀번호 : <input className = "inputPwd" type = "password" name = "비밀번호를 입력하세요"/>
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