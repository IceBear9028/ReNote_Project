import React,{useEffect} from "react";
import {useDispatch} from "react-redux";
import {authUser} from "../redux/_actions/user_action";
import {useNavigate} from "react-router-dom";

// 이러한 어나니머스 함수는 export 를 통해서 react 컴포넌트로 작동시킨다.
export default function(SpecificComponent, option, adminRoute = null){
    //null -> 아무나 출입가능
    //true -> 로그인한 사람만 출입가능
    //false -> 로그인한 사람은 출입불가
    function AuthenticationCheck(){
        const navigate = useNavigate();
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(authUser()).then((res) => {
                // 로그인하지 않은 상태
                if(!res.payload.isAuth){
                    //로그인이 필요한 페이지의 경우
                    if(option){
                        navigate('/login');
                    }
                // 로그인을 한 상태
                }else{
                    //admin이 아닌 사용자가 admin 페이지를 접근하려는 경우
                    if(adminRoute && !res.payload.isAdmin){
                        navigate('/main');
                    //로그인한 유저는 들어갈 수 없는 페이지를 접근하려는 경우
                    }else{
                        navigate('/main');
                    }
                }
            })
        },[])
        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}
