import React from 'react';

const MessageInput = () => {
  let input;

  const handleChange = (e) => {
    input = e.target.value;
  };

  const handleSend = () => {
    // post/socket that shit
    console.log(input);
  };

  return (
    <div className="message-input">
      <input type="text" placeholder="New Message" onChange={handleChange} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
