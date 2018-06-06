import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';

class CustomerSectionEditDialog extends PureComponent {
	constructor(props) {
		super(props);
		const { customer } = this.props;
		this.state = { ...customer };
	}

	render() {
		return (
			'yo'
		)
	};
}
