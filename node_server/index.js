require('colors');
const socketio = require('socket.io')();
const { handleConnect } = require('./utils/sql');
const { socketIO } = require('./utils/prefixes');
const {
	handleLogin,
	handleInterventionsRequest
} = require('./actions_handlers');

handleConnect();

const socketPort = 8000;

const handleClientRequests = (client) => {
	const { id } = client;
	client.on('client/login', (data, callback) => handleLogin(data, callback, id));
	client.on('client/request-interventions', (data, callback) => handleInterventionsRequest(callback, id));
}

socketio.on('connection', (client) => {
	console.log(socketIO, `Client wants to establish connection! ID = ${client.id}`);
	handleClientRequests(client);
});

socketio.listen(socketPort);
console.log(socketIO, `Now listening on port ${socketPort} !`.green);
