import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { connectToServer } from './actions/node_server_actions';

import Routes from './routes';

/*
The MuiThemeProvider is a material-ui component.
We must use it in order to render material-ui's other components.
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
	}

	componentWillMount() {
		if (this.props.nodeStatus === 'not-connected') {
			this.props.connectToServer();
		}
	}

	componentWillReceiveProps(props) {
		console.log(props);
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
	      </div>
			</MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
	nodeStatus: state.nodeServer.status
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	connectToServer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
