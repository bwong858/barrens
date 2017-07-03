import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import io from 'socket.io-client';

import '../styles/app.scss';

import Navbar from './Navbar';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import Login from './Login';
import Signup from './Signup';
import {updateMessages} from '../actions/messages';
import {logIn} from '../actions/user';



const App = ({user, logIn, updateMessages}) => {
  const socket = io();
  let username;

  const checkUsername = () => {
    if (!username) {
      username = prompt('Actually enter a username.');
      checkUsername();
    } else {
      fetch(`http://localhost:8000/api/users/${username}`, {method: 'POST'})
        .then(res => {
          if (res.status === 201) {
            logIn(username);
            socket.on('message', message => {
              console.log('received message :D:D:D');
              updateMessages(message);
            });
            socket.emit('subscribe', user.region);
          } else {
            username = prompt('Unfortunately, that username is taken. Please try another.');
            checkUsername();
          }
        });
    }
  };

  if (user.username === 'anon') {
    username = prompt('Enter a steezy username.');
    checkUsername();
  }

  return (
    <div className="app">
      <Navbar />
      <h1 className="title">Barrens</h1>
      <h3>{user.region}</h3>
      <Switch>
        <Route exact path="/" render={props => <MessageBoardContainer socket={socket}/>}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  logIn: username => {
    dispatch(logIn(username));
  },
  updateMessages: message => {
    dispatch(updateMessages(message));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
