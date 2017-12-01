import React from 'react';

import classnames from 'classnames';

import '../../../styles/interventions_view/smallviews/interventions_wrapper.css';
import '../../../styles/interventions_view/smallviews/interventions_card.css';

const InterventionsWrapper = ({ shouldAddPadding }) => (
	<div className={
		classnames('interventions-wrapper', {
			'interventions-wrapper-with-extra-padding': shouldAddPadding
		})
	}
	>
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
