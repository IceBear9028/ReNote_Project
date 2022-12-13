import React, { useState, useEffect} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from 'react-router-dom';
import { CalendarCom } from "../CalendarPage/calendar";
import { CreateSchedule } from "../../modals/Schedule/createSchedule";
import {ScheduleElement} from "../../features/ScheduleElement";
import {allSchedule} from "../../../redux/_actions/content_action";
import './Main.css';


// 이 페이지가 팝업창의 메인페이지에 해당한다.
const Main = () => {
    const navigate = useNavigate();
    // 모달 창 관련 코드
    const [onSchedule, setOnSchedule ] = useState(false);
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
        // dispatch로 redux action 과 연결
        setOnSchedule(true);
    }

    // 모든 일정을 보여주는 기능 관련 코드
    const dispatch = useDispatch();
    const [scheduleData, setScheduleData] = useState('');

    useEffect(() => {
        dispatch(allSchedule()).then((res) => {
            setScheduleData(res.payload);
        })
    }, [])

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
                            <CreateSchedule onSchedule = {onSchedule} setOnSchedule={setOnSchedule}/>
                            <div className = "calendar">
                                {scheduleData && scheduleData.map((item, index)=>{
                                    return <ScheduleElement text={item.text} title = {item.title} creationDate={item.creationDate}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export  {Main}