import React from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import Paper from 'material-ui/Paper';
import CardActions from 'material-ui/Card/CardActions';
// import { Sortable } from 'react-sortable';

import SortableListItem from './SortableListItem';
import Menu from '../models/menuAPI';
import AddItemCard from './AddItemCard';
import Item from '../models/itemAPI';
import EditButtons from './EditButtons';
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
  }

  componentWillMount() {
    Menu.getItems(this.props.menu.id)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  updateState(obj) {
    this.setState(obj);
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

  handleMoveItem(direction, itemId) { // in progress
    Item.move(direction, itemId, this.props.id)
    .then(() => {
      this.showItems();
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
        right: 170,
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
          removeItem={e => this.handleRemoveItem(e)}
          editItem={e => this.handleEditItem(e)}
          moveItem={(d, i, m) => this.handleMoveItem(d, i, m)}
        />);
      })
      : [];

    return (
      <div style={this.state.style}>
        <Paper zDepth={0}>
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
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
                      updateState={e => this.updateState(e)}
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
                  addNewItem={e => this.handleAddNewItem(e)}
                  addExistingItem={e => this.handleAddExistingItem(e)}
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
                <EditButtons
                  secondary={false}
                  targetType={'menu'}
                  target={this.props.menu}
                  move={this.props.moveMenu}
                  delete={this.props.deleteMenu}
                />
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
