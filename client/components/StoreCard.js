import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import Paper from 'material-ui/Paper';

export default class StoreCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
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
    if (this.props.store.picture !== false) {
      pic = this.props.store.picture;
    }
    let background = null; // { backgroundColor: 'white' };
    if (this.state.banner !== false) {
      background = { backgroundImage: `url(${this.state.banner})` };
    }
    return (
      <div style={this.props.style}>
        <Paper
          zDepth={this.state.hover}
          // style={background}
        >
          <Card
            // style={{ backgroundColor: 'rgba(255, 255, 255, .89)' }}
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
            onTouchTap={e => this.handleClick(e)}
          >
            <CardHeader
              title={this.props.store.name}
              subtitle={this.props.store.slogan}
              avatar={pic}

            />
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}

