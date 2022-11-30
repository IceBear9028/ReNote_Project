// import React from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
// const Landing = () => {
//     const navigate = useNavigate();
//     const onClickHandler = () => {
//         axios.get('/api/users/logout')
//             .then((response) => {
//                 if(response.data.success){
//                     navigate('/login');
//                 }else{
//                     alert('로그아웃 실패!');
//                 }
//             })
//     }
//
//     return(
//         <>
//             <div className = "main">
//                 <h1>Main Page</h1>
//                 <button onClick={onClickHandler}>로그아웃</button>
//             </div>
//         </>
//     )
// }
//
// export  {Landing}