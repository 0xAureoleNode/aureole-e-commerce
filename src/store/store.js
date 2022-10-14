// receive actions and dispatch into reducers to update the state

import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger'; // see what the state looks like before an action is dispatched
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));
// store fundamentally
export const store = createStore(rootReducer, undefined, composedEnhancers);
