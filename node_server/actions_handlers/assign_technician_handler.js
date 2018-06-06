const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');
const { broadcastToEmployees } = require('../utils/clients_tools');

const handleTechnicianAssignation = (callback = () => {}, id, data) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	console.log(socketIO, `Client ${id} wants to assign a technician!`);
	const {
		matricule,
		interventionId
	} = data;
	if (!matricule || !interventionId) {
		return callback({ error: 'NO_DATA' });
	}
	return connection.query(
		'SELECT * FROM Technicien T, Intervention I, Client C WHERE T.Matricule = ? AND I.Numero_Intervention = ? AND I.NumeroClient = C.NumeroClient AND T.Num_Agence = C.Num_Agence',
		[matricule, interventionId],
		(error, result) => {
			if (error || !result || result.length < 1) {
				if (error) console.log(error);
				return callback({ error: 'NOT_SAME_AGENCE' });
			}
			return connection.query(
				'UPDATE `Intervention` SET `Matricule` = ? WHERE Numero_Intervention = ?',
				[matricule, interventionId],
				(e) => {
					if (e) {
						console.log(mysql, 'An error happened while assigning technician:'.red, error);
						return callback({ error: e });
					}
					console.log(mysql, 'Assigned technician!');
					console.log(socketIO, 'Sending callback...');
					callback({ success: true });
					return broadcastToEmployees('server/technician_assigned', ({
						interventionId,
						matricule
					}));
				}
			);
		}
	);
}

module.exports = handleTechnicianAssignation;
