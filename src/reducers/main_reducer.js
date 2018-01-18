import {

	REQUEST_INTERVENTIONS_STARTED,
	REQUEST_INTERVENTIONS_RECEIVED_DATA,
	REQUEST_CUSTOMERS_STARTED,
	REQUEST_CUSTOMERS_RECEIVED_DATA

} from '../actions/types';

const initialState = {
	interventions: {},
	hasReceivedInterventionsData: false,

	customers: {},
	hasReceivedCustomersData: false

}

export default (state = initialState, action) => {
	switch (action.type) {
	case REQUEST_INTERVENTIONS_STARTED:
		return Object.assign({}, state, { hasReceivedInterventionsData: null });

	case REQUEST_INTERVENTIONS_RECEIVED_DATA:
		return Object.assign({}, state, {
			hasReceivedInterventionsData: true,
			interventions: action.data.interventions
		});

	case REQUEST_CUSTOMERS_STARTED:
		return Object.assign({}, state, { hasReceivedCustomersData: null });

	case REQUEST_CUSTOMERS_RECEIVED_DATA:
		return Object.assign({}, state, {
			hasReceivedCustomersData: true,
			customers: action.data.customers
		});

	default: return state;
	}
};
