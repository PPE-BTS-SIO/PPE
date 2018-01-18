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
import { CircularProgress } from 'material-ui/Progress';

import {
	requestEmployees as requestEmployeesAction
} from '../../../../actions/main_actions';

import '../../../../styles/interventions_view/smallviews/dialogs/employees_dialog.css';

class EmployeesDialog extends PureComponent {
	componentWillReceivedProps(nextProps) {
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
			onSelected,
			onClose,
			employees,
			hasReceivedEmployees
		} = this.props;

		let content = null;
		if (!hasReceivedEmployees) {
			content = <Loading />
		}

		return (
			<Dialog
				open={open}
				onClose={onClose}
			>
				<DialogTitle>
					{'Séléctionner un employé'}
				</DialogTitle>
				<DialogContent>
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

const Loading = () => (
	<div className="ed-loading-container">
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
