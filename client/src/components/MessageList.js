import React from 'react';

import MessageListItem from './MessageListItem';

const MessageList = ({ messages, user, fetching }) => {
  const messagesInChannel = messages.filter(message => message.channel === user.channel);
  return (
    <div className="message-list inline-block">
      <h2 className="title">Messages</h2>
      {fetching
        ? <h3> Loading... </h3>
        : messagesInChannel.length
          ? messagesInChannel.map(message => <MessageListItem key={message.id} message={message} user={user} />)
          : <h3> There are no messages in this channel! </h3>}
    </div>
  );
};

export default MessageList;
