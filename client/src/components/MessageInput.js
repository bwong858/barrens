import React from 'react';

const MessageInput = ({socket}) => {
  let input;

  const handleChange = (e) => {
    input = e.target.value;
  };

  const handleSend = () => {
    // post/socket that shit
    socket.emit('send', {
      region: 'some region',
      roomname: 'some roomname',
      userId: 2,
      text: input
    });
  };

  return (
    <div className="message-input">
      <input type="text" placeholder="New Message" onChange={handleChange} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
