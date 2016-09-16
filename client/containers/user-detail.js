import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component {

	render (){
		if (!this.props.user){
			return (<h2>select a user...</h2>)
		}
		return(
			<div>
				<h3>{this.props.user.age}</h3>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		user: state.activeuser
	}
}

export default connect(mapStateToProps)(UserDetail);