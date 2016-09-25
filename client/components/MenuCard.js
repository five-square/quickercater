import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import Paper from 'material-ui/Paper';
import CardActions from 'material-ui/Card/CardActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ItemCard from './ItemCard';
import Menu from '../models/menuAPI';
import AddItemCard from './AddItemsButton';
import Item from '../models/itemAPI';

export default class MenuCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      expandable: false,
      style: this.props.style,
      id: this.props.menu.id,
      name: this.props.menu.name,
      items: [],
      description: this.props.menu.description,
      updatedItemOnOrder: this.props.updatedItemOnOrder,
      show: this.props.show,
    };
  }

  componentWillMount() {
    Menu.getItems(this.state.id)
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

  handleMenuDelete() {
    this.setState({ show: false });
    this.props.deleteMenu(this.props.menu.id);
  }

  handleAddItem(itemObj) {
    const newItem = Object.assign({}, itemObj, {
      menuId: this.state.id,
    });
    Item.createItem(newItem)
    .then(id => {
      const add = {
        menuId: this.state.id,
        itemId: id.id,
        order: this.state.items.length,
      };
      Menu.addItem(add).then(() => {
        Menu.getItems(this.state.id)
        .then(items => {
          this.setState({ items });
        });
      });
    });
  }

  render() {
    const style = {
      floatingActionButton: {
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
      this.state.show
        ? <div style={this.state.style}>
          <Paper zDepth={this.state.hover}>
            <Card
              onMouseEnter={e => this.handleOnMouseEnter(e)}
              onMouseLeave={e => this.handleOnMouseLeave(e)}
              containerStyle={{ backgroundColor: '#e0e0e0' }}
            >
              <CardTitle
                title={this.state.name}
                subtitle={this.state.description}
                actAsExpander
                showExpandableButton={false}
              />
              <CardText expandable={false}>
                {this.state.items.map((itemInfo, index) => {
                  var pic = itemInfo.item.picture;
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
                <FloatingActionButton
                  style={style.floatingActionButton}
                  mini
                  onTouchTap={e => {
                    e.preventDefault();
                    this.handleMenuDelete(e);
                  }}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </CardActions>
            </Card>
          </Paper>
          <br />
        </div>
      : null
    );
  }
}
