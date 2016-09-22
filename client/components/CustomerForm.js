import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


export default class CustomerForm extends React.Component {
	constructor(props) {
		super(props);
	}
// Form that contains input from client requesting catering service
  render() {
    const style = {
      topMargin: 0,
      marginLeft: 20,
      width: 1400,
      paddingLeft: 65,
    };

    return (
      < div style={style}>
        <Paper zDepth={2}>
          <TextField hintText="First name" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Email address" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Event Date" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Number of Guests" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Budget" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Event Start Time" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Event End Time" style={style} underlineShow={false} />
          <Divider />
        </Paper>
      < /div>);
  }
}
