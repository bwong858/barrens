import React from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

const fetchInitialMessages = (lat, lon) =>
  new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
    .then(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // return fetch(`https://vast-tor-38918.herokuapp.com/api/messages/${lat}/${lon}`);
      return fetch(`http://localhost:8000/api/messages/${lat}/${lon}`);
    })
    .then(res => res.json());

const MessageBoard = ({
  socket,
  user,
  messages,
  setMessages,
  getUserInfo,
  updateMessages,
  changeChannel
}) => {
  let fetching = true;

  if (!messages.length) {
    fetchInitialMessages().then(messages => {
      setMessages(messages);
      socket.on('message', message => {
        updateMessages(message);
      });
      socket.emit('subscribe', 'Market St');
    });
  } else {
    fetching = false;
  }

  return (
    <div className="message-board">
      <div className="channels-users-sidebar inline-block">
        <ChannelList user={user} channels={dummyChannels} changeChannel={changeChannel} />
        <UserList users={dummyUsers} user={user} />
      </div>
      <div className="message-list-container inline-block">
        <MessageList messages={messages} user={user} fetching={fetching} />
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
    </div>
  );
};

export default MessageBoard;
