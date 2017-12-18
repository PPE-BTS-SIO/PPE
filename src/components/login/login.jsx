import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import errors from '../../utils/errors';

import { loginUser as loginUserAction } from '../../actions/user_actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: null,
			password: null,
			message: null
		}
	}

	handleLogin = (login, password) => {
		if (!login || !password) {
			this.setState({ message: 'Veuillez entrer une combinaison valide' });
			return false;
		}
		const { loginUser, history } = this.props;
		if (!loginUser) return false;
		loginUser(login, password)
			.then((status) => {
				if (!status || !history) return false;
				history.push('/interventions');
				return true;
			}).catch((error) => {
				this.setState({ message: errors[error] || `Erreur inconnue : ${error}` });
			});
		return true;
	}

	render() {
		const { login, password, message } = this.state;
		const { hasReceivedLoginCallback } = this.props;
		return (
			<Fragment>
				<input
					type="text"
					placeholder="Matricule"
					onChange={e => this.setState({ login: e.target.value })}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={e => this.setState({ password: e.target.value })}
				/>
				<Button
					raised
					onClick={() => this.handleLogin(login, password)}
				>
					{'Login'}
				</Button>
				<Message message={message} />
				<Loading hasReceivedLoginCallback={hasReceivedLoginCallback} />
			</Fragment>
		);
	}
}

const Message = ({ message }) => message;

const Loading = ({ hasReceivedLoginCallback }) => {
	if (hasReceivedLoginCallback !== null) return null;
	return <CircularProgress />
}

const mapStateToProps = state => ({
	hasReceivedLoginCallback: state.user.hasReceivedLoginCallback
})

const mapDispatchToProps = dispatch => bindActionCreators({
	loginUser: loginUserAction
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
