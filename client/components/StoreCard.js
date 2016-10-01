import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

export default class StoreCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      style: this.props.style,
      id: this.props.id,
      name: this.props.store.name,
      slogan: this.props.store.slogan,
      description: this.props.store.description,
      picture: this.props.store.picture,
      banner: 'http://i.imgur.com/QdDcUFY.jpg',
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  handleClick() {
    this.props.selectStore(Object.assign({}, this.props.store, { id: this.props.id }));
  }

  render() {
    let pic = 'http://i.imgur.com/TTnNPph.png';
    if (this.state.picture !== false) {
      pic = this.state.picture;
    }
    let background = { backgroundColor: 'white' };
    if (this.state.banner !== false) {
      background = { backgroundImage: `url(${this.state.banner})` };
    }
    return (
      <div style={this.state.style}>
        <Paper
          zDepth={this.state.hover}
          style={background}
        >
          <Card
            style={{ backgroundColor: 'rgba(255, 255, 255, .89)' }}
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
          >
            <CardHeader
              title={this.state.name}
              subtitle={this.state.slogan}
              avatar={pic}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              {this.state.description}
            </CardText>
            <CardActions>
              <FlatButton label="Take Me There" onTouchTap={e => this.handleClick(e)} />
            </CardActions>
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}

