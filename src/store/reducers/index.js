import { combineReducers } from 'redux';
import messageReducer from './message';
import userReducer from './user';

const reducers = combineReducers({
      message: messageReducer,
      user: userReducer
});

export default reducers;