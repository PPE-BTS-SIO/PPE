import React from 'react';

import '../../../styles/live_chat/smallviews/content.css';

const Content = ({ elements }) => {
	let content = null;
	if (!elements) {
		content = (
			<span>
				{"Cette conversation n'a aucun historique !"}
			</span>
		);
	} else {
		content = (
			<div>
				{'yo cette conversation doit avoir un historique normalement.'}
			</div>
		);
	}

	return (
		<div id="live-chat-content-container">
			{content}
		</div>
	);
}

export default Content;
