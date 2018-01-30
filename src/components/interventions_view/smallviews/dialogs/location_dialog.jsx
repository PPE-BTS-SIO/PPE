import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle
} from 'material-ui/Dialog';

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
				color="primary"
				onClick={onClose}
			>
				{'Confirmer'}
			</Button>
		</DialogActions>
	</Dialog>
);

export default LocationDialog;
