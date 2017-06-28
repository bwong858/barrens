import { SEND_MESSAGE } from './actionTypes';

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
});
