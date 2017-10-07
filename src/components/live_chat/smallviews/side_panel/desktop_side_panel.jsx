import React from 'react';

import SearchIcon from 'material-ui/svg-icons/action/search';

import TechnicalAdviser from './desktop_sections/technical_adviser';

import '../../../../styles/live_chat/smallviews/side_panel/desktop_side_panel.css';

const DesktopSidePanel = ({ informations, changeInformations }) => {
	const changeInput = (input) => {
		const newInformations = informations;
		newInformations.searchInput = input;
		changeInformations(newInformations);
	}

	return (
		<div id="live-chat-desktop-side-panel">
			<Search
				searchInput={informations.searchInput}
				changeInput={changeInput}
			/>
			<TechnicalAdviser
				technicalAdviser={informations.technicalAdviser}
			/>
		</div>
	);
}

const Search = ({ searchInput, changeInput }) => {
	return (
		<div id="live-chat-desktop-side-panel-search-container">
			<div id="live-chat-desktop-side-panel-search-box-icon">
				<SearchIcon color="#BDBDBD" />
			</div>
			<input
				id="live-chat-desktop-side-panel-search-box-input"
				type="text"
				placeholder="Cherchez dans la conversation"
			/>
		</div>
	);
}

export default DesktopSidePanel;
