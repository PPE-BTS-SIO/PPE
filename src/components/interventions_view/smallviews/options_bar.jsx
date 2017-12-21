import React from 'react';

import classnames from 'classnames';

import { withTheme } from 'material-ui/styles';

import LocationOn from 'material-ui-icons/LocationOn';
import Check from 'material-ui-icons/Check';
import DateRange from 'material-ui-icons/DateRange';

import '../../../styles/interventions_view/smallviews/interventions_options_bar.css';
import '../../../styles/interventions_view/smallviews/interventions_option.css';

const InterventionsOptionsBar = ({ shouldStick, onClick, preciseFilters }) => (
	<div className={
		classnames('interventions-options-bar', {
			'iob-sticky': shouldStick
		})
	}
	>
		<Option
			icon={<LocationOn />}
			label="ville"
			hightlighted={preciseFilters.location}
			onClick={() => onClick('location')}
		/>
		<Option
			icon={<Check />}
			label="status"
			hightlighted={preciseFilters.status}
			onClick={() => onClick('status')}
		/>
		<Option
			icon={<DateRange />}
			label="date"
			hightlighted={preciseFilters.date}
			onClick={() => onClick('date')}
		/>
	</div>
);

const Option = withTheme()(({
	theme,
	icon,
	label,
	onClick,
	hightlighted
}) => (
	<div
		className="iob-option"
		onClick={onClick}
	>
		<div className="iob-option-icon-container">
			{React.cloneElement(
				icon,
				{
					style: {
						fill: hightlighted ? theme.palette.primary[600] : '#7F7F7F'
					}
				}
			)}
		</div>
		<div className="iob-option-label-container">
			{`${hightlighted ? 'Filtré' : 'Filtrer'} par ${label}`}
		</div>
	</div>
));

export default InterventionsOptionsBar;
