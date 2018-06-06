import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classnames from 'classnames';

import NavigationBar from '../smallviews/top_bar/top_bar';
import SidePanel from './smallviews/side_panel/side_panel';
import Banner from './smallviews/banner';
import OptionsBar from './smallviews/options_bar';
import LocationDialog from './smallviews/dialogs/location_dialog';
import StatusDialog from './smallviews/dialogs/status_dialog';
import DateDialog from './smallviews/dialogs/date_dialog';
import Wrapper from './smallviews/wrapper';

import { requestInterventions as requestInterventionsAction } from '../../actions/main_actions';

import '../../styles/interventions_view/interventions_view.css';
import '../../styles/interventions_view/smallviews/interventions_content.css';

const breakpoints = [1380, 980, 600];

class InterventionsView extends Component {
	constructor(props) {
		super(props);
		const { interventions } = this.props;
		this.state = {
			customerInput: null,
			interventionsInput: null,
			filteredInterventions: interventions,
			isAdding: false,
			interventionsPerRow: 'multiple',
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

	componentWillMount() {
		const { hasReceivedInterventionsData } = this.props;
		if (hasReceivedInterventionsData === false) {
			const { requestInterventions } = this.props;
			requestInterventions();
		}
	}

	/* componentDidMount() {
		Notification.requestPermission((permission) => {
			if (permission === 'granted') {
				new Notification('Nouvelle intervention !', {
					icon: 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/Attention-512.png',
					body: "Au travail Thomas ! L'intervention n° 42 attend d'être assignée !"
				});
			}
		})
	} */

	componentWillReceiveProps = (nextProps) => {
		const { interventions: nextInterventions } = nextProps;
		const { interventions: oldInterventions } = this.props;
		if (JSON.stringify(oldInterventions) !== JSON.stringify(nextInterventions)) {
			this.filterInterventions(nextProps);
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

	setPreciseFilter = (filter) => {
		const { preciseFilters } = this.state;
		this.setState({
			preciseFilters: { ...preciseFilters, filter }
		});
	}

	setInterventionsInput = (e) => {
		if (!e) {
			return;
		}
		const state = { ...this.state, interventionsInput: e.target.value }
		this.setState(state);
		this.filterInterventions(undefined, state);
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
			dialogsOpenState: { ...dialogsOpenState, ...dialogsOpened }
		});
	}

	changeDrawersOpenState = (drawersOpened) => {
		const { drawersOpenState } = this.state;
		this.setState({
			drawersOpenState: { ...drawersOpenState, ...drawersOpened }
		});
	}

	handleOptionBarClick = (elementClicked) => {
		if (!elementClicked) return false;
		const dialogOpenState = this.state.dialogsOpenState[elementClicked];
		this.changeDialogsOpenState({ [elementClicked]: !dialogOpenState });
		return true;
	}

	changeInterventionsPerRow = () => {
		const { interventionsPerRow } = this.state;
		this.setState({
			interventionsPerRow: interventionsPerRow === 'multiple'
				? 'one'
				: 'multiple'
		});
	}

	filterInterventions = (props = this.props, state = this.state) => {
		const { interventions } = props;
		const { interventionsInput, preciseFilters } = state;

		if (!interventions) {
			return;
		}

		const newInterventions = [...interventions].filter((intervention) => {
			console.log(interventionsInput);
			if (interventionsInput) {
				if (!Object.values(intervention).some(value =>
					typeof (value) === 'string' && value.toLowerCase().includes(interventionsInput))) {
					return false
				}
			}
			return Object.entries(preciseFilters).some(([key, value]) => {
				if (value) {
					if (!intervention[key].includes(value)) {
						return false;
					}
				}
				return true;
			});
		});
		this.setState({ filteredInterventions: newInterventions })
	}

	render() {
		const {
			customerInput,
			shouldStick,
			isAdding,
			preciseFilters,
			dialogsOpenState,
			drawersOpenState,
			interventionsPerRow,
			filteredInterventions
		} = this.state;
		const {
			windowWidth,
			hasReceivedInterventionsData
		} = this.props;
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
					customerInput={customerInput}
					useMobileLayout={shouldUseMobileLayout}
					setCustomerInput={this.setCustomerInput}
					openDrawer={drawersOpenState.interventionsSidePanel}
					changeDrawersOpenState={this.changeDrawersOpenState}
				/>
				<div
					className={classnames(
						'interventions-view-content-wrapper',
						shouldUseMobileLayout && 'interventions-view-content-wrapper-mobile'
					)
					}
					onScroll={this.handleContentScroll}
				>
					<Banner
						setInterventionsInput={this.setInterventionsInput}
						handleAddClick={this.handleAddClick}
						isAdding={isAdding}
					/>
					<OptionsBar
						windowWidth={windowWidth}
						shouldStick={this.state.shouldStick}
						onClick={this.handleOptionBarClick}
						preciseFilters={preciseFilters}
						changeDrawersOpenState={this.changeDrawersOpenState}
						changeInterventionsPerRow={this.changeInterventionsPerRow}
					/>
					<Wrapper
						windowWidth={windowWidth}
						shouldAddPadding={shouldStick}
						isAdding={isAdding}
						hasReceivedInterventionsData={hasReceivedInterventionsData}
						interventions={filteredInterventions}
						interventionsPerRow={interventionsPerRow}
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
			onClose={() => changeDialogsOpenState({ location: false })}
			setPreciseFilter={setPreciseFilter}
		/>
		<StatusDialog
			open={dialogsOpenState.status}
			onClose={() => changeDialogsOpenState({ status: false })}
			setPreciseFilter={setPreciseFilter}
		/>
		<DateDialog
			open={dialogsOpenState.date}
			onClose={() => changeDialogsOpenState({ date: false })}
			selectedDate={preciseFilters.date || new Date()}
			setPreciseFilter={setPreciseFilter}
		/>
	</div>
);

const mapStateToProps = state => ({
	windowWidth: state.utils.windowWidth,
	hasReceivedInterventionsData: state.main.hasReceivedInterventionsData,
	interventions: state.main.interventions
});

const mapDispatchToProps = dispatch => bindActionCreators({
	requestInterventions: requestInterventionsAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InterventionsView);
