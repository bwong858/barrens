import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import '../styles/app.scss';

import Navbar from './Navbar';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import Signup from './Signup';
import Login from './Login';
import { logIn } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  logIn: username => { dispatch(logIn(username)); }
});

const App = ({ user, logIn }) => {
  const socket = io();
  let username = prompt('Enter a steezy username.', 'SteezyBob');
  if (!username) {
    username = prompt('Actually enter a username.');
  } else {
    fetch(`http://localhost:8000/api/users/${username}`, { method: 'POST '})
      .then(statusCode => {
        if (statusCode === 201) {
          logIn(username);
        } else {
          username = prompt('Unfortunately, that username is taken. Please try another.');
        }
      });
  }
  return (
    <div className="app">
      <Navbar />
      <h1 className="title">Barrens</h1>
      <h3>{user.region}</h3>
      <Switch>
        <Route exact path="/" render={props => <MessageBoardContainer socket={socket} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
