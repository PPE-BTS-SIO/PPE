import React from 'react';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

/*
'Login' is the component which will display the login page.
*/
import Login from '../components/login/login';
import InterventionsView from '../components/interventions_view/interventions_view';

const Routes = () => (
	<Router>
		<div id="routes-container">
			<Route
				exact
				path="/"
				component={Login}
			/>
			<Route
				exact
				path="/interventions"
				component={InterventionsView}
			/>
		</div>
	</Router>
);

export default Routes;
