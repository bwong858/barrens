import { FETCH_MESSAGES, SET_MESSAGES, SEND_MESSAGE, UPDATE_MESSAGES } from './actionTypes';

export const fetchMessages = (lat, lon) => ({
  type: FETCH_MESSAGES,
  coords: { lat, lon }
});

export const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
});

export const updateMessages = message => ({
  type: UPDATE_MESSAGES,
  message
});
