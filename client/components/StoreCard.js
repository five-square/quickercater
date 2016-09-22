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
      name: this.props.stores.name,
      slogan: this.props.stores.slogan,
      description: this.props.stores.description,
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    return (
      <div style={this.state.style}>
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
          >
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
        <br />
      </div>
    );
  }
}

