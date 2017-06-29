import { FETCH_MESSAGES, SET_MESSAGES, SEND_MESSAGE, UPDATE_MESSAGES } from '../actions/actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
  case SET_MESSAGES:
    return action.messages;
  case FETCH_MESSAGES:
    fetch(`http://localhost:8000/api/messages/${action.coords.lat}/${action.coords.lon}`, {
      method: 'GET'
    })
      .then(res =>
        res.json()
      )
      .then(messages => {
        console.log(messages);
        return messages;
      })
      .catch(err => {
        console.log('We suck:', err);
        return state;
      });
    break;
  case SEND_MESSAGE:
    // this needs to be updated to emit and subscribe to socket
    return [...state, action.message];
  case UPDATE_MESSAGES:
    return [...state, action.message];
  default:
    return state;
  }
};

export default messages;
