import React from 'react';

import classnames from 'classnames';

import '../../../styles/smallviews/side_panel/side_panel.css';

const SidePanel = ({ children, isInDrawer, style }) => (
	<div
		className={
			classnames(
				'side-panel',
				{ 'side-panel-in-drawer': isInDrawer }
			)
		}
		style={style}
	>
		{children}
	</div>
);

export default SidePanel;
