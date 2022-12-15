import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";

const ElementDiv = styled.div`
    display : flex;
    flex-direction: column;
    border : 1px solid #dfdfdf;
`
const TopContainer = styled.div`
    display : flex;
    flex-direction: row;
    justify-content: space-between;
`
const MidContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


const DownContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h4`
    font-size: 20px;
`
const Date = styled.p`
    font-size: 15px;
`
const Text = styled.div`
    font-size: 15px;
`

const ScheduleElement = ({text, title,creationDate, startDate, endDate, id}) => {
    const delSchedule = () => {
        let body = { _id : id }
        axios.post('/api/document/delDocument', body)
            .then((res)=> {
                if(res.data.success){
                    alert('삭제가 완료되었습니다.');
                    window.location.replace("/main");
                }else{
                    alert('예상치 못한 오류가 발생하였습니다.');
                }
            })
    }
    const contentText = () => {
        if(!showAll){
            const textSlice = text.substring(0, 10);
            return textSlice.concat('...');
        }else{
            return text;
        }
    }
    const [showAll, setShowAll] = useState(false);
    const onShowContentHandler = () => {
        setShowAll(!showAll);
    }

    return(
        <>
            <ElementDiv>
                <TopContainer>
                    <Title>{title}</Title>
                    <button className = "deleteScheduleBTN" onClick={delSchedule}>일정삭제</button>
                </TopContainer>
                <MidContainer>
                    {startDate}
                    {endDate}
                </MidContainer>
                <DownContainer>
                    <Date>{creationDate}</Date>
                    <Text>{contentText()}</Text>
                    <button className= "showAll" onClick={onShowContentHandler}>전체보기</button>
                </DownContainer>
            </ElementDiv>
        </>
    )
}

export {ScheduleElement}