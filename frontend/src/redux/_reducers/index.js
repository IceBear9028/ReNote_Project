import {combineReducers} from 'redux';
import user from './user_reducers';
import modal from './modal_reducers'

const rootReducer = combineReducers({
    user,
    modal
})

export default rootReducer;