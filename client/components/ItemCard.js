import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class ItemCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 0,
      id: this.props.id,
      style: this.props.style,
      name: this.props.name,
      price: this.props.price,
      description: this.props.description,
      picture: this.props.picture,
      quantity: 1,
      itemPrice: this.props.price,
    };
  }

  handleAddItemToOrder() {
    this.props.addItemToOrder({
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      picture: this.state.picture,
      quantity: this.state.quantity,
    });
  }

  handleQuantityChange(e) {
    if (e.currentTarget.value < 1) {
      this.setState({ price: this.state.itemPrice });
      this.state.quantity = 0;
    } else {
      this.setState({ price: this.state.itemPrice * e.currentTarget.value });
    }
    this.props.updateTotalPrice(this.state.price);
  }

  render() {
    return (
      <div style={this.state.style}>
        <Card>
          <CardHeader
            title={this.state.name}
            subtitle={this.state.description}
            avatar={this.state.picture}
            actAsExpander
          />
          <CardText>
            <h4>{`Price: ${this.state.price}`}</h4>
            <TextField
              ref="quantity"
              hintText="0"
              type="number"
              style={{ width: 50 }}
              floatingLabelText="Quanity"
              onChange={e => this.handleQuantityChange(e)}
              floatingLabelFixed
            />
          </CardText>
          <CardActions>
            <FlatButton label="Add Me To Order" onClick={e => this.handleAddItemToOrder(e)} />
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}
