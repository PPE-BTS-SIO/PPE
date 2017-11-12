import React from 'react';

import injectSheet from 'react-jss/lib/injectSheet';

import Section from '../../section/section';

import styles from './who_we_are_styles';

const WhoWeAre = ({ classes }) => (
	<Section
		visibleContent={<Visible classes={classes} />}
		hiddenContent={<Hidden />}
		style={{
			backgroundColor: '#EFEFEF'
		}}
	/>
);

const Visible = ({ classes }) => (
	<div className={classes.visibleContainer}>
		{'Qui sommes-nous ?'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default injectSheet(styles)(WhoWeAre);
