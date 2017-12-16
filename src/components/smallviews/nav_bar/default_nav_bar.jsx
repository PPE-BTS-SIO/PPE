import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

const DefaultNavigationBar = () => (
	<div className="nav-bar">
		<div id="nav-bar-logo">
			<span>
				{'cashcash'}
			</span>
		</div>
		<div id="nav-bar-navigation">
			<Link to="/">
				<span className="nav-bar-tab nav-bar-tab-active">
					{'Accueil'}
				</span>
			</Link>
			<span className="nav-bar-tab">
				{'Se connecter'}
			</span>
		</div>
	</div>
);

export default DefaultNavigationBar;
