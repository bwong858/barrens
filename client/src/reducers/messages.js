import {
  SET_MESSAGES,
  UPDATE_MESSAGES
} from '../actions/actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
  case SET_MESSAGES:
    return action.messages;
  case UPDATE_MESSAGES:
    return [...state, action.message];
  default:
    return state;
  }
};

export default messages;
