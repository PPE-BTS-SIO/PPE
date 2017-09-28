import React from 'react';

import Button from '../smallviews/button';

import Bg1 from '../../medias/images/backgrounds/1.jpeg';

import '../../styles/home.css';

const Home = () => (
	<div id="home-container">
		<NavigationBar />
		<Banner />
	</div>
);

const NavigationBar = () => (
	<div id="home-nav-bar">

	</div>
);

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
					{'La référence de la gestion'}
				</div>
				<div id="home-banner-description">
					{'Découvrez nos offres et nos services'}
				</div>
				<div id="home-banner-buttons">
					<Button
						type="atomic"
						label="Je suis client"
					/>
					<Button
						type="atomic"
						label="Je suis développeur"
					/>
			</div>
			</div>
		</div>
	</div>
);

export default Home;
