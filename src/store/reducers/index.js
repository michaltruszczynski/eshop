import { combineReducers } from 'redux';
import messageReducer from './message';

const reducers = combineReducers({
      message: messageReducer
});

export default reducers;