import React, { Component } from 'react';

import classnames from 'classnames';

import NavigationBar from '../smallviews/nav_bar/navigation_bar';
import SidePanel from './smallviews/side_panel';
import Banner from './smallviews/banner';
import OptionsBar from './smallviews/options_bar';
import AddCard from './smallviews/add_card';
import Intervention from './smallviews/intervention';

import '../../styles/interventions_view/interventions_view.css';
import '../../styles/interventions_view/smallviews/interventions_content.css';

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

	handleAddClick = () => {
		const { isAdding } = this.state;
		this.setState({ isAdding: !isAdding });
	}

	render() {
		const { shouldStick, isAdding } = this.state;
		return (
			<div id="interventions-view-wrapper">
				<NavigationBar />
				<SidePanel setCustomerInput={this.setCustomerInput} />
				<div
					id="interventions-view-content-wrapper"
					onScroll={this.handleContentScroll}
				>
					<Banner
						setInterventionsInput={this.setInterventionsInput}
						handleAddClick={this.handleAddClick}
					/>
					<OptionsBar shouldStick={this.state.shouldStick} />
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
			<Intervention />
			<Intervention />
			<Intervention />
			<Intervention />
		</div>
	</div>
);

export default InterventionsView;
