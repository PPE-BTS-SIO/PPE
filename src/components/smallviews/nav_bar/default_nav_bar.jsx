import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withTheme } from 'material-ui/styles';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';

const DefaultNavigationBar = ({ hasReceivedUserData }) => (
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
			<Connection hasReceivedUserData={hasReceivedUserData} />
		</div>
	</div>
);

const Connection = withTheme()(({ theme, hasReceivedUserData }) => {
	if (!hasReceivedUserData) {
		return (
			<span className="nav-bar-tab">
				{'Se connecter'}
			</span>
		);
	}
	return (
		<span id="nav-bar-account">
			<AccountCircleIcon color={theme.palette.primary[600]} />
		</span>
	)
});

const mapStateToProps = state => ({
	hasReceivedUserData: state.user.hasReceivedUserData
})

export default connect(mapStateToProps)(DefaultNavigationBar);
