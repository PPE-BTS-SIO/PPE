import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';

import UserSection from './user_section';

import {
	setUserSidePanelOpenState as setUserSidePanelOpenStateAction
} from '../../../actions/main_actions';

import '../../../styles/smallviews/user_side_panel/user_side_panel.css';

const UserSidePanel = ({
	hasReceivedUserData,
	informations,
	userSidePanelOpenState,
	setUserSidePanelOpenState
}) => {
	if (!hasReceivedUserData) {
		return null;
	}
	return (
		<Drawer
			anchor="right"
			open={userSidePanelOpenState}
			onClose={() => setUserSidePanelOpenState && setUserSidePanelOpenState(false)}
		>
			<div id="usp-content">
				<UserSection informations={informations} />
			</div>
		</Drawer>
	);
}

const mapStateToProps = state => ({
	hasReceivedUserData: state.user.hasReceivedUserData,
	informations: state.user.informations,
	userSidePanelOpenState: state.main.userSidePanelOpenState
});

const mapDispatchToProps = dispatch => bindActionCreators({
	setUserSidePanelOpenState: setUserSidePanelOpenStateAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSidePanel);
