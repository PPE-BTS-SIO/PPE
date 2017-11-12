import React from 'react';

import injectSheet from 'react-jss/lib/injectSheet';

import Section from '../../section/section';

import styles from './when_and_where_styles';

const WhenAndWhere = ({ classes }) => (
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
		{'Où et quand ?'}
	</div>
);

const Hidden = () => (
	<div>
		{'Hidden'}
	</div>
);

export default injectSheet(styles)(WhenAndWhere);
