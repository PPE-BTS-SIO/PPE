import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classnames from 'classnames';

import { CircularProgress } from 'material-ui/Progress';

import AddCard from './add_card';
import Intervention from './intervention';

import {
	requestEmployees as requestEmployeesAction
} from '../../../actions/main_actions';

class InterventionsContent extends PureComponent {
	render() {
		const {
			windowWidth,
			shouldAddPadding,
			isAdding,
			hasReceivedInterventionsData,
			interventions,
			interventionsPerRow
		} = this.props;
		return (
			<div className={
				classnames('interventions-content', {
					'interventions-content-mobile': windowWidth <= 600,
					'interventions-content-with-extra-padding': shouldAddPadding
				})
			}
			>
				<div className={classnames(
					'interventions-content-wrapper',
					{
						'interventions-content-wrapper-translated': isAdding,
						'interventions-content-wrapper-no-interventions':
							hasReceivedInterventionsData === null || !interventions
					}
				)}
				>
					<Content
						hasReceivedInterventionsData={hasReceivedInterventionsData}
						interventions={interventions}
						isAdding={isAdding}
						windowWidth={windowWidth}
						interventionsPerRow={interventionsPerRow}
					/>
				</div>
			</div>
		);
	}
}

const Content = ({
	hasReceivedInterventionsData,
	interventions,
	isAdding,
	windowWidth,
	interventionsPerRow
}) => {
	let content = null;
	if (hasReceivedInterventionsData === false
		|| (hasReceivedInterventionsData &&
			(!interventions || interventions.length < 1))) {
		content = (
			<div id="icw-no-intervention">
				{"Il n'y pas encore d'interventions !"}
			</div>
		);
	} else if (hasReceivedInterventionsData === null) {
		content = (
			<div id="icw-no-intervention">
				<CircularProgress size={50} />
			</div>
		);
	} else {
		content = interventions.map(intervention => (
			<Intervention
				windowWidth={windowWidth}
				interventionsPerRow={interventionsPerRow}
				id={intervention.id}
				key={`intervention_${intervention.id}`}
				customerId={intervention.customerId}
				plannedDate={intervention.date}
				location={intervention.location}
				comment={intervention.comment}
				assignedTechnician={intervention.assignedTechnician}
			/>
		))
	}
	return (
		<Fragment>
			<AddCard isAdding={isAdding} />
			{content}
		</Fragment>
	);
}

const mapStateToProps = state => ({
	hasReceivedEmployees: state.main.hasReceivedEmployeesData,
	employees: state.main.employees
});

const mapDispatchToProps = dispatch => bindActionCreators({
	requestEmployees: requestEmployeesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InterventionsContent);
