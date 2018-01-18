require('colors');
const socketio = require('socket.io')();
const { handleConnect } = require('./utils/sql');
const { socketIO } = require('./utils/prefixes');
const {
	handleLogin,
	handleInterventionsRequest,
	handleCustomersRequest,
	handleEmployeesRequest
} = require('./actions_handlers');

handleConnect();

const socketPort = 8000;

const handleClientRequests = (client) => {
	const { id } = client;
	client.on('client/login', (data, callback) => handleLogin(data, callback, id));
	client.on('client/request-interventions', (data, callback) => handleInterventionsRequest(callback, id));
	client.on('client/request-customers', (data, callback) => handleCustomersRequest(callback, id))
	client.on('client/request-employees', (data, callback) => handleEmployeesRequest(callback, id));
}

socketio.on('connection', (client) => {
	console.log(socketIO, `Client wants to establish connection! ID = ${client.id}`);
	handleClientRequests(client);
});

socketio.listen(socketPort);
console.log(socketIO, `Now listening on port ${socketPort}!`.green);
