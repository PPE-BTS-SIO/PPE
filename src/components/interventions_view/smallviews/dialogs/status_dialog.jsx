import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from 'material-ui/Dialog';


const StatusDialog = ({ open, onClose }) => (
	<Dialog
		open={open}
		onClose={onClose}
	>
		<DialogTitle>
			{'Sélectionnez un status'}
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
				onClick={onClose}
			>
				{'Confirmer'}
			</Button>
		</DialogActions>
	</Dialog>
);

export default StatusDialog;
