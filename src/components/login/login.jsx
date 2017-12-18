import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './login.css';
import Button from 'material-ui/Button';
import usericon from './usericon.png'
import { loginUser as loginUserAction } from '../../actions/user_actions';
import TextField from "material-ui/TextField";

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



export default (Login);
