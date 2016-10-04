import React from 'react';
import Paper from 'material-ui/Paper';
import EditStore from './EditStore';

export default class StoreDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      width: '80%',
      height: 130,
      paddingTop: '0%',
      paddingBottom: '5%',
      marginTop: '2%',
      marginRight: 'auto',
      marginBottom: '2%',
      marginLeft: 'auto',
      alignItems: 'center',
      postion: 'absoulte',
      left: '10%',
      overflowY: 'auto',
      wordWrap: 'break-word',
      img: {
        position: 'relative',
        left: 18,
        top: 14,
        height: 100,
        width: 100,
      },
    };
    return (
      <div>
        <Paper style={style} zDepth={1} rounded={false}>
          <img alt="logo" style={style.img} src={this.props.store.picture} />
          <h1 style={{ marginTop: '-8%' }}>{this.props.store.name}</h1>
          <h3 style={{ marginLeft: '19%', marginRight: '20%' }}>{this.props.store.description}</h3>
          {this.props.editing ?
            <EditStore
              edit={this.props.editing}
              store={this.props.store}
              editStore={e => this.props.handleEditStore(e)}
            />
            : null
          }
        </Paper>
      </div>
    );
  }

}
