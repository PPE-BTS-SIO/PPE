import React from 'react';

import injectSheet from 'react-jss/lib/injectSheet';

import Section from '../../section/section';

import styles from './how_does_it_works_styles';

const HowDoesItWorks = ({ classes }) => (
	<Section
		visibleContent={<Visible classes={classes} />}
		hiddenContent={<Hidden />}
		style={{
			backgroundColor: '#FFFFFF'
		}}
	/>
);

const Visible = ({ classes }) => (
	<div className={classes.visibleContainer}>
		{'Fonctionnement'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default injectSheet(styles)(HowDoesItWorks);
