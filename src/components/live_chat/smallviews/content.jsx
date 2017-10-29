import React from 'react';

import ContentItem from './content_item';

import '../../../styles/live_chat/smallviews/content.css';

const Content = ({ chatData }) => {
	let content = null;
	if (!chatData || Object.keys(chatData).length < 1) {
		content = (
			<span>
				{"Cette conversation n'a aucun historique !"}
			</span>
		);
	} else {
		content = (
			<div
				id="live-chat-content"
				className="custom-overflow"
			>
				{
					Object.keys(chatData).map(id => (
						<ContentItem
							key={`content_item_${id}`}
							item={chatData[id]}
						/>
					))
				}
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
