import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DatePicker from 'material-ui-pickers/DatePicker';

import FaceIcon from '@material-ui/icons/Face';

import EmployeesDialog from '../../interventions_view/smallviews/dialogs/employees_dialog';

import '../../../styles/smallviews/statistics/statistics_dialog.css';

const initialState = {
	openEmployeesDialog: false,
	technicianId: 2,
	fromDate: new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)),
	toDate: new Date(),
	hasSentRequest: false,
	callbackResult: null
}

class StatisticsDialog extends PureComponent {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	setEmployeesDialogOpenState = openEmployeesDialog => this.setState({ openEmployeesDialog });

	handleChange = (concernedElement, input) => {
		if (!concernedElement || input === null || input === undefined) {
			return false;
		}
		this.setState({ [concernedElement]: input });
		return true;
	}

	handleClose = () => {
		const { onClose } = this.props;
		if (onClose) {
			this.setState(initialState);
			onClose();
		}
	}

	sendRequest = () => {
		const { technicianId, fromDate, toDate } = this.state;
		if (!technicianId || !fromDate || !toDate) {
			return;
		}
		const { isConnectedToServer, socket } = this.props;
		if (!isConnectedToServer || !socket) {
			alert('Cannot connect to server !'); // eslint-disable-line
			return;
		}
		this.setState({ hasSentRequest: true });
		socket.emit('client/request-technician-statistics', {
			technicianId,
			fromTimestamp: fromDate.getTime(),
			toTimestamp: toDate.getTime()
		}, (callbackResult) => {
			this.setState({ callbackResult });
		});
	}

	render() {
		const { open, onClose } = this.props;
		const {
			openEmployeesDialog,
			technicianId,
			fromDate,
			toDate,
			hasSentRequest,
			callbackResult
		} = this.state;
		let content = null;
		if (!hasSentRequest) {
			content = (
				<Fragment>
					<DialogTitle>
						{"Statistiques d'un technicien"}
					</DialogTitle>
					<DialogContent className="sd-content">
						<FormControl>
							<InputLabel>
								{'Matricule du technicien'}
							</InputLabel>
							<Input
								type="number"
								value={technicianId}
								onChange={e => this.handleChange('technicianId', e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton onClick={() => this.setEmployeesDialogOpenState(true)}>
											<FaceIcon style={{ fill: '#7f7f7f' }} />
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<DatePicker
							keyboard
							label="Date de début"
							value={fromDate}
							onChange={newDate => this.handleChange('fromDate', newDate)}
						/>
						<DatePicker
							keyboard
							label="Date de fin"
							value={toDate}
							onChange={newDate => this.handleChange('toDate', newDate)}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							size="small"
							onClick={this.handleClose}
						>
							{'Fermer'}
						</Button>
						<Button
							size="small"
							color="primary"
							disabled={!technicianId || !fromDate || !toDate}
							onClick={this.sendRequest}
						>
							{'Continuer'}
						</Button>
					</DialogActions>
				</Fragment>
			);
		} else if (hasSentRequest && !callbackResult) {
			content = (
				<Fragment>
					<DialogTitle>
						{'Chargement des statistiques...'}
					</DialogTitle>
					<DialogContent className="sd-content-loading">
						<CircularProgress />
					</DialogContent>
				</Fragment>
			)
		} else if (callbackResult) {
			const { nbrInterventions, nbrKm, dureeTotal } = callbackResult;
			const message = `Ce technicien a opéré sur ${nbrInterventions} interventions, a réaliser ${nbrKm} Km(s) et a passé une durée totale de ${dureeTotal} heure(s).`;
			content = (
				<Fragment>
					<DialogTitle>
						{`Statistiques du technicien n°${technicianId}`}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{message}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							size="small"
							onClick={this.handleClose}
						>
							{'Fermer'}
						</Button>
					</DialogActions>
				</Fragment>
			);
		}
		return (
			<Fragment>
				<EmployeesDialog
					title="Selectionnez un technicien"
					typeToShow="T"
					open={openEmployeesDialog}
					onClose={() => this.setEmployeesDialogOpenState(false)}
					onSelected={(employee) => {
						if (!employee || !employee.matricule) return;
						this.handleChange('technicianId', employee.matricule);
						this.setEmployeesDialogOpenState(false);
					}}
				/>
				<Dialog
					open={open}
					onClose={this.handleClose}
				>
					{content}
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ nodeServer: { socket, status } }) => ({
	isConnectedToServer: status === 'connected',
	socket
});

export default connect(mapStateToProps)(StatisticsDialog);
