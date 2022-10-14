// receive actions and dispatch into reducers to update the state

import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // see what the state looks like before an action is dispatched
import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));
// store fundamentally
export const store = createStore(rootReducer, undefined, composedEnhancers);
