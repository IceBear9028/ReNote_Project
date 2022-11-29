import React, {useEffect} from "react";
import axios from 'axios';

const Landing = () => {
    useEffect(()=> {
        axios.get('/api/test')
            .then((response) => {console.log(response)})
    },[])
    return(
        <>
            <div></div>
        </>
    )
}

export  {Landing}