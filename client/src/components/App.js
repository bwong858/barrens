import React from 'react';
import '../styles/app.scss';

import Navbar from './Navbar';
import AreaList from './AreaList';
import UserList from './UserList';
import MessageList from './MessageList';

import { dummyAreas, dummyUsers, dummyMessages } from '../dummyData';

const App = () => {
  return (
    <div>
      <h1 className="title">Barrens</h1>
      <Navbar />
      <div className="areas-messages-sidebar inline-block">
        <AreaList areas={dummyAreas} />
        <UserList users={dummyUsers} />
      </div>
      <MessageList messages={dummyMessages} />
    </div>
  );
};

export default App;
