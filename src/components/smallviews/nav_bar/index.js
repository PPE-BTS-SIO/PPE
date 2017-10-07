import React from 'react';

import LTSNavigationBar from './lts_nav_bar';
import DefaultNavigationBar from './default_nav_bar';

import '../../../styles/smallviews/nav_bar/navigation_bar.css';

const NavigationBar = ({ isLTS }) => {
	if (isLTS) {
		return <LTSNavigationBar />
	}
	return <DefaultNavigationBar />
}

export default NavigationBar;
