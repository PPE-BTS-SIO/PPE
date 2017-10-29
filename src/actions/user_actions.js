import { sha3_512 } from 'js-sha3';

import {

	CREATE_USER_STARTED,
	CREATE_USER_RECEIVED_DATA,
	REQUEST_USER_STARTED,
	REQUEST_USER_RECEIVED_DATA

} from './types.js';


export const createUser = (socket, username, password) => (dispatch) => {
	dispatch({
		type: CREATE_USER_STARTED
	});
	socket.emit('client/create-user', username, sha3_512(password));
	socket.off('server/create-user');
	socket.on('server/create-user', (data) => {
		dispatch({
			type: CREATE_USER_RECEIVED_DATA,
			isValid: data.isValid,
			user: data.user
		})
	});
}
