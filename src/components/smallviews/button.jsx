import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import AtomicButton from './buttons/atomic';

/*
This component act as a "all-in-one" component.
All you have to do is set a label and a type.
The label is the text which will be displayed inside the button.
The different type are :

- atomic : see ./buttons/atomic to know what it is about.
- raised : Use the material-ui's RaisedButton component. See : http://www.material-ui.com/#/components/raised-button
- flat : Use material-ui's FlatButton component. See : http://www.material-ui.com/#/components/flat-button

The style props allow us to change the button directly inline.
Others props can be given, this is useful on material-ui's component.
*/
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
