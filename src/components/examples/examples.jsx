import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';

import '../../styles/examples/examples.css';

const Examples = () => (
	<div className="examples-container">
		<Link to="/examples/create-button">
			<Button
				raised
				color="primary"
			>
				{'Créer un bouton'}
			</Button>
		</Link>
		<Link to="/examples/create-input">
			<Button
				raised
				color="primary"
			>
				{"Gérer un espace d'écriture"}
			</Button>
		</Link>
	</div>
);

export default Examples;
