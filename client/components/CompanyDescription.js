import React from 'react';
// import Card from 'material-ui/Card';
// import CardActions from 'material-ui/Card/CardActions';
// import CardHeader from 'material-ui/Card/CardHeader';
// import CardText from 'material-ui/Card/CardText';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

export default class CompanyDescription extends React.Component {

  constructor(props) {
    super(props);
    this.setState({ place: 'holder', fixes: 'lint issues' });
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
          <img alt="logo" src="http://churrocoaustin.com/wp-content/uploads/2014/12/ChurrCoLogoSalmon144x144.png " />
          <h1>Churro Co. Austin Catering</h1>
          <h2>Howdy, we’re Churro Co., we make churros out of a dandy little
          trailer in Austin, Texas.We’d like to be part of your shindig.
          Our food truck provides everything from office lunches
          to weddings to private events to festivals.</h2>
        </Paper>
      </div>
		);
  }

}
