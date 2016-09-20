import React from 'react';

import Card from 'material-ui/Card';

import CardActions from 'material-ui/Card/CardActions';

import CardHeader from 'material-ui/Card/CardHeader';

import CardText from 'material-ui/Card/CardText';

import FlatButton from 'material-ui/FlatButton';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class StoreCardExpandable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expandable: true,
      expanded: false,
      name: this.props.owners.name,
      slogan: this.props.owners.slogan,
      description: this.props.owners.description,
    };
  }

  handleExpanded() {
    if (this.sate.expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded: true });
    }
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.state.name}
          subtitle={this.state.slogan}
          avatar="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={this.state.expandable} onTouchTap={this.handleExpanded} >
          {this.state.description}
        </CardText>
        <CardActions>
          <FlatButton label="Take Me There" />
        </CardActions>
      </Card>
    );
  }
}

