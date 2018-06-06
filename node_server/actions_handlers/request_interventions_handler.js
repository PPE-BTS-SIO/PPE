const Moment = require('moment');
const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleInterventionsRequest = (callback, id, data) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
		return false;
	}
	let condition = null;
	if (data && data.role && data.role === 'T' && data.matricule) {
		condition = 'Matricule = ?';
	} else {
		condition = '1';
	}
	const { matricule } = data;
	console.log(socketIO, `Got interventions' request from ${id}!`);
	connection.query(
		`SELECT * FROM \`Intervention\` WHERE ${condition}`,
		[matricule],
		(error, results) => {
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
				const duration = result.Duree_Intervention;
				return {
					id: interventionId,
					date,
					comment,
					location,
					assignedTechnician,
					customerId,
					duration
				}
			});
			console.log(mysql, 'Got interventions!');
			console.log(socketIO, 'Sending interventions to client...');
			return callback({ interventions });
		}
	);
	return true;
}

module.exports = handleInterventionsRequest;
