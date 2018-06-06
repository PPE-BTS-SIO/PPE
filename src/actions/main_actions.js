import {

	REQUEST_INTERVENTIONS_STARTED,
	REQUEST_INTERVENTIONS_RECEIVED_DATA,

	REQUEST_CUSTOMERS_STARTED,
	REQUEST_CUSTOMERS_RECEIVED_DATA,

	REQUEST_EMPLOYEES_STARTED,
	REQUEST_EMPLOYEES_RECEIVED_DATA,

	RECEIVED_NEW_INTERVENTION,
	RECEIVED_TECHNICIAN_ASSIGNATION,
	RECEIVED_INTERVENTION_FINISHED,

	SET_USER_SIDE_PANEL_OPEN_STATE

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
		dispatch(queueAction(requestEmployees));
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

export const handleReceivedNewIntervention = data => (dispatch) => {
	if (!data || !data.intervention) return null;
	const { intervention } = data;
	console.log('Received new intervention!');
	return dispatch({
		type: RECEIVED_NEW_INTERVENTION,
		intervention
	});
}

export const handleReceivedTechnicianAssignation = data => (dispatch) => {
	if (!data || !data.interventionId || !data.matricule) return;
	console.log('Received new technician assignation!');
	dispatch({
		type: RECEIVED_TECHNICIAN_ASSIGNATION,
		...data
	});
}

export const handleReceivedInterventionFinished = data => (dispatch) => {
	if (!data || !data.interventionId || !data.duration) return;
	console.log('Received new intervention finished state!');
	dispatch({
		type: RECEIVED_INTERVENTION_FINISHED,
		...data
	});
}

export const setUserSidePanelOpenState = state => (dispatch) => {
	if (state !== true && state !== false) return null;
	return dispatch({
		type: SET_USER_SIDE_PANEL_OPEN_STATE,
		state
	})
};
