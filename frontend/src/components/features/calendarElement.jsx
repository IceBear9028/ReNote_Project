import React, {useState} from "react";
import styled from "styled-components";


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

const CalendarElement = ({item}) => {
    const contentText = () => {
        if(!showAll){
            const textSlice = item.text.substring(0, 10);
            return textSlice.concat('...');
        }else{
            return item.text;
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
                    <Title>{item.title}</Title>
                    <button className= "showAll" onClick={onShowContentHandler}>전체보기</button>
                </TopContainer>
                <DownContainer>
                    <Date>{item.creationDate}</Date>
                    <Text>{contentText()}</Text>
                </DownContainer>
            </ElementDiv>
        </>
    )
}

export {CalendarElement}