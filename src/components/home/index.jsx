import React, { Component } from 'react';

import NavigationBar from './nav_bar';
import Banner from './banner';
import ActionsBar from './actions_bar';
import View from './view';

import '../../styles/home/home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentView: 0
		}
	}

	changeContentView = contentView => this.setState({ contentView });

	render() {
		const contentView = this.state.contentView;
		return (
			<div id="home-container">
				<NavigationBar />
				<Banner />
				<ActionsBar
					contentView={contentView}
					changeContentView={this.changeContentView}
				/>
			<View
				contentView={contentView}
				changeContentView={this.changeContentView}
			/>
		</div>
		);
	}
}

export default Home;
