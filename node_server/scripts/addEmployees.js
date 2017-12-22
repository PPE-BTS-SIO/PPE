const users = require('./users');
const Moment = require('moment');
const { sha3_512, keccak512 } = require('js-sha3');
const { connection } = require('../utils/sql');

const from = new Date(1980);
const to = new Date();

const getRandomDate = (from, to) => {
	from = from.getTime();
	to = to.getTime();
	return new Date(from + (Math.random() * (to - from)));
}

connection.connect(() => {
	console.log('connected');
	Object.keys(users).forEach((i, index) => {
		const user = users[i];
		const matricule = `E${index + 1}`;
		const { name = {} } = user;
		let { first = '?', last = '?' } = name;
		const mail = `${first}.${last}@cashcash.fr`;
		const password = keccak512(sha3_512(user.login.password));
		const location = `${user.location.street}, ${user.location.city.charAt(0).toUpperCase() + user.location.city.slice(1)}`;
		const date = new Moment(getRandomDate(from, to)).format('YYYY-MM-DD');
		const picture = user.picture.large;
		first = first.charAt(0).toUpperCase() + first.slice(1);
		last = last.charAt(0).toUpperCase() + last.slice(1);
		connection.query(
			'INSERT INTO `Employe` (`Matricule`, `Nom`, `Prenom`, `Adresse`, `DateEmbauche`, `Password`, `Mail`, `ImageProfil`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[matricule, last, first, location, date, password, mail, picture],
			() => console.log(`${matricule} : ${first} : ${last} : ${location} : ${date} : ${mail} : ${password}\n`)
		);
	});
});
