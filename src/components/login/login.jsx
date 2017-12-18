import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Button from 'material-ui/Button';
import TextField from "material-ui/TextField";
import { CircularProgress } from 'material-ui/Progress';

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
			<div id='belly'>
        <div id="login-rectangle">
          <img id="imageUser" src={usericon} />
          <div id="form">
            <TextField
            label="Username"
            onChange={e => this.setState({ username: e.target.value })}
            margin="normal"

            />
          <br></br>

          <TextField
            label="Password"
            hintText="Password Field"
            floatingLabelText="Password"
            onChange={e => this.setState({ password: e.target.value })}
            type="password"

          />
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
