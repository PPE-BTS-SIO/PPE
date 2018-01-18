import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';
import { CircularProgress } from 'material-ui/Progress';
import Search from 'material-ui-icons/Search';

import SidePanel from '../../../smallviews/side_panel/side_panel';
import CustomerSection from './customer_section';

import { requestCustomers as requestCustomersAction } from '../../../../actions/main_actions';

import '../../../../styles/interventions_view/smallviews/interventions_side_panel.css';
import '../../../../styles/interventions_view/smallviews/customer_searchbox.css';
import '../../../../styles/interventions_view/smallviews/customer_section.css';

class InterventionsSidePanel extends Component {
	componentDidMount() {
		const { hasReceivedCustomers } = this.props;
		if (hasReceivedCustomers === false) {
			const { requestCustomers } = this.props;
			requestCustomers();
		}
	}

	render() {
		const {
			hasReceivedCustomers,
			customers,
			useMobileLayout,
			setCustomerInput,
			openDrawer,
			changeDrawersOpenState
		} = this.props;

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
				<CustomerSearchbox setCustomerInput={setCustomerInput} />
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
		<SidePanel isInDrawer={useMobileLayout} >
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
