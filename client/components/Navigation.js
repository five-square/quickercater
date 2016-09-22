import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  handleBackClick() {
    this.props.goBack();
  }

  render() {
    return (
      <div id="Toolbar">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title} />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="Back to Lobby" primary onClick={e => this.handleBackClick(e)} />
            <RaisedButton label="Login" primary />
          </ToolbarGroup>
        </Toolbar>
        <br />
      </div>
    );
  }
}
