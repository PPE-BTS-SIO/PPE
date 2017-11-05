import React from 'react';

import Section from '../section';

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
	<div>
		{'visible'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default WhoWeAre;
