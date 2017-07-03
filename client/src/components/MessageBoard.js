import React from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

const MessageBoard = ({
  socket,
  user,
  messages,
  getUserInfo,
  changeChannel
}) => {
  return (
    <div className="message-board">
      <div className="channels-users-sidebar inline-block">
        <ChannelList user={user} channels={dummyChannels} changeChannel={changeChannel} />
        <UserList users={dummyUsers} user={user} />
      </div>
      <div className="message-list-container inline-block">
        <MessageList messages={messages} user={user} />
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
    </div>
  );
};

export default MessageBoard;
