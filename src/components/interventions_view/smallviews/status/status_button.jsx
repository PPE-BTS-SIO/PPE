import React, { Fragment, PureComponent } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';

import FinishInterventionDialog from './finish_intervention_dialog';

class StatusButton extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false
		}
	}

	setDialogOpenState = openDialog => this.setState({ openDialog });

	render() {
		const { openDialog } = this.state;
		const { duration, interventionId, role } = this.props;
		let button = null;
		if (duration) {
			button = (
				<Tooltip title="Intervention terminée">
					<div className="ic-status-button-assigned">
						<CheckIcon
							style={{
								fill: 'rgb(30, 136, 229)'
							}}
						/>
					</div>
				</Tooltip>
			);
		} else {
			button = (
				<div
					className="ic-status-button"
					onClick={() => {
						if (role === 'T') this.setDialogOpenState(true);
					}}
				>
					<IconButton>
						<CheckIcon
							style={{
								fill: '#7F7F7F'
							}}
						/>
					</IconButton>
				</div>
			);
			if (role === 'T') {
				button = (
					<Tooltip title="Marquer cette intervention comme terminée">
						{button}
					</Tooltip>
				)
			}
		}

		return (
			<Fragment>
				{role === 'T' && (
					<FinishInterventionDialog
						open={openDialog}
						onClose={() => this.setDialogOpenState(false)}
						interventionId={interventionId}
					/>
				)}
				{button}
			</Fragment>
		);
	}
}

export default StatusButton;
