import React, { Component } from 'react';

import openSocket from 'socket.io-client';

import NavigationBar from '../smallviews/nav_bar';
import SidePanel from './smallviews/side_panel'
import Content from './smallviews/content';
import Inputs from './smallviews/inputs';

import WaitingForServer from './waiting_for_server';

import '../../styles/live_chat/index.css';

let socket = null;

class LiveChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			connectionStatus: 'waiting'
		}
	}

	componentWillMount() {
		socket = openSocket('localhost:8000');
		socket.on('connect', () => this.setState({ connectionStatus: 'connected' }));
		socket.on('connect_error', () => this.setState({ connectionStatus: 'error' }));
		socket.on('disconnect', () => this.setState({ connectionStatus: 'disconnected' }));
	}

	render() {
		const connectionStatus = this.state.connectionStatus;
		if (connectionStatus === 'connected') {
			return <Connected />
		} else if (connectionStatus === 'waiting') {
			return <WaitingForServer />
		}
		return (
			<div>
				{'error'}
			</div>
		)
	}
}

const Connected = () => (
	<div id="live-chat-container">
		<NavigationBar />
		<SidePanel />
		<Content />
		<Inputs />
	</div>
);

export default LiveChat;
