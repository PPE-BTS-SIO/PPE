import React from 'react';

/*
'Home' is the component which will display the home page.
We don't need to import 'home/index', it will do it automatically if use the root folder.
*/
import Home from '../components/home/';

import LiveChat from '../components/live_chat'

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

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
