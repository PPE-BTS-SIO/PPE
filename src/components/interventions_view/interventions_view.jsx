import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';

import NavigationBar from '../smallviews/top_bar/top_bar';
import SidePanel from './smallviews/side_panel';
import Banner from './smallviews/banner';
import OptionsBar from './smallviews/options_bar';
import LocationDialog from './smallviews/dialogs/location_dialog';
import StatusDialog from './smallviews/dialogs/status_dialog';
import DateDialog from './smallviews/dialogs/date_dialog';
import Wrapper from './smallviews/wrapper';

import '../../styles/interventions_view/interventions_view.css';
import '../../styles/interventions_view/smallviews/interventions_content.css';

const breakpoints = [980, 600];

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
			},
			drawersOpenState: {
				interventionsSidePanel: false // Only useful when window's width < 980px !
			}
		}
	}

	shouldComponentUpdate(nextProps) {
		const oldWindowWidth = this.props.windowWidth;
		const newWindowWidth = nextProps.windowWidth;
		if (oldWindowWidth !== newWindowWidth) {
			if (!newWindowWidth) return false;
			if (!oldWindowWidth && newWindowWidth) return true;
			return breakpoints.some(breakpoint =>
				(oldWindowWidth > breakpoint && newWindowWidth <= breakpoint)
					|| (oldWindowWidth <= breakpoint && newWindowWidth > breakpoint));
		}
		return true;
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

	changeDrawersOpenState = (drawersOpened) => {
		const { drawersOpenState } = this.state;
		this.setState({
			drawersOpenState: Object.assign({}, drawersOpenState, drawersOpened)
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
			dialogsOpenState,
			drawersOpenState
		} = this.state;
		const { windowWidth } = this.props;
		const shouldUseMobileLayout = windowWidth <= 980;
		return (
			<div id="interventions-view-wrapper">
				<NavigationBar />
				<Dialogs
					dialogsOpenState={dialogsOpenState}
					changeDialogsOpenState={this.changeDialogsOpenState}
					preciseFilters={preciseFilters}
					setPreciseFilter={this.setPreciseFilter}
				/>
				<SidePanel
					useMobileLayout={shouldUseMobileLayout}
					setCustomerInput={this.setCustomerInput}
					openDrawer={drawersOpenState.interventionsSidePanel}
					changeDrawersOpenState={this.changeDrawersOpenState}
				/>
				<div
					className={classnames(
						'interventions-view-content-wrapper',
						{
							'interventions-view-content-wrapper-mobile': shouldUseMobileLayout
						}
					)
					}
					onScroll={this.handleContentScroll}
				>
					<Banner
						setInterventionsInput={this.setInterventionsInput}
						handleAddClick={this.handleAddClick}
					/>
					<OptionsBar
						windowWidth={windowWidth}
						shouldStick={this.state.shouldStick}
						onClick={this.handleOptionBarClick}
						preciseFilters={preciseFilters}
						changeDrawersOpenState={this.changeDrawersOpenState}
					/>
					<Wrapper
						useMobileLayout={windowWidth <= 600}
						shouldAddPadding={shouldStick}
						isAdding={isAdding}
					/>
				</div>
			</div>
		)
	}
}

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

const mapStateToProps = state => ({ windowWidth: state.utils.windowWidth });

export default connect(mapStateToProps)(InterventionsView);
