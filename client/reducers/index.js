import { combineReducers } from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user.js';
import NewUserReducer from './reducer-create-user.js';

const allReducers = combineReducers({
  users: UserReducer,
  activeuser: ActiveUserReducer,
  newuser: NewUserReducer,
});

export default allReducers;
