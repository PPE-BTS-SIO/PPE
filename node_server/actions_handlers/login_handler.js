const { getConnection } = require('../utils/sql');
const { socketIO } = require('../utils/prefixes');

const loginFromSecretKey = require('./login/login_secret_key');
const loginFromLoginAndPassword = require('./login/login_default');

const handleLogin = (data, callback, id) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
		return false;
	}
	console.log(socketIO, `Got login request from ${id.cyan}!`);
	if (data.secretKey) {
		console.log(socketIO, `Handling login using ${'secret key'.cyan} !`);
		loginFromSecretKey(data.secretKey, callback);
		return true;
	}
	console.log(socketIO, `Handling login using ${'login & password'.cyan} !`);
	loginFromLoginAndPassword(data, callback);
	return true;
}

module.exports = handleLogin;
