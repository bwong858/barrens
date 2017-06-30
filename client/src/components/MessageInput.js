import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super();
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const inp = this.state.input.trim();
    if (inp) {
      this.props.socket.emit('send', { ...this.props.user, text: this.state.input });
      this.setState({
        input: ''
      });
    }
  }

  render() {
    return (
      <div className="message-input">
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="New Message"
            onChange={this.handleChange}
            value={this.state.input}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default MessageInput;




// import React from 'react';

// const MessageInput = ({ socket, user }) => {
//   let input = '';

//   const handleChange = e => {
//     input = e.target.value;
//   };

//   const handleSend = () => {
//     socket.emit('send', { ...user, text: input });
//   };

//   return (
//     <div className="message-input">
//       <input type="text" placeholder="New Message" onChange={handleChange} />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default MessageInput;
