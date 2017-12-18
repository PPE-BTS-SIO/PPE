const fetch = require('node-fetch');

fetch('https://randomuser.me/api/?nat=FR&results=5000').then(data => data.json()).then((data) => {
	console.log(data);
})
