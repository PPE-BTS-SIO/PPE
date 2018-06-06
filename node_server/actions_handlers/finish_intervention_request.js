const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');
const { broadcastToEmployees } = require('../utils/clients_tools');

const handleInterventionFinish = (callback = () => {}, id, data) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	console.log(socketIO, `Client ${id} wants to mark an intervention as finished!`);
	const {
		interventionId,
		comment,
		duration
	} = data;
	if (!duration || !interventionId) {
		return callback({ error: 'NO_DATA' });
	}
	return connection.query(
		'UPDATE `Intervention` SET `Duree_Intervention` = ?, `Commentaire` = ? WHERE Numero_Intervention = ?',
		[duration, comment, interventionId],
		(error) => {
			if (error) {
				console.log(mysql, 'An error happened while finishing intervention:'.red, error);
				return callback({ error });
			}
			console.log(mysql, 'Finished marking intervention!');
			console.log(socketIO, 'Sending callback...');
			callback({ success: true });
			return broadcastToEmployees('server/intervention-finished', ({
				interventionId,
				comment,
				duration
			}));
		}
	);
}

module.exports = handleInterventionFinish;
