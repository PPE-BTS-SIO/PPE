import React, { PureComponent } from 'react';

import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

import Truncate from 'react-truncate';

class CustomerSection extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isExtended: false
		}
	}

	render() {
		const { customer, index } = this.props;
		if (!customer || !index) {
			return null;
		}
		const { isExtended } = this.state;
		return (
			<div
				className="isp-customer-section"
				style={{
					animationDelay: `${(index + 1) * 100}ms`
				}}
			>
				<div
					className="isp-customer-section-picture-container"
					style={{
						backgroundImage: `url(${customer.logo})`
					}}
				/>
				<div className="isp-customer-section-name-container">
					<Truncate lines={1}>
						{customer.name}
					</Truncate>
				</div>
				<div className="isp-customer-section-icon-container">
					<KeyboardArrowDown style={{ fill: '#7F7F7F' }} />
				</div>
			</div>
		);
	}
}

export default CustomerSection;
