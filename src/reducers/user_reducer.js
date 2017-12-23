import {

	LOGIN_USER_STARTED,
	LOGIN_USER_RECEIVED_DATA

} from '../actions/types';

const initialState = {
	hasReceivedLoginCallback: false,
	hasReceivedUserData: false,

	informations: {},

	role: null

}

export default (state = initialState, action) => {
	switch (action.type) {
	case LOGIN_USER_STARTED:
		return Object.assign({}, state, {
			hasReceivedLoginCallback: null
		});

	case LOGIN_USER_RECEIVED_DATA: {
		const { response } = action;
		let { hasReceivedUserData, informations } = state;
		if (response) {
			const { status, data } = response;
			if (status && status === 'success' && data) {
				hasReceivedUserData = true;
				informations = data;
				const { secretKey } = response;
				if (secretKey) {
					localStorage.setItem('cashcash_secret_key', secretKey);
				}
			}
		}
		return Object.assign({}, state, {
			hasReceivedLoginCallback: true,
			hasReceivedUserData,
			informations
		})
	}

	default: return state;
	}
};
