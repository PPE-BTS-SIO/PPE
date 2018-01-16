const { getConnection } = require('../../utils/sql');
const {
	socketIO,
	mysql
} = require('../../utils/prefixes');

const handleLoginFromSecretKey = (secretKey, callback) => {
	const connection = getConnection();
	connection.query(
		'SELECT `login` FROM `Secret_Keys` WHERE `secret_key` LIKE ?',
		[secretKey],
		(error, results) => {
			if (error) {
				console.log(mysql, `Login failed: ${error}`);
				callback({ error });
				return false;
			}
			if (!results || results.length < 1 || !results[0] || !results[0].login) {
				console.log(mysql, 'Login failed: Invalid secret key!');
				callback({ error: 'INVALID_SECRET_KEY' });
				return false;
			}
			const { login } = results[0];
			connection.query(
				'SELECT * FROM Employe WHERE Matricule = ?',
				[login],
				(e, r) => {
					if (e) {
						console.error(mysql, `Login failed: ${e}`);
						callback({ error });
						return false;
					}
					if (!r || r < 1) {
						console.log(mysql, 'Login failed: No column match!');
						callback({ error: 'INVALID_LOGIN_OR_PASSWORD' });
						return false;
					}
					const receivedData = r[0];
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
	)
}

module.exports = handleLoginFromSecretKey;
