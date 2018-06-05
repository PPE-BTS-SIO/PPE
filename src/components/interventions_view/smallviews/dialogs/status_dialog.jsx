import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';


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
				dense
				color="primary"
				onClick={onClose}
			>
				{'Confirmer'}
			</Button>
		</DialogActions>
	</Dialog>
);

export default StatusDialog;
