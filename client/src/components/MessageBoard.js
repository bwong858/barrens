import React from 'react';
import Promise from 'bluebird';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

const fetchInitialMessages = (lat, lon) => {
  const getPos = () =>
    new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

  return getPos()
    .then(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      return fetch(`http://localhost:8000/api/messages/${lat}/${lon}`);
    })
    .then(res => res.json());
};

const MessageBoard = ({ socket, messages, setMessages, sendMessage, updateMessages }) => {
  if (!messages.length) {
    // problematic if there are no messages to fetch - will continue to create sockets; however, must create socket exactly once in order to begin populating messages on emit
    // if messages state is actually empty, message send MUST trigger re-render in order to ever render the message(s)
    fetchInitialMessages().then(messages => {
      setMessages(messages);
      socket.on('message', message => {
        updateMessages(message);
      });
      // socket.init('subscribe', 'SF-general');
    });
  }

  return (
    <div className="message-board">
      <div className="channels-users-sidebar inline-block">
        <ChannelList channels={dummyChannels} />
        <UserList users={dummyUsers} />
      </div>
      <div className="message-list-container inline-block">
        <MessageList messages={messages.length ? messages : [{ text:
        'Loading messages...' }]} />
        <MessageInput socket={socket} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageBoard;
