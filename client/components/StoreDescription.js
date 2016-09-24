import React from 'react';
// import Card from 'material-ui/Card';
// import CardActions from 'material-ui/Card/CardActions';
// import CardHeader from 'material-ui/Card/CardHeader';
// import CardText from 'material-ui/Card/CardText';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Server from '../models/serverAPI';

export default class CompanyDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      store: [],
      logo: this.props.store.properties.picture,
      name: this.props.store.properties.name,
      description: this.props.store.properties.description,
    };
  }

  componentWillMount() {
    Server.getStoresByOwner(this.props.ownerId)
    .then(store => {
      console.log('storeByOwner: ', store);
      this.setState({ store });
    });
  }

  render() {
    const style = {
      height: 400,
      width: '80%',
      flex: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      display: 'inline-block',
      borderColor: '#1DE9B6',
      borderStyle: 'solid',
    };
    return (
      <div>
        <Paper style={style} zDepth={1} rounded={false}>
          <img alt="logo" src={this.state.logo} />
          <h1>{this.state.name}</h1>
          <h2>{this.state.description}</h2>
        </Paper>
      </div>
		);
  }

}
