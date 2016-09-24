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

  handleAddItem(itemObj) {
    const newItem = Object.assign({}, itemObj, {
      menuId: this.state.id,
    });
    console.log('New item object: ', newItem);
    Item.createItem(newItem)
    .then(id => {
      const add = {
        menuId: this.state.id,
        itemId: id.id,
        order: this.state.items.length,
      };
      Menu.addItem(add).then(() => {
        console.log('item being added to menu obj', add);
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
      <div style={this.state.style}>
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
              {this.state.items.map((item, index) =>
                <ItemCard
                  key={index}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  picture={item.picture}
                  quanity={item.quanity}
                  addItemToOrder={this.props.addItemToOrder}
                  updateTotalPrice={this.props.updateTotalPrice}
                />
              ).concat(
                <AddItemCard
                  key={this.state.items.length + 1}
                  addItem={e => this.handleAddItem(e)}
                  style={addItemStyle}
                />
            )}
            </CardText>
            <CardActions style={style.cardActions}>
              <FloatingActionButton style={style.floatingActionButton} mini>
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
