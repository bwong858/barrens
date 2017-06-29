import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/user';

const Login = ({ dispatch }) => {
  let username = '';
  let password = '';

  const handleUsernameChange = e => {
    username = e.target.value;
  };

  const handlePasswordChange = e => {
    password = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    username = username.trim();
    dispatch(logIn(username, password));
  };

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={handleUsernameChange} />
        <input type="text" placeholder="Password" onChange={handlePasswordChange} />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default connect()(Login);
