import React from 'react';

import { Link } from 'react-router-dom';

import openSocket from 'socket.io-client';

import Button from '../smallviews/button';

const ActionsBar = ({ contentView, changeContentView }) => {
	const getClassNames = tabNumber => `home-cvb-tab ${tabNumber === contentView ? 'home-cvb-tab-active' : ''}`;

	return (
		<div id="home-cvb-container">
			<div id="home-cvb-navigation">
				<div id="home-cvb-tabs">
					<div
						className={getClassNames(0)}
						onTouchTap={() => changeContentView(0)}
					>
						{'F.A.Q'}
					</div>
					<div
						className={getClassNames(1)}
						onTouchTap={() => changeContentView(1)}
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
					type="raised"
					label="Discuter avec un technicien"
					primary
				/>
			</Link>
		</div>
	);
}

export default ActionsBar;
