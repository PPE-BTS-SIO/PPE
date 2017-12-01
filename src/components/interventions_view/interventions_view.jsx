import React, { Component } from 'react';

import NavigationBar from '../smallviews/nav_bar/navigation_bar';
import InterventionsSidePanel from './smallviews/interventions_side_panel';
import InterventionsBanner from './smallviews/interventions_banner';
import InterventionsOptionsBar from './smallviews/interventions_options_bar';
import InterventionsWrapper from './smallviews/interventions_wrapper';

import '../../styles/interventions_view/interventions_view.css';

class InterventionsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerInput: null,
			interventionsInput: null,
			isAdding: false
		}
	}

	setCustomerInput = input => this.setState({ customerInput: input });

	setInterventionsInput = input => this.setState({ interventionsInput: input });

	handleContentScroll = (event) => {
		const { scrollTop } = event.target;
		const { shouldStick } = this.state;
		if (scrollTop >= 150 && !shouldStick) {
			this.setState({ shouldStick: true });
		} else if (scrollTop < 150 && shouldStick) {
			this.setState({ shouldStick: false });
		}
	}

	render() {
		const { shouldStick } = this.state;
		return (
			<div id="interventions-view-wrapper">
				<NavigationBar />
				<InterventionsSidePanel setCustomerInput={this.setCustomerInput} />
				<div
					id="interventions-view-content-wrapper"
					onScroll={this.handleContentScroll}
				>
					<InterventionsBanner setInterventionsInput={this.setInterventionsInput} />
					<InterventionsOptionsBar shouldStick={this.state.shouldStick} />
					<InterventionsWrapper shouldAddPadding={shouldStick} />
				</div>
			</div>
		)
	}
}

export default InterventionsView;
