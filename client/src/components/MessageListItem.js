import React from 'react';

/*
  TODOS:
    style username below message
    onClick DM button, should allow DM to poster
      optimally, prepopulate DM with "re: [message text]"
    username instead of userId
*/

const MessageListItem = ({ message, user }) => {
  const el = message.username === user.username
    ? <span className="own-message">
        {message.text}
        <span className="timestamp">{message.timestamp}</span>
      </span>
    : <span className="other-user-message">
        <span className="username">{message.username}</span>
        <br />
        <span>{message.text}</span>
        <span className="timestamp">{message.timestamp}</span>
      </span>;
  return (
    <div className="message-list-item">
      {el}
    </div>
  );
};

export default MessageListItem;
