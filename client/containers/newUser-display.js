import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewUserDisplay extends Component {

	render (){
		if (!this.props.user){
			return (<h2>New user...</h2>)
		}
		return(
			<div>
				<h3>Hello {this.props.user}</h3>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		user: state.newuser
	}
}

export default connect(mapStateToProps)(NewUserDisplay);