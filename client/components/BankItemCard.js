import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Chip from 'material-ui/Chip';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EditItem from './EditItem';

export default class BankItemCard extends Component {

  constructor(props) {
    super(props);
    console.log('in BankItemCard constructor', this.props);
    this.state = {
      hover: 0,
      id: this.props.item.id,
    };
  }

            // <EditButtons />
  render() {
    const style = {
      floatingEditButton: {
        right: 115,
        bottom: 15,
        position: 'absolute',
      },
      floatingAddButton: {
        right: 15,
        bottom: 15,
        position: 'absolute',
      },
      floatingDeleteButton: {
        right: 65,
        bottom: 15,
        position: 'absolute',
      },
      listItem: {
        position: 'relative',
        paddingTop: 1,
      },
      addItem: {
        width: '95%',
        height: '10%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      priceChip: {
        margin: 5,
        padding: 2,
        backgroundColor: '#26C6DA',
        position: 'absolute',
        right: 165,
        bottom: 10,
      },
      priceText: {
        fontSize: '1.1em',
        color: 'white',
      },
    };

        // children={
    return (
      <ListItem
        primaryText={this.props.item.name}
        secondaryText={this.props.item.description}
        innerDivStyle={style.listItem}
        leftAvatar={
          <Avatar
            src={
              this.props.picture
              || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'
            }
          />
        }
      >
        <Chip style={style.priceChip}>
          <span style={style.priceText}>{`$${(+this.props.item.price).toFixed(2)}`}</span>
        </Chip>
        <EditItem
          style={style.floatingEditButton}
          id={this.props.item.id}
          name={this.props.item.name}
          description={this.props.item.description}
          picture={this.props.item.picture || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
          editItem={this.props.editItem}
        />
        <FloatingActionButton
          style={style.floatingAddButton}
          secondary
          zDepth={0}
          mini
          onTouchTap={() => {
            alert('Add to menu!');
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
        <FloatingActionButton
          style={style.floatingDeleteButton}
          secondary
          zDepth={0}
          mini
          onTouchTap={() => {
            alert('Delete completely!');
          }}
        >
          <ContentRemove />
        </FloatingActionButton>
      </ListItem>
    );
  }
}
