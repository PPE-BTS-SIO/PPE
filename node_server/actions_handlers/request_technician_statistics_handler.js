const Moment = require('moment');
const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleTechnicianStatisticsRequest = (callback, id, data) => {
	const connection = getConnection();
	if (!data) {
		return callback({ error: 'NO_DATA' });
	}
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	const {
		technicianId,
		fromTimestamp,
		toTimestamp
	} = data;

	connection.query(
		'SELECT COUNT(I.Matricule) AS nbrInterventions, SUM(C.DistanceKm) AS nbrKm , SUM(I.Duree_Intervention) AS dureeTotal FROM Intervention I, Client C WHERE I.Matricule = ? AND I.NumeroClient = C.NumeroClient AND (UNIX_TIMESTAMP(I.Date_Intervention) * 1000) > ? AND (UNIX_TIMESTAMP(I.Date_Intervention) * 1000) <= ?',
		[technicianId, fromTimestamp, toTimestamp],
		(error, results) => {
			if (error) {
				return callback({ error });
			}
			if (!results || results.length < 1) {
				return callback({ error: 'NO_RESULT' });
			}
			const { nbrInterventions = 0, nbrKm = 0, dureeTotal = 0 } = results[0];
			return callback({
				nbrInterventions,
				nbrKm,
				dureeTotal
			})
		}
	);
	/* connection.query('SELECT * FROM `Intervention` WHERE 1', (error, results) => {
		if (error) {
			console.log(mysql, 'Request failed: ', error);
			callback({ error });
			return false;
		}
		if (!results || results.length < 1) {
			console.log(mysql, 'Request failed: Request returned nothing!');
			callback({
				error: 'NO_DATA'
			});
			return false;
		}
		const interventions = results.map((result) => {
			const interventionId = result.Numero_Intervention;
			const date = new Moment(result.Date_Intervention).format('YYYY-MM-DD');
			const comment = result.Commentaire;
			const location = result.Localisation;
			const assignedTechnician = result.Matricule;
			const customerId = result.NumeroClient;
			return {
				id: interventionId,
				date,
				comment,
				location,
				assignedTechnician,
				customerId
			}
		});
		console.log(mysql, 'Got interventions!');
		console.log(socketIO, 'Sending interventions to client...');
		return callback({ interventions });
	});
	return true; */
}

module.exports = handleTechnicianStatisticsRequest;
