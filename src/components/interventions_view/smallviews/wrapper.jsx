import React, { Fragment } from 'react';

import classnames from 'classnames';

import { CircularProgress } from 'material-ui/Progress';

import AddCard from './add_card';
import Intervention from './intervention';

const InterventionsContent = ({
	useMobileLayout,
	shouldAddPadding,
	isAdding,
	hasReceivedInterventionsData,
	interventions
}) => (
	<div className={
		classnames('interventions-content', {
			'interventions-content-mobile': useMobileLayout,
			'interventions-content-with-extra-padding': shouldAddPadding
		})
	}
	>
		<div className={classnames(
			'interventions-content-wrapper',
			{
				'interventions-content-wrapper-translated': isAdding
			}
		)}
		>
			<Content
				hasReceivedInterventionsData={hasReceivedInterventionsData}
				interventions={interventions}
				isAdding={isAdding}
				useMobileLayout={useMobileLayout}
			/>
		</div>
	</div>
);

const Content = ({
	hasReceivedInterventionsData,
	interventions,
	isAdding,
	useMobileLayout
}) => {
	if (hasReceivedInterventionsData === false) {
		return "Il n'y pas encore d'interventions !"
	} else if (hasReceivedInterventionsData === null) {
		return <CircularProgress />
	}
	return (
		<Fragment>
			<AddCard isAdding={isAdding} />
			{interventions.map(intervention => (
				<Intervention
					useMobileLayout={useMobileLayout}
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
