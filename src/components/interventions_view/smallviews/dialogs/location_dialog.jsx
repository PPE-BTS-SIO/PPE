import React from 'react';

import Dialog, { DialogTitle } from 'material-ui/Dialog';

const LocationDialog = ({ open, handleClose }) => (
	<Dialog
		open={open}
		onRequestClose={handleClose}
	>

	</Dialog>
);

export default LocationDialog;
