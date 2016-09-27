import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import EditButtons from './EditButtons';
import EditItem from './EditItem';

export default class ItemCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 0,
      id: this.props.item.id,
    };
  }

  handleAddItemToOrder() {
    this.props.addItemToOrder({
      item: {
        id: this.state.id,
        name: this.props.item.name,
        price: this.props.item.price,
        description: this.props.item.description,
        picture: this.props.picture,
      },
      ownerId: this.props.ownerId,
      quantity: 1,
      priceToShow: this.props.price,
    });
  }

            // <EditButtons />
  render() {
    const style = {
      floatingEditButton: {
        right: 170,
        bottom: 20,
        position: 'absolute',
      },
      addToOrderButton: {
        right: 10,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        marginTop: 20,
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

    return (
      <div style={this.props.style}>
        <Card>
          <CardHeader
            title={this.props.item.name}
            subtitle={this.props.item.description}
            avatar={this.props.picture}
          >
            <h4 style={{ float: 'right' }}>{`Price: ${this.props.item.price}`}</h4>
          </CardHeader>
          <CardActions style={style.cardActions}>
            {this.props.editing
              ? <div>
                <EditItem
                  style={style.floatingEditButton}
                  id={this.props.item.id}
                  name={this.props.item.name}
                  description={this.props.item.description}
                  picture={this.props.picture}
                  editItem={this.props.editItem}
                />
                <EditButtons
                  secondary
                  targetType={'menu'}
                  target={this.props.item}
                  move={this.props.moveItem}
                  delete={this.props.removeItem}
                />
              </div>
              : <RaisedButton
                style={style.addToOrderButton}
                primary
                label="Add To Order"
                onClick={e => this.handleAddItemToOrder(e)}
              />
            }
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}
