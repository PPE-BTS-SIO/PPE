import {

	CREATE_USER_STARTED,
	CREATE_USER_RECEIVED_DATA,
	REQUEST_USER_STARTED,
	REQUEST_USER_RECEIVED_DATA

} from '../actions/types.js';

const initialState = {
	hasReceivedUserData: false,

	informations: {},

	role: null

}

export default (state = initialState, action) => {
	switch(action.type) {
		case CREATE_USER_STARTED: return Object.assign({}, state, {
			hasReceivedUserData: null
		});

		case CREATE_USER_RECEIVED_DATA: {
			const newState = JSON.parse(JSON.stringify(state));
			newState.hasReceivedUserData = true;
			if (action.isValid && action.user) {
				const user = action.user;
				newState.informations = user.informations;
				newState.role = user.role;
			}
			console.log('REDUCER');
			return newState;
		}

		default: return state;
	}
};
