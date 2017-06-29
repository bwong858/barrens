import { SIGN_UP, LOG_IN, LOG_OUT } from '../actions/actionTypes';

const initialState = {
  username: 'anon',
  region: 'Market St',
  channel: 'General'
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      // post request to see if desired username is taken
      // password must have length of at least 10 characters
      console.log('SIGNING UP');
      return state;
    case LOG_IN:
      // post request to compare username + hash(pass + salt) to username + hash
      console.log('LOGGING IN');
      return state;
    case LOG_OUT:
      // set to initial state but keep current region
      return { ...initialState, region: state.region };
    default:
      return state;
  }
};

export default user;
