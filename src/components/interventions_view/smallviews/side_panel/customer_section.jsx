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
		if (!customer || index === undefined) {
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
					<Actions
						isExtended={isExtended}
						customer={customer}
					/>
				</div>
			</div>
		);
	}
}

const Actions = ({ isExtended, customer }) => isExtended && (
	<div className="isp-customer-section-actions">
		<div className="isp-customer-section-actions-information-customer">
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"ID Client :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.customerId}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Agence :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.agence}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Localisation :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.location}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Distance :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.distance}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Durée déplacement :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.moveTime}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Téléphone :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.phone}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Fax :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.fax}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Numéro Siren :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.siren}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"APE :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.ape}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Raison Sociale :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<Truncate lines={1}>
						{customer.social}
						</Truncate>
				</div>
			</div>
			<div className="isp-customer-section-actions-information-customer-element">
				<div>
					{"Url Client :"}
				</div>
				<div className="isp-customer-section-actions-information-customer-element-value">
					<a href={`https://${customer.url}`}>
							{customer.url}
						</a>
				</div>
			</div>
		</div>
	</div>
);

export default CustomerSection;
