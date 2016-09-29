import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
// import { Sortable } from 'react-sortable';
import EditButtons from './EditButtons';
import EditItem from './EditItem';

class ItemCard extends Component {

  handleAddItemToOrder() {
    this.props.addItemToOrder({
      item: {
        id: this.props.item.id,
        name: this.props.item.name,
        price: this.props.item.price,
        description: this.props.item.description,
        picture: this.props.picture,
      },
      ownerId: this.props.ownerId,
      quantity: 1,
      priceToShow: this.props.item.price,
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
        marginTop: 30,
        position: 'relative',
        height: 30,
      },
      priceChip: {
        margin: 5,
        padding: 2,
        backgroundColor: '#26C6DA',
        position: 'absolute',
        right: -25,
        top: 10,
      },
      priceText: {
        fontSize: '1.1em',
        color: 'white',
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
      <div style={{ position: 'relative' }}>
        <Card>
          <CardHeader
            title={this.props.item.name}
            subtitle={this.props.item.description}
            avatar={this.props.picture}
            style={{ width: '95%' }}
            children={
              <Chip style={style.priceChip}>
                <span style={style.priceText}>{`$${this.props.item.price.toFixed(2)}`}</span>
              </Chip>
            }
          />
          <CardActions style={style.cardActions}>
            {this.props.editing
              ? <div>
                <EditItem
                  style={style.floatingEditButton}
                  id={this.props.item.id}
                  name={this.props.item.name}
                  description={this.props.item.description}
                  price={this.props.item.price}
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

export default ItemCard;
