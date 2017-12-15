import React from 'react';

import Dotdotdot from 'react-dotdotdot';

import CheckIcon from 'material-ui-icons/Check';
import Person from 'material-ui-icons/Person';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import DateRangeIcon from 'material-ui-icons/DateRange';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import CommentIcon from 'material-ui-icons/Comment';

import '../../../styles/interventions_view/smallviews/intervention_card.css';

const InterventionsCard = ({
	id = '?',
	customerId = '?',
	plannedDate = 'Date inconnue',
	location = 'Localisation inconnue',
	comment = 'Commentaire inconnu',
	assignedTechnician = null,
	status = 'planned'
}) => (
	<div className="intervention-card">
		<InterventionId id={id} />
		<div className="ic-buttons-container">
			<AssignTechnicianButton />
			<StatusButton />
		</div>
		<div className="ic-content">
			<CustomerId customerId={customerId} />
			<PlannedDate date={plannedDate} />
			<Location location={location} />
			<Comment comment={comment} />
		</div>
	</div>
);

const InterventionId = ({ id }) => (
	<div className="ic-id">
		{id}
	</div>
);

const AssignTechnicianButton = () => (
	<div className="ic-assign-technician-button">
		<Person color="#7F7F7F" />
	</div>
);

const StatusButton = () => (
	<div className="ic-status-button">
		<CheckIcon color="#7F7F7F" />
	</div>
);

const ContentRow = ({ icon, parameter, value }) => (
	<div className="ic-content-row">
		<div className="ic-content-icon">
			{icon}
		</div>
		<span className="ic-content-parameter">
			{`${parameter} : `}
		</span>
		<span className="ic-content-value">
			{value}
		</span>
	</div>
);

const CustomerId = ({ customerId }) => (
	<ContentRow
		icon={<AccountBoxIcon color="#7F7F7F" />}
		parameter="Identifiant du client"
		value={customerId}
	/>
);

const PlannedDate = ({ date }) => (
	<ContentRow
		icon={<DateRangeIcon color="#7F7F7F" />}
		parameter="Date prévue"
		value={date}
	/>
);

const Location = ({ location }) => (
	<ContentRow
		icon={<LocationOnIcon color="#7F7F7F" />}
		parameter="Localisation"
		value={location}
	/>
);

const Comment = ({ comment }) => (
	<ContentRow
		icon={<CommentIcon color="#7F7F7F" />}
		parameter="Commentaire"
		value={comment}
	/>
);

export default InterventionsCard;
