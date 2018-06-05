const Moment = require('moment');
const { handleConnect, getConnection } = require('../utils/sql');

const from = new Date(1990);
const to = new Date();

const getRandomDate = (from, to) => {
	from = from.getTime();
	to = to.getTime();
	return new Date(from + (Math.random() * (to - from)));
}

const addTechniciansFromLastRow = (rows) => {
	if (!rows || rows.length < 1) {
		return null;
	}
	const newRows = [...rows];
	const lastRow = newRows.pop();

	const matricule = lastRow.Matricule;
	const qualification = `Bac +${Math.floor(Math.random() * 8) + 1}`;
	const date = new Moment(getRandomDate(from, to)).format('YYYY-MM-DD');
	const phone = `06${Math.floor(Math.random() * 10000000)}`;
	const agence = `A${Math.floor(Math.random() * 3) + 1}`;

	console.log(`\nInserting ${matricule}...`);

	return getConnection().query(
		'INSERT INTO `Technicien`(`Matricule`, `Qualification`, `Date_Obtention`, `Num_Telephone`, `Num_Agence`) VALUES (?, ?, ?, ?, ?)',
		[matricule, qualification, date, phone, agence],
		(error) => {
			if (error) {
				console.log(error);
			}
			setTimeout(() => addTechniciansFromLastRow(newRows), 10);
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
		const technicians = [...results].filter(result => result.Type === 'T');
		return addTechniciansFromLastRow(technicians);
	})
});
