import React from 'react';
import { connect } from 'react-redux';

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

const Routes = ({ hasReceivedUserData, role }) => {
	let wantedRoutes = null;
	if (!hasReceivedUserData) {
		wantedRoutes = <NotLogguedRoutes />
	} else {
		wantedRoutes = <AssistantRoutes />
	}
	return (
		<Router>
			{wantedRoutes}
		</Router>
	);
};

const NotLogguedRoutes = () => (
	<Switch>
		<Route
			exact
			path="/"
			component={Login}
		/>
		<Redirect
			from="*"
			to="/"
		/>
	</Switch>
);

const AssistantRoutes = () => (
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
);

const TechnicianRoutes = () => (
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
);

const mapStateToProps = state => ({
	hasReceivedUserData: state.user.hasReceivedUserData,
	role: state.user.role
});

export default connect(mapStateToProps)(Routes);
