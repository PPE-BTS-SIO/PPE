import React, { Component } from 'react';

/*
The MuiThemeProvider is a material-ui component.
We must use it in order to render material-ui's other components.
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*
'Home' is the component which will display the home page.
*/
import Home from './components/home/';

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
