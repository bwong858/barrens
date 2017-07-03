import { connect } from 'react-redux';
import { fetchMessages, setMessages, updateMessages } from '../actions/messages';
import { changeChannel } from '../actions/user';

import MessageBoard from '../components/MessageBoard';

const mapStateToProps = ({ messages, user }, { socket }) => ({ // state, ownProps
  messages,
  user,
  socket
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: (lat, lon) => {
    dispatch(fetchMessages(lat, lon));
  },
  setMessages: messages => {
    dispatch(setMessages(messages));
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
