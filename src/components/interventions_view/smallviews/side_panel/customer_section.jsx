import React, { PureComponent } from 'react';

import c from 'classnames';

import Button from 'material-ui/Button';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

import Truncate from 'react-truncate';

class CustomerSection extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isExtended: false
		}
	}

	toggleExtended = () => this.setState({ isExtended: !this.state.isExtended });

	render() {
		const { customer, index } = this.props;
		if (!customer || !index) {
			return null;
		}
		const { isExtended } = this.state;
		return (
			<div
				className={
					c(
						'isp-customer-section',
						isExtended && 'isp-customer-section-extended'
					)
				}
				style={{
					animationDelay: `${(index + 1) * 100}ms`
				}}
				onClick={this.toggleExtended}
			>
				<div className="isp-customer-section-content">
					<div className="isp-customer-section-presentation">
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
					<Actions isExtended={isExtended} />
				</div>
			</div>
		);
	}
}

const Actions = ({ isExtended }) => isExtended && (
	<div className="isp-customer-section-actions">

	</div>
);

export default CustomerSection;
