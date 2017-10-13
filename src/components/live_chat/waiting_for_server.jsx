import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import NavigationBar from '../smallviews/nav_bar';

class WaitingForServer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 1,
			open: false
		}
	}

	componentWillMount() {
		this.createInterval;
	}

	componentWillUnmount() {
		clearInterval(this.createInterval);
	}

	createInterval = setInterval(() => this.updateTime(), 1000);

	updateTime = () => {
		const elapsedTime = this.state.elapsedTime + 1;
		const open = this.state.open || elapsedTime === 10;
		this.setState({
			elapsedTime,
			open
		});
	};

	render() {
		const { elapsedTime } = this.state.elapsedTime;

		return (
			<div id="live-chat-container">
				<NavigationBar />
				<div id="live-chat-waiting-for-connection">
					<div id="live-chat-waiting-for-connection-content">
						<div>
							<CircularProgress size={60} thickness={5} />
						</div>
						<div>
							{`Connection au serveur en cours (${elapsedTime}s)`}
						</div>
					</div>
				</div>
				<Snackbar
					open={this.state.open}
					message="Le serveur semble ne pas répondre"
					action="Rafraichir"
					autoHideDuration={50000}
					onActionTouchTap={() => window.location.reload()}
					onRequestClose={() => this.setState({ open: false })}
				/>
			</div>
		);
	}
}

export default WaitingForServer;
