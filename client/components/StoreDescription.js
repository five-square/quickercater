import React from 'react';
import Paper from 'material-ui/Paper';
// import EditStore from './EditStore';

export default class StoreDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
          // <EditStore
          //   edit={this.props.editing}
          //   store={this.props.store}
          //   editStore={e => this.props.handleEditStore(e)}
          // />
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
          <img alt="logo" src={this.props.store.picture} />
          <h1>{this.props.store.name}</h1>
          <h2>{this.props.store.description}</h2>
        </Paper>
      </div>
		);
  }

}
