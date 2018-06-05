const crypto = require('crypto');
const { keccak512 } = require('js-sha3');
const { getConnection } = require('../../utils/sql');
const {
	socketIO,
	mysql
} = require('../../utils/prefixes');

const handleLoginFromLoginAndPassword = (data, callback) => new Promise((resolve, reject) => {
	const connection = getConnection();
	const { login, password, shouldRemember } = data;
	if (!login || !password) return false;
	const encryptedPassword = keccak512(password);
	return connection.query(
		'SELECT * FROM Employe WHERE Matricule = ? AND Password = ?',
		[login, encryptedPassword],
		(error, results) => {
			if (error) {
				callback({ error });
				return reject(Error(`${mysql} Login failed: ${error}`));
			}
			if (!results || results.length < 1) {
				callback({
					error: 'INVALID_LOGIN_OR_PASSWORD'
				});
				return reject(Error(`${mysql} Login failed: No column match!`));
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
					return connection.query(
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
							return resolve(receivedData)
						}
					);
				});
			} else {
				callback({
					status: 'success',
					data: receivedData
				});
				return resolve(receivedData)
			}
			return null;
		}
	);
});

module.exports = handleLoginFromLoginAndPassword;
