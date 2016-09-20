import React from 'react';

import Card from 'material-ui/Card';

import CardActions from 'material-ui/Card/CardActions';

import CardHeader from 'material-ui/Card/CardHeader';

import CardText from 'material-ui/Card/CardText';

import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class StoreCardExpandable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 3,
      name: this.props.owners.name,
      slogan: this.props.owners.slogan,
      description: this.props.owners.description,
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 3 });
  }

  render() {
    return (
      <Paper zDepth={this.state.hover}>
        <Card onMouseEnter={e => this.handleOnMouseEnter(e)} onMouseLeave={e => this.handleOnMouseLeave(e)}>
          <CardHeader
            title={this.state.name}
            subtitle={this.state.slogan}
            avatar="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
            actAsExpander={true}
            showExpandableButton={true}
          />
        <CardText expandable={true}>
          {this.state.description}
        </CardText>
          <CardActions>
            <FlatButton label="Take Me There" />
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

