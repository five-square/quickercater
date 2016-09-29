import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import FlatButton from 'material-ui/FlatButton';
// import EditButtons from './EditButtons';
import EditItem from './EditItem';

export default class BankItemCard extends Component {

  constructor(props) {
    super(props);
    console.log('in BankItemCard constructor', this.props);
    this.state = {
      hover: 0,
      id: this.props.item.id,
    };
  }

            // <EditButtons />
  render() {
    const style = {
      floatingEditButton: {
        right: 115,
        bottom: 20,
        position: 'absolute',
      },
      floatingAddButton: {
        right: 15,
        bottom: 20,
        position: 'absolute',
      },
      floatingDeleteButton: {
        right: 65,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        marginTop: 50,
        position: 'relative',
        height: 30,
      },
      addItem: {
        width: '90%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return (
      <div style={style.addItem}>
        <Card>
          <CardHeader
            title={this.props.item.name}
            subtitle={this.props.item.description}
            avatar={this.props.picture}
          >
            <h4 style={{ float: 'right' }}>{`Price: ${this.props.item.price}`}</h4>
          </CardHeader>
          <CardActions style={style.cardActions}>
            <EditItem
              style={style.floatingEditButton}
              id={this.props.item.id}
              name={this.props.item.name}
              description={this.props.item.description}
              picture={this.props.item.picture || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
              editItem={this.props.editItem}
            />
            <FloatingActionButton
              style={style.floatingAddButton}
              secondary
              zDepth={0}
              mini
              onTouchTap={() => {
                alert('Add to menu!');
              }}
            >
              <ContentAdd />
            </FloatingActionButton>
            <FloatingActionButton
              style={style.floatingDeleteButton}
              secondary
              zDepth={0}
              mini
              onTouchTap={() => {
                alert('Delete completely!');
              }}
            >
              <ContentRemove />
            </FloatingActionButton>
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}
