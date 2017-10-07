import React from 'react';

import '../../../styles/home/views/faq.css';

/*
The 'sections' const contains the differents sections we want to use.
The 'picture' variables should contains either an URL (not recommanded as it)
will most likely not display before two/three seconds) or an imported object
(if the wanted picture is placed in the medias/images folder, this is the ideal scenario).
*/
const sections = [
	{
		question: 'Question n°1',
		answer: 'Réponse n°1',
		picture: 'Will add it later',
		picturePosition: 'right'
	},
	{
		question: 'Question n°1',
		answer: 'Réponse n°1',
		picture: 'Will add it later',
		picturePosition: 'right'
	},
	{
		question: 'Question n°1',
		answer: 'Réponse n°1',
		picture: 'Will add it later',
		picturePosition: 'right'
	}
];

/*
This is what we call a 'stateless' component.
What's the difference between this and a basic React component ?
A stateless component doesn't need constructor nor state.
It acts as the render method of a basic component and thus should render a valid
element.
You can still pass props to it, either :
- const MyStatelessComponent = ({ props1, props2, props3 }) => {...};
- const MyStatelessComponent = (props) => { const props1 = props.props1 };

The { map } function loop though all objects in the 'sections' array.
Each iterations return a 'Section' object.
For this to work we surrounded this method with a simple <div>.
Each <Section /> has a 'backgroundColor' props, the value is '#EFEFEF' if
{ index % 2 === 0 }, if not the value is 'white'.
*/
const FAQ = () => (
	<div id="home-faq-container">
		{sections.map((section, index) => (
			<Section
				key={`${section.question}_${index}`}
				question={section.question}
				answer={section.answer}
				picture={section.picture}
				picturePosition={section.picturePosition}
				backgroundColor={index % 2 === 0 ? '#EFEFEF' : 'white'}
			/>
		))}
	</div>
);

/*
'Section' is a stateless component which act as a FAQ's child.
It will display each section based on the given props.
*/
const Section = ({ question, anwer, picture, picturePosition, backgroundColor }) => {
		switch (picturePosition) {
			case 'left': return (
				<div
					className="home-faq-section"
					style={{
						backgroundColor
					}}
				>
				<div className="home-faq-section-text">
					<div className="home-faq-section-question">
					</div>
					<div className="home-faq-section-answer">
					</div>
				</div>
				<div className="home-faq-section-picture">

				</div>
			</div>
			);
			default: return (
				<div
					className="home-faq-section"
					style={{
						backgroundColor
					}}
				>
 			 <div className="home-faq-section-picture">

 			 </div>
			 <div className="home-faq-section-text">
				 <div className="home-faq-section-question">
				 </div>
				 <div className="home-faq-section-answer">
				 </div>
			 </div>
		 </div>
		 );
		}
}

export default FAQ;
