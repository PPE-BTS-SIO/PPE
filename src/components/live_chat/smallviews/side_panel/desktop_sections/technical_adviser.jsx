import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import KeyBoardArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import '../../../../../styles/live_chat/smallviews/side_panel/desktop_sections/technical_adviser.css';

class TechnicalAdviser extends Component {
	constructor(props){
		super(props);
		this.state = {
			isExtended: false
		}
	}

	render() {
		const technicalAdviser = this.props.technicalAdviser;
		if (!technicalAdviser) {
			return null;
		}
		const isExtended = this.state.isExtended;
		return (
			<div
				id="live-chat-desktop-side-panel-technical-adviser-container"
				onTouchTap={() => this.setState({ isExtended: !this.state.isExtended })}
				style={{
					height: isExtended ? '600px' : '120px'
				}}
			>
				<div className="live-chat-desktop-side-panel-section-name">
					{'Votre conseiller'}
				</div>
				<div id="live-chat-desktop-side-panel-technical-adviser">
					<div id="live-chat-desktop-side-panel-technical-adviser-picture-container">
						<div
							id="live-chat-desktop-side-panel-technical-adviser-picture"
							style={{
								backgroundImage: `url('${technicalAdviser.picture}')`
							}}
						/>
					</div>
					<span id="live-chat-desktop-side-panel-technical-adviser-name">
						{technicalAdviser.name}
					</span>
					<span
						id="live-chat-desktop-side-panel-technical-adviser-extend"
						style={{
							transform: isExtended ? 'rotate(180deg)' : null
						}}
					>
						<KeyBoardArrowDownIcon color="#BDBDBD" />
					</span>
				</div>
			</div>
		);
	}
}

export default TechnicalAdviser;
