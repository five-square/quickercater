import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';
import {handleNameChange} from '../actions/index';



class UserList extends Component{

	creaeListItems() {
		return this.props.users.map((user)=>{

			return(
				<li keyParams={user.id} 
					onClick = {() => this.props.selectUser(user)}
				>
				{user.name}
				</li>
			);
		})
	}

	render(){
		return (
			<div>
			<h3> Enter your name:</h3>
			<input className="name" onChange={e => this.props.handleNameChange(e)} />
			<ul>
				{this.creaeListItems()}
			</ul>
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		users: state.users
	}
}
function matchDispatchToProps(dispatch){
	return bindActionCreators({selectUser: selectUser, handleNameChange:handleNameChange}, dispatch);
	// return bindActionCreators({handleNameChange:handleNameChange}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList);