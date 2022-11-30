import React, {useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    useEffect(()=> {
        axios.get('/api/test')
            .then((response) => {console.log(response)});
    },[])

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

    return(
        <>
            <div className = "main">
                <h1>Main Page</h1>
                <button onClick={onClickHandler}>로그아웃</button>
            </div>
        </>
    )
}

export  {Landing}