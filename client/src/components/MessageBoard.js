// import React, { Component } from 'react';
import React from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

const MessageBoard = ({ socket, messages, fetchMessages, setMessages, sendMessage, updateMessages }) => {
  socket.on('message', message => {
    console.log('receivingklajd LE message', message);
    updateMessages(message);
  });
  // socket.init('subscribe', 'SF-general');
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // fetchMessages(lat, lon);
    fetch(`http://localhost:8000/api/messages/${lat}/${lon}`, {
      method: 'GET'
    })
      .then(res =>
        res.json()
      )
      .then(messages => {
        console.log(messages);
        setMessages(messages);
      })
      .catch(err => {
        console.log('We suck:', err);
      });
  });
  return (
    <div className="message-board">
      <div className="channels-users-sidebar inline-block">
        <ChannelList channels={dummyChannels} />
        <UserList users={dummyUsers} />
      </div>
      <div className="message-list-container inline-block">
        <MessageList messages={messages} />
        <MessageInput socket={socket} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageBoard;

// class MessageBoardOld extends Component {
//   constructor(props) {
//     super();
// this.state = {
//   messages: []
// };
// }

// componentWillMount() {
//   this.props.socket.on('message', message => {
//     console.log('receivingklajd LE message', message);
//     this.setState({
//       messages: [ ...this.state.messages, message ]
//     });
//   });
// }

// componentDidMount() {
//   navigator.geolocation.getCurrentPosition(pos => {
//     const lat = pos.coords.latitude;
//     const lon = pos.coords.longitude;

// TODO: add subscription
// this.fetchMessages(lat, lon)
//   .then(messages => {
//     this.setState({
//       messages
//     });
//     console.log(messages);
//   })
//   .catch(err => {
//     console.log('We suck:', err);
//   });
//   });
// }

// fetchMessages(lat, lon) {
//   return fetch(`http://localhost:8000/api/messages/${lat}/${lon}`, {
//     method: 'GET'
//   }).then(res =>
//     // set messages state
//     res.json()
//   );
// }

//   render() {
//     return (
//       <div className="message-board">
//         <div className="channels-users-sidebar inline-block">
//           <ChannelList channels={dummyChannels} />
//           <UserList users={dummyUsers} />
//         </div>
//         <div className="message-list-container inline-block">
//           <MessageList messages={this.state.messages} />
//           <MessageInput socket={this.props.socket} />
//         </div>
//       </div>
//     );
//   }
// }

// export default MessageBoardOld;
