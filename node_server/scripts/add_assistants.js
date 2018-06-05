const Moment = require('moment');
const { handleConnect, getConnection } = require('../utils/sql');

const from = new Date(1990);
const to = new Date();

const getRandomDate = (from, to) => {
	from = from.getTime();
	to = to.getTime();
	return new Date(from + (Math.random() * (to - from)));
}

const addAssistantsFromLastRow = (rows) => {
	if (!rows || rows.length < 1) {
		return null;
	}
	const newRows = [...rows];
	const lastRow = newRows.pop();

	const matricule = lastRow.Matricule;
	let cr = Math.floor(Math.floor(Math.random() * 6) + 1);

	switch (cr) {
	case 1: cr = 'NORD'; break;
	case 2: cr = 'NORD-EST'; break;
	case 3: cr = 'NORD-OUEST'; break;
	case 4: cr = 'SUD'; break;
	case 5: cr = 'SUD-EST'; break;
	default: cr = 'SUD-OUEST';
	}

	console.log(`\nInserting ${matricule}...`);

	return getConnection().query(
		'INSERT INTO `Assistant`(`Matricule`, `Code`) VALUES (?, ?)',
		[matricule, cr],
		(error) => {
			if (error) {
				console.log(error);
			}
			setTimeout(() => addAssistantsFromLastRow(newRows), 10);
		}
	)
}

handleConnect().then(() => {
	console.log('Connected!');
	console.log('Fetching existing employees...');

	const connection = getConnection();
	return connection.query('SELECT * FROM `Employe` WHERE 1', (error, results) => {
		if (error) {
			console.log('A wild error happened!'.red, error);
		}
		if (!results || results.length < 1) {
			console.log('Not enough result!'.red);
		}
		const assistants = [...results].filter(result => result.Type === 'A');
		return addAssistantsFromLastRow(assistants);
	})
});
