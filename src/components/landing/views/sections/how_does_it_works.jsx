import React from 'react';

import Section from '../section';

import '../../../../styles/home/views/sections/how_does_it_works.css';

const HowDoesItWorks = () => (
	<Section
		visibleContent={<Visible />}
		hiddenContent={<Hidden />}
		style={{
			backgroundColor: '#FFFFFF'
		}}
	/>
);

const Visible = () => (
	<div id="section-howdoesitworks-visible-container">
		{'Fonctionnement'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default HowDoesItWorks;
