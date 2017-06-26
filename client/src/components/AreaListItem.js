import React from 'react';

const AreaListItem = ({area}) => {
  return (
    <li className="area-list-item">
      I am an item :/
      Area: {area.name}
    </li>
  );
};

export default AreaListItem;
