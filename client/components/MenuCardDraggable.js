import React from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import Paper from 'material-ui/Paper';
import CardActions from 'material-ui/Card/CardActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import SortableListItem from './SortableListItem';
import Menu from '../models/menuAPI';
import AddItemCard from './AddItemCard';
import Item from '../models/itemAPI';
import EditMenu from './EditMenu';
import ItemCard from './ItemCard';

export default class MenuCardDraggable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      expandable: false,
      style: this.props.style,
      items: [],
      updatedItemOnOrder: this.props.updatedItemOnOrder,
      draggingIndex: null,
    };
    this.onMouseEnter = e => this.handleOnMouseEnter(e);
    this.onMouseLeave = e => this.handleOnMouseLeave(e);
    this.removeItem = e => this.handleRemoveItem(e);
    this.editItem = e => this.handleEditItem(e);
    this.addNewItem = e => this.handleAddNewItem(e);
    this.addExistingItem = e => this.handleAddExistingItem(e);
    this.handleUpdateState = e => this.updateState(e);
  }

  componentWillMount() {
    Menu.getItems(this.props.menu.id)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  componentWillReceiveProps(newProps) {
    Menu.getItems(newProps.menu.id)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  updateState(obj) {
    this.setState(obj);
    if (obj.draggingIndex === null) {
      this.setState(obj, this.updateDatabase);
    }
  }

  updateDatabase() {
    console.log('in updateDatabase', this.state.items);
    Item.updateOrder(this.state.items);
  }

  showItems() {
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

  handleAddNewItem(itemObj) {
    const newItem = Object.assign({}, itemObj, {
      menuId: this.props.menu.id,
    });
    Item.create(newItem)
    .then(id => {
      const add = {
        menuId: this.props.menu.id,
        itemId: id.id,
        order: this.state.items.length,
      };
      Menu.addNewItem(add).then(() => {
        Menu.getItems(this.props.menu.id)
        .then(items => {
          this.setState({ items });
        });
      });
    });
  }

  handleAddExistingItem(itemObj) {
    const add = {
      menuId: this.props.menu.id,
      itemId: itemObj.id,
      order: this.state.items.length,
    };
    Menu.addExistingItem(add)
    .then(items => {
      this.setState({ items });
    });
  }

  handleRemoveItem(itemId) {
    Item.remove(itemId, this.props.menu.id)
    .then(items => {
      this.setState({ items });
    });
  }

  handleEditItem(itemObj) {
    Item.edit(itemObj)
    .then(() => {
      this.showItems();
    });
  }

  render() {
    const style = {
      floatingEditButton: {
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
      addItem: {
        width: '60%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    const itemCards = this.state.items.length
      ? this.state.items.map((item, index) => {
        let pic = item.item.picture;
        if (item.item.picture.length < 5 || item.item.picture === false) {
          pic = 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';
        }
        return (<ItemCard
          key={index}
          editing={this.props.editing}
          item={item.item}
          picture={pic}
          addItemToOrder={this.props.addItemToOrder}
          updateTotalPrice={this.props.updateTotalPrice}
          ownerId={this.props.ownerId}
          removeItem={this.removeItem}
          editItem={this.editItem}
        />);
      })
      : [];

    return (
      <div style={this.state.style}>
        <Paper zDepth={0}>
          <Card
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            containerStyle={{ backgroundColor: '#e0e0e0' }}
          >
            <CardTitle
              title={this.props.menu.name}
              subtitle={this.props.menu.description}
              // actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <div className="list">
                {itemCards.length
                  ? itemCards.map((itemCard, index) => (
                    <SortableListItem
                      key={index}
                      updateState={this.handleUpdateState}
                      draggingIndex={this.state.draggingIndex}
                      items={this.state.items}
                      sortId={index}
                      outline="list"
                    >{itemCard}</SortableListItem>
                    )
                  )
                  : null
                }
              </div>
              {this.props.editing
                ? <AddItemCard
                  key={this.state.items.length + 1}
                  addNewItem={this.addNewItem}
                  addExistingItem={this.addExistingItem}
                  style={style.addItem}
                  pic={'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
                  ownerId={this.props.ownerId}
                />
                : null
              }
            </CardText>
            {this.props.editing
              ? <CardActions style={style.cardActions}>
                <EditMenu
                  style={style.floatingEditButton}
                  id={this.props.menu.id}
                  name={this.props.menu.name}
                  description={this.props.menu.description}
                  editMenu={this.props.editMenu}
                />
                <FloatingActionButton
                  style={style.floatingDeleteButton}
                  mini
                  zDepth={2}
                  onTouchTap={() => this.props.deleteMenu(
                    this.props.menu.id, this.state.items.length
                  )}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </CardActions>
              : null
            }
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}
