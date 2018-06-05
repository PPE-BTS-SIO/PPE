/* eslint no-undef: 0 */
import React, { PureComponent } from 'react';

import c from 'classnames';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Lock from '@material-ui/icons/Lock';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import Option from './option';

import '../../../styles/smallviews/user_side_panel/user_section.css';

class UserSection extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isExtended: false
		}
	}

	toggleIsExtended = () => this.setState({ isExtended: !this.state.isExtended });

	render() {
		const { informations } = this.props;
		if (!informations) {
			return null;
		}
		const { isExtended } = this.state;
		return (
			<div
				className={
					c(
						'usp-user-section-container',
						isExtended && 'usp-user-section-container-extended'
					)
				}
				onClick={this.toggleIsExtended}
			>
				<div
					id="usp-user-section-picture"
					style={{
						backgroundImage: `url('${informations.ImageProfil}')`
					}}
				/>
				<div id="usp-user-section-name">
					{`${informations.Prenom} ${informations.Nom}`}
				</div>
				<div id="usp-user-section-mail">
					{informations.Mail}
				</div>
				<div id="usp-user-section-icon">
					<ArrowDropDown style={{ fill: '#9F9F9F' }} />
				</div>
				<Options isExtended={isExtended} />
			</div>
		);
	}
}

const Options = ({ isExtended }) => {
	if (!isExtended) {
		return null;
	}
	return (
		<div id="usp-user-section-option">
			<Option
				tooltip="Se déconnecter"
				icon={<PowerSettingsNew />}
				onClick={() => {
					const secretKey = localStorage.getItem('cashcash_secret_key');
					if (secretKey) {
						localStorage.removeItem('cashcash_secret_key');
					}
					window.location.reload();
				}}
			/>
		</div>
	);
}

export default UserSection;
