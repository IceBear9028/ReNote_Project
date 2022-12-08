import {MODAL_OPEN} from "../_actions/types";

export default function(state = {setModal : false}, action){
    switch(action.type){
        case MODAL_OPEN:
            return {...state, setModal :action.payload}
            break;

        default :
            return {}
    }
}