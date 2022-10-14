import { combineReducers } from 'redux';
// allow create a final big reducer => by combining smaller reducers together

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
