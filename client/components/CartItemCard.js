import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

// import CardActions from 'material-ui/Card/CardActions';
// import FlatButton from 'material-ui/FlatButton';

export default class CartItemCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      id: '',
      name: '',
      price: '',
      description: '',
      picture: '',
      quantity: 1,
      qtyxPrice: '',
      ownerId: '',
    };
  }

  handleUpdateItemToOrder() {
    this.props.updateItemToOrder({
      item: {
        id: this.props.item.id,
        name: this.props.item.name,
        price: this.props.item.price,
        description: this.props.item.description,
        picture: this.props.item.picture,
      },
      quantity: this.state.quantity,
      ownerId: this.props.ownerId,
      priceToShow: Number(this.props.item.price * this.state.quantity).toFixed(2),
    });
  }

  handleAddItem() {
    this.props.addItem(this.state.ownerId, this.state.id);
  }

  handleQuantityChange(e) {
    if (e.currentTarget.value < 1) {
      this.state.quantity = 1;
      this.state.qtyxPrice = this.props.item.price;
      // this.setState({ qtyxPrice: this.props.item.price });
    } else {
      this.state.quantity = e.currentTarget.value;
      // this.state.qtyxPrice = this.props.item.price * e.currentTarget.value;
      this.setState({ qtyxPrice: this.props.item.price * e.currentTarget.value });
    }
    this.handleUpdateItemToOrder();
  }

  handleRemoveItem() {
    this.props.removeItemFromOrder(this.props.ownerId, this.props.item.id);
  }

  render() {
    const style = {
      quantityText: {
        left: 15,
        width: 50,
        bottom: -5,
        position: 'absolute',
      },
      removeBtn: {
        right: 20,
        bottom: 0,
        position: 'absolute',
      },
      priceChip: {
        margin: 5,
        padding: 2,
        backgroundColor: '#26C6DA',
        position: 'absolute',
        right: 30,
        top: 10,
      },
      priceText: {
        fontSize: '1.1em',
        color: 'white',
      },
      card: {
        margin: 1,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      },
    };
    const actions = [
      <FlatButton
        key={this.props.passKey + 5}
        style={style.removeBtn}
        label="Remove"
        secondary
        onTouchTap={e => this.handleRemoveItem(e)}
      />,
    ];
    return (
      <div>
        <Card style={style.card} key={this.props.passKey + 1}>
          <CardHeader
            key={this.props.passKey + 2}
            title={this.props.item.name}
            actAsExpander
            children={
              <Chip style={style.priceChip}>
                <span style={style.priceText}>{`$${this.props.priceToShow}`}</span>
              </Chip>
            }
          />
          <CardText key={this.props.passKey + 3}>
            <TextField
              key={this.props.passKey + 4}
              ref="quantity"
              hintText="0"
              type="number"
              style={style.quantityText}
              floatingLabelText="Quanity"
              value={this.props.quantity}
              onChange={e => this.handleQuantityChange(e)}
              floatingLabelFixed
            />
            {actions}
          </CardText>
        </Card>
        <br />
      </div>
    );
  }
}
