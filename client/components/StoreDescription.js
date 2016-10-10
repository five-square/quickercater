import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import EditStore from './EditStore';

export default class StoreDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      banner: this.props.store.banner,
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
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
        height: 180,
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

    return (
      <div style={this.props.style}>
        <Paper
          zDepth={this.state.hover}
          style={this.props.background}
        >
          <Card
            style={{ backgroundColor: 'rgba(255, 255, 255, .01)' }}
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
          >
            <CardHeader
              style={style.header}
              titleStyle={style.title}
              title={this.props.store.name}
              subtitleStyle={style.subTitle}
              subtitle={this.props.store.description}
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

