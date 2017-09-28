import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './components/home/';

import './styles/global.css';

class App extends Component {
  render() {
    return (
			<MuiThemeProvider>
	      <div id="container">
					<Home />
	      </div>
			</MuiThemeProvider>
    );
  }
}

export default App;
