const { getConnection } = require('../../utils/sql');
const {
	socketIO,
	mysql
} = require('../../utils/prefixes');

const handleLoginFromSecretKey = (secretKey, callback) => new Promise((resolve, reject) => {
	const connection = getConnection();
	return connection.query(
		'SELECT `login` FROM `secret_keys` WHERE `secret_key` LIKE ?',
		[secretKey],
		(error, results) => {
			if (error) {
				console.log(mysql, `Login failed: ${error}`);
				callback({ error });
				return reject();
			}
			if (!results || results.length < 1 || !results[0] || !results[0].login) {
				console.log(mysql, 'Login failed: Invalid secret key!');
				callback({ error: 'INVALID_SECRET_KEY' });
				return reject();
			}
			const { login } = results[0];
			return connection.query(
				'SELECT * FROM employe WHERE Matricule = ?',
				[login],
				(e, r) => {
					if (e) {
						console.error(mysql, `Login failed: ${e}`);
						return callback({ error });
					}
					if (!r || r < 1) {
						console.log(mysql, 'Login failed: No column match!');
						return callback({ error: 'INVALID_LOGIN_OR_PASSWORD' });
					}
					const receivedData = r[0];
					if (!receivedData) return false;
					console.log(mysql, 'Login accepted!');
					console.log(socketIO, 'Sending informations...');
					callback({
						status: 'success',
						data: receivedData
					});
					return resolve(receivedData);
				}
			);
		}
	)
});

module.exports = handleLoginFromSecretKey;
