import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

const CalendarContainer = styled.div`
    display : flex;
    flex-direction: column;
    border: 1px solid #dfdfdf;
`
const CalendarItem = styled.div`
    display: flex;
    flex-direction: row;
    border : 1px solid #454545;
    border-radius: 10px;
`
const filterCalendar = (choose, startDate, endDate) => {
    let chooseDate = new Date(choose).getTime();
    let start = new Date(startDate).getTime();
    let end = new Date(endDate).getTime();

    // getTime 했을 때, 시작날짜와 끝날짜 사이의 시간에 해당되는 일정만 띄움
    if(start <= chooseDate && chooseDate <= end){
        return true
    }else{
        return false
    }
}

const CalendarElement = ({data}) => {
    return(
        <CalendarItem>
            <h4 className = 'calTitle' >{data.title}</h4>
            <h5 className = 'calDate'>{data.dateStart}</h5>
            <h5 className = 'calDate'>{data.dateEnd}</h5>
        </CalendarItem>
    )
}


const CalendarList = ({date}) => {
    const calendarData = useSelector(state => state.content.showSchedules);
    return (
        <CalendarContainer>
            {calendarData && calendarData.map((item, index)=>{
                if(filterCalendar(date, item.dateStart, item.dateEnd) ){
                    return <CalendarElement data = {item}/>
                }
            })}
        </CalendarContainer>
    )
}
export {CalendarList}