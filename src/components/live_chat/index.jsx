import React, { Component } from 'react';

import NavigationBar from '../smallviews/nav_bar';
import SidePanel from './smallviews/side_panel'
import Content from './smallviews/content';
import Inputs from './smallviews/inputs';

import '../../styles/live_chat/index.css';

class LiveChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hey: false
		}
	}

	render() {
		return (
			<div id="live-chat-container">
				<NavigationBar />
				<SidePanel />
				<Content />
				<Inputs />
			</div>
		);
	}
}

export default LiveChat;
