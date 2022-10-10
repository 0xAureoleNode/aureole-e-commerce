import { combineReducers } from 'redux'; // create final big reducer

import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
});
