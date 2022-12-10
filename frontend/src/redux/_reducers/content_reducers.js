import {ALL_SCHEDULE} from "../_actions/types";

export default function(state = {}, action){
    switch (action.type){
        case ALL_SCHEDULE:
            return {...state, showSchedules : action.payload}
            break;

        default:
            return state
        }
}