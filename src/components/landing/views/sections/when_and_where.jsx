import React from 'react';

import Section from '../section';

import '../../../../styles/home/views/sections/when_and_where.css';

const WhenAndWhere = () => (
	<Section
		visibleContent={<Visible />}
		hiddenContent={<Hidden />}
		style={{
			backgroundColor: '#EFEFEF'
		}}
	/>
);

const Visible = () => (
	<div id="section-whenandwhere-visible-container">
		{'Où et quand ?'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default WhenAndWhere;
