const { getConnection } = require('../utils/sql');
const { socketIO } = require('../utils/prefixes');

const { addConnectedEmployee } = require('../utils/clients_tools');

const loginFromSecretKey = require('./login/login_secret_key');
const loginFromLoginAndPassword = require('./login/login_default');

const handleLogin = (data, callback, id, client) => {
	const connection = getConnection();
	if (!connection || connection.state !== 'authenticated') {
		callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
		return false;
	}
	console.log(socketIO, `Got login request from ${id.cyan}!`);
	if (data.secretKey) {
		console.log(socketIO, `Handling login using ${'secret key'.cyan} !`);
		return loginFromSecretKey(data.secretKey, callback)
			.then(employee => addConnectedEmployee(client, employee))
			.catch(error => console.log(error));
	}
	console.log(socketIO, `Handling login using ${'login & password'.cyan} !`);
	return loginFromLoginAndPassword(data, callback)
		.then(employee => addConnectedEmployee(client, employee))
		.catch(error => console.log(error));
}

module.exports = handleLogin;
