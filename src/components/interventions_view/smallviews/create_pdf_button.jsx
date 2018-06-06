import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

const initialState = {
	hasSentRequest: false,
	pdfUrl: null
};

class CreatePDFButton extends PureComponent {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	requestPDFCreation = () => {
		const { interventionId, isConnected, socket } = this.props;
		if (!interventionId || !isConnected || !socket) {
			return;
		}
		socket.emit('client/create-pdf', { interventionId }, (result) => {
			if (result && result.error) {
				alert(result.error);
				this.setState(initialState);
			} else if (result.url) {
				window.open(result.url);
				this.setState({ pdfUrl: result.url });
			}
		})
	}

	render() {
		const { hasSentRequest, pdfUrl } = this.state;
		let content = null;
		let tooltip = null;
		if (!hasSentRequest) {
			tooltip = 'Génerer le PDF';
			content = (
				<IconButton onClick={this.requestPDFCreation}>
					<CloudDownloadIcon style={{ fill: '#7f7f7f !important' }} />
				</IconButton>
			);
		} if (hasSentRequest && !pdfUrl) {
			tooltip = 'PDF en cours de création...';
			content = <CircularProgress />;
		} else if (pdfUrl) {
			tooltip = 'Télécharger le PDF';
			content = (
				<a
					href={pdfUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconButton>
						<CloudDoneIcon style={{ fill: '#7f7f7f !important' }} />
					</IconButton>
				</a>
			);
		}
		return (
			<Tooltip
				placement="top"
				title={tooltip}
				style={{
					whiteSpace: 'nowrap'
				}}
			>
				<div className="ic-create-pdf-button">
					{content}
				</div>
			</Tooltip>
		);
	}
}

const mapStateToProps = ({ nodeServer: { status, socket } }) => ({
	isConnected: status === 'connected',
	socket
});

export default connect(mapStateToProps)(CreatePDFButton);
