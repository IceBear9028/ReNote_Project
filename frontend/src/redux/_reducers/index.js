import {combineReducers} from 'redux';
import user from './user_reducers';
import modal from './modal_reducers';
import content from './content_reducers';

const rootReducer = combineReducers({
    user,
    modal,
    content
})

export default rootReducer;