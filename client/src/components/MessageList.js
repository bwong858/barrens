import React from 'react';

import MessageListItem from './MessageListItem';

const MessageList = ({messages, user}) => {
  const messagesInChannel = messages.filter(message => message.channel === user.channel);
  return (
    <div className="message-list inline-block">
      <h2 className="title">Messages</h2>
      {messagesInChannel.length
        ? messagesInChannel.map(message => <MessageListItem key={message.id} message={message} user={user}/>)
        : <h3> There are no messages in this channel! </h3>}
    </div>
  );
};

export default MessageList;
