const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');
const { broadcastToEmployees } = require('../utils/clients_tools');

const handleInterventionCreation = (callback = () => {}, id, data) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	console.log(socketIO, `Client ${id} want to create intervention!`);
	const {
		customerId,
		date,
		location,
		comment,
		assignedTechnician
	} = data;
	return connection.query(
		'INSERT INTO `intervention`(`Date_Intervention`, `Commentaire`, `Localisation`, `Matricule`, `NumeroClient`) VALUES (?,?,?,?,?)',
		[date, comment, location, assignedTechnician, customerId],
		(error) => {
			if (error) {
				console.log(mysql, 'An error happened while adding intervention:'.red, error);
				return callback({ error });
			}
			console.log(mysql, 'Created intervention!');
			console.log(socketIO, 'Sending callback...');
			callback({ success: true });
			return broadcastToEmployees('server/intervention-created', ({ intervention: data }));
		}
	);
}

module.exports = handleInterventionCreation;
