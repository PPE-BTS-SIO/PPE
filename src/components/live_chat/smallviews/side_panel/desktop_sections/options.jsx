import React from 'react';

import NotificationsIcon from 'material-ui-icons/Notifications';

import Button from 'material-ui/Button';

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
				raised
				labelStyle={labelStyle}
			>
				{'Demander une intervention'}
			</Button>
			<Button
				raised
				labelStyle={labelStyle}
			>
				<NotificationsIcon color="#9E9E9E" />
				{'Notifications'}
			</Button>
			<Button
				raised
				labelStyle={labelStyle}
			>
				{'Imprimer la conversation'}
			</Button>
		</div>
	</div>
);

export default Options;
