const users = require('./users');
const Moment = require('moment');
const { sha3_512, keccak512 } = require('js-sha3');
const { handleConnect, getConnection } = require('../utils/sql');

const from = new Date(1980);
const to = new Date();

const getRandomDate = (from, to) => {
	from = from.getTime();
	to = to.getTime();
	return new Date(from + (Math.random() * (to - from)));
}

handleConnect().then(() => {
	console.log('Connected!');
	Object.keys(users).forEach((i, index) => {
		const user = users[i];
		const matricule = index + 1;
		const { name = {} } = user;
		let { first = '?', last = '?' } = name;
		const mail = `${first}.${last}@cashcash.fr`;
		const password = keccak512(sha3_512(user.login.password));
		const location = `${user.location.street}, ${user.location.city.charAt(0).toUpperCase() + user.location.city.slice(1)}`;
		const date = new Moment(getRandomDate(from, to)).format('YYYY-MM-DD');
		const picture = user.picture.large;
		first = first.charAt(0).toUpperCase() + first.slice(1);
		last = last.charAt(0).toUpperCase() + last.slice(1);
		const type = (Math.floor(Math.random() * 2) + 1) === 1
			? 'A'
			: 'T';
		getConnection().query(
			'INSERT INTO `Employe` (`Matricule`, `Type`, `Nom`, `Prenom`, `Adresse`, `Date_Embauche`, `Password`, `Mail`, `ImageProfil`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[matricule, type, last, first, location, date, password, mail, picture],
			(error) => {
				if (error) {
					console.log(error);
				} else {
					console.log(`${matricule} : ${type} : ${first} : ${last} : ${location} : ${date} : ${mail} : ${password}\n`)
				}
			}
		);
	});
});
