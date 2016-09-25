import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import TextField from 'material-ui/TextField';

// import CardActions from 'material-ui/Card/CardActions';
// import FlatButton from 'material-ui/FlatButton';

export default class CartItemCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      id: this.props.item.id,
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description,
      picture: this.props.item.picture,
      quantity: 1,
      qtyxPrice: this.props.item.price,
      ownerId: this.props.ownerId,
    };
  }

  handleUpdateItemToOrder() {
    this.props.updateItemToOrder({
      item: {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        picture: this.state.picture,
      },
      quantity: this.state.quantity,
      ownerId: this.props.ownerId,
    }, this.state.price);
  }


  handleAddItem() {
    this.props.addItem(this.state.ownerId, this.state.id);
  }

  handleQuantityChange(e) {
    if (e.currentTarget.value < 1) {
      this.setState({ qtyxPrice: this.state.price });
      this.state.quantity = 0;
    } else {
      this.setState({ qtyxPrice: this.state.price * e.currentTarget.value });
      this.state.quantity = e.currentTarget.value;
    }
    this.handleUpdateItemToOrder();
  }

  handleRemoveItem() {
    this.props.removeItemFromOrder(this.state.ownerId, this.state.id);
  }

  render() {
    const style = {
      chip: {
        margin: 1,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      text: {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      paper: {
        margin: 1,
        width: '90%',
      },
    };
    const actions = [
      <FlatButton
        label="Remove"
        secondary
        onTouchTap={e => this.handleRemoveItem(e)}
      />,
    ];
    return (
      <div>
        <Card style={style.chip}>
          <CardHeader
            title={this.props.item.name}
            subtitle={this.props.item.description}
            actAsExpander
          />
          <CardText>
            <h4>{`Price: ${this.state.qtyxPrice}`}</h4>
            <TextField
              ref="quantity"
              hintText="0"
              type="number"
              style={{ width: 50 }}
              floatingLabelText="Quanity"
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
