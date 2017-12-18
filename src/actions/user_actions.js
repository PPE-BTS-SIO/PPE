import { sha3_512 } from 'js-sha3';

import {
	LOGIN_USER_STARTED,
	LOGIN_USER_RECEIVED_DATA
} from './types';

export const loginUser = (login, password) =>
	(dispatch, getState) =>
		new Promise((resolve, reject) => {
			const { nodeServer } = getState();
			if (!nodeServer || nodeServer.status !== 'connected') return false;
			const { socket } = nodeServer;
			console.log('Login request sent, waiting for callback...');
			dispatch({ type: LOGIN_USER_STARTED });
			socket.emit('client/login', {
				login,
				password: sha3_512(password)
			}, (receivedData) => {
				console.log('Received callback!');
				if (!receivedData) {
					reject("RECEIVED_INCORRECT_DATA")
				}
				if (receivedData.error) {
					reject(receivedData.error);
				}
				dispatch({
					type: LOGIN_USER_RECEIVED_DATA,
					response: receivedData
				});
				resolve(receivedData.status);
			});
		});
