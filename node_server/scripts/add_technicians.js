const { handleConnect, getConnection } = require('../utils/sql');

handleConnect().then(() => {
	const connection = getConnection();
	for (let i = 1; i <= 5000; i += 1) {
		let type = 'T';
		if (i <= 2500) {
			type = 'A';
		}
		const matricule = `E${i}`;
		connection.query(
			'UPDATE `Employe` SET `Type`=? WHERE Matricule LIKE ?',
			[type, matricule],
			(error) => {
				if (error) {
					return console.log('Error :', error);
				}
				return console.log(`${matricule} : ${type}`);
			}
		)
	}
});
