import React, { Component } from 'react';

import classnames from 'classnames';

import injectSheet from 'react-jss/lib/injectSheet';

import NavigationBar from '../../smallviews/nav_bar/navigation_bar';
import Banner from '../banner/banner';
import ActionsBar from '../actions_bar/actions_bar';
import FAQ from '../views/faq';

import styles from './home_styles';

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
		const { sheet: { classes } } = this.props;
		return (
			<div className={classnames(classes.container)}>
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

/*
This component render content based on the current
contentView.
*/
const View = ({ contentView, changeContentView }) => {
	switch (contentView) {
	case 1: return <div>yo</div>
	default: return <FAQ changeContentView={changeContentView} />
	}
};

export default injectSheet(styles)(Home);
