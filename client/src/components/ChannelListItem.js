import React from 'react';

const ChannelListItem = ({channel, changeChannel}) => {
  return (
    <div className="channel-list-item" onClick={() => changeChannel(channel.name)}>
      {channel.name}
    </div>
  );
};

export default ChannelListItem;
