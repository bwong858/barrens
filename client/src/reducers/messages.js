import {
  FETCH_MESSAGES,
  SET_MESSAGES,
  UPDATE_MESSAGES
} from '../actions/actionTypes';

// import { dummyMessages } from '../dummyData';

const messages = (state = [], action) => {
  switch (action.type) {
  case SET_MESSAGES:
    return action.messages;
  // case FETCH_MESSAGES:
  //   fetch(`http://localhost:8000/api/messages/${action.coords.lat}/${action.coords.lon}`, {
  //     method: 'GET'
  //   })
  //     .then(messages => messages.json())
  //     .catch(err => {
  //       console.log('We suck:', err);
  //     });
  //   break;
  case UPDATE_MESSAGES:
    return [...state, action.message];
  default:
    return state;
  }
};

export default messages;
