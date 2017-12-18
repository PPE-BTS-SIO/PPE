const { keccak512 } = require('js-sha3');
const { connection } = require('../utils/sql');
const {
	socketIO,
	mysql
} = require('../utils/prefixes');

const handleLogin = (data, callback, id) => {
	if (connection.state !== 'authenticated') {
		callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
		return false;
	}
	const { login, password } = data;
	if (!login || !password) return false;
	const encryptedPassword = keccak512(password);
	console.log(
		socketIO,
		`Received login request from ${id}! ` +
		`Login: ${login.cyan} & ` +
		`Password (encrypted): ${encryptedPassword.cyan}`
	);
	connection.query(
		'SELECT * FROM Employe WHERE Matricule = ? AND Password = ?',
		[login, encryptedPassword],
		(error, results) => {
			if (error) {
				console.error(mysql, `Login failed: ${error}`);
				callback({ error });
				return false;
			}
			if (!results || results.length < 1) {
				console.log(mysql, 'Login failed: No column match!');
				callback({
					error: 'INVALID_LOGIN_OR_PASSWORD'
				});
				return false;
			}
			const receivedData = results[0];
			if (!receivedData) return false;
			console.log(mysql, 'Login accepted!');
			console.log(socketIO, 'Sending informations...');
			callback({
				status: 'success',
				data: receivedData
			});
			return true;
		}
	);
	return true;
}

module.exports = handleLogin;
