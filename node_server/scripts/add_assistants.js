const users = require('./users');
const { connection } = require('../utils/sql');

const codes = [
	'NORD',
	'NORD-EST',
	'NORD-OUEST',
	'SUD',
	'SUD-EST',
	'SUD_OUEST'
];

connection.connect(() => {
	console.log('Connected!');
	Object.keys(users).slice(0, 5000 / 2).forEach((i, index) => {
		const matricule = `E${index + 1}`;
		const randomCode = codes[Math.floor(Math.random() * codes.length)];
		connection.query(
			'INSERT INTO `Assistant`(`Matricule`, `Code`) VALUES (?, ?)',
			[matricule, randomCode],
			() => console.log(`${matricule} - ${randomCode}`)
		)
	})
})
