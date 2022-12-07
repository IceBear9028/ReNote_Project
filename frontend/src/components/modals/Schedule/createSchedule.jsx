import ReactModal from 'react-modal';
import { useState } from 'react';

const CreateSchedule = ({isOpen, onSubmit}) => {
    const [open, setOpen] = useState(false);

    const handleClickSubmit = () => {
        onSubmit();
    }
    const handleClickCancel = () => {
        if(isOpen){
            setOpen(!open);
        }

    }
    return(
        <>
            <ReactModal isOpen = {open}>
                <div>시험창입니다.</div>
                <button onClick={handleClickSubmit}>확인</button>
                <button onClick={handleClickCancel}>취소</button>
            </ReactModal>
        </>
    )
}

export { CreateSchedule };