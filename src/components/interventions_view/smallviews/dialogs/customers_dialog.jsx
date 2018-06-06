import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import { requestCustomers as requestCustomersAction } from '../../../../actions/main_actions';

import '../../../../styles/interventions_view/smallviews/dialogs/customers_dialog.css';

class CustomersDialog extends Component {
	componentWillMount() {
		const { hasReceivedCustomers } = this.props;
		if (hasReceivedCustomers === false) {
			const { requestCustomers } = this.props;
			requestCustomers();
		}
	}

	render() {
		let content = null;

		const {
			hasReceivedCustomers,
			customers,
			open,
			onClose,
			onSelected
		} = this.props;

		if (hasReceivedCustomers === null) {
			content = <CircularProgress />
		} else if (hasReceivedCustomers && (!customers || Object.keys(customers).length < 1)) {
			content = (
				<DialogContentText>
					{"Il n'y a pas de client."}
				</DialogContentText>
			);
		} else {
			content = (
				<Customers
					customers={customers}
					onClose={onClose}
					onSelected={onSelected}
				/>
			)
		}
		return (
			<Dialog
				open={open}
				onClose={onClose}
			>
				<DialogTitle>
					{'Sélectionnez un client'}
				</DialogTitle>
				<DialogContent
					className="cd-dialog-content"
					onScroll={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					{content}
				</DialogContent>
			</Dialog>
		);
	}
}

const Customers = ({ customers, onClose, onSelected }) => (
	<List>
		{customers.map(customer => (
			<ListItem
				button
				onClick={() => {
					onClose();
					onSelected(customer);
				}}
				key={`ed-employee-item-${customer.customerId}`}
			>
				<ListItemAvatar>
					<Avatar alt={`Client ${customer.customerId}`} src={customer.logo} />
				</ListItemAvatar>
				<ListItemText primary={customer.name} />
			</ListItem>
		))}
	</List>
);

const mapStateToProps = state => ({
	hasReceivedCustomers: state.main.hasReceivedCustomersData,
	customers: state.main.customers
});

const mapDispatchToProps = dispatch => bindActionCreators({
	requestCustomers: requestCustomersAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomersDialog);
