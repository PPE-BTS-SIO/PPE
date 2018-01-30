/* eslint no-undef: 0 */
import React, { Component } from 'react';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

import LocationOnIcon from 'material-ui-icons/LocationOn';

import '../../styles/smallviews/location_picker.css';


const service = new google.maps.places.AutocompleteService();

class LocationPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			predictions: null,
			value: ''
		}
	}

	changeInput = (value) => {
		const { onChange } = this.props;
		if (onChange) onChange(value);
		this.setState({ value });
	}

	retrievePredictions = (predictions, status) => {
		if (status !== google.maps.places.PlacesServiceStatus.OK) {
			return this.setState({ predictions: null });
		}
		return this.setState({ predictions });
	}

	handleChange = (e) => {
		const input = e.target.value;
		this.changeInput(input);
		if (!input) {
			return this.setState({ predictions: null });
		}
		return service.getPlacePredictions({ input }, this.retrievePredictions);
	}

	handleSelection = (value) => {
		this.changeInput(value);
		this.setState({ predictions: null })
	};

	handleClickAway = () => this.setState({ predictions: null });

	render() {
		const { value, predictions } = this.state;
		return (
			<ClickAwayListener onClickAway={this.handleClickAway}>
				<div className="lp-container">
					<FormControl>
						<InputLabel htmlFor="location_picker">
							{'Localisation'}
						</InputLabel>
						<Input
							type="text"
							value={value}
							onChange={this.handleChange}
							endAdornment={
								<InputAdornment position="end">
									<IconButton>
										<LocationOnIcon />
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<div className="lp-predictions-container">
						{
							predictions && predictions.slice(0, 4).map(prediction =>
								(
									<Prediction
										key={`prediction_${prediction.id}`}
										prediction={prediction}
										onSelected={this.handleSelection}
									/>
								))
						}
					</div>
				</div>
			</ClickAwayListener>
		)
	}
}

const Prediction = ({ prediction, onSelected }) => {
	if (!prediction || !prediction.description) {
		return null;
	}
	const { description } = prediction;
	return (
		<MenuItem onClick={() => onSelected(description)}>
			{description}
		</MenuItem>
	);
}

export default LocationPicker;
