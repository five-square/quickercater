import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import Paper from 'material-ui/Paper';
import ItemCard from './ItemCard';
// import Server from '../models/serverAPI';
import Menu from '../models/menuAPI';

// import CardActions from 'material-ui/Card/CardActions';
// import CardHeader from 'material-ui/Card/CardHeader';
// import FlatButton from 'material-ui/FlatButton';

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

  render() {
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
                  addItemToOrder={this.props.addItemToOrder}
                />
              )}
            </CardText>
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}
