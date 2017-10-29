import React, { Component } from 'react';
import { connect } from 'react-redux';

import openSocket from 'socket.io-client';

import NavigationBar from '../smallviews/nav_bar/navigation_bar';
import SidePanel from './smallviews/side_panel/side_panel'
import Content from './smallviews/content';
import Inputs from './smallviews/inputs';

import WaitingForServer from './waiting_for_server';

import '../../styles/live_chat/index.css';

class LiveChat extends Component {
	render() {
		const nodeStatus = this.props.nodeStatus;
		if (nodeStatus === 'connected') {
			return <Connected />
		} else if (nodeStatus === 'waiting') {
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

const mapStateToProps = state => ({
	socket: state.nodeServer.socket,
	nodeStatus: state.nodeServer.status
})

export default connect(mapStateToProps)(LiveChat);
