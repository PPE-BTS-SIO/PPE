import React from 'react';

import classnames from 'classnames';

import { withTheme } from 'material-ui/styles';

import Search from 'material-ui-icons/Search';
import LocationOn from 'material-ui-icons/LocationOn';
import Check from 'material-ui-icons/Check';
import DateRange from 'material-ui-icons/DateRange';
import RemoveRedEye from 'material-ui-icons/RemoveRedEye';

import '../../../styles/interventions_view/smallviews/interventions_options_bar.css';
import '../../../styles/interventions_view/smallviews/interventions_option.css';

const InterventionsOptionsBar = ({
	windowWidth,
	shouldStick,
	onClick,
	preciseFilters,
	changeDrawersOpenState,
	changeInterventionsPerRow
}) => {
	const useMobileLayout = windowWidth <= 980;
	return (
		<div className={
			classnames('interventions-options-bar', {
				'interventions-options-bar-mobile': useMobileLayout,
				'iob-sticky': shouldStick,
				'iob-sticky-mobile': shouldStick && useMobileLayout
			})
		}
		>
			<SearchCustomers
				show={useMobileLayout}
				changeDrawersOpenState={changeDrawersOpenState}
			/>
			<div>
				<Option
					useMobileLayout={useMobileLayout}
					icon={<LocationOn />}
					label="ville"
					hightlighted={preciseFilters.location}
					onClick={() => onClick('location')}
				/>
				<Option
					useMobileLayout={useMobileLayout}
					icon={<Check />}
					label="status"
					hightlighted={preciseFilters.status}
					onClick={() => onClick('status')}
				/>
				<Option
					useMobileLayout={useMobileLayout}
					icon={<DateRange />}
					label="date"
					hightlighted={preciseFilters.date}
					onClick={() => onClick('date')}
				/>
			</div>
			<ChangeView
				show={windowWidth > 1380}
				changeInterventionsPerRow={changeInterventionsPerRow}
			/>
		</div>
	);
};

const SearchCustomers = ({ show, changeDrawersOpenState }) => {
	if (!show) return null;
	return (
		<div>
			<Option
				useMobileLayout
				icon={<Search />}
				label="client"
				onClick={() => changeDrawersOpenState({ interventionsSidePanel: true })}
			/>
		</div>
	);
}

const ChangeView = ({ show, changeInterventionsPerRow }) => {
	if (!show) return null;
	return (
		<Option
			useMobileLayout
			icon={<RemoveRedEye />}
			label="vue"
			onClick={() => changeInterventionsPerRow()}
		/>
	);
}

const Option = withTheme()(({
	theme,
	useMobileLayout,
	icon,
	label,
	onClick,
	hightlighted
}) => {
	const text = useMobileLayout ? null : (
		<div className="iob-option-label-container">
			{`${hightlighted ? 'Filtré' : 'Filtrer'} par ${label}`}
		</div>
	);
	return (
		<div
			className={
				classnames(
					'iob-option',
					{ 'iob-option-mobile': useMobileLayout }
				)
			}
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
			{text}
		</div>
	);
});

export default InterventionsOptionsBar;
