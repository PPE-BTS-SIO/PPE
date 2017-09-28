import React from 'react';

import '../../../styles/smallviews/buttons/atomic.css';

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
