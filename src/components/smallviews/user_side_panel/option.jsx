import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';

import '../../../styles/smallviews/user_side_panel/option.css';

const Option = ({ icon, tooltip, onClick }) => {
	if (!icon || !tooltip) {
		return null;
	}

	return (
		<Tooltip
			title={tooltip}
			placement="bottom"
		>
			<div
				className="option-container"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (onClick) onClick();
				}}
			>
				<IconButton>
					{icon}
				</IconButton>
			</div>
		</Tooltip>
	);
}

export default Option;
