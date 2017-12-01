import React from 'react';

import Search from 'material-ui-icons/Search';
import Add from 'material-ui-icons/Add';

import '../../../styles/interventions_view/smallviews/interventions_banner.css';
import '../../../styles/interventions_view/smallviews/interventions_searchbox.css';
import '../../../styles/interventions_view/smallviews/interventions_add_button.css';

const InterventionsBanner = ({ setInterventionsInput }) => (
	<div id="interventions-banner">
		<InterventionsSearchbox setInterventionsInput={setInterventionsInput} />
		<AddButton />
	</div>
);

const InterventionsSearchbox = ({ setInterventionsInput }) => (
	<div id="ib-searchbox">
		<div id="ib-searchbox-icon-container">
			<Search color="rgba(0, 0, 0, .4)" />
		</div>
		<input
			type="text"
			onChange={event => setInterventionsInput(event.target.value)}
		/>
	</div>
);

const AddButton = () => (
	<div id="ib-add-button">
		<Add color="rgba(0, 0, 0, .4)" />
	</div>
);

export default InterventionsBanner;
