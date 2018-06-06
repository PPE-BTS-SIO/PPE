import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import '../../../styles/interventions_view/smallviews/interventions_banner.css';
import '../../../styles/interventions_view/smallviews/interventions_searchbox.css';
import '../../../styles/interventions_view/smallviews/interventions_add_button.css';

const InterventionsBanner = ({
	setInterventionsInput, handleAddClick, isAdding, role
}) => {
	let content = null;
	if (role === 'A') {
		content = (
			<ActionButton
				handleAddClick={handleAddClick}
				isAdding={isAdding}
			/>
		);
	}
	return (
		<div id="interventions-banner">
			<InterventionsSearchbox
				setInterventionsInput={setInterventionsInput}
			/>
			{content}
		</div>
	);
}

const InterventionsSearchbox = ({ setInterventionsInput }) => (
	<div id="ib-searchbox">
		<div id="ib-searchbox-icon-container">
			<Search style={{ fill: 'rgba(0, 0, 0, .4)' }} />
		</div>
		<input
			type="text"
			onChange={setInterventionsInput}
		/>
	</div>
);

const ActionButton = ({ handleAddClick, isAdding }) => (
	<div
		id="ib-add-button"
		onClick={handleAddClick}
	>
		<IconButton>
			{isAdding
				? <Remove style={{ fill: 'rgba(0, 0, 0, .4) ' }} />
				: <Add style={{ fill: 'rgba(0, 0, 0, .4)' }} />}
		</IconButton>
	</div>
);

const mapStateToProps = ({ user: { role } }) => ({ role });

export default connect(mapStateToProps)(InterventionsBanner);
