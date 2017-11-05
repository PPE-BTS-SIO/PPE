import React from 'react';

import WhoWeAre from './sections/who_we_are';

import '../../../styles/home/views/faq.css';

/*
This is what we call a 'stateless' component.
What's the difference between this and a basic React component ?
A stateless component doesn't need constructor nor state.
It acts as the render method of a basic component and thus should render a valid
element.
You can still pass props to it, either :
- const MyStatelessComponent = ({ props1, props2, props3 }) => {...};
- const MyStatelessComponent = (props) => { const props1 = props.props1 };
*/
const FAQ = () => (
	<div id="home-faq-container">
		<WhoWeAre />
		<WhoWeAre />
		<WhoWeAre />
	</div>
);

export default FAQ;
