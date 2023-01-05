import ReactModal from 'react-modal';
import {useState} from "react";
import {ScheduleDatePick} from "../../features/datePick";
import axios from 'axios';

const CreateSchedule = ({onSchedule, setOnSchedule}) => {
    // body 에 들어갈 data 선언&초기화
    const [title, setTitle] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const createDate = new Date();
    const [text, setText] = useState('');

    // 도큐먼트 id 가 필요
    // const user_id = useSelector(state => state.user.userData._id);
    // body 에 들어가는 data 변수화
    const onTitleHandle = (event) => {setTitle(event.currentTarget.value);};
    const onTextHandle = (event) => {setText(event.currentTarget.value)};

    // 컴포넌트 컨트롤
    const onCancelHandler = () => {
        setOnSchedule(false);
    }
    const onSubmitHandle = () => {
        let body = {
            title : title,
            creationDate : createDate,
            dateStart : dateStart,
            dateEnd : dateEnd,
            text : text
        }
        axios.post('/api/document/createDocument', body)
            .then((res) => {
                if(res.data.success){
                    alert("저장이 완료되었습니다.");
                }else{
                    alert("저장하는데 예상치 못한 오류가 발생하였습니다.");
                }
            }).then(onCancelHandler)
        window.location.replace("/main");
    }

    return(
        <>
            <ReactModal isOpen = {onSchedule}>
                <div className='buttonContainer'>
                    <button onClick={onSubmitHandle}>확인</button>
                    <button onClick={onCancelHandler}>취소</button>
                </div>
                <div className = 'addSchedule'>
                    <form className = 'addScheduleForm'>
                        제목 : <input className = 'scheduleTitle' type = 'text' onChange={onTitleHandle}/>
                        메모 : <input className = 'scheduleText' type = 'text' onChange={onTextHandle} />
                        <ScheduleDatePick dateStart = {dateStart} setDateStart = {setDateStart}
                                          dateEnd = {dateEnd} setDateEnd = {setDateEnd} />
                    </form>
                </div>

            </ReactModal>
        </>
    )
}

export { CreateSchedule };