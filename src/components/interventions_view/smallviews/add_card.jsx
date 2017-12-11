import React, { Component } from 'react';

import classnames from 'classnames';

import TextField from 'material-ui/TextField';

import '../../../styles/interventions_view/smallviews/interventions_add_card.css';

const timeout = null;

class InterventionAddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: null,
			location: null,
			date: null,
			comment: null
		}
	}

	render() {
		return (
			<div className="interventions-add-card" />
		);
	}
}

export default InterventionAddCard;
