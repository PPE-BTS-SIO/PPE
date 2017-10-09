import {

	CONNECTION_TO_NODE_SERVER_STARTED,
	CONNECTION_TO_NODE_SERVER_CHANGED_STATUS

} from '../actions/types.js';

const initialState = {
	socket: null,
	status: 'not-connected'

}

export default (state = JSON.parse(JSON.stringify(initialState)), action) => {
	switch (action.type) {
		case CONNECTION_TO_NODE_SERVER_STARTED: return Object.assign({}, state, {
			status: 'waiting',
			socket: action.socket
		});

		case CONNECTION_TO_NODE_SERVER_CHANGED_STATUS: return Object.assign({}, state, {
			status: action.status
		});

		default: return state;
	}
};
