import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';

import Truncate from 'react-truncate';

import Tooltip from '@material-ui/core/Tooltip';

import CheckIcon from '@material-ui/icons/Check';
import Person from '@material-ui/icons/Person';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CommentIcon from '@material-ui/icons/Comment';

import EmployeesDialog from './dialogs/employees_dialog';

import '../../../styles/interventions_view/smallviews/intervention_card.css';

class InterventionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeesDialogOpenState: false
		}
	}

	componentDidMount() {
		const { hasReceivedEmployees } = this.props;
		if (hasReceivedEmployees === false) {
			const { requestEmployees } = this.props;
			requestEmployees();
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
			assignedTechnician,
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
					title="Assigner un technicien"
					typeToShow="T"
					open={employeesDialogOpenState}
					onSelected={(technician) => {
						const { isConnected, socket } = this.props;
						if (technician && technician.matricule && isConnected) {
							const { matricule } = technician;
							socket.emit('client/assign-technician', {
								matricule,
								interventionId: id
							}, (response) => {
								if (response && response.error) {
									console.log(response);
									alert(response.error);
								}
							});
							this.setEmployeesDialogOpenState(false);
						}
					}}
					onClose={() => this.setEmployeesDialogOpenState(false)}
				/>
				<InterventionId id={id} />
				<div className="ic-buttons-container">
					<AssignTechnicianButton
						assignedTechnician={assignedTechnician}
						setEmployeesDialogOpenState={this.setEmployeesDialogOpenState}
					/>
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

const AssignTechnicianButton = ({ assignedTechnician, setEmployeesDialogOpenState }) => {
	if (!assignedTechnician) {
		return (
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
	}
	return (
		<Tooltip
			placement="top"
			title={`Intervention assigné au technicien n° ${assignedTechnician}`}
			style={{
				whiteSpace: 'nowrap'
			}}
		>
			<div className="ic-assigned-technician-button">
				<Person style={{ fill: 'rgb(30, 136, 229)' }} />
			</div>
		</Tooltip>
	);
}

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
		<div className="ic-content-parameter">
			{`${parameter} : `}
		</div>
	);
	return (
		<div className="ic-content-row">
			<div className="ic-content-icon">
				{icon}
			</div>
			{parameterToRender}
			<div className="ic-content-value">
				<Truncate lines={1}>
					{value}
				</Truncate>
			</div>
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

const mapStateToProps = ({
	main: { employees },
	nodeServer: { status, socket }
}) => ({
	isConnected: status === 'connected',
	socket,
	employees
});

export default connect(mapStateToProps)(InterventionCard);
