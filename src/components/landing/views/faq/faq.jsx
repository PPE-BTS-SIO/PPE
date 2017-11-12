import React from 'react';

import injectSheet from 'react-jss/lib/injectSheet';

import WhoWeAre from '../sections/who_we_are/who_we_are';
import HowDoesItWorks from '../sections/how_does_it_works/how_does_it_works';
import WhenAndWhere from '../sections/when_and_where/when_and_where';

import styles from './faq_styles';

/*
This is what we call a 'stateless' component.
What's the difference between this and a basic React component ?
A stateless component doesn't need constructor nor state.
It acts as the render method of a basic component and thus should render a valid
element.
You can still pass props to it, either by doing :
- const MyStatelessComponent = ({ props1, props2, props3 }) => {...};
or :
- const MyStatelessComponent = (props) => { const props1 = props.props1 };
*/
const FAQ = ({ classes }) => (
	<div className={classes.container}>
		<WhoWeAre />
		<HowDoesItWorks />
		<WhenAndWhere />
	</div>
);

export default injectSheet(styles)(FAQ);
