import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CalendarCom } from "../CalendarPage/calendar";
import { CreateSchedule } from "../../modals/Schedule/createSchedule";
import './Main.css';


// 이 페이지가 팝업창의 메인페이지에 해당한다.
const Main = () => {
    const navigate = useNavigate();
    // 모달 창 키기
    const [onSchedule, setOnSchedule ] = useState(false);
    // 모달 창 끄기
    const [closeSchedule, setCloseSchedule] = useState(false);
    // submit 진행
    const [onSubmit, setOnSubmit] = useState(false);

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
    const onAddScheduleHandler = () => {
        // 모달창을 열어주는 기능
        // 버튼 눌렀을 때 onClick 함수를 통해 이 함수를 연결시킴
        setOnSchedule(!onSchedule);
    }
    const onExitScheduleHandler = () => {
        setCloseSchedule(!closeSchedule);
    }
    const onSubScheduleHandler = () => {
        setOnSubmit(!onSubmit);
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
                    </div>
                    <div className= "memoWrap">
                        <div className="dateListWrap">
                            <button className="addSchedule" onClick={onAddScheduleHandler}>일정추가</button>
                            <CreateSchedule isOpen = {onSchedule} onSubmit={closeSchedule} onCancel={onSubmit}/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export  {Main}