import React, { Component } from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

class MessageBoard extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      this.fetchMessages(lat, lon)
        .then(messages => {
          this.setState({
            messages
          });
          console.log(messages);
        })
        .catch(err => {
          console.log('We suck:', err);
        });
    });
  }

  fetchMessages(lat, lon) {
    return fetch(`http://localhost:8000/api/messages/${lat}/${lon}`, {
      method: 'GET'
    }).then(res =>
      // set messages state
      res.json()
    );
  }

  render() {
    return (
      <div className="message-board">
        <div className="channels-users-sidebar inline-block">
          <ChannelList channels={dummyChannels} />
          <UserList users={dummyUsers} />
        </div>
        <div className="message-list-container inline-block">
          <MessageList messages={this.state.messages} />
          <MessageInput />
        </div>
      </div>
    );
  }
}

export default MessageBoard;
