import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class FinishInterventionDialog extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			duration: 0
		}
	}

	handleFinish = () => {
		const { interventionId, isConnected, socket } = this.props;
		const { comment, duration } = this.state;
		if (!interventionId || !isConnected || !socket || !duration) {
			return;
		}
		socket.emit('client/finish-intervention', {
			interventionId,
			comment,
			duration
		});
		const { onClose } = this.props;
		if (onClose) {
			onClose();
		}
	}

	render() {
		const { comment, duration } = this.state;
		const { open, onClose } = this.props;
		return (
			<Dialog
				open={open}
				onClose={onClose}
			>
				<DialogTitle>
					{'Marquer cette intervention comme terminée ?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{'Vous pouvez ajouter un commentaire sur le déroulement de cette intervention.'}
					</DialogContentText>
					<TextField
						fullWidth
						style={{
							marginTop: 20
						}}
						label="Commentaire"
						placeholder="Exemple : Intervention terminée, aucun problème constaté."
						value={comment}
						onChange={e => this.setState({ comment: e.target.value })}
					/>
					<TextField
						fullWidth
						style={{ marginTop: 20 }}
						type="number"
						value={duration}
						label="Durée de l'intervention (en heures)"
						onChange={e => this.setState({ duration: e.target.value })}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						size="small"
						onClick={onClose}
					>
						{'Fermer'}
					</Button>
					<Button
						size="small"
						color="primary"
						disabled={!comment || !duration}
						onClick={this.handleFinish}
					>
						{'Continuer'}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

const mapStateToProps = ({ nodeServer: { status, socket } }) => ({
	isConnected: status === 'connected',
	socket
});

export default connect(mapStateToProps)(FinishInterventionDialog);
