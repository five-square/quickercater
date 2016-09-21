import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import Paper from 'material-ui/Paper';

export default class CaterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        wordWrap: 'break-word',
        marginRight: '25%',
        marginLeft: '25%',
      },
      hover: 1,
      name: this.props.stores.name,
      slogan: this.props.stores.slogan,
      description: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 3 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 1 });
  }

  render() {
    return (
      <Paper zDepth={this.state.hover} style={this.state.style}>
        <Card
          onMouseEnter={e => this.handleOnMouseEnter(e)}
          onMouseLeave={e => this.handleOnMouseLeave(e)}
        >
          <CardHeader
            title={this.state.name}
          />
          <CardText>
            {this.state.description}
          </CardText>
        </Card>
      </Paper>
    );
  }
}

