import React from 'react';
import { Link } from 'react-router-dom';

/*
  TODOS:
    use react-router for links
*/

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="messages-events">
        <Link to="/messages">Message Board</Link>
      </span>
      <span className="signup-login">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </span>
    </div>
  );
};

export default Navbar;
