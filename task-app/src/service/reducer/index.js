import {combineReducers} from 'redux';
import authReducer from './authReducer';
import newsReducer from './newsReducer';
const rootReducer = combineReducers({
    news:newsReducer,
    auth:authReducer
})

export default rootReducer