import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

import AccountBoxIcon from 'material-ui-icons/AccountBox';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import DateRangeIcon from 'material-ui-icons/DateRange';
import CommentIcon from 'material-ui-icons/Comment';

import EmployeesDialog from './dialogs/employees_dialog';

import '../../../styles/interventions_view/smallviews/interventions_add_card.css';

class InterventionAddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerId: '',
			location: '',
			date: '',
			comment: '',
			technicianId: '',
			openEmployeesDialog: false
		}
	}

	setTechnicianId = technicianId => this.setState({ technicianId });

	setEmployeesDialogOpenState = openEmployeesDialog => this.setState({ openEmployeesDialog });

	handleChange = concernedElement => (event) => {
		const input = event.target.value;
		if (!concernedElement || input === null || input === undefined) {
			return false;
		}
		this.setState({ [concernedElement]: input });
		return true;
	}

	render() {
		const {
			customerId,
			location,
			date,
			comment,
			technicianId,
			openEmployeesDialog
		} = this.state;

		return (
			<div id="interventions-add-card-container">
				<EmployeesDialog
					open={openEmployeesDialog}
					onSelected={employee =>
						this.setState({
							openEmployeesDialog: false,
							technicianId: employee.matricule
						})
					}
				/>
				<div className="interventions-add-card">
					<Title />
					<Content
						customerId={customerId}
						location={location}
						date={date}
						comment={comment}
						technicianId={technicianId}
						handleChange={this.handleChange}
						setEmployeesDialogOpenState={this.setEmployeesDialogOpenState}
					/>
				</div>
			</div>
		);
	}
}

const Title = () => (
	<div className="iac-title-container">
		<div className="iac-title-text">
			{'Ajouter une intervention'}
		</div>
	</div>
);

const Content = ({
	customerId,
	location,
	date,
	comment,
	technicianId,
	handleChange,
	setEmployeesDialogOpenState
}) => (
	<div className="iac-content">
		<FormControl>
			<InputLabel htmlFor="newIntervention_customerId">
				{'Identifiant du client'}
			</InputLabel>
			<Input
				id="newIntervention_customerId"
				type="text"
				value={customerId}
				onChange={handleChange('customerId')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<AccountBoxIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<FormControl>
			<InputLabel htmlFor="newIntervention_plannedDate">
				{'Date prevue'}
			</InputLabel>
			<Input
				id="newIntervention_plannedDate"
				type="text"
				value={date}
				onChange={handleChange('date')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<DateRangeIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<FormControl>
			<InputLabel htmlFor="newIntervention_location">
				{'Localisation'}
			</InputLabel>
			<Input
				id="newIntervention_location"
				type="text"
				value={location}
				onChange={handleChange('location')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<LocationOnIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<FormControl>
			<InputLabel htmlFor="newIntervention_comment">
				{'Commentaire'}
			</InputLabel>
			<Input
				id="newIntervention_comment"
				type="text"
				value={comment}
				onChange={handleChange('comment')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<CommentIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<Buttons
			customerId={customerId}
			date={date}
			location={location}
			comment={comment}
			technicianId={technicianId}
			setEmployeesDialogOpenState={setEmployeesDialogOpenState}
		/>
	</div>
);

const Buttons = ({
	customerId,
	date,
	location,
	comment,
	technicianId,
	setEmployeesDialogOpenState
}) => (
	<div className="iac-buttons">
		<Button
			raised
			color="accent"
			onClick={() => setEmployeesDialogOpenState(true)}
		>
			{technicianId || 'Technicien'}
		</Button>
		<Button
			raised
			color="primary"
			disabled={
				!customerId
				|| !date
				|| !location
				|| !comment
			}
		>
			{'Terminer'}
		</Button>
	</div>
);

export default InterventionAddCard;
