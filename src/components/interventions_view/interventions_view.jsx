import React, { Component } from 'react';

import classnames from 'classnames';

import NavigationBar from '../smallviews/top_bar/top_bar';
import SidePanel from './smallviews/side_panel';
import Banner from './smallviews/banner';
import OptionsBar from './smallviews/options_bar';
import AddCard from './smallviews/add_card';
import Intervention from './smallviews/intervention';
import LocationDialog from './smallviews/dialogs/location_dialog';
import StatusDialog from './smallviews/dialogs/status_dialog';
import DateDialog from './smallviews/dialogs/date_dialog';

import '../../styles/interventions_view/interventions_view.css';
import '../../styles/interventions_view/smallviews/interventions_content.css';

class InterventionsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerInput: null,
			interventionsInput: null,
			isAdding: false,
			preciseFilters: {
				location: null,
				status: null,
				date: null
			},
			dialogsOpenState: {
				location: false,
				status: false,
				date: false
			}
		}
	}

	setCustomerInput = input => this.setState({ customerInput: input });

	setInterventionsInput = input => this.setState({ interventionsInput: input });

	setPreciseFilter = (filter) => {
		const { preciseFilters } = this.state;
		this.setState({
			preciseFilters: Object.assign({}, preciseFilters, filter)
		});
	}

	handleContentScroll = (event) => {
		const { scrollTop } = event.target;
		const { shouldStick } = this.state;
		if (scrollTop >= 150 && !shouldStick) {
			this.setState({ shouldStick: true });
		} else if (scrollTop < 150 && shouldStick) {
			this.setState({ shouldStick: false });
		}
	}

	handleAddClick = () => {
		const { isAdding } = this.state;
		this.setState({ isAdding: !isAdding });
	}

	changeDialogsOpenState = (dialogsOpened) => {
		const { dialogsOpenState } = this.state;
		this.setState({
			dialogsOpenState: Object.assign({}, dialogsOpenState, dialogsOpened)
		});
	}

	handleOptionBarClick = (elementClicked) => {
		if (!elementClicked) return false;
		const dialogOpenState = this.state.dialogsOpenState[elementClicked];
		this.changeDialogsOpenState({ [elementClicked]: !dialogOpenState });
		return true;
	}

	render() {
		const {
			shouldStick,
			isAdding,
			preciseFilters,
			dialogsOpenState
		} = this.state;
		return (
			<div id="interventions-view-wrapper">
				<NavigationBar />
				<Dialogs
					dialogsOpenState={dialogsOpenState}
					changeDialogsOpenState={this.changeDialogsOpenState}
					preciseFilters={preciseFilters}
					setPreciseFilter={this.setPreciseFilter}
				/>
				<SidePanel setCustomerInput={this.setCustomerInput} />
				<div
					id="interventions-view-content-wrapper"
					onScroll={this.handleContentScroll}
				>
					<Banner
						setInterventionsInput={this.setInterventionsInput}
						handleAddClick={this.handleAddClick}
					/>
					<OptionsBar
						shouldStick={this.state.shouldStick}
						onClick={this.handleOptionBarClick}
						preciseFilters={preciseFilters}
					/>
					<InterventionsContent
						shouldAddPadding={shouldStick}
						isAdding={isAdding}
					/>
				</div>
			</div>
		)
	}
}

const InterventionsContent = ({ shouldAddPadding, isAdding }) => (
	<div className={
		classnames('interventions-content', {
			'interventions-content-with-extra-padding': shouldAddPadding
		})
	}
	>
		<div className={classnames(
			'interventions-content-wrapper',
			{ 'interventions-content-wrapper-translated': isAdding }
		)}
		>
			<AddCard isAdding={isAdding} />
			<Intervention
				id="1"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
			<Intervention
				id="2"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
			<Intervention
				id="3"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
			<Intervention
				id="4"
				customerId="C1"
				plannedDate="20/11/2017"
				location="Lille"
				comment="Aute veniam magna vet elit."
			/>
		</div>
	</div>
);

const Dialogs = ({
	dialogsOpenState,
	changeDialogsOpenState,
	preciseFilters,
	setPreciseFilter
}) => (
	<div>
		<LocationDialog
			open={dialogsOpenState.location}
			handleClose={() => changeDialogsOpenState({ location: false })}
			setPreciseFilter={setPreciseFilter}
		/>
		<StatusDialog
			open={dialogsOpenState.status}
			handleClose={() => changeDialogsOpenState({ status: false })}
			setPreciseFilter={setPreciseFilter}
		/>
		<DateDialog
			open={dialogsOpenState.date}
			handleClose={() => changeDialogsOpenState({ date: false })}
			selectedDate={preciseFilters.date || new Date()}
			setPreciseFilter={setPreciseFilter}
		/>
	</div>
);

export default InterventionsView;
