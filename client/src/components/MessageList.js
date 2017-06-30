import React from 'react';

import MessageListItem from './MessageListItem';

const MessageList = ({ messages, user }) => {
  const messagesInChannel = messages.filter(message => message.channel === user.channel);
  return (
    <div className="message-list inline-block">
      <h2 className="title">Messages</h2>
      {messagesInChannel.length
        ? messagesInChannel.map(message => <MessageListItem key={message.id} message={message} />)
        : <h2> Loading.... </h2>}
    </div>
  );
};

export default MessageList;
