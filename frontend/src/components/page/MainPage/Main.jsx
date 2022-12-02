import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {CalendarCom} from "../CalendarPage/calendar";
import './Main.css';

const Main = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then((response) => {
                if(response.data.success){
                    navigate('/login');
                }else{
                    alert('로그아웃 실패!');
                }
            })
    }
    const onAddMemoHandler = () => {

    }

    return(
        <>
            <div className = "main">
                <div className = "menuBar">
                    <h1>Main Page</h1>
                    <button onClick={onClickHandler}>로그아웃</button>
                </div>
                <div className = "contentWrap">
                    <div className = "calendarWrap">
                        <div className = "calendar">
                            <CalendarCom/>
                        </div>
                        <div className="dateListWrap">
                            <button className="addMemo" onClick={onAddMemoHandler}>일정추가</button>
                        </div>
                    </div>
                    <div className= "memoWrap">

                    </div>

                </div>
            </div>
        </>
    )
}

export  {Main}