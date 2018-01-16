require('colors');
const { getConnection, handleConnect } = require('../utils/sql');
const fetch = require('node-fetch');

const clients = require('./clients');

const getOtherInformations = () => new Promise((resolve, reject) => {
	fetch('https://randomuser.me/api/?nationality=FR')
		.then((result) => {
			result.json()
				.then((json) => {
					if (!json || !json.results || !json.results[0]) {
						return reject();
					}
					const r = json.results[0];
					return resolve({
						location: `${r.location.street}, ${r.location.city.charAt(0).toUpperCase() + r.location.city.slice(1)}`,
						phone: r.phone
					});
				})
				.catch(reject)
		})
		.catch(reject)
});

const generateFax = () => {
	let fax = '(';
	for (let i = 0; i < 3; i += 1) {
		fax += Math.floor(Math.random() * 9);
	}
	fax += ') ';
	for (let i = 0; i < 3; i += 1) {
		fax += Math.floor(Math.random() * 9);
	}
	fax += '-';
	for (let i = 0; i < 4; i += 1) {
		fax += Math.floor(Math.random() * 9);
	}
	return fax;
}

const generateSiren = () => {
	let siren = '';
	for (let i = 0; i < 9; i += 1) {
		siren += ((i !== 0 && i % 3 === 0) ? ' ' : '') + Math.floor(Math.random() * 9);
	}
	return siren;
}

const generateAPE = () => {
	const letters = ['A', 'B', 'C', 'D'];
	let ape = '';
	for (let i = 0; i < 4; i += 1) {
		ape += Math.floor(Math.random() * 9);
	}
	ape += letters[Math.floor(Math.random() * letters.length)];
	return ape;
}

const generateAgence = () => `A${Math.floor(Math.random() * 3) + 1}`;

const generateDistance = () => Math.floor(Math.random() * 1000);

const generateMoveTime = distance => Math.floor(distance * (Math.random() * 2));

const getCompanyInformations = companyName => new Promise((resolve) => {
	const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURI(companyName)}`;
	fetch(url)
		.then((res) => {
			res.json()
				.then((json) => {
					if (json.length >= 1) {
						if (json[0]) {
							resolve({
								logo: `${json[0].logo}?size=500`,
								url: json[0].domain
							});
						}
					}
					return resolve();
				})
				.catch(() => resolve());
		})
		.catch(() => resolve());
});

let savedNumber = 1;

const showCompany = (companies, index) => {
	const connection = getConnection();
	if (companies && companies.length >= 1) {
		const company = companies[0];
		console.log(`\n${index}) ${company.yellow}`);
		getCompanyInformations(company).then((result) => {
			getOtherInformations()
				.then(({ location, phone }) => {
					if (result && result.logo && result.url) {
						const number = `C${savedNumber}`;
						const { logo } = result;
						const { url } = result;
						const siren = generateSiren();
						const ape = generateAPE();
						const fax = generateFax();
						const distance = generateDistance();
						const moveTime = generateMoveTime(distance);
						const agence = generateAgence();
						connection.query(
							'INSERT INTO `Client` (`NumeroClient`, `Nom`, `Raison_Sociale`, `Numero_Siren`, `Code_APE`, `Addresse`, `Num_Telephone`, `Fax`, `Duree_Deplacement`, `DistanceKm`, `Num_Agence`, `Url`, `Logo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
							[number, company, company.toUpperCase(), siren, ape, location, phone, fax, moveTime, distance, agence, url, logo],
							(error) => {
								if (error) {
									return console.log('\nFailed'.red);
								}
								savedNumber += 1;
								return console.log(`\n${'Success!'.green}\n\nId: ${number.cyan}\nURL: ${url.cyan}\nLogo: ${logo.cyan}\nSiren: ${siren.cyan}\nAPE: ${ape.cyan}\nFax: ${fax.cyan}\nLocation: ${location.cyan}\nPhone: ${phone.cyan}\nDistance: ${`${distance}`.cyan}\nDurée: ${`${moveTime}`.cyan}\nAgence: ${agence.cyan}`);
							}
						)
					} else console.log('\nFailed'.red);
					const newCompanies = companies.splice(1, companies.length - 1);
					return setTimeout(() => showCompany(newCompanies, index + 1), 100);
				})
				.catch(() => {})
		})
			.catch(() => {});
	}
}

handleConnect().then(() => {
	showCompany(clients.companies, 1);
});
