import React from 'react';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

/*
'Home' is the component which will display the home page.
*/
import Home from '../components/home/';

import LiveChat from '../components/live_chat/live_chat'

const Routes = () => (
	<Router>
		<div id="routes-container">
			<Route
				exact
				path="/"
				component={Home}
			/>
			<Route
				path="/livechat"
				component={LiveChat}
			/>
		</div>
	</Router>
);

export default Routes;
