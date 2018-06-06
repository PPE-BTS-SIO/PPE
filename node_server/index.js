require('colors');
const socketio = require('socket.io')();
const { handleConnect } = require('./utils/sql');
const { socketIO } = require('./utils/prefixes');
const {
	handleLogin,
	handleInterventionsRequest,
	handleCustomersRequest,
	handleEmployeesRequest,
	handleInterventionCreation,
	handleTechnicianStatisticsRequest,
	handleTechnicianAssignation,
	handlePDFCreation
} = require('./actions_handlers');
const {
	addClient,
	removeClient
} = require('./utils/clients_tools');

handleConnect();

const socketPort = 8000;

const handleClientRequests = (client) => {
	addClient(client);
	const { id } = client;
	client.on('disconnect', () => removeClient(client));
	client.on('client/login', (data, callback) => handleLogin(data, callback, id, client));
	client.on('client/request-interventions', (data, callback) => handleInterventionsRequest(callback, id));
	client.on('client/request-customers', (data, callback) => handleCustomersRequest(callback, id))
	client.on('client/request-employees', (data, callback) => handleEmployeesRequest(callback, id));
	client.on('client/create-intervention', (data, callback) => handleInterventionCreation(callback, id, data));
	client.on('client/request-technician-statistics', (data, callback) => handleTechnicianStatisticsRequest(callback, id, data));
	client.on('client/assign-technician', (data, callback) => handleTechnicianAssignation(callback, id, data));
	client.on('client/create-pdf', (data, callback) => handlePDFCreation(callback, id, data));
}

socketio.on('connection', (client) => {
	console.log(socketIO, `Client wants to establish connection! ID = ${client.id}`);
	handleClientRequests(client);
});

socketio.listen(socketPort);
console.log(socketIO, `Now listening on port ${socketPort}!`.green);
