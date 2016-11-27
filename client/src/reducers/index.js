import { combineReducers } from 'redux';
import urlReducer from './url_reducers';
const rootReducer = combineReducers({
    urls:urlReducer
});

export default rootReducer;
