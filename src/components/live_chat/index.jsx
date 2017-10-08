import React, { Component } from 'react';

import NavigationBar from '../smallviews/nav_bar';
import SidePanel from './smallviews/side_panel'
import Content from './smallviews/content';
import Inputs from './smallviews/inputs';

import WaitingForServer from './waiting_for_server';

import '../../styles/live_chat/index.css';

class LiveChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConnected: false
		}
	}

	render() {
		const isConnected = this.state.isConnected;
		if (isConnected) {
			return <Connected />
		}
		return <WaitingForServer />
	}
}

const Connected = () => (
	<div id="live-chat-container">
		<SidePanel />
		<Content />
		<Inputs />
	</div>
);

export default LiveChat;
