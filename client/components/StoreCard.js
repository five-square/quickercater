import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import EditStore from './EditStore';

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
    let pic = (
      <Avatar
        style={{ height: 60, width: 60, fontSize: 30 }}
        children={this.props.store.name.charAt(0)}
      />
    );
    if (this.props.store.picture !== false) {
      pic = (
        <Avatar
          style={{ height: 60, width: 60 }}
          src={this.props.store.picture}
        />
      );
    }
    return pic;
  }

  render() {
    const style = {
      header: {
        position: 'relative',
        top: '9%',
        height: 134,
      },
      title: {
        color: 'white',
        fontSize: 30,
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
        fontSize: 17,
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
    if (this.props.store.banner !== '') {
      background = { height: 134, backgroundImage: `url(${this.props.store.banner})` };
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
              style={style.header}
              titleStyle={style.title}
              title={this.props.store.name}
              subtitleStyle={style.subTitle}
              subtitle={this.props.store.slogan}
              avatar={this.handleAvatar()}

            />
            {this.props.editing ?
              <EditStore
                edit={this.props.editing}
                store={this.props.store}
                editStore={e => this.props.handleEditStore(e)}
              />
              : null
            }
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}

