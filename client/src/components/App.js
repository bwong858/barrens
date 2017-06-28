import React from 'react';
import { Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';

import '../styles/app.scss';

import Navbar from './Navbar';
import MessageBoard from './MessageBoard';
import Signup from './Signup';
import Login from './Login';

const App = () => {
  const socket = io();
  return (
    <div>
      <Navbar />
      <h1 className="title">Barrens</h1>
      <Switch>
        <Route path='/messages' render={props => <MessageBoard socket={socket} />} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
};

export default App;
