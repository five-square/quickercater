import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

const ItemList = (props) => {
  const style = {
    priceChip: {
      margin: 5,
      padding: 2,
      backgroundColor: '#26C6DA',
      position: 'absolute',
      right: 10,
      top: 12,
    },
    priceText: {
      fontSize: '1.1em',
      color: 'white',
    },
    listItem: {
      position: 'relative',
    },
  };

  // handleAddExisting(item) {
  //   props.
  // }

  console.log('in ItemList: ', props.items);

  return (
    <List>
      <Subheader inset>Existing Items</Subheader>
      {
        props.items.map((item, index) =>
          <ListItem
            key={index}
            primaryText={item.name}
            secondaryText={item.description}
            leftAvatar={
              <Avatar
                src={
                  item.picture
                  || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'
                }
              />
            }
            onTouchTap={() => props.addExistingItem(item)}
            children={
              <Chip style={style.priceChip}>
                <span style={style.priceText}>{`$${item.price}`}</span>
              </Chip>
            }
          />
        )
      }
    </List>
  );
};

export default ItemList;
