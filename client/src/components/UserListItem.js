import React from 'react';

const UserListItem = ({ username }) => {
  return (
    <div className="user-list-item">
      { username }
    </div>
  );
};

export default UserListItem;
