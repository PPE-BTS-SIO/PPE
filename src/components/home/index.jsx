import React, { Component } from 'react';

import NavigationBar from '../smallviews/nav_bar';
import Banner from './banner';
import ActionsBar from './actions_bar';
import View from './view';

import '../../styles/home/home.css';

/*
'Home' is the component which will display the home page.
It will render mutliple elements and manage what content should be displayed thanks
to the contentView state's variable.
*/
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/*
			contentView is the content which will be displayed under the action bar.
			Its value is a number which correspond to a view. The number - view combinations are :
			0 = FAQ
			1 = Agencies
			*/
			contentView: 0
		}
	}

	/*
	This is the function which we will pass to children components that could need to change
	the current contentView. It will change the value based on the given one.
	We need to use the setState function for React to re-render to render everything that
	need to be re-rendered.
	*/
	changeContentView = contentView => this.setState({ contentView });

	render() {
		const { contentView } = this.state;
		return (
			<div id="home-container">
				<NavigationBar isLTS />
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
