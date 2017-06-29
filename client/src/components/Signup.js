import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/user';

const Signup = ({ dispatch }) => {
  let username = '';
  let password = '';
  let passwordConfirm = '';

  const handleUsernameChange = e => {
    username = e.target.value;
  };

  const handlePasswordChange = e => {
    password = e.target.value;
  };

  const handlePasswordConfirmChange = e => {
    passwordConfirm = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    username = username.trim();
    if (password === passwordConfirm && password !== '') {
      dispatch(signUp(username, password));
    } else {
      alert('Password is empty or passwords do not match');
    }
  };

  return (
    <div className="signup">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" placeholder="Desired Username" onChange={handleUsernameChange} />
        <input type="text" placeholder="Password" onChange={handlePasswordChange} />
        <input type="text" placeholder="Confirm Password" onChange={handlePasswordConfirmChange} />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default connect()(Signup);
