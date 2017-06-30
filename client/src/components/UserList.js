import React from 'react';

import UserListItem from './UserListItem';

const UserList = ({users, user}) => {
  const usersInChannel = users.filter(otherUser => otherUser.channel === user.channel);
  return (
    <div className="user-list">
      <h4 className="title">Users In This Channel</h4>
      { usersInChannel.map(user => <UserListItem key={user.id} user={user} />) }
    </div>
  );
};

export default UserList;
