import {

	REQUEST_INTERVENTIONS_STARTED,
	REQUEST_INTERVENTIONS_RECEIVED_DATA

} from './types';

import { queueAction } from './utils_actions';

export const requestInterventions = () => (dispatch, getState) => {
	dispatch({
		type: REQUEST_INTERVENTIONS_STARTED
	});
	const { nodeServer } = getState();
	if (!nodeServer || nodeServer.status !== 'connected') {
		dispatch(queueAction(requestInterventions));
		return false;
	}
	const { socket } = nodeServer;
	console.log("Interventions' request sent, waiting for callback...");
	socket.emit('client/request-interventions', null, (receivedData) => {
		console.log('Received callback!');
		dispatch({
			type: REQUEST_INTERVENTIONS_RECEIVED_DATA,
			data: receivedData
		})
	});
}
