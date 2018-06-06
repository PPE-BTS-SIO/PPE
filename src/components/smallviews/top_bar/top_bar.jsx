import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';

import AtomicButton from '../../smallviews/buttons/atomic_button';
import StatisticsButton from '../../smallviews/statistics/statistics_button';

import {
	setUserSidePanelOpenState as setUserSidePanelOpenStateAction
} from '../../../actions/main_actions';

import '../../../styles/smallviews/top_bar/top_bar.css';

class TopBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDrawer: false
		}
	}

	setDrawerOpenState = state => this.setState({ openDrawer: state });

	render() {
		const { windowWidth, hasReceivedUserData, role } = this.props;
		if (!windowWidth || windowWidth > 700) {
			return (
				<DesktopTopBar
					hasReceivedUserData={hasReceivedUserData}
					role={role}
				/>
			)
		}
		return (
			<MobileTopBar
				openDrawer={this.state.openDrawer}
				setDrawerOpenState={this.setDrawerOpenState}
				hasReceivedUserData={hasReceivedUserData}
				role={role}
			/>
		);
	}
}

const DesktopTopBar = ({ hasReceivedUserData, role }) => (
	<div className="nav-bar">
		<Logo />
		<Content
			hasReceivedUserData={hasReceivedUserData}
			role={role}
		/>
	</div>
);

const MobileTopBar = ({
	openDrawer,
	setDrawerOpenState,
	hasReceivedUserData,
	role
}) => (
	<div className="nav-bar">
		<DrawerToggler setDrawerOpenState={setDrawerOpenState} />
		<Drawer
			open={openDrawer}
			onClose={() => setDrawerOpenState(false)}
		>
			<Content
				hasReceivedUserData={hasReceivedUserData}
				role={role}
			/>
		</Drawer>
		<Logo />
	</div>
);

const Logo = () => (
	<div id="nav-bar-logo">
		<span>
			{'cashcash'}
		</span>
	</div>
);

const Content = ({ hasReceivedUserData, role }) => (
	<div id="nav-bar-navigation">
		<Link to="/">
			<AtomicButton
				icon={<HomeIcon style={{ fill: '#7F7F7F' }} />}
				label="Accueil"
			/>
		</Link>
		{role === 'A' && <StatisticsButton />}
		<Connection hasReceivedUserData={hasReceivedUserData} />
	</div>
);

const DrawerToggler = ({ setDrawerOpenState }) => (
	<div
		id="nav-bar-drawer-toggler"
		onClick={() => setDrawerOpenState(true)}
	>
		<MenuIcon style={{ fill: '#7F7F7F' }} />
	</div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
	setUserSidePanelOpenState: setUserSidePanelOpenStateAction
}, dispatch);

const Connection = connect(undefined, mapDispatchToProps)(({ hasReceivedUserData, setUserSidePanelOpenState }) => {
	if (!hasReceivedUserData) {
		return (
			<span className="nav-bar-tab">
				{'Se connecter'}
			</span>
		);
	}
	return (
		<AtomicButton
			icon={<Person style={{ fill: '#7F7F7F' }} />}
			label="Mon compte"
			onClick={() => setUserSidePanelOpenState(true)}
		/>
	)
});

const mapStateToProps = state => ({
	hasReceivedUserData: state.user.hasReceivedUserData,
	role: state.user.role,
	windowWidth: state.utils.windowWidth
});

export default connect(mapStateToProps)(TopBar);
