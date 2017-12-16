import { sha3_512 } from 'js-sha3';

import {
	LOGIN_USER_STARTED,
	LOGIN_USER_RECEIVED_DATA
} from './types';

export const loginUser = (login, password) => (dispatch, getState) => {
	const { nodeServer } = getState();
	if (!nodeServer || nodeServer.status !== 'connected') return false;
	const { socket } = nodeServer;
	dispatch({ type: LOGIN_USER_STARTED });
	socket.emit('client/login', {
		login,
		password: sha3_512(password)
	}, (receivedData) => {
		console.log(receivedData);
	});
}
