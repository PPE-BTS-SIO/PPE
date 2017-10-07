import React from 'react';

import '../../../styles/smallviews/buttons/atomic.css';

/*
This a custom button made with the 'atomic' style in mind.
It is basically a label with a rounded lightgray border and a transparent background.
On hover, the background turns white and the label turns black.
The style can be edited either in the stylesheet file or directly inline.
*/
const AtomicButton = ({ label, style }) => (
	<div
		className="atomic-button-container"
		style={style}
	>
		<span className="atomic-button-label">
			{label}
		</span>
	</div>
);

export default AtomicButton;
