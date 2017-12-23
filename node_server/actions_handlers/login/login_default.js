const crypto = require('crypto');
const { keccak512 } = require('js-sha3');
const { connection } = require('../../utils/sql');
const {
	socketIO,
	mysql
} = require('../../utils/prefixes');

const handleLoginFromLoginAndPassword = (data, callback) => {
	const { login, password, shouldRemember } = data;
	if (!login || !password) return false;
	const encryptedPassword = keccak512(password);
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
			if (shouldRemember) {
				crypto.randomBytes(255 / 2, (err, buffer) => {
					if (err) return false;
					const token = buffer.toString('hex');
					console.log(mysql, 'Storing secret key...');
					connection.query(
						'INSERT INTO `Secret_Keys`(`secret_key`, `login`) VALUES (?, ?)',
						[token, login],
						(e) => {
							if (e) return false;
							console.log(mysql, 'Secret key stored!');
							callback({
								status: 'success',
								data: receivedData,
								secretKey: token
							});
							return true;
						}
					);
					return true;
				});
			} else {
				callback({
					status: 'success',
					data: receivedData
				});
			}
			return true;
		}
	);
	return true;
}

module.exports = handleLoginFromLoginAndPassword;
