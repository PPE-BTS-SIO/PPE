const Moment = require('moment');
const { connection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleInterventionsRequest = (callback, id) => {
	if (connection.state !== 'authenticated') {
		callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
		return false;
	}
	console.log(socketIO, `Got interventions' request from ${id}!`);
	connection.query('SELECT * FROM `Intervention` WHERE 1', (error, results) => {
		if (error) {
			console.log(mysql, 'Request failed: ', error);
			callback({ error });
			return false;
		}
		if (!results || results.length < 1) {
			console.log(mysql, 'Request failed: Request returned nothing!');
			callback({
				error: 'NO_INTERVENTIONS'
			});
			return false;
		}
		const interventions = results.map((result) => {
			const interventionId = result.Numero_Intervention;
			const date = new Moment(result.Date_Intervention).format('YYYY-MM-DD');
			const comment = result.Comment;
			const assignedTechnican = result.Matricule;
			const customerId = result.NumeroClient;
			return {
				id: interventionId,
				date,
				comment,
				assignedTechnican,
				customerId
			}
		});
		console.log(mysql, 'Got interventions!');
		console.log(socketIO, 'Sending interventions to client...');
		callback({ interventions });
	});
	return true;
}

module.exports = handleInterventionsRequest;
