const { socketIO } = require('./prefixes');

const connectedEmployees = [];
const clients = [];

const getConnectedEmployees = () => connectedEmployees;
const getClients = () => clients;

const addConnectedEmployee = (client, employee) => {
	connectedEmployees.push({ client, employee });
}

const addClient = (client) => {
	clients.push(client);
}

const removeClient = (client) => {
	delete clients[client];
	connectedEmployees.some((e, index) => {
		if (client.id === e.client.id) {
			connectedEmployees.splice(index, 1);
			console.log(socketIO, 'Removing client', e.client.id.cyan, ' - Connected users left:', `${connectedEmployees.length}`.cyan);
			return true;
		}
		return false;
	})
}

const broadcastToEmployees = (event, data, callback) => {
	connectedEmployees.forEach((employee) => {
		employee.client.emit(event, data, callback);
	});
}

module.exports = {
	getConnectedEmployees,
	getClients,
	addConnectedEmployee,
	addClient,
	removeClient,
	broadcastToEmployees
}
