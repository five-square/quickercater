import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Frank',
      condition: 'React Sandbox',
    };
  }

  handleNameChange(e) {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  handleConditionChange(e) {
    this.setState({
      condition: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, my name is {this.state.name}</h1>
        <h2>and this is my {this.state.condition}</h2>
        <div className="user-input">
          <input className="name" onChange={e => this.handleNameChange(e)} />
          <input className="condition" onChange={e => this.handleConditionChange(e)} />
        </div>
      </div>
    );
  }
}
