import React from 'react';
import { connect } from 'react-redux';

import '../../../styles/live_chat/smallviews/inputs.css';

const Inputs = ({ socket }) => (
	<div id="live-chat-inputs-container">
		<input
			id="live-chat-inputs-message-box"
			type="text"
			placeholder="Envoyer un message"
			onChange={event => socket.emit('client/send-chat-message', { message: event.target.value })}
		/>
	</div>
);

const mapStateToProps = state => ({
	socket: state.nodeServer.socket
})

export default connect(mapStateToProps)(Inputs);
