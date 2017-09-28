import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import AtomicButton from './buttons/atomic';

const Button = ({ label, type, style, ...props }) => {
	switch (type) {
		case 'atomic': return (
			<AtomicButton
				label={label}
				style={style}
				{...props}
			/>
		);
		case 'flat': return (
			<FlatButton
				label={label}
				style={style}
				{...props}
			/>
		);
		default: return (
			<RaisedButton
				label={label}
				style={style}
				{...props}
			/>
		);
	}
}

export default Button;
