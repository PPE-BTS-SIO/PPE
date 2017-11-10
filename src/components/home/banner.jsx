import React from 'react';

import AtomicButton from '../smallviews/buttons/atomic_button';

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
					<AtomicButton>
						{'Demander une intervention'}
					</AtomicButton>
					<AtomicButton>
						{'Voir la F.A.Q'}
					</AtomicButton>
				</div>
			</div>
		</div>
	</div>
);

export default Banner;
