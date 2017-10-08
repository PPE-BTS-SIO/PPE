import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import '../../../../../styles/live_chat/smallviews/side_panel/desktop_sections/options.css';

const Options = () => (
	<div id="live-chat-desktop-side-panel-options-container">
		<div className="live-chat-desktop-side-panel-section-name">
			{'Options'}
		</div>
		<div id="live-chat-desktop-side-panel-options-buttons">
			<RaisedButton
				label="Demander une intervention"
			/>
			<RaisedButton
				label="Notifications"
				icon={<NotificationsIcon color="#9E9E9E" />}
				labelPosition="after"
			/>
		</div>
	</div>
);

export default Options;
