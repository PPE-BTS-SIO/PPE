import {

	CREATE_USER_STARTED,
	CREATE_USER_RECEIVED_DATA,
	REQUEST_USER_STARTED,
	REQUEST_USER_RECEIVED_DATA

} from '../actions/types';

const initialState = {
	hasReceivedUserData: false,

	informations: {},

	role: null

}

export default (state = initialState, action) => {
	switch (action.type) {

	default: return state;
	}
};
