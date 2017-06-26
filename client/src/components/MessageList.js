import React from 'react';

import MessageListItem from './MessageListItem';

const MessageList = ({messages}) => {
  return (
    <div className="message-list">
      {messages.map(message => <MessageListItem key={message.id} message={message} />)}
    </div>
  );
};

export default MessageList;
