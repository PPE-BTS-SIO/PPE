import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from 'material-ui/Dialog';


const LocationDialog = ({ open, handleClose }) => (
	<Dialog
		open={open}
		onRequestClose={handleClose}
	>
		<DialogTitle>
			{'Filtrer par location'}
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				{'Velit est est in et excepteur deserunt amet dolor mollit aliqua in non et consectetur consequat.'}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button
				autoFocus
				color="primary"
				onClick={handleClose}
			>
				{'Confirmer'}
			</Button>
		</DialogActions>
	</Dialog>
);

export default LocationDialog;
