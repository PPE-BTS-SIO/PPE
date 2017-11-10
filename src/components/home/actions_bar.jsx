import React from 'react';

import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';

const ActionsBar = ({ contentView, changeContentView }) => {
	const getClassNames = tabNumber => `home-cvb-tab ${tabNumber === contentView ? 'home-cvb-tab-active' : ''}`;

	return (
		<div id="home-cvb-container">
			<div id="home-cvb-navigation">
				<div id="home-cvb-tabs">
					<div
						className={getClassNames(0)}
						onClick={() => changeContentView(0)}
					>
						{'F.A.Q'}
					</div>
					<div
						className={getClassNames(1)}
						onClick={() => changeContentView(1)}
					>
						{'Agences'}
					</div>
				</div>
				<div id="home-cvb-ink-bar-container">
					<div
						id="home-cvb-ink-bar"
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
	);
}

export default ActionsBar;
