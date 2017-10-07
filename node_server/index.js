const socketio = require('socket.io')();

const port = 8000;

socketio.on('connection', (client) => {
	console.log('Got a request from client !');
});

handleClientRequests = (client) => {
	client.on('connectToChat', (interval) => {
    console.log('client wants to connect to chat !');
  });
}

socketio.listen(port);
console.log(`[Socket.io] Now listening on port ${port} !`);
