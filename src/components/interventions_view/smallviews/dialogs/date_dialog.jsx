import React from 'react';

import { DatePicker } from 'material-ui-pickers';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button';

const DateDialog = ({
	open,
	selectedDate,
	onClose,
	setPreciseFilter
}) => {
	if (!open) {
		return null;
	}
	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<DialogTitle>
				{'Sélectionnez une date'}
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
					dense
					color="primary"
					onClick={onClose}
				>
					{'Confirmer'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DateDialog;
