import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const CreatePdf = () => (
	<div className="examples-container">
		<Button
			color="primary"
			variant="raised"
			onClick={() => {
				console.log(`${__dirname}`);
			}}
		>
			{'Générer un PDF'}
		</Button>
	</div>
);

export default CreatePdf;
