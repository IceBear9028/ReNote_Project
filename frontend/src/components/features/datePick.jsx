import React, {useState} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleDatePick = ({dateStart, setDateStart, dateEnd, setDateEnd}) => {
    return (
        <div>
            <DatePicker
                selected={dateStart}
                onChange={(date) => setDateStart(date)}
                showTimeSelect
                selectsStart
                startDate = {dateStart}
                endDate = {dateEnd}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            <DatePicker
                selected={dateEnd}
                onChange={(date) => setDateEnd(date)}
                showTimeSelect
                selectsEnd
                startDate = {dateStart}
                endDate = {dateEnd}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate = {dateStart}
            />
        </div>
    );
};

export {ScheduleDatePick}