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
      width: '80%',
      heigh: '20%',
      flex: 1,
      flexShrink: 1,
      flexBasis: '50%',
      marginTop: '2%',
      marginRight: 'auto',
      marginBottom: '2%',
      marginLeft: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      postion: 'absoulte',
      left: '10%',
      img: {
        position: 'relative',
        left: '5%',
        top: 60,
        height: '10%',
        width: '10%',
      },
    };
    return (
      <div>
        <Paper style={style} zDepth={1} rounded={false}>
          <img alt="logo" style={style.img} src={this.props.store.picture} />
          <h1>{this.props.store.name}</h1>
          <h2>{this.props.store.description}</h2>
        </Paper>
      </div>
		);
  }

}
