import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const SearchBar = (props) => (
  <div>
    <AutoComplete
      floatingLabelText="Enter Caterer Name"
      filter={AutoComplete.fuzzyFilter}
      dataSource={props.items}
      maxSearchResults={5}
    />
  </div>
);

export default SearchBar;
