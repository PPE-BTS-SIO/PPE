import React, { Component } from 'react';

import MediaQuery from 'react-responsive';

import DesktopSidePanel from './desktop_side_panel';
import MobileSidePanel from './mobile_side_panel';

class SidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			informations: {
				technicalAdviser: {
					picture: 'https://jechercheundev.fr/images/vincent.png',
					name: 'Vincent'
				},
				searchInput: null
			}
		}
	}

	changeInformations = (informations) => this.setState(informations);

	render() {
		const informations = this.state.informations;
		return (
			<MediaQuery minDeviceWidth={800}>
				{(match) => {
					if (match) {
						return (
							<DesktopSidePanel
								informations={informations}
								changeInformations={this.changeInformations}
							/>
						);
					} else {
						return (
							<MobileSidePanel
								informations={informations}
								changeInformations={this.changeInformations}
							/>
						);
					}
				}}
			</MediaQuery>
		);
	}
}

export default SidePanel;
