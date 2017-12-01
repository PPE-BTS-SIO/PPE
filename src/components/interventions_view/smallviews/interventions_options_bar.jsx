import React from 'react';

import classnames from 'classnames';

import LocationOn from 'material-ui-icons/LocationOn';
import Check from 'material-ui-icons/Check';
import DateRange from 'material-ui-icons/DateRange';

import '../../../styles/interventions_view/smallviews/interventions_options_bar.css';
import '../../../styles/interventions_view/smallviews/interventions_option.css';

const InterventionsOptionsBar = ({ shouldStick }) => (
	<div className={
		classnames('interventions-options-bar', {
			'iob-sticky': shouldStick
		})
	}
	>
		<Option
			icon={<LocationOn color="#7F7F7F" />}
			label="Filtrer par ville"
		/>
		<Option
			icon={<Check color="#7F7F7F" />}
			label="Filtrer par status"
		/>
		<Option
			icon={<DateRange color="#7F7F7F" />}
			label="Filtrer par date"
		/>
	</div>
);

const Option = ({ icon, label, onClick }) => (
	<div
		className="iob-option"
		onClick={onClick}
	>
		<div className="iob-option-icon-container">
			{icon}
		</div>
		<div className="iob-option-label-container">
			{label}
		</div>
	</div>
);

export default InterventionsOptionsBar;
