import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*
The MuiThemeProvider is a material-ui component.
We must use it in order to render material-ui's other components.
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Snackbar from 'material-ui/Snackbar';

import { connectToServer } from './actions/node_server_actions';

import Routes from './routes';
/*
Importing default styles, used to change appearance of the top-level objects.
This style will be used anywhere in the entire website.
*/
import './styles/global.css';

/*
This is our first & most important component.
It is the one which tells what components to display.
*/
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openNotConnected: false,
			openConnected: false
		}
	}

	componentWillMount() {
		if (this.props.nodeStatus === 'not-connected') {
			this.props.connectToServer();
		}
	}

	componentWillReceiveProps(props) {
		if (props.nodeStatus !== 'connected' && !this.state.openNotConnected) {
			this.setState({
				openNotConnected: true,
				openConnected: false
			});
		} else if (props.nodeStatus === 'connected' && this.state.openNotConnected) {
			this.setState({
				openNotConnected: false,
				openConnected: true
			});
		}
	}

	/*
	The render method is the main method of a React component.
	This method should return a valid React element.
	A valid element could be simple html elements surrounded by a parent element
	such as a <div> or a <span>. Custom elements works as well as long as they are surrounded.
	*/
	render() {
		return (
			<MuiThemeProvider>
				<div id="container">
					<Routes />
					<Snackbar
						open={this.state.openNotConnected}
						message="Vous n'êtes pas connecté au serveur"
						action="Rafraichir"
						autoHideDuration={500000000}
						onActionTouchTap={() => window.location.reload()}
						onRequestClose={() => this.setState({ openNotConnected: false })}
					/>
					<Snackbar
						open={this.state.openConnected}
						message="Vous êtes désormais connecté"
						autoHideDuration={4000}
						onRequestClose={() => this.setState({ openConnected: false })}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = state => ({
	nodeStatus: state.nodeServer.status,
	role: state.user.role
});

const mapDispatchToProps = dispatch => bindActionCreators({
	connectToServer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
