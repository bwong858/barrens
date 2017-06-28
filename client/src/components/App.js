import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/app.scss';

import Navbar from './Navbar';
import MessageBoard from './MessageBoard';
import Signup from './Signup';
import Login from './Login';

const App = () => {
  return (
    <div>
      <Navbar />
      <h1 className="title">Barrens</h1>
      <Switch>
        <Route path='/messages' component={MessageBoard} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
};

export default App;
