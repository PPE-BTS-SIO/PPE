const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleEmployeesRequest = (callback, id) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
		return false;
	}
	console.log(socketIO, `Got employees' request from ${id}!`);
	connection.query('SELECT * FROM `Employe` WHERE 1 LIMIT 100', (error, results) => {
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
		const employees = results.map((result) => {
			const matricule = result.Matricule;
			const lastName = result.Nom;
			const firstName = result.Prenom;
			const address = result.Adresse;
			const hireDate = result.DateEmbauche;
			const mail = result.Mail;
			const profilePicture = result.ImageProfil;

			return ({
				matricule,
				lastName,
				firstName,
				address,
				hireDate,
				mail,
				profilePicture
			});
		});
		console.log(mysql, 'Got employees!');
		console.log(socketIO, 'Sending employees to client...');
		return callback({ employees });
	});
	return true;
}

module.exports = handleEmployeesRequest;
