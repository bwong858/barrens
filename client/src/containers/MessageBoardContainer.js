import { connect } from 'react-redux';
import { fetchMessages, setMessages, sendMessage, updateMessages } from '../actions/messages';

import MessageBoard from '../components/MessageBoard';

const mapStateToProps = ({ messages }, { socket }) => ({ // state, ownProps
  messages,
  socket
  // messages: fetchMessages(120, 120) // need lat and lon
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
  }
});

const MessageBoardContainer = connect(mapStateToProps, mapDispatchToProps)(MessageBoard);

export default MessageBoardContainer;
