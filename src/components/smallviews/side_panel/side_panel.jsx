import React from 'react';

import '../../../styles/smallviews/side_panel/side_panel.css';

const SidePanel = ({ children, style }) => (
	<div
		className="side-panel"
		style={style}
	>
		{children}
	</div>
);

export default SidePanel;
