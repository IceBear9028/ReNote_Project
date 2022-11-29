import {LOGIN_USER} from "../_actions/types";


export default function (state = {}, action){
    // 여러 action의 type을 처리하기 위해 switch 문 작성
    switch(action.type){
        case LOGIN_USER :
            return {...state, loginSucess : action.payload}
            break;

        default:
            return state
    }
}