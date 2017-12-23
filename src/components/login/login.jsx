import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import usericon from './usericon.png'

import errors from '../../utils/errors';

import { loginUser as loginUserAction } from '../../actions/user_actions';
import './login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: null,
			password: null,
			shouldRemember: false,
			message: null
		}
	}

	componentDidMount() {
		const secretKey = localStorage.getItem('cashcash_secret_key');
		if (secretKey) {
			this.handleLoginWithSecretKey(secretKey);
		}
	}

	handleLogin = (login, password, shouldRemember) => {
		if (!login || !password) {
			this.setState({ message: 'Veuillez entrer une combinaison valide' });
			return false;
		}
		const { loginUser, history } = this.props;
		if (!loginUser) return false;
		loginUser({ login, password, shouldRemember })
			.then((status) => {
				if (!status || !history) return false;
				history.push('/interventions');
				return true;
			}).catch((error) => {
				this.setState({ message: errors[error] || `Erreur inconnue : ${error}` });
			});
		return true;
	}

	handleLoginWithSecretKey = (secretKey) => {
		const { loginUser, history } = this.props;
		if (!loginUser) return false;
		loginUser({ secretKey })
			.then((status) => {
				if (!status || !history) return false;
				history.push('/interventions');
				return true;
			}).catch((error) => {
				console.log(error);
				this.setState({ message: errors[error] || `Erreur inconnue : ${error}` });
			});
		return true;
	}

	render() {
		const {
			login,
			password,
			shouldRemember,
			message
		} = this.state;
		const { hasReceivedLoginCallback } = this.props;

		return (
			<div id="belly">
				<div id="login-rectangle">
					<img id="imageUser" src={usericon} />
					<div id="form">
						<TextField
							label="Matricule"
							onChange={e => this.setState({ login: e.target.value })}
							margin="normal"
						/>
						<br />
						<TextField
							label="Password"
							hintText="Password Field"
							floatingLabelText="Password"
							onChange={e => this.setState({ password: e.target.value })}
							type="password"
						/>
						<p>{message}</p>
						<FormControlLabel
							control={
								<Checkbox
									checked={shouldRemember}
									onChange={() => this.setState({ shouldRemember: !shouldRemember })}
								/>
							}
							label="Se souvenir de moi"
						/>
						<Button
							id="buttonLogin"
							raised
							onClick={() => this.handleLogin(login, password, shouldRemember)}
							color="primary"
						>
							{'Login'}
						</Button>
					</div>
				</div>
			</div>
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
