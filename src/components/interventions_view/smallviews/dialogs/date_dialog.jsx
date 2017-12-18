import React from 'react';

import { DatePicker } from 'material-ui-pickers';

const DateDialog = ({ isOpen, selectedDate, handleClose }) => {
	if (!isOpen) {
		return null;
	}
	return (
		<DatePicker
			keyboard
			value={selectedDate}
			onChange={this.handleDateChange}
			animateYearScrolling={false}
		/>
	);
}

export default DateDialog;
