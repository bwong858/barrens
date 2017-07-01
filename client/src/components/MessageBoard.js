import React from 'react';
// import Promise from 'bluebird';

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

      // return fetch(`https://vast-tor-38918.herokuapp.com/api/messages/${lat}/${lon}`);
      return fetch(`http://localhost:8000/api/messages/${lat}/${lon}`);
    })
    .then(res => res.json());
};

const MessageBoard = ({ socket, user, messages, setMessages, getUserInfo, updateMessages, changeChannel }) => {
  let fetching = true;

  if (!messages.length) {
    // problematic if there are no messages to fetch - will continue to create sockets; however, must create socket exactly once in order to begin populating messages on emit
    // if messages state is actually empty, message send MUST trigger re-render in order to ever render the message(s)
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
  // let fetching = false; // for use with dummyData

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
