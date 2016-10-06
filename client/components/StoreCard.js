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
    const style = {
      title: {
        color: 'white',
        fontSize: 20,
        textShadow: `1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000,
          0px 1px 0 #000,
          0px -1px 0 #000,
          -1px 0px 0 #000,
          1px 0px 0 #000`,
      },
      subTitle: {
        color: 'white',
        textShadow: `1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000,
          0px 1px 0 #000,
          0px -1px 0 #000,
          -1px 0px 0 #000,
          1px 0px 0 #000`,
      },
    };
    let background = { backgroundColor: 'white' };
    if (this.state.banner !== '') {
      background = { backgroundImage: `url(http://cinemaonline.kg/templates/modern/img/bgny.jpg)` };
        // ${this.props.store.banner}
    }
    return (
      <div style={this.props.style}>
        <Paper
          zDepth={this.state.hover}
          style={background}
        >
          <Card
            style={{ backgroundColor: 'rgba(255, 255, 255, .10)' }}
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
            onTouchTap={e => this.handleClick(e)}
          >
            <CardHeader
              titleStyle={style.title}
              title={this.props.store.name}
              subtitleStyle={style.subTitle}
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

