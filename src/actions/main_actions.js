import {

	REQUEST_INTERVENTIONS_STARTED,
	REQUEST_INTERVENTIONS_RECEIVED_DATA,

	REQUEST_CUSTOMERS_STARTED,
	REQUEST_CUSTOMERS_RECEIVED_DATA,

	REQUEST_EMPLOYEES_STARTED,
	REQUEST_EMPLOYEES_RECEIVED_DATA

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
	return socket.emit('client/request-interventions', null, (receivedData) => {
		console.log('Received callback!');
		dispatch({
			type: REQUEST_INTERVENTIONS_RECEIVED_DATA,
			data: receivedData
		})
	});
}

export const requestCustomers = () => (dispatch, getState) => {
	dispatch({
		type: REQUEST_CUSTOMERS_STARTED
	});
	const { nodeServer } = getState();
	if (!nodeServer || nodeServer.status !== 'connected') {
		dispatch(queueAction(requestCustomers));
		return false;
	}
	const { socket } = nodeServer;
	console.log("Customers' request sent, waiting for callback...");
	return socket.emit('client/request-customers', null, (receivedData) => {
		console.log('Received callback!');
		dispatch({
			type: REQUEST_CUSTOMERS_RECEIVED_DATA,
			data: receivedData
		})
	});
}

export const requestEmployees = () => (dispatch, getState) => {
	dispatch({
		type: REQUEST_EMPLOYEES_STARTED
	});
	const { nodeServer } = getState();
	if (!nodeServer || nodeServer.status !== 'connected') {
		dispatch(queueAction(requestCustomers));
		return false;
	}
	const { socket } = nodeServer;
	console.log("Employees' request sent, waiting for callback...");
	return socket.emit('client/request-employees', null, (receivedData) => {
		console.log('Received callback!');
		dispatch({
			type: REQUEST_EMPLOYEES_RECEIVED_DATA,
			data: receivedData
		})
	});
}
