import React, { Component } from 'react';

import '../../../styles/live_chat/smallviews/content_item.css';

class ContentItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExtended: false
		}
	}

	setExtendedState = isExtended => this.setState({ isExtended });

	render() {
		const { item } = this.props;
		if (!item) {
			return null;
		}

		const { type, value, sentAt } = item;

		if (!type || !value) {
			return null;
		}

		const { isExtended } = this.state;

		let className = 'content-item-container';
		if (type === 'SENT') {
			className += ' content-item-container-sent'
		} else {
			className += ' content-item-container-received'
		}

		return (
			<div className={className}>
				<div className="content-item-bubble">
					{value}
				</div>
			</div>
		);
	}
}

export default ContentItem;
