import React from 'react';

const AreaListItem = ({area}) => {
  return (
    <div className="area-list-item">
      Area: {area.name}
    </div>
  );
};

export default AreaListItem;
