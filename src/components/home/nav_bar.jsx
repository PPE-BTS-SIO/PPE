import React, { Component } from 'react';

import LTSComponent from '../smallviews/generics/listen_to_scroll_component';

class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			className: 'home-nav-bar-above'
		}
	}

	render() {
		return (
			<LTSComponent
				triggerWhenAbove={1}
				onTrigger={(position) =>  {
					this.setState({ id: position === 'below' ? 'home-nav-bar-below' : 'home-nav-bar-above'})
				}}
			>
			<div
				className={`home-nav-bar ${this.state.className}`}
				style={{
					transition: ".3s"
				}}
			>
				<div id="home-nav-bar-logo">
					<span>
						{'cashcash'}
					</span>
				</div>
				<div id="home-nav-bar-navigation">
					<span className="home-nav-bar-tab home-nav-bar-tab-active">
						{'Accueil'}
					</span>
					<span className="home-nav-bar-tab">
						{'Se connecter'}
					</span>
				</div>
			</div>
			</LTSComponent>
		);
	}
}

export default NavigationBar;
