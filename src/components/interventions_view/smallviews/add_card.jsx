import React, { Component } from 'react';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';

import AccountBoxIcon from 'material-ui-icons/AccountBox';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import DateRangeIcon from 'material-ui-icons/DateRange';
import CommentIcon from 'material-ui-icons/Comment';

import '../../../styles/interventions_view/smallviews/interventions_add_card.css';

class InterventionAddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerId: '',
			location: '',
			date: '',
			comment: ''
		}
	}

	handleChange = concernedElement => (event) => {
		const input = event.target.value;
		if (!concernedElement || input === null || input === undefined) {
			return false;
		}
		this.setState({ [concernedElement]: input });
		return true;
	}

	render() {
		const {
			customerId,
			location,
			date,
			comment
		} = this.state;
		return (
			<div className="interventions-add-card">
				<Title />
				<Content
					customerId={customerId}
					location={location}
					date={date}
					comment={comment}
					handleChange={this.handleChange}
				/>
			</div>
		);
	}
}

const Title = () => (
	<div className="iac-title-container">
		<div className="iac-title-text">
			{'Ajouter une intervention'}
		</div>
	</div>
);

const Content = ({
	customerId,
	location,
	date,
	comment,
	handleChange
}) => (
	<div className="iac-content">
		<FormControl>
			<InputLabel htmlFor="newIntervention_customerId">
				{'Identifiant du client'}
			</InputLabel>
			<Input
				id="newIntervention_customerId"
				type="text"
				value={customerId}
				onChange={handleChange('customerId')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<AccountBoxIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<FormControl>
			<InputLabel htmlFor="newIntervention_plannedDate">
				{'Date prevue'}
			</InputLabel>
			<Input
				id="newIntervention_plannedDate"
				type="text"
				value={date}
				onChange={handleChange('date')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<DateRangeIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<FormControl>
			<InputLabel htmlFor="newIntervention_location">
				{'Localisation'}
			</InputLabel>
			<Input
				id="newIntervention_location"
				type="text"
				value={location}
				onChange={handleChange('location')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<LocationOnIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
		<FormControl>
			<InputLabel htmlFor="newIntervention_comment">
				{'Commentaire'}
			</InputLabel>
			<Input
				id="newIntervention_comment"
				type="text"
				value={comment}
				onChange={handleChange('comment')}
				endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<CommentIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	</div>
);

export default InterventionAddCard;
