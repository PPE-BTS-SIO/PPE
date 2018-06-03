import React, { Fragment } from 'react';
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

import Examples from '../components/examples/examples';
import CreateButton from '../components/examples/create_button';
import CreateInput from '../components/examples/create_input';

const Routes = ({ hasReceivedUserData }) => {
	let wantedRoutes = null;
	if (!hasReceivedUserData) {
		wantedRoutes = <NotLogguedRoutes />
	} else {
		wantedRoutes = <AssistantRoutes />
	}
	const commonRoutes = [
		<Route
			key="examples"
			exact
			path="/examples"
			component={Examples}
		/>,
		<Route
			key="example_create_button"
			exact
			path="/examples/create-button"
			component={CreateButton}
		/>,
		<Route
			key="example_create_input"
			exact
			path="/examples/create-input"
			component={CreateInput}
		/>
	];
	return (
		<Router>
			<Switch>
				{commonRoutes}
				{wantedRoutes}
			</Switch>
		</Router>
	);
};

const NotLogguedRoutes = () => (
	<Fragment>
		<Route
			exact
			path="/"
			component={Login}
		/>
		<Redirect
			from="*"
			to="/"
		/>
	</Fragment>
);

const AssistantRoutes = () => (
	<Fragment>
		<Route
			exact
			path="/interventions"
			component={InterventionsView}
		/>
		<Redirect
			from="*"
			to="/interventions"
		/>
	</Fragment>
);

const mapStateToProps = state => ({
	hasReceivedUserData: state.user.hasReceivedUserData,
	role: state.user.role
});

export default connect(mapStateToProps)(Routes);
