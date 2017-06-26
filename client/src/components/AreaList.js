import React from 'react';

import AreaListItem from './AreaListItem';

/*
TODOS:
  add onClick event for changing area
  hover-over styling
  styling for current room
*/

const AreaList = ({ areas }) => {
  return (
    <div className="area-list">
      <h4 className="title">Areas</h4>
      {areas.map(area => <AreaListItem key={area.id} area={area} />)}
    </div>
  );
};

export default AreaList;
