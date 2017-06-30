import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import '../styles/app.scss';

import Navbar from './Navbar';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import Signup from './Signup';
import Login from './Login';

const mapStateToProps = ({ user }) => ({
  user
});

const App = ({ user }) => {
  const socket = io();
  return (
    <div className="app">
      <Navbar />
      <h1 className="title">Barrens</h1>
      <h3>{user.region}</h3>
      <Switch>
        <Route path="/messages" render={props => <MessageBoardContainer socket={socket} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(App));
