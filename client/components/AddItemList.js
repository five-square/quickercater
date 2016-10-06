import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';

const AddItemList = (props) => {
  const style = {
    priceChip: {
      margin: 5,
      padding: 2,
      backgroundColor: '#26C6DA',
      position: 'absolute',
      right: -40,
      top: 20,
    },
    priceText: {
      fontSize: '1.1em',
      color: 'white',
    },
    listItem: {
      position: 'relative',
      wordBreak: 'word-wrap',
      width: '80%',
    },
  };

  return (
    <List style={{ overflowY: 'auto', height: 300 }}>
      {props.items.map((item, index) =>
        <div>
          <ListItem
            key={index * 3}
            primaryText={item.name}
            secondaryText={item.description}
            secondaryTextLines={2}
            innerDivStyle={style.listItem}
            leftAvatar={
              <Avatar
                key={(index * 3) + 1}
                src={
                  item.picture
                  || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'
                }
              />
            }
            onTouchTap={() => props.addExistingItem(item)}
            children={
              <Chip key={(index * 3) + 2} style={style.priceChip}>
                <span style={style.priceText}>{`$${item.price}`}</span>
              </Chip>
            }
          />
          <Divider />
        </div>
      )}
    </List>
  );
};

export default AddItemList;
