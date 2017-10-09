const socketio = require('socket.io')();

const port = 8000;

socketio.on('connection', (client) => {
	console.log(`Client wants to establish connection! user_id = ${client.id}`);
	handleClientRequests(client);
});

handleClientRequests = (client) => {
	client.on('client/create-user', (username, password) => {
		console.log(`Got login request with login : ${username} and psw : ${password} !`);
		client.emit('server/create-user', {
			isValid: true,
			user: {
				role: 'client',
				informations: {
					username,
					password,
					firstName: 'Thomas',
					lastName: 'Hey'
				}
			}
		});
	});
}

socketio.listen(port);
console.log(`[Socket.io] Now listening on port ${port} !`);
