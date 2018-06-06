import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Search
	from '@material-ui/icons/Search';

import SidePanel from '../../../smallviews/side_panel/side_panel';
import CustomerSection from './customer_section';

import { requestCustomers as requestCustomersAction } from '../../../../actions/main_actions';

import '../../../../styles/interventions_view/smallviews/interventions_side_panel.css';
import '../../../../styles/interventions_view/smallviews/customer_searchbox.css';
import '../../../../styles/interventions_view/smallviews/customer_section.css';

class InterventionsSidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredCustomers: null
		}
	}

	componentWillMount() {
		const { hasReceivedCustomers } = this.props;
		if (hasReceivedCustomers === false) {
			const { requestCustomers } = this.props;
			return requestCustomers();
		}
		return this.filterCustomers();
	}

	componentWillReceiveProps(nextProps) {
		const oldCustomers = this.props.customers;
		const oldInput = this.props.customerInput;
		const { customers, customerInput } = nextProps;
		if (JSON.stringify(oldCustomers) !== JSON.stringify(customers)
			|| oldInput !== customerInput) {
			this.filterCustomers(nextProps);
		}
	}

	filterCustomers = (propsToUse) => {
		const { hasReceivedCustomers, customers, customerInput } = propsToUse || this.props;
		if (hasReceivedCustomers === false || !customers || customers.length < 1) {
			return null;
		}
		if (!customerInput) {
			return this.setState({ filteredCustomers: customers });
		}
		const loweredInput = customerInput.toLowerCase();
		const filteredCustomers = customers.filter((customer) => {
			console.log(customer);
			const keys = Object.keys(customer);
			return keys.some(key =>
				typeof customer[key] === 'string'
				&& customer[key].toLowerCase().includes(loweredInput))
		});
		return this.setState({ filteredCustomers });
	}

	render() {
		const {
			hasReceivedCustomers,
			useMobileLayout,
			setCustomerInput,
			openDrawer,
			changeDrawersOpenState
		} = this.props;

		const customers = this.state.filteredCustomers;

		if (useMobileLayout) {
			return (
				<MobileSidePanel
					hasReceivedCustomers={hasReceivedCustomers}
					customers={customers}
					openDrawer={openDrawer}
					changeDrawersOpenState={changeDrawersOpenState}
					setCustomerInput={setCustomerInput}
				/>
			);
		}
		return (
			<Content
				hasReceivedCustomers={hasReceivedCustomers}
				customers={customers}
				setCustomerInput={setCustomerInput}
			/>
		);
	}
}

const MobileSidePanel = ({
	openDrawer,
	changeDrawersOpenState,
	setCustomerInput,
	hasReceivedCustomers,
	customers
}) => (
	<Drawer
		open={openDrawer}
		onClose={() => changeDrawersOpenState({ interventionsSidePanel: false })}
	>
		<Content
			hasReceivedCustomers={hasReceivedCustomers}
			customers={customers}
			setCustomerInput={setCustomerInput}
			useMobileLayout
		/>
	</Drawer>
);

const Content = ({
	setCustomerInput,
	useMobileLayout,
	hasReceivedCustomers,
	customers
}) => {
	let content = null;
	if (hasReceivedCustomers === false
		|| (hasReceivedCustomers
			&& (!customers || customers.length < 1))) {
		content = (
			<div id="isp-content-loading">
				{"Il n'y a pas de clients."}
			</div>
		);
	} else if (hasReceivedCustomers === null) {
		content = (
			<div id="isp-content-loading">
				<CircularProgress />
			</div>
		)
	} else {
		content = (
			<Fragment>
				{customers.map((customer, index) => (
					<CustomerSection
						customer={customer}
						index={index}
						key={`customer_sp_${customer.customerId}`}
					/>
				))}
			</Fragment>
		)
	}

	return (
		<SidePanel isInDrawer={useMobileLayout}>
			<CustomerSearchbox setCustomerInput={setCustomerInput} />
			{content}
		</SidePanel>
	);
};

const CustomerSearchbox = ({ setCustomerInput }) => (
	<div id="isp-customerSearchbox-section">
		<div id="isp-customerSearchbox-container">
			<div id="isp-customerSearchbox-icon-container">
				<Search style={{ fill: 'rgba(0, 0, 0, .4)' }} />
			</div>
			<input
				type="text"
				placeholder="Chercher des clients"
				onChange={event => setCustomerInput(event.target.value)}
			/>
		</div>
	</div>
);



const mapStateToProps = state => ({
	hasReceivedCustomers: state.main.hasReceivedCustomersData,
	customers: state.main.customers
});

const mapDispatchToProps = dispatch => bindActionCreators({
	requestCustomers: requestCustomersAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InterventionsSidePanel);
