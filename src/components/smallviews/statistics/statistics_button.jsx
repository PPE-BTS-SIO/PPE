import React, { Fragment, PureComponent } from 'react';

import TimelineIcon from '@material-ui/icons/Timeline';

import AtomicButton from '../../smallviews/buttons/atomic_button';

import StatisticsDialog from './statistics_dialog';

class StatisticsButton extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false
		}
	}

	setDialogOpenState = openDialog => this.setState({ openDialog });

	render() {
		const { openDialog } = this.state;
		return (
			<Fragment>
				<StatisticsDialog
					open={openDialog}
					onClose={() => this.setDialogOpenState(false)}
				/>
				<AtomicButton
					icon={<TimelineIcon style={{ fill: '#7F7F7F' }} />}
					label="Statistiques"
					onClick={() => this.setDialogOpenState(true)}
				/>
			</Fragment>
		);
	}
}

export default StatisticsButton;
