import React from 'react';
// import Card from 'material-ui/Card';
// import CardActions from 'material-ui/Card/CardActions';
// import CardHeader from 'material-ui/Card/CardHeader';
// import CardText from 'material-ui/Card/CardText';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
// import Server from '../models/serverAPI';

export default class StoreDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
    };
  }

  render() {
    const style = {
      height: 400,
      width: '80%',
      flex: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      display: 'block',
      borderColor: '#1DE9B6',
      borderStyle: 'solid',
    };
    return (
      <div>
        <Paper style={style} zDepth={1} rounded={false}>
          <img alt="logo" src={this.state.logo} />
          <h1>{this.props.store.name}</h1>
          <h2>{this.props.store.description}</h2>
        </Paper>
      </div>
		);
  }

}
