const Moment = require('moment');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const { getConnection } = require('../utils/sql');
const {
	socketIO,
	mysql,
	pdf
} = require('../utils/prefixes');

const handlePDFCreationRequest = (callback, id, data) => {
	const connection = getConnection();
	if (!data || !data.interventionId) {
		return callback({ error: 'NO_DATA' });
	}
	console.log(socketIO, `Got PDF creation request from ${id}!`);
	if (!connection || connection.state !== 'authenticated') {
		return callback({ error: 'SQL_SERVER_NOT_CONNECTED' });
	}
	const { interventionId } = data;
	if (!interventionId) {
		return null;
	}
	connection.query(
		'SELECT * FROM `Intervention` I, `Client` C WHERE Numero_Intervention = ? AND I.NumeroClient = C.NumeroClient',
		[interventionId],
		(error, results) => {
			console.log(mysql, 'Fetching intervention...');
			if (error) {
				return callback({ error });
			}
			if (!results || results.length < 1) {
				return callback({ error: 'NO_RESULT' });
			}
			const result = results[0];
			const document = new PDFDocument();
			const pdfName = `PDF_${interventionId}_${Moment().format('MMM-Do-YY_h:mm:ss_a')}`;
			const ws = fs.createWriteStream(`/var/www/html/pdf/${pdfName}.pdf`);
			ws.on('error', e => console.error(e));
			ws.on('finish', () => {
				console.log(pdf, 'PDF Generated, calling callback...');
				callback({ url: `http://78.237.195.145:8001/pdf/${pdfName}.pdf` })
			});
			document.pipe(ws);
			document
				.font('Helvetica-Bold')
				.fontSize(25)
				.text(`Intervention n°${interventionId}`, {
					align: 'center',
					margins: {
						bottom: 50
					}
				})
				.fill('#4f4f4f')
				.roundedRect(20, 140, document.page.width - 40, 3, 100)
				.font('Helvetica-Bold')
				.fontSize(18)
				.fill('#000')
				.text(`Client ${result.NumeroClient}`, 20, 240)
				.fill('#b0b0b0')
				.rect(20, 260, 200, 2)
				.fontSize(14)
				.font('Helvetica')
				.fill('#000')
				.text(`Nom : ${result.Nom}`, 20, 280)
				.text(`Adresse : ${result.Addresse}`, 20, 300)
				.text(`Siren : ${result.Numero_Siren}`, 20, 320)
				.text(`APE : ${result.Code_APE}`, 20, 340)
				.text(`Téléphone : ${result.Num_Telephone}`, 20, 360)
				.text(`Téléphone : ${result.Num_Telephone}`, 20, 360)
				.text(`Fax : ${result.Fax}`, 20, 380)
				.font('Helvetica-Bold')
				.fontSize(18)
				.fill('#000')
				.text(result.Duree_Intervention > 0 ? 'Intervention terminée' : 'Intervention prévue', 20, 500)
				.fill('#b0b0b0')
				.rect(20, 520, 200, 2)
				.fontSize(14)
				.font('Helvetica')
				.fill('#000')
				.text(`Date : ${result.Date_Intervention}`, 20, 540)
				.text(`Technicien affecté : ${result.Matricule || 'Aucun'}`, 20, 560)
				.text(`Série de matériel : ${result.NumSérie}`, 20, 580);
			document.end();
		}
	)
}

module.exports = handlePDFCreationRequest;
