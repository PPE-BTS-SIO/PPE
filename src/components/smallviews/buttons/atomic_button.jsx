import React from 'react';

import '../../../styles/smallviews/buttons/atomic.css';

/*
This a custom button made with the 'atomic' style in mind.
It is basically a label with a rounded lightgray border and a transparent background.
On hover, the background turns black and the label turns white.
The style can be edited either in the stylesheet file or directly inline.
*/
const AtomicButton = ({ label, icon, style }) => (
	<div
		className="atomic-button-container"
		style={style}
	>
		<div className="atomic-button-icon">
			{icon}
		</div>
		<div className="atomic-button-label">
			{label}
		</div>
	</div>
);

export default AtomicButton;
