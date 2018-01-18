import React, { PureComponent } from 'react';

import classnames from 'classnames';

import Tooltip from 'material-ui/Tooltip';

import CheckIcon from 'material-ui-icons/Check';
import Person from 'material-ui-icons/Person';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import DateRangeIcon from 'material-ui-icons/DateRange';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import CommentIcon from 'material-ui-icons/Comment';

import EmployeesDialog from './dialogs/employees_dialog';

import '../../../styles/interventions_view/smallviews/intervention_card.css';

class InterventionCard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			employeesDialogOpenState: false
		}
	}

	setEmployeesDialogOpenState = state => this.setState({ employeesDialogOpenState: state });

	render() {
		const {
			windowWidth,
			interventionsPerRow,
			id = '?',
			customerId = '?',
			plannedDate = 'Date inconnue',
			location = 'Localisation inconnue',
			comment = 'Commentaire inconnu',
			assignedTechnician = null,
			status = 'planned'
		} = this.props;

		const { employeesDialogOpenState } = this.state;

		const useMobileLayout = windowWidth <= 600;
		return (
			<div className={
				classnames(
					'intervention-card',
					{
						'intervention-card-mobile': windowWidth <= 600,
						'intervention-card-full-width': interventionsPerRow === 'one' || windowWidth <= 1380
					}
				)
			}
			>
				<EmployeesDialog
					open={employeesDialogOpenState}
					onClose={() => this.setEmployeesDialogOpenState(false)}
				/>
				<InterventionId id={id} />
				<div className="ic-buttons-container">
					<AssignTechnicianButton setEmployeesDialogOpenState={this.setEmployeesDialogOpenState} />
					<StatusButton />
				</div>
				<div className="ic-content">
					<CustomerId
						customerId={customerId}
						useMobileLayout={useMobileLayout}
					/>
					<PlannedDate
						date={plannedDate}
						useMobileLayout={useMobileLayout}
					/>
					<Location
						location={location}
						useMobileLayout={useMobileLayout}
					/>
					<Comment
						comment={comment}
						useMobileLayout={useMobileLayout}
					/>
				</div>
			</div>
		)
	}
}

const InterventionId = ({ id }) => (
	<div className="ic-id">
		{id}
	</div>
);

const AssignTechnicianButton = ({ setEmployeesDialogOpenState }) => (
	<Tooltip
		placement="top"
		title="Assigner à un techicien"
		style={{
			whiteSpace: 'nowrap'
		}}
	>
		<div
			className="ic-assign-technician-button"
			onClick={() => setEmployeesDialogOpenState(true)}
		>
			<Person style={{ fill: '#7F7F7F' }} />
		</div>
	</Tooltip>
);

const StatusButton = () => (
	<div className="ic-status-button">
		<CheckIcon style={{ fill: '#7F7F7F' }} />
	</div>
);

const ContentRow = ({
	useMobileLayout,
	icon,
	parameter,
	value
}) => {
	const parameterToRender = useMobileLayout ? null : (
		<span className="ic-content-parameter">
			{`${parameter} : `}
		</span>
	);
	return (
		<div className="ic-content-row">
			<div className="ic-content-icon">
				{icon}
			</div>
			{parameterToRender}
			<span className="ic-content-value">
				{value}
			</span>
		</div>
	);
};

const CustomerId = ({ customerId, useMobileLayout }) => (
	<ContentRow
		useMobileLayout={useMobileLayout}
		icon={<AccountBoxIcon style={{ fill: '#7F7F7F' }} />}
		parameter="Identifiant du client"
		value={customerId}
	/>
);

const PlannedDate = ({ date, useMobileLayout }) => (
	<ContentRow
		useMobileLayout={useMobileLayout}
		icon={<DateRangeIcon style={{ fill: '#7F7F7F' }} />}
		parameter="Date prévue"
		value={date}
	/>
);

const Location = ({ location, useMobileLayout }) => (
	<ContentRow
		useMobileLayout={useMobileLayout}
		icon={<LocationOnIcon style={{ fill: '#7F7F7F' }} />}
		parameter="Localisation"
		value={location}
	/>
);

const Comment = ({ comment, useMobileLayout }) => {
	if (useMobileLayout) return null;
	return (
		<ContentRow
			icon={<CommentIcon style={{ fill: '#7F7F7F' }} />}
			parameter="Commentaire"
			value={comment}
		/>
	);
};

export default InterventionCard;
