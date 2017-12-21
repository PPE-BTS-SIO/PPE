import React from 'react';

import Search from 'material-ui-icons/Search';
import Add from 'material-ui-icons/Add';

import '../../../styles/interventions_view/smallviews/interventions_banner.css';
import '../../../styles/interventions_view/smallviews/interventions_searchbox.css';
import '../../../styles/interventions_view/smallviews/interventions_add_button.css';

const InterventionsBanner = ({ setInterventionsInput, handleAddClick }) => (
	<div id="interventions-banner">
		<InterventionsSearchbox setInterventionsInput={setInterventionsInput} />
		<AddButton handleAddClick={handleAddClick} />
	</div>
);

const InterventionsSearchbox = ({ setInterventionsInput }) => (
	<div id="ib-searchbox">
		<div id="ib-searchbox-icon-container">
			<Search style={{ fill: 'rgba(0, 0, 0, .4)' }} />
		</div>
		<input
			type="text"
			onChange={event => setInterventionsInput(event.target.value)}
		/>
	</div>
);

const AddButton = ({ handleAddClick }) => (
	<div
		id="ib-add-button"
		onClick={handleAddClick}
	>
		<Add style={{ fill: 'rgba(0, 0, 0, .4)' }} />
	</div>
);

export default InterventionsBanner;
