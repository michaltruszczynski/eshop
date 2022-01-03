import { combineReducers } from 'redux';
import messageReducer from './message';
import userReducer from './user';
import authReducer from './auth';

const reducers = combineReducers({
      message: messageReducer,
      user: userReducer,
      auth: authReducer
});

export default reducers;