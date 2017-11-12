import React from 'react';

import Section from '../section';

import '../../../../styles/home/views/sections/who_we_are.css';

const WhoWeAre = () => (
	<Section
		visibleContent={<Visible />}
		hiddenContent={<Hidden />}
		style={{
			backgroundColor: '#EFEFEF'
		}}
	/>
);

const Visible = () => (
	<div id="section-whoweare-visible-container">
		{'Qui sommes-nous ?'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default WhoWeAre;
