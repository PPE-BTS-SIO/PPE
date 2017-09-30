import React from 'react';

const NavigationBar = () => (
	<div id="home-nav-bar">
		<div id="home-nav-bar-logo">
			<span>
				{'cashcash'}
			</span>
		</div>
		<div id="home-nav-bar-navigation">
			<span className="home-nav-bar-tab home-nav-bar-tab-active">
				{'Accueil'}
			</span>
			<span className="home-nav-bar-tab">
				{'Se connecter'}
			</span>
		</div>
	</div>
);

export default NavigationBar;
