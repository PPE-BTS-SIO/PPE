import React from 'react';

import Search from 'material-ui-icons/Search';

import SidePanel from '../../smallviews/side_panel/side_panel';

import '../../../styles/interventions_view/smallviews/interventions_side_panel.css';
import '../../../styles/interventions_view/smallviews/customer_searchbox.css';
import '../../../styles/interventions_view/smallviews/customer_section.css';

const InterventionsSidePanel = ({ setCustomerInput }) => (
	<SidePanel>
		<CustomerSearchbox setCustomerInput={setCustomerInput} />
		<CustomerSection />
		<CustomerSection />
		<CustomerSection />
		<CustomerSection />
		<CustomerSection />
	</SidePanel>
);

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

const CustomerSection = ({ customer }) => (
	<div className="isp-customer-section">
		<div className="isp-customer-section-picture-container" />
	</div>
);

export default InterventionsSidePanel;
