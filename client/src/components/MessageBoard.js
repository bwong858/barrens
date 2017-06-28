import React from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

const MessageBoard = () => {
  return (
    <div className='home'>
      <div className="channels-messages-sidebar inline-block">
        <ChannelList channels={dummyChannels} />
        <UserList users={dummyUsers} />
      </div>
      <MessageList messages={dummyMessages} />
    </div>
  );
};

export default MessageBoard;
