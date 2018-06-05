const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleCustomersRequest = (callback, id) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	console.log(socketIO, `Got customers' request from ${id}!`);
	connection.query('SELECT * FROM `Client` WHERE 1', (error, results) => {
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
		const customers = results.map((result) => {
			const customerId = result.NumeroClient;
			const name = result.Nom;
			const social = result.Raison_Sociale;
			const siren = result.Numero_Siren;
			const ape = result.Code_APE;
			const location = result.Addresse;
			const phone = result.Num_Telephone;
			const fax = result.Fax;
			const moveTime = result.Duree_Deplacement;
			const distance = result.DistanceKm;
			const agence = result.Num_Agence;
			const url = result.Url;
			const logo = result.Logo;

			return ({
				customerId,
				name,
				social,
				siren,
				ape,
				location,
				phone,
				fax,
				moveTime,
				distance,
				agence,
				url,
				logo
			});
		});
		console.log(mysql, 'Got customers!');
		console.log(socketIO, 'Sending customers to client...');
		return callback({ customers });
	});
	return true;
}

module.exports = handleCustomersRequest;
