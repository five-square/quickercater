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
          title="My Store"
          subtitle="Best Mexico food in Town"
          avatar="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={this.state.expandable} onTouchTap={this.handleExpanded} >
          This is where I would talk about how cool and good my food is.
        </CardText>
        <CardActions>
          <FlatButton label="Take Me There" />
        </CardActions>
      </Card>
    );
  }
}

