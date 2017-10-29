import React, { Component } from 'react';
import { connect } from 'react-redux';

import openSocket from 'socket.io-client';

import NavigationBar from '../smallviews/nav_bar/navigation_bar';
import SidePanel from './smallviews/side_panel/side_panel'
import Content from './smallviews/content';
import Inputs from './smallviews/inputs';

import WaitingForServer from './waiting_for_server';

import '../../styles/live_chat/live_chat.css';

class LiveChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatData: {
				0: {
					type: 'SENT',
					value: "Pariatur quis in eu irure adipisicing ullamco reprehenderit qui qui consequat tempor. Ullamco cupidatat amet in veniam enim mollit sunt elit non. Duis dolore eu qui amet ad laborum tempor nulla ex ut officia voluptate duis aliqua Lorem dolore non. Dolor voluptate commodo aliqua mollit eu eu eiusmod amet ut esse ex esse elit magna quis sunt. Voluptate labore adipisicing dolor dolore elit ex mollit consectetur tempor anim eiusmod et id. Sit officia eiusmod exercitation labore ut nulla laboris laborum aliqua est velit cillum ea commodo est sit magna. Consequat incididunt elit ea voluptate non in dolore deserunt in culpa sit pariatur cillum et qui quis minim."
				},
				1: {
					type: 'RECEIVED',
					value: "Occaecat minim do duis est tempor in cupidatat nisi nulla. Excepteur proident minim dolore consectetur aute ea id do. Enim ad incididunt cupidatat adipisicing ex officia esse consectetur occaecat et occaecat ex."
				},
				3: {
					type: 'RECEIVED',
					value: "Occaecat minim do duis est tempor in cupidatat nisi nulla. Excepteur proident minim dolore consectetur aute ea id do. Enim ad incididunt cupidatat adipisicing ex officia esse consectetur occaecat et occaecat ex."
				},
				4: {
					type: 'RECEIVED',
					value: "Occaecat minim do duis est tempor in cupidatat nisi nulla. Excepteur proident minim dolore consectetur aute ea id do. Enim ad incididunt cupidatat adipisicing ex officia esse consectetur occaecat et occaecat ex."
				},
				5: {
					type: 'RECEIVED',
					value: "Occaecat minim do duis est tempor in cupidatat nisi nulla. Excepteur proident minim dolore consectetur aute ea id do. Enim ad incididunt cupidatat adipisicing ex officia esse consectetur occaecat et occaecat ex."
				}
			}
		}
	}

	render() {
		const { nodeStatus } = this.props;
		const { chatData } = this.state;

		if (nodeStatus === 'connected') {
			return <Connected chatData={chatData} />
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

const Connected = ({ chatData }) => (
	<div id="live-chat-container">
		<NavigationBar />
		<SidePanel />
		<Content chatData={chatData} />
		<Inputs />
	</div>
);

const mapStateToProps = state => ({
	socket: state.nodeServer.socket,
	nodeStatus: state.nodeServer.status
})

export default connect(mapStateToProps)(LiveChat);
