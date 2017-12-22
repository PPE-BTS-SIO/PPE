import React from 'react';

import classnames from 'classnames';

import AddCard from './add_card';
import Intervention from './intervention';

const InterventionsContent = ({
	useMobileLayout,
	shouldAddPadding,
	isAdding
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
			<AddCard isAdding={isAdding} />
			<Intervention
				useMobileLayout={useMobileLayout}
				id="1"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
			<Intervention
				useMobileLayout={useMobileLayout}
				id="2"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
			<Intervention
				useMobileLayout={useMobileLayout}
				id="3"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
			<Intervention
				useMobileLayout={useMobileLayout}
				id="4"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
		</div>
	</div>
);

export default InterventionsContent;
