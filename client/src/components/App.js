import React from 'react';
import '../styles/app.scss';

import Navbar from './Navbar';
import AreaList from './AreaList';
import MessageList from './MessageList';

import {dummyAreas, dummyMessages} from '../dummyData';

const App = () => {
  return (
    <div>
      <h1>Barrens Hello</h1>
      <Navbar />
      <AreaList areas={dummyAreas} />
      <MessageList messages={dummyMessages} />
    </div>
  );
};

export default App;
