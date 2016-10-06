import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

export default class StoreCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
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

  handleAvatar() {
    let pic = (<Avatar children={this.props.store.name.charAt(0)} />);
    if (this.props.store.picture !== false) {
      pic = this.props.store.picture;
    }
    return pic;
  }

  render() {
    let background = null; // { backgroundColor: 'white' };
    if (this.state.banner !== false) {
      background = { backgroundImage: `url(${this.props.store.banner})` };
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
              avatar={this.handleAvatar()}

            />
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}

