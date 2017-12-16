const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'ppe',
	password: 'ppe123JRT',
	database: 'PPE'
});

module.exports = {
	connection
}
