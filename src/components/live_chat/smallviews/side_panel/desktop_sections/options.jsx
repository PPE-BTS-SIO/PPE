import React from 'react';

import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import PrintIcon from 'material-ui/svg-icons/action/print';

import Button from '../../../../smallviews/button';

import '../../../../../styles/live_chat/smallviews/side_panel/desktop_sections/options.css';

const labelStyle = {
	color: 'rgba(0, 0, 0, .7)',
	fontSize: '13px'
}

const Options = () => (
	<div id="live-chat-desktop-side-panel-options-container">
		<div className="live-chat-desktop-side-panel-section-name">
			{'Options'}
		</div>
		<div id="live-chat-desktop-side-panel-options-buttons">
			<Button
				type="raised"
				label="Demander une intervention"
				labelStyle={labelStyle}
			/>
			<Button
				type="raised"
				label="Notifications"
				icon={<NotificationsIcon color="#9E9E9E" />}
				labelPosition="after"
				labelStyle={labelStyle}
			/>
			<Button
				type="raised"
				label="Imprimer la conversation"
				labelStyle={labelStyle}
			/>
		</div>
	</div>
);

export default Options;
