import React from 'react';

import '../../../styles/interventions_view/smallviews/interventions_wrapper.css';
import '../../../styles/interventions_view/smallviews/interventions_card.css';

const InterventionsWrapper = () => (
	<div id="interventions-wrapper">
		<InterventionCard />
		<InterventionCard />
		<InterventionCard />
		<InterventionCard />
	</div>
);

const InterventionCard = () => {
	let antiLint;
	return (
		<div className="interventions-card" />
	)
};

export default InterventionsWrapper;
