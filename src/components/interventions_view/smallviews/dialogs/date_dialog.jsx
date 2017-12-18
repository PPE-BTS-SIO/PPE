import React from 'react';

import { DatePicker } from 'material-ui-pickers';

import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle
} from 'material-ui/Dialog';

const DateDialog = ({
	open,
	selectedDate,
	handleClose,
	setPreciseFilter
}) => {
	if (!open) {
		return null;
	}
	return (
		<Dialog
			open={open}
			onRequestClose={handleClose}
		>
			<DialogTitle>
				{'Filtrer par location'}
			</DialogTitle>
			<DialogContent>
				<DatePicker
					keyboard
					value={selectedDate}
					onChange={date => setPreciseFilter({ date })}
				/>
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
}

export default DateDialog;
