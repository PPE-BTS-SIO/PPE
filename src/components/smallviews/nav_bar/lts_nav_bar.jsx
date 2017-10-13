import React, { Component } from 'react';

import LTSComponent from '../generics/listen_to_scroll_component';

import '../../../styles/smallviews/nav_bar/lts_nav_bar.css';

class LTSNavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 'nav-bar-above'
		}
	}

	render() {
		return (
			<LTSComponent
				triggerWhenAbove={1}
				onTrigger={(position) => {
					this.setState({ id: position === 'below' ? 'nav-bar-below' : 'nav-bar-above' })
				}}
			>
				<div className={`nav-bar ${this.state.id}`}>
					<div id="nav-bar-logo">
						<span>
							{'cashcash'}
						</span>
					</div>
					<div id="nav-bar-navigation">
						<span className="nav-bar-tab nav-bar-tab-active">
							{'Accueil'}
						</span>
						<span className="nav-bar-tab">
							{'Se connecter'}
						</span>
					</div>
				</div>
			</LTSComponent>
		);
	}
}

export default LTSNavigationBar;
