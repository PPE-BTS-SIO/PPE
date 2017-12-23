import React, { Fragment } from 'react';

import classnames from 'classnames';

import { CircularProgress } from 'material-ui/Progress';

import AddCard from './add_card';
import Intervention from './intervention';

const InterventionsContent = ({
	windowWidth,
	shouldAddPadding,
	isAdding,
	hasReceivedInterventionsData,
	interventions,
	interventionsPerRow
}) => (
	<div className={
		classnames('interventions-content', {
			'interventions-content-mobile': windowWidth <= 600,
			'interventions-content-with-extra-padding': shouldAddPadding
		})
	}
	>
		<div className={classnames(
			'interventions-content-wrapper',
			{
				'interventions-content-wrapper-translated': isAdding,
				'interventions-content-wrapper-no-interventions':
					hasReceivedInterventionsData === null || !interventions
			}
		)}
		>
			<Content
				hasReceivedInterventionsData={hasReceivedInterventionsData}
				interventions={interventions}
				isAdding={isAdding}
				windowWidth={windowWidth}
				interventionsPerRow={interventionsPerRow}
			/>
		</div>
	</div>
);

const Content = ({
	hasReceivedInterventionsData,
	interventions,
	isAdding,
	windowWidth,
	interventionsPerRow
}) => {
	if (hasReceivedInterventionsData === false) {
		return "Il n'y pas encore d'interventions !"
	} else if (hasReceivedInterventionsData === null) {
		return <CircularProgress size={50} />
	}
	return (
		<Fragment>
			<AddCard isAdding={isAdding} />
			{interventions.map(intervention => (
				<Intervention
					windowWidth={windowWidth}
					interventionsPerRow={interventionsPerRow}
					id={intervention.id}
					key={`intervention_${intervention.id}`}
					customerId={intervention.customerId}
					plannedDate={intervention.date}
					location="Lille"
					comment={intervention.comment}
				/>
			))}
		</Fragment>
	);
}

export default InterventionsContent;
