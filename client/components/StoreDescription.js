import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import EditStore from './EditStore';
// change two buttons together
export default class StoreDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStoreLogo() {
    const style = {
      position: 'relative',
      left: 18,
      bottom: 69,
      height: 100,
      width: 100,
      letter: {
        height: 100,
        width: 100,
        fontSize: 50,
        position: 'relative',
        left: 20,
        bottom: 83,
      },
    };
    let logo = this.props.store.picture;
    if (logo === '' || logo === false) {
      logo = (<Avatar style={style.letter} children={this.props.store.name.charAt(0)} />);
    } else {
      logo = (<img alt="logo" style={style} src={this.props.store.picture} />);
    }
    return logo;
  }

  render() {
    const style = {
      width: '80%',
      height: 130,
      paddingTop: '0%',
      paddingBottom: 0,
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
        bottom: 100,
        height: 100,
        width: 100,
      },
      name: {
        marginTop: 20,
      },
      desc: {
        marginLeft: '19%',
        marginRight: '20%',
        marginBottom: 0,
        height: 6,
      },
    };
    return (
      <div>
        <Paper style={style} zDepth={1} rounded={false}>
          <h1 style={style.name}>{this.props.store.name}</h1>
          <h3 style={style.desc}>{this.props.store.description}</h3>
          {this.handleStoreLogo()}
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
