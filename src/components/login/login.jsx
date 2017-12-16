import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'material-ui/Button';

import { loginUser as loginUserAction } from '../../actions/user_actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null
		}
	}

	render() {
		const { username, password } = this.state;
		const { loginUser } = this.props;
		return (
			<Fragment>
				<input
					type="text"
					placeholder="Username"
					onChange={e => this.setState({ username: e.target.value })}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={e => this.setState({ password: e.target.value })}
				/>
				<Button
					raised
					onClick={() => loginUser(username, password)}
				>
					{'Login'}
				</Button>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	loginUser: loginUserAction
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
