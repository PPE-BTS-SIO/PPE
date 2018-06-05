const { getConnection } = require('../../utils/sql');
const {
	socketIO,
	mysql
} = require('../../utils/prefixes');

const handleLoginFromSecretKey = (secretKey, callback) => new Promise((resolve, reject) => {
	const connection = getConnection();
	return connection.query(
		'SELECT `login` FROM `Secret_Keys` WHERE `secret_key` LIKE ?',
		[secretKey],
		(error, results) => {
			if (error) {
				console.log(mysql, `Login failed: ${error}`);
				callback({ error });
				return reject();
			}
			if (!results || results.length < 1 || !results[0] || !results[0].login) {
				callback({ error: 'INVALID_SECRET_KEY' });
				return reject(Error(`${mysql} Login failed: Invalid secret key!`));
			}
			const { login } = results[0];
			return connection.query(
				'SELECT * FROM Employe WHERE Matricule = ?',
				[login],
				(e, r) => {
					if (e) {
						callback({ error });
						return reject(Error(`${mysql} Login failed: ${e}`))
					}
					if (!r || r < 1) {
						callback({ error: 'INVALID_LOGIN_OR_PASSWORD' });
						return reject(Error(`${mysql} Login failed: No column match!`));
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
