import {

	REQUEST_INTERVENTIONS_STARTED,
	REQUEST_INTERVENTIONS_RECEIVED_DATA

} from '../actions/types';

const initialState = {
	interventions: {},
	hasReceivedInterventionsData: false

}

export default (state = initialState, action) => {
	switch (action.type) {
	case REQUEST_INTERVENTIONS_STARTED:
		return Object.assign({}, state, { hasReceivedInterventionsData: null });

	case REQUEST_INTERVENTIONS_RECEIVED_DATA:
		return console.log(action) || state;

	default: return state;
	}
};
