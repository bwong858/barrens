import { connect } from 'react-redux';
import { fetchMessages, setMessages, sendMessage, updateMessages } from '../actions/messages';
import { changeChannel } from '../actions/user';

import MessageBoard from '../components/MessageBoard';

const mapStateToProps = ({ messages }, { socket }) => ({ // state, ownProps
  messages,
  socket
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: (lat, lon) => {
    dispatch(fetchMessages(lat, lon));
  },
  setMessages: messages => {
    dispatch(setMessages(messages));
  },
  sendMessage: message => {
    dispatch(sendMessage(message));
  },
  updateMessages: message => {
    dispatch(updateMessages(message));
  },
  changeChannel: channel => {
    dispatch(changeChannel(channel));
  }
});

const MessageBoardContainer = connect(mapStateToProps, mapDispatchToProps)(MessageBoard);

export default MessageBoardContainer;
