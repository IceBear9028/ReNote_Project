import { useState } from 'react';
import {CalendarList} from "./calendarList";
import Calendar from 'react-calendar';

const CalendarCom = () => {
    const [date, setDate] = useState(new Date());

    return(
        <div className = "calendarContainer">
            <Calendar onChange={setDate} value={date}/>
            <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
                {date.toString()}
            </p>
            <CalendarList date = {date}/>
        </div>
    )
}

export {CalendarCom}