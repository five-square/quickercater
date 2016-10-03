import React from 'react';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import BankItemCard from './BankItemCard';

const BankItemList = (props) => (
  <List style={{ overflowY: 'auto', width: '100%', height: 350 }}>
    {
      props.items.map((item, index) =>
        <div key={index}>
          <BankItemCard
            editing={props.editing}
            item={item}
            menus={props.menus}
            editItemInBank={props.editItemInBank}
            deleteItemInBank={props.deleteItemInBank}
            addItemToMenu={props.addItemToMenu}
          />
          <Divider />
        </div>
      )
    }
  </List>
);

export default BankItemList;
