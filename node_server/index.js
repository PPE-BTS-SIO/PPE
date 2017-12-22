require('colors');
const socketio = require('socket.io')();
const { connection } = require('./utils/sql');
const {
	socketIO,
	mysql
} = require('./utils/prefixes');
const {
	handleLogin,
	handleInterventionsRequest
} = require('./actions_handlers');

const socketPort = 8000;

connection.connect(() => {
	console.log(mysql, 'Successfuly connected!'.green);
});

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
