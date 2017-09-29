import React from 'react';

import Button from '../smallviews/button';

import Bg1 from '../../medias/images/backgrounds/1.jpeg';

const Banner = () => (
	<div
		id="home-banner"
		style={{
			backgroundImage: `url(${Bg1})`
		}}
	>
		<div id="home-banner-darken" />
		<div id="home-banner-content-container">
			<div id="home-banner-content">
				<div id="home-banner-title">
					{'Interventions & Questions'}
				</div>
				<div id="home-banner-description">
					{'Notre équipe est à votre écoute !'}
				</div>
				<div id="home-banner-buttons">
					<Button
						type="atomic"
						label="Demander une intervention"
					/>
					<Button
						type="atomic"
						label="Voir la F.A.Q"
					/>
			</div>
			</div>
		</div>
	</div>
);

export default Banner;
