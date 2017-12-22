import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import { connectToServer as connectToServerAction } from './actions/node_server_actions';
import { changeWindowWidth as changeWindowWidthAction } from './actions/utils_actions';

import Routes from './routes/routes';

/*
Importing default styles, used to change appearance of the top-level objects.
This style will be used anywhere in the entire website.
*/
import './styles/global.css';

const theme = createMuiTheme({
	palette: {
		primary: blue
	}
})

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

	componentDidMount() {
		this.handleWindowResize();
		window.addEventListener('resize', this.handleWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize = () => {
		const { changeWindowWidth } = this.props;
		if (!changeWindowWidth) return false;
		changeWindowWidth(window.innerWidth);
		return true;
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
			<MuiThemeProvider theme={theme}>
				<div id="container">
					<Routes />
					<Snackbar
						open={this.state.openNotConnected}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left'
						}}
						message="Vous n'êtes pas connecté au serveur"
						action={<SnackbarAction />}
					/>
					<Snackbar
						open={this.state.openConnected}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left'
						}}
						message="Vous êtes désormais connecté"
						autoHideDuration={4000}
						onClose={() => this.setState({ openConnected: false })}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

const SnackbarAction = () => (
	<Button
		onClick={() => window.location.reload()}
		color="accent"
	>
		{'Rafraichir'}
	</Button>
);

const mapStateToProps = state => ({
	nodeStatus: state.nodeServer.status,
	role: state.user.role
});

const mapDispatchToProps = dispatch => bindActionCreators({
	connectToServer: connectToServerAction,
	changeWindowWidth: changeWindowWidthAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
