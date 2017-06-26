import React from 'react';

/*
  TODOS:
    style username below message
    onClick DM button, should allow DM to poster
      optimally, prepopulate DM with "re: [message text]"
    username instead of userId
*/

const MessageListItem = ({message}) => {
  return (
    <div className="message-list-item">
      {message.text}
      <br />
      user: {message.userId}
      <button>DM</button>
    </div>
  );
};

export default MessageListItem;
