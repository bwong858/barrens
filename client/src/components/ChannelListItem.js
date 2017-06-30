import React from 'react';

const ChannelListItem = ({ user, channel, changeChannel }) => {
  const className = 'channel-list-item pointer-on-hover'
                    + (channel.name === user.channel ? ' selected' : '');
  return (
    <div className={className} onClick={() => changeChannel(channel.name)}>
      {channel.name}
    </div>
  );
};

export default ChannelListItem;
