import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Paper from 'material-ui/Paper';

// import Paper from 'material-ui/Paper';

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

  handleRequestDelete() {
    alert('You clicked the delete button.');
  }

  handleTouchTap() {
    alert('You clicked the Chip.');
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
          // <CardActions>
          //   <FlatButton label="Add Me To Order" onClick={e => this.handleAddItem(e)} />
          // </CardActions>
            // avatar={"https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"}
          // <Chip
          //   labelStyle={style.text}
          //   onRequestDelete={e => this.handleRequestDelete(e)}
          //   onTouchTap={e => this.handleTouchTap(e)}
          //   style={style.chip}
          // >{this.state.name}
          // </Chip>
        // <Paper zDepth={this.state.hover}>
        // </Paper>

  render() {
    const style = {
      chip: {
        margin: 1,
        width: '90%',
        // textAlign: 'right',
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
