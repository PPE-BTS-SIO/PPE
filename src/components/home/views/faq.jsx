import React from 'react';

import '../../../styles/home/views/faq.css';

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

const FAQ = () => (
	<div id="home-faq-container">
		{sections.map((section, index) => (
			<Section
				question={section.question}
				answer={section.answer}
				picture={section.picture}
				picturePosition={section.picturePosition}
				backgroundColor={index % 2 === 0 ? '#EFEFEF' : 'white'}
			/>
		))}
	</div>
);

const Section = ({ question, anwer, picture, picturePosition, backgroundColor }) => {
		let sectionContent = null;
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
