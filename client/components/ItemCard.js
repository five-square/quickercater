import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

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

  handleAddItem() {
    this.props.addItem({
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      picture: this.state.picture,
    });
  }

  // handleOnMouseEnter() {
  //   this.setState({ hover: 2 });
  // }

  // handleOnMouseLeave() {
  //   this.setState({ hover: 1 });
  // }
            // onMouseEnter={e => this.handleOnMouseEnter(e)}
            // onMouseLeave={e => this.handleOnMouseLeave(e)}
        // <Paper zDepth={this.state.hover}>
        // </Paper>

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
            <FlatButton label="Add Me To Order" onClick={e => this.handleAddItem(e)} />
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}
