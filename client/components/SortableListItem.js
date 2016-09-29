import React from 'react';
import { Sortable } from 'react-sortable';

const SortableListItem = (props) => (
  <div {...props} className="list-item">{props.children}</div>
);

export default Sortable(SortableListItem);
