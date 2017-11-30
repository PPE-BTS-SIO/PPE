import React from 'react';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

/*
'Home' is the component which will display the home page.
*/
import Login from '../components/login/login';

const Routes = () => (
	<Router>
		<div id="routes-container">
			<Route
				exact
				path="/"
				component={Login}
			/>
		</div>
	</Router>
);

export default Routes;
