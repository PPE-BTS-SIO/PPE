const mysql = require('mysql');
const mysqlPrefix = require('./prefixes').mysql;

let connection;

const handleConnect = () => new Promise((resolve, reject) => {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'ppe',
		password: 'ppe123JRT',
		database: 'PPE'
	});

	connection.connect((error) => {
		if (error) {
			console.log(mysqlPrefix, 'Cannot connect to server, retrying in 2s...');
			setTimeout(handleConnect, 2000);
			return reject();
		}
		console.log(mysqlPrefix, 'Successfuly connected!'.green);
		return resolve();
	});

	connection.on('error', (error) => {
		console.log(mysqlPrefix, 'A wild error showed up:'.red, error.code);
		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			handleConnect();
		}
		return reject();
	})
});

module.exports = {
	getConnection: () => connection,
	handleConnect
}
