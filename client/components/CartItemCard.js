import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';

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
    };
  }

  handleAddItem() {
    this.props.addItem(this.state.id);
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
    return (
      <div>
        <Card style={style.chip}>
          <CardHeader
            title={this.state.name}
            subtitle={this.state.description}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <h4>{`Price: ${this.state.price}`}</h4>
          </CardText>
        </Card>
        <br />
      </div>
    );
  }
}
