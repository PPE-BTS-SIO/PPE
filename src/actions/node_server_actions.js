import openSocket from 'socket.io-client'

import {
	CONNECTION_TO_NODE_SERVER_STARTED,
	CONNECTION_TO_NODE_SERVER_CHANGED_STATUS
} from './types';

export const connectToServer = () => (dispatch) => {
	const socket = openSocket('192.168.1.19:8000');
	dispatch({
		type: CONNECTION_TO_NODE_SERVER_STARTED,
		socket
	});
	socket.on('connect', () => dispatch({
		type: CONNECTION_TO_NODE_SERVER_CHANGED_STATUS,
		status: 'connected'
	}));
	socket.on('connect_error', () => dispatch({
		type: CONNECTION_TO_NODE_SERVER_CHANGED_STATUS,
		status: 'error'
	}));
	socket.on('disconnect', () => dispatch({
		type: CONNECTION_TO_NODE_SERVER_CHANGED_STATUS,
		status: 'disconnected'
	}));
}
