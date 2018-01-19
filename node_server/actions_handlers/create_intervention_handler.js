const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleInterventionCreation = (callback, id, data) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	console.log(socketIO, `Client ${id} want to create intervention!`);
	const {
		customerId,
		plannedDate,
		location,
		comment,
		assignedTechnician
	} = data;
	return connection.query(
		'INSERT INTO `Intervention`(`Date_Intervention`, `Commentaire`, `Localisation`, `Matricule`, `NumeroClient`) VALUES (?,?,?,?,?)',
		[plannedDate, comment, location, assignedTechnician, customerId],
		(error) => {
			if (error) {
				console.log(mysql, 'An error happened while adding intervention:'.red, error);
				return callback({ error });
			}
			console.log(mysql, 'Created intervention!');
			console.log(socketIO, 'Sending callback...');
			return ({ success: true });
		}
	);
}

module.exports = handleInterventionCreation;
