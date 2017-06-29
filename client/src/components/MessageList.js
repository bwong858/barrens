import React from 'react';

import MessageListItem from './MessageListItem';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list inline-block">
      <h2 className="title">Messages</h2>
      {messages.length
        ? messages.map(message => <MessageListItem key={message.id} message={message} />)
        : <h2> Loading.... </h2>}
    </div>
  );
};

export default MessageList;
