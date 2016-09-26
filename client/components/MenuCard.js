import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import Paper from 'material-ui/Paper';
import CardActions from 'material-ui/Card/CardActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import KeyUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ItemCard from './ItemCard';
import Menu from '../models/menuAPI';
import AddItemCard from './AddItemsButton';
import Item from '../models/itemAPI';
import EditMenu from './EditMenu';

export default class MenuCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      expandable: false,
      style: this.props.style,
      items: [],
      updatedItemOnOrder: this.props.updatedItemOnOrder,
    };
  }

  componentWillMount() {
    Menu.getItems(this.props.menu.id)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  handleOnMouseEnter() {
    this.setState({
      hover: 5,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      hover: 2,
    });
  }

  handleAddItemToOrder(itemObj) {
    this.props.addItemToOrder(itemObj);
  }

  handleEditMenu() {
  }

  handleAddItem(itemObj) {
    const newItem = Object.assign({}, itemObj, {
      menuId: this.props.menu.id,
    });
    Item.createItem(newItem)
    .then(id => {
      const add = {
        menuId: this.props.menu.id,
        itemId: id.id,
        order: this.state.items.length,
      };
      Menu.addItem(add).then(() => {
        Menu.getItems(this.props.menu.id)
        .then(items => {
          this.setState({ items });
        });
      });
    });
  }

  render() {
    const style = {
      floatingEditButton: {
        right: 170,
        bottom: 20,
        position: 'absolute',
      },
      floatingUpButton: {
        right: 120,
        bottom: 20,
        position: 'absolute',
      },
      floatingDownButton: {
        right: 70,
        bottom: 20,
        position: 'absolute',
      },
      floatingDeleteButton: {
        right: 20,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        position: 'relative',
        height: 30,
      },
    };
    const addItemStyle = {
      width: '60%',
      flex: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div style={this.state.style}>
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
            containerStyle={{ backgroundColor: '#e0e0e0' }}
          >
            <CardTitle
              title={this.props.menu.name}
              subtitle={this.props.menu.description}
              actAsExpander
              showExpandableButton={false}
            />
            <CardText expandable>
              {this.state.items.map((itemInfo, index) => {
                let pic = itemInfo.item.picture;
                if (itemInfo.item.picture.length < 5 || itemInfo.item.picture === false) {
                  pic = 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';
                }
                return (<ItemCard
                  key={index}
                  id={itemInfo.item.id}
                  name={itemInfo.item.name}
                  description={itemInfo.item.description}
                  price={itemInfo.item.price}
                  picture={pic}
                  addItemToOrder={this.props.addItemToOrder}
                  updateTotalPrice={this.props.updateTotalPrice}
                  ownerId={this.props.ownerId}
                />);
              }).concat(
                <AddItemCard
                  key={this.state.items.length + 1}
                  addItem={e => this.handleAddItem(e)}
                  style={addItemStyle}
                  pic={'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
                />
            )}
            </CardText>
            <CardActions style={style.cardActions}>
              <EditMenu
                style={style.floatingEditButton}
                id={this.props.menu.id}
                name={this.props.menu.name}
                description={this.props.menu.description}
                editMenu={this.props.editMenu}
              />
              <FloatingActionButton
                style={style.floatingUpButton}
                mini
                onTouchTap={e => {
                  e.preventDefault();
                  this.props.moveMenu('UP', this.props.menu.id);
                }}
              >
                <KeyUp />
              </FloatingActionButton>
              <FloatingActionButton
                style={style.floatingDownButton}
                mini
                onTouchTap={e => {
                  e.preventDefault();
                  this.props.moveMenu('DOWN', this.props.menu.id);
                }}
              >
                <KeyDown />
              </FloatingActionButton>
              <FloatingActionButton
                style={style.floatingDeleteButton}
                mini
                onTouchTap={e => {
                  e.preventDefault();
                  this.props.deleteMenu(this.props.menu.id);
                }}
              >
                <ContentRemove />
              </FloatingActionButton>
            </CardActions>
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}
