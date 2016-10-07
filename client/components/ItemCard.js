import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import EditItem from './EditItem';

export default class ItemCard extends Component {

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
      packages: this.props.packages,
    });
  }

  render() {
    const style = {
      floatingEditButton: {
        right: 70,
        bottom: 20,
        position: 'absolute',
      },
      floatingDeleteButton: {
        right: 20,
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
        // backgroundColor: '#26C6DA',
        position: 'absolute',
        right: '-3%',
        top: '22%',
      },
      priceText: {
        fontSize: '1.1em',
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

                // <Avatar src={this.props.picture} />
    return (
      <div style={{ position: 'relative' }}>
        <Card style={{ borderRadius: 30 }}>
          <CardHeader
            title={this.props.item.name}
            subtitle={this.props.item.description}
            avatar={this.props.picture}
            style={{ width: '95%' }}
            children={
              <div>
                <Chip style={style.priceChip}>
                  <span style={style.priceText}>{`$${(+this.props.item.price).toFixed(2)}`}</span>
                </Chip>
              </div>
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
                <FloatingActionButton
                  style={style.floatingDeleteButton}
                  mini
                  secondary
                  zDepth={0}
                  onTouchTap={() => this.props.removeItem(this.props.item.id)}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </div>
              : <FlatButton
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
