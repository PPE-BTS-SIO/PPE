import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, {
	DialogTitle,
	DialogContent,
	DialogContentText
}  from 'material-ui/Dialog';
import { CircleProgress } from 'material-ui/Progress';

import {
	requestCustomers as requestCustomersAction
} from '../../../../actions/main_actions';

class CustomersDialog extends PureComponent {
	componentDidMount() {
		const { hasReceivedCustomers } = this.props;
		if (hasReceivedCustomers === false) {
			const { requestCustomers } = this.props;
			requestCustomers();
		}
	}

	render() {
		let content = null;
		const { hasReceivedCustomers, customers } = this.props;
		if (hasReceivedCustomers === null) {
			content = <CircleProgress />
		} else if (hasReceivedCustomers && (!customers || Object.keys(customers).length < 1)) {
			content = (
				<DialogContentText>
					{"Il n'y a pas de client."}
				</DialogContentText>
			);
		}
		return (
			<Dialog>
				<DialogTitle>
					{'Sélectionnez un client'}
				</DialogTitle>
				<DialogContent>
					{content}
				</DialogContent>
			</Dialog>
		);
	}
}

const mapStateToProps = state => ({
	hasReceivedCustomers: state.main.hasReceivedCustomersData,
	customers: state.main.customers
});

const mapDispatchToProps = dispatch => bindActionCreators({
	requestCustomers: requestCustomersAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomersDialog);
