import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Chip from 'material-ui/Chip';
// import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddItemToMenu from './AddItemToMenu';
import EditItem from './EditItem';

export default class BankItemCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.id,
    };
  }

            // <EditButtons />
  render() {
    const style = {
      floatingEditButton: {
        right: -85,
        bottom: 8,
        position: 'absolute',
      },
      floatingAddButton: {
        right: -185,
        bottom: 8,
        position: 'absolute',
      },
      floatingDeleteButton: {
        right: -135,
        bottom: 8,
        position: 'absolute',
      },
      listItem: {
        position: 'relative',
        wordBreak: 'word-wrap',
        width: '60%',
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
        right: -188,
        bottom: 48,
      },
      priceText: {
        fontSize: '1.1em',
        color: 'white',
      },
    };

        // <Paper zDepth={1}>
        //   <h2>{this.props.item.name}</h2>
        //   <p>{this.props.item.description}</p>
        // </Paper>
        // children={
    return (
      <ListItem
        primaryText={this.props.item.name}
        secondaryText={this.props.item.description}
        secondaryTextLines={2}
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
          price={this.props.item.price}
          picture={this.props.item.picture || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
          editItem={this.props.editItemInBank}
        />
        <AddItemToMenu
          style={style.floatingAddButton}
          menus={this.props.menus}
          item={this.props.item}
          addItemToMenu={this.props.addItemToMenu}
        />
        <FloatingActionButton
          style={style.floatingDeleteButton}
          secondary
          zDepth={0}
          mini
          onTouchTap={() => this.props.deleteItemInBank(this.props.item.id)}
        >
          <ContentRemove />
        </FloatingActionButton>
      </ListItem>
    );
  }
}
