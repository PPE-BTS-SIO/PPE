import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import DatePicker from 'material-ui-pickers/DatePicker';

import LocationPicker from '../../smallviews/location_picker';

import CustomersDialog from './dialogs/customers_dialog';
import EmployeesDialog from './dialogs/employees_dialog';
import LocationDialog from './dialogs/location_dialog';

import '../../../styles/interventions_view/smallviews/interventions_add_card.css';

const initialState = {
	customerId: '',
	location: '',
	date: new Date(),
	numSerie: '',
	technicianId: null,
	openEmployeesDialog: false,
	openCustomersDialog: false
};

class InterventionAddCard extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	setTechnicianId = technicianId => this.setState({ technicianId });

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
			numSerie,
			technicianId,
			openEmployeesDialog,
			openCustomersDialog,
			openLocationDialog
		} = this.state;

		const {
			socket,
			socketStatus
		} = this.props;

		return (
			<div id="interventions-add-card-container">
				<Dialogs
					dialogsOpenState={{
						employees: openEmployeesDialog,
						customers: openCustomersDialog,
						location: openLocationDialog
					}}
					setState={state => this.setState(state)}
				/>
				<div className="interventions-add-card">
					<Title />
					<Content
						customerId={customerId}
						location={location}
						date={date}
						numSerie={numSerie}
						technicianId={technicianId}
						handleChange={this.handleChange}
						socket={socket}
						socketStatus={socketStatus}
						setState={state => this.setState(state)}
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
	numSerie,
	technicianId,
	handleChange,
	socket,
	socketStatus,
	setState
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
						<IconButton onClick={() => setState({ openCustomersDialog: true })}>
							<AccountBoxIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<DatePicker
			keyboard
			value={date}
			onChange={d => setState({ date: d })}
		/>
		<LocationPicker onChange={value => setState({ location: value })} />
		<FormControl>
			<InputLabel htmlFor="newIntervention_numSerie">
				{'Numéro de série'}
			</InputLabel>
			<Input
				id="newIntervention_numSerie"
				type="text"
				value={numSerie}
				onChange={handleChange('numSerie')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<DeviceHubIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<Buttons
			customerId={customerId}
			date={date}
			location={location}
			numSerie={numSerie}
			technicianId={technicianId}
			socket={socket}
			socketStatus={socketStatus}
			setState={setState}
		/>
	</div>
);

const Buttons = ({
	customerId,
	date,
	location,
	numSerie,
	technicianId,
	socket,
	socketStatus,
	setState
}) => {
	const disabled = !customerId
	|| !date
	|| !location
	|| !numSerie
	|| socketStatus !== 'connected';
	return (
		<div className="iac-buttons">
			<Button
				variant="raised"
				color="secondary"
				onClick={() => setState({ openEmployeesDialog: true })}
			>
				{technicianId !== null
					? `N° ${technicianId}`
					: 'Technicien'}
			</Button>
			<Button
				variant="raised"
				color="primary"
				disabled={disabled}
				onClick={() => {
					if (!disabled) {
						socket.emit('client/create-intervention', {
							customerId,
							date,
							location,
							numSerie,
							assignedTechnician: technicianId
						}, (answer) => {
							if (answer && answer.success) {
								setState(initialState);
							}
						})
					}
				}}
			>
				{'Terminer'}
			</Button>
		</div>
	)
};

const Dialogs = ({
	dialogsOpenState,
	setState
}) => (
	<Fragment>
		<CustomersDialog
			open={dialogsOpenState.customers}
			onClose={() => setState({ openCustomersDialog: false })}
			onSelected={customer => setState({ customerId: customer.customerId })}
		/>
		<LocationDialog
			open={dialogsOpenState.location}
			onClose={() => setState({ openLocationDialog: false })}
			onSelected={location => setState({ location })}
		/>
		<EmployeesDialog
			typeToShow="T"
			open={dialogsOpenState.employees}
			onClose={() => setState({ openEmployeesDialog: false })}
			onSelected={employee =>
				setState({
					openEmployeesDialog: false,
					technicianId: employee.matricule
				})
			}
		/>
	</Fragment>
);

const mapStateToProps = state => ({
	socket: state.nodeServer.socket,
	socketStatus: state.nodeServer.status
});

export default connect(mapStateToProps)(InterventionAddCard);
