import React from 'react';

const DefaultNavigationBar = () => (
	<div className={`nav-bar`}>
		<div id="nav-bar-logo">
			<span>
				{'cashcash'}
			</span>
		</div>
		<div id="nav-bar-navigation">
			<span className="nav-bar-tab nav-bar-tab-active">
				{'Accueil'}
			</span>
			<span className="nav-bar-tab">
				{'Se connecter'}
			</span>
		</div>
	</div>
);

export default DefaultNavigationBar;
