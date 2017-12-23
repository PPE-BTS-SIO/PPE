import { sha3_512 } from 'js-sha3';

import {
	LOGIN_USER_STARTED,
	LOGIN_USER_RECEIVED_DATA
} from './types';

import { queueAction } from './utils_actions';

export const loginUser = informations =>
	(dispatch, getState) =>
		new Promise((resolve, reject) => {
			const { nodeServer } = getState();
			if (!nodeServer || nodeServer.status !== 'connected') {
				dispatch(queueAction(() => loginUser(informations)));
				return false;
			}
			const { socket } = nodeServer;
			console.log('Login request sent, waiting for callback...');
			dispatch({ type: LOGIN_USER_STARTED });
			const toSend = informations.secretKey ? ({
				secretKey: informations.secretKey
			}) : ({
				login: informations.login,
				password: sha3_512(informations.password),
				shouldRemember: informations.shouldRemember
			});
			socket.emit('client/login', toSend, (receivedData) => {
				console.log('Received callback!');
				if (!receivedData) {
					reject('RECEIVED_INCORRECT_DATA')
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
