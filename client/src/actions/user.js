import { SIGN_UP, LOG_IN, LOG_OUT } from './actionTypes';

export const signUp = (username, password) => ({
  type: SIGN_UP,
  username,
  password
});

export const logIn = (username, password) => ({
  type: LOG_IN,
  username,
  password
});

export const logOut = () => ({
  type: LOG_OUT
});
