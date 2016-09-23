import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';

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
    };
  }

  handleAddItemToOrder() {
    this.props.addItemToOrder({
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      picture: this.state.picture,
    });
  }

  render() {
    return (
      <div style={this.state.style}>
        <Card>
          <CardHeader
            title={this.state.name}
            subtitle={this.state.description}
            avatar={"https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <h4>{`Price: ${this.state.price}`}</h4>
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
