import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// as the actual value to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// --------------------------------------------------------------------------
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

//
const userReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  // action 两个参数，一个是type ,一个是可选的payLoad
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        // payload store the value => for reudcer to know what to update this state value
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// initial state is the second argument passed to the useReducer Hook
const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // dispatch is the seconde value returned from the useReducer hook => used to update the state
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);

  const setCurrentUser = (user) => {
    // dispatch accepts an object
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };
  // ---------_________---------_______-------------_________________________________________

  // only want to run this function once when component mounts
  // the moment this listener mounts it will check the authentication state automatically when initialize
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
