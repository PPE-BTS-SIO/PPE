import {

	REQUEST_INTERVENTIONS_STARTED,
	REQUEST_INTERVENTIONS_RECEIVED_DATA,

	REQUEST_CUSTOMERS_STARTED,
	REQUEST_CUSTOMERS_RECEIVED_DATA,

	REQUEST_EMPLOYEES_STARTED,
	REQUEST_EMPLOYEES_RECEIVED_DATA,

	RECEIVED_NEW_INTERVENTION,

	SET_USER_SIDE_PANEL_OPEN_STATE

} from '../actions/types';

const initialState = {
	interventions: [],
	hasReceivedInterventionsData: false,

	customers: [],
	hasReceivedCustomersData: false,

	employees: [],
	hasReceivedEmployeesData: false,

	userSidePanelOpenState: false

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

	case REQUEST_EMPLOYEES_STARTED:
		return Object.assign({}, state, { hasReceivedEmployeesData: true });

	case REQUEST_EMPLOYEES_RECEIVED_DATA:
		return Object.assign({}, state, {
			hasReceivedEmployeesData: true,
			employees: action.data.employees
		});

	case RECEIVED_NEW_INTERVENTION: {
		const newInterventions = (!state.interventions || Object.keys(state.intervention).length < 1)
			? []
			: JSON.parse(JSON.stringify(state.interventions));
		newInterventions.push({ ...action.intervention, id: newInterventions.length + 1 });
		return Object.assign({}, state, { interventions: newInterventions });
	}

	case SET_USER_SIDE_PANEL_OPEN_STATE:
		return Object.assign({}, state, {
			userSidePanelOpenState: action.state
		});

	default: return state;
	}
};
