import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

/*
'Login' is the component which will display the login page.
*/
import Login from '../components/login/login';
import InterventionsView from '../components/interventions_view/interventions_view';

const Routes = () => (
	<Router>
		<Switch>
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
			<Redirect
				from="*"
				to="/"
			/>
		</Switch>
	</Router>
);

export default Routes;
