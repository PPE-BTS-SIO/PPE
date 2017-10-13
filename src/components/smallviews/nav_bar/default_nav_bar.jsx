import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { createUser } from '../../../actions/user_actions';

const DefaultNavigationBar = ({ socket }) => (
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
			<span
				className="nav-bar-tab"
				onTouchTap={() => {
					createUser(socket, 'yo', 'test');
				}}
			>
				{'Se connecter'}
			</span>
		</div>
	</div>
);

const mapStateToProps = state => ({
	socket: state.nodeServer.socket
});

const mapDispatchToProps = dispatch => bindActionCreators({ createUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DefaultNavigationBar);
