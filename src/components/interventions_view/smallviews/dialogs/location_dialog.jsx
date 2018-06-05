import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import LocationPicker from '../../../smallviews/location_picker';

import '../../../../styles/interventions_view/smallviews/dialogs/location_dialog.css';

const LocationDialog = ({ open, onClose }) => (
	<Dialog
		open={open}
		onClose={onClose}
		classes={{
			paper: 'ld-paper'
		}}
	>
		<DialogTitle>
			{'Sélectionnez une location'}
		</DialogTitle>
		<DialogContent classes={{ root: 'ld-content' }}>
			<LocationPicker />
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

export default LocationDialog;
