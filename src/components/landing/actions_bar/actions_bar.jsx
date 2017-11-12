import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import injectSheet from 'react-jss/lib/injectSheet'

import Button from 'material-ui/Button';

import styles from './actions_bar_styles';

const ActionsBar = ({ contentView, changeContentView, classes }) => (
	<div className={classnames(classes.container)}>
		<div className={classnames(classes.navigation)}>
			<div className={classnames(classes.tabs)}>
				<div
					className={
						classnames(
							classes.tab,
							{ [classes.tabActive]: contentView === 0 }
						)
					}
					onClick={() => changeContentView(0)}
				>
					{'F.A.Q'}
				</div>
				<div
					className={
						classnames(
							classes.tab,
							{ [classes.tabActive]: contentView === 1 }
						)
					}
					onClick={() => changeContentView(1)}
				>
					{'Agences'}
				</div>
			</div>
			<div className={classnames(classes.inkBarContainer)}>
				<div
					className={classnames(classes.inkBar)}
					style={{
						marginLeft: contentView * 100
					}}
				/>
			</div>
		</div>
		<Link to="/livechat">
			<Button
				raised
				color="primary"
			>
				{'Discuter avec un technicien'}
			</Button>
		</Link>
	</div>
)

export default injectSheet(styles)(ActionsBar);
