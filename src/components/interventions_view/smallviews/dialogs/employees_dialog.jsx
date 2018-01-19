import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, {
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';

import {
	requestEmployees as requestEmployeesAction
} from '../../../../actions/main_actions';

import '../../../../styles/interventions_view/smallviews/dialogs/employees_dialog.css';

class EmployeesDialog extends PureComponent {
	componentWillReceiveProps(nextProps) {
		if (nextProps.open !== this.props.open && nextProps.open) {
			const { hasReceivedEmployees } = this.props;
			if (hasReceivedEmployees === false) {
				const { requestEmployees } = this.props;
				requestEmployees();
			}
		}
	}

	render() {
		const {
			open,
			onSelected = () => {},
			onClose,
			employees,
			hasReceivedEmployees,
			title
		} = this.props;

		let content = null;
		if (!hasReceivedEmployees || !employees || Object.keys(employees).length < 1 || employees.error) {
			content = <Loading />
		} else {
			content = (
				<List>
					{employees.map(employee => (
						<ListItem
							button
							onClick={() => onSelected(employee)}
							key={`ed-employee-item-${employee.matricule}`}
						>
							<ListItemAvatar>
								<Avatar alt={`Employé ${employee.matricule}`} src={employee.profilePicture} />
							</ListItemAvatar>
							<ListItemText primary={`${employee.firstName} ${employee.lastName}`} />
						</ListItem>
					))}
				</List>
			)
		}

		return (
			<Dialog
				open={open}
				onClose={onClose}
			>
				<DialogTitle>
					{title || 'Séléctionnez un employé'}
				</DialogTitle>
				<DialogContent
					className="ed-dialog-content"
					onScroll={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					{content}
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						onClick={onClose}
					>
						{'Continuer'}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

const NoEmployee = () => (
	<DialogContentText>
		{"Il n'y a pas encore d'employé !"}
	</DialogContentText>
)

const Loading = () => (
	<div className="ed-no-employee-container">
		<CircularProgress />
	</div>
);

const mapStateToProps = state => ({
	employees: state.main.employees,
	hasReceivedEmployees: state.main.hasReceivedEmployeesData
});

const mapDispatchToProps = dispatch => bindActionCreators({
	requestEmployees: requestEmployeesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesDialog);
